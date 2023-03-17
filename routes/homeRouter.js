const router = require('express').Router();
const Course = require("../models/courseModel");


router.get('/', async (req, res) => {
    const courses = await Course.find().lean();
    const sixCourse = courses.slice(0,7);
    return res.render('home', {
        title: "Home Page",
        courses: sixCourse,
        url: process.env.URL
    })
})

module.exports = router;