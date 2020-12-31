const router = require('express').Router();
const User = require('../model/User');
const {registerValidation}=require('../validation');


router.post('/register', async (req, res) => {

    //LET'S VALIDATE THE DATA BEFORE WE SEND TO DB
    const { error } = registerValidation(req.body);

    //const { error } = schema.validate(req.body);
    // res.send(error.details[0].message);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email Exist");

    //new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;