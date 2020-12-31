const router = require('express').Router();

router.post('/register', (req, res) => {
    res.send("Registeration Done");
});

module.exports = router;