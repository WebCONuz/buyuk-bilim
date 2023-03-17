const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('about', {
        title: "About Page",
        url: process.env.URL
    })
})

module.exports = router;