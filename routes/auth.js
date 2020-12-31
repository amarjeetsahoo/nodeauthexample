const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');
const { loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {

    //LET'S VALIDATE THE DATA BEFORE WE SEND TO DB
    const { error } = registerValidation(req.body);

    //const { error } = schema.validate(req.body);
    // res.send(error.details[0].message);

    if (error) return res.status(400).send(error.details[0].message);

    //check email exist or not!!!
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email Exist");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user:user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

//login
router.post('/login', async(req, res) => {
    //LET'S VALIDATE THE DATA BEFORE WE SEND TO DB
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check email exist or not!!!
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email Doesn't Exist");
    //password checking
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    res.send("Logged In");
});

module.exports = router;