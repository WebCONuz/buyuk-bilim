const User = require("../models/userModel");
const Post = require("../models/descrModel");

// @Route   GET /auth/register
// @descr   Get Registration Page
// @access  Public
const getRegisterPage = (req, res) => {
    res.render('auth/sign-up', {
        title: "Registration",
        url: process.env.URL
    })
}

// @Route   POST /auth/register 
// @descr   Register new user to database
// @access  Public
const registerNewUser = async (req, res) => {
    try {
        const {username, phone, subject} = req.body;
        await User.create({
            username,
            phone,
            subject
        });

        // req.flash("registerSuccess", "Ro'yxatdan o'tdingiz. Tez orada aloqaga chiqamiz!!!");
        return res.redirect("/");
    } catch (err) {
        console.log(err);
    }
}

// @Route   POST /auth/description 
// @descr   Add new Descr to database
// @access  Public
const addDescription = async (req, res) => {
    try {
        const {username, phone, descr} = req.body; 
        await Post.create({
            username,
            phone,
            descr
        });

        // req.flash("registerSuccess", "Ro'yxatdan o'tdingiz. Tez orada aloqaga chiqamiz!!!");
        return res.redirect("/");
    } catch (err) {
        console.log(err); 
    }
}

module.exports = {
    getRegisterPage, 
    registerNewUser,
    addDescription
}