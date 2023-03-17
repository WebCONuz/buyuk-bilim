const User = require("../models/userModel");
const Post = require("../models/descrModel");
const Admin = require('../models/adminModel');
const bcrypt = require("bcrypt");


// @Route   GET /admin/signup
// @descr   Get Admin sign-up Page
// @access  Private
const getRegisterAdminPage = (req, res) => {
    return res.render('admin/adminSignup', {
        title: "Sign-up Page",
        registerError: req.flash("regError"),
        isAdmin: true,
        url: process.env.URL
    })
}

// @Route   POST /admin/signup
// @descr   Admin sign-up
// @access  Private
const getRegisterAdmin = async (req, res) => { 
    try {
        const {username, email, password, password2} = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const userExsist = await Admin.findOne({email});
        if(userExsist){
            req.flash("regError", "Bunday adminstrator allaqachon bazada mavjud!!!");
            return res.redirect("/admin/signup");
        }
        if(password !== password2){
            req.flash("regError", "Parollar mos kelmadi!!!");
            return res.redirect("/admin/signup"); 
        }
        await Admin.create({
            username,
            email,
            password: hashedPass
        });

        return res.redirect("/admin/login");
    } catch (err) {
        console.log(err);
    }
}

// @Route   GET /admin/login
// @descr   Get Login Page
// @access  Public
const getLoginPage = async (req, res) => {
    const hasAdmin = await Admin.find();
    if(hasAdmin.length === 0){
        return res.render('admin/adminSignup', {
            title: "Add Admin",
            url: process.env.URL
        })
    }
    if(!req.session.isLogged){
        return res.render('admin/adminLogin', {
            title: "Login Page",
            loginError: req.flash("loginError"), 
            url: process.env.URL
        })
    } else {
        res.redirect("/admin/usersTable");
    }
}

// @Route   POST /admin/login
// @descr   Login admin
// @access  Public
const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existAdmin = await Admin.findOne({email});
        if(existAdmin){
            const matchPass = await bcrypt.compare(password, existAdmin.password);
            if(matchPass){
                req.session.admin = existAdmin;
                req.session.isLogged = true;
                req.session.save();

                res.redirect("/admin/usersTable")
            }else{
                req.flash("loginError", "Email yoki Parol xato!!!"); 
                res.redirect("/admin/login");
            }
        }else{
            req.flash("loginError", "Email yoki Parol xato!!!");
            res.redirect("/admin/login");
        }
    } catch (err) {
        console.log(err);
    }
 }

// @Route   GET /admin/usersTable
// @descr   Get userTable Page
// @access  Private
const getUserTablePage = async (req, res) => {
    try {
        const users = await User.find().lean();
        return res.render('admin/usersTable', {
            title: "Users Data",
            isAdmin: true,
            users: users.reverse(),
            url: process.env.URL
        })
    } catch (err) {
        console.log(err);
    }
}

// @Route   POST /admin/user/delete/:id
// @descr   Delete user from userTable
// @access  Private
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.redirect("/admin/usersTable"); 
    } catch (err) {
        console.log(err);
    }
}

// @Route   GET /admin/postTable
// @descr   Get descrTable Page
// @access  Private
const getPostTablePage = async (req, res) => {
    try {
        const posts = await Post.find().lean();
        return res.render('admin/postTable', {
            title: "Description Data",
            isAdmin: true,
            posts: posts.reverse(),
            url: process.env.URL
        })
    } catch (err) {
        console.log(err);
    }
}

// @Route   GET /admin/post/delete/:id
// @descr   Delete descr from postTable
// @access  Private
const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.id);
        res.redirect("/admin/postTable"); 
    } catch (err) {
        console.log(err);
    }
}

// @Route   GET /admin/logout 
// @descr   Logout admin
// @access  Private
const logoutAdmin = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}



module.exports = {
    getUserTablePage,
    getPostTablePage,
    getRegisterAdminPage,
    getRegisterAdmin,
    getLoginPage,
    loginAdmin,
    logoutAdmin,
    deleteUser,
    deletePost
}