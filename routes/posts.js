const router = require('express').Router();
const verify = require('./validToken');

router.get('/',verify, (req, res) => {
    res.json({
        posts: {
            title: "MY PRIVATE POST",
            description: "random data you shouldn't access"
        }
    });
});

module.exports = router;