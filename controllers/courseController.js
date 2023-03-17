const Course = require("../models/courseModel");
const fs = require('fs');
const path = require('path');

// @Route   GET /courses/offline
// @descr   Get all offline courses
// @access  Public
const getOfflineCoursePage = async (req, res) => {
    try {
        const pageLimit = 9, 
            limit = parseInt(req.query.limit),
            page = parseInt(req.query.page);

        let total = await Course.find({type:"offline"}).lean();
        total = total.length;

        // search ---------------------------------------
        if(req.query.search){
            const {search} = req.query;
            
            const findCourse = await Course
                .find({"title": new RegExp(search, 'gi')})
                .lean();
            return res.status(200).render('courses/searchResult', {  
                title: "Search Result", 
                allCourses: findCourse.reverse(),
                querySearch: req.query.search, 
                url: process.env.URL   
            }) 
        }

        // pagintion ------------------------------------
        if(req.url === "/offline"){
            return res.redirect(`?page=1&limit=${pageLimit}`)
        }
        const offlineCourse = await Course
            .find({type:"offline"})
            .skip((page * limit) - limit)
            .limit(limit)
            .lean(); 

        const stars = [4.6, 4.7, 4.8, 4.9, 4.6, 4.7, 4.8, 4.9, 4.6, 4.7];
        const offlineFull = offlineCourse.map(item => {
            let i = Math.floor(Math.random() * 10);
            return {star: stars[i], ...item}
        });
        
        return res.render('courses/offCourses', {  
            title: "Offline Courses", 
            courseType: "Offline",
            offlineCourse: offlineFull,
            pagination: {
                page,
                limit,
                pageCount: Math.ceil(total/limit)
            },
            url: process.env.URL
        })  
    } catch (err) {
        console.log(err); 
    }
}

// @Route   GET /courses/online
// @descr   Get all online courses
// @access  Public
const getOnlineCoursePage = async (req, res) => {
    try {
        const pageLimit = 9, 
            limit = parseInt(req.query.limit),
            page = parseInt(req.query.page);

        let total = await Course.find({type:"online"}).lean();
        total = total.length;

        // search ---------------------------------------
        if(req.query.search){
            const {search} = req.query;
            
            const findCourse = await Course
                .find({"title": new RegExp(search, 'gi')})
                .lean();
            return res.status(200).render('courses/searchResult', {  
                title: "Search Result", 
                allCourses: findCourse.reverse(),
                querySearch: req.query.search, 
                url: process.env.URL   
            }) 
        }

        // pagintion ------------------------------------
        if(req.url === "/online"){
            return res.redirect(`?page=1&limit=${pageLimit}`)
        }
        const onlineCourse = await Course
            .find({type:"online"})
            .skip((page * limit) - limit)
            .limit(limit)
            .lean(); 

        const stars = [4.6, 4.7, 4.8, 4.9, 4.6, 4.7, 4.8, 4.9, 4.6, 4.7];
        const onlineFull = onlineCourse.map(item => {
            let i = Math.floor(Math.random() * 10);
            return {star: stars[i], ...item}
        });

        return res.render('courses/onCourses', {  
            title: "Online Courses", 
            courseType: "Online",
            onlineCourse: onlineFull,
            pagination: {
                page,
                limit,
                pageCount: Math.ceil(total/limit)
            },
            url: process.env.URL
        })  
    } catch (err) {
        console.log(err);
    }
}

// @Route   GET /courses/all
// @descr   Get all courses in admin Page
// @access  Private
const getAllCoursePage = async (req, res) => {
    try {
        const stars = [4.6, 4.7, 4.8, 4.9, 4.6, 4.7, 4.8, 4.9, 4.6, 4.7];
        const courses = await Course.find().lean();
        const courseFull = courses.map(item => {
            let i = Math.floor(Math.random() * 10);
            return {star: stars[i], ...item}
        });
        return res.render('courses/allCourses', {
            title: "All Courses",
            isAdmin: true,
            courses: courseFull.reverse(),
            url: process.env.URL
        })
    } catch (err) {
        console.log(err);
    }
}

// @Route   GET /courses/add
// @descr   Get Adding Course Page
// @access  Prived
const addNewCoursePage = (req, res) => {
    res.render('courses/addCourse', {
        title: "Add Course",
        url: process.env.URL,
        isAdmin: true
    })
}


// @Route   POST /courses/add
// @descr   Add new course
// @access  Prived
const addNewCourse = async (req, res) => {
    try{
        const newCourse = new Course({
            title: req.body.title,
            type: req.body.type,
            price: req.body.price,
            duration: req.body.duration,
            mentor: req.body.mentor,
            courseImg: '/uploads/' + req.file.filename,
        });
        await newCourse.save();
        res.redirect("/courses/all") 
    } catch (err) {
        console.log(err);
    }
}

// @Route   GET /courses/:id
// @descr   Get course update page
// @access  Prived
const updateCoursePage = async (req, res) => {
    const updateted = await Course.findById(req.params.id).lean(); 
    let type = false;
    if(updateted.type === "offline"){
        type = true;
    }
    res.render('courses/updateCourse', {
        title: "Edit Course",
        url: process.env.URL,
        course: updateted,
        type,
        id: req.params.id,
        isAdmin: true
    })
}

// @Route   POST /courses/:id
// @descr   Update course by id
// @access  Prived
const updateCourse = async (req, res) => {
    try {
        const {title, type, price, duration, mentor} = req.body;

        const oldCourse = await Course.findById(req.params.id);
        let courseImg = oldCourse.courseImg;
        if(req.file){
            fs.unlinkSync(path.join(__dirname, '../', '/public', courseImg), (err) => {
                if (err) {
                    throw err;
                }
                console.log("File is deleted.");
            });
            courseImg = '/uploads/' + req.file.filename;
        }
        oldCourse.set({
            title,
            type,
            price,
            duration,
            mentor,
            courseImg
        })
        await oldCourse.save();
        res.redirect("/courses/all");
    } catch (err) {
        console.log(err);
    }
}

// @Route   Delete /courses/:id
// @descr   Delete course by Id
// @access  Prived
const deleteCourse = async (req, res) => {
    try {
        const oldCourse = await Course.findById(req.params.id);
        fs.unlinkSync(path.join(__dirname, '../', '/public', oldCourse.courseImg), (err) => {
            if (err) {
                throw err;
            }
            console.log("File is deleted.");
        });
        await Course.findByIdAndRemove(req.params.id);

        res.redirect("/courses/all"); 
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getOfflineCoursePage,
    getOnlineCoursePage,
    getAllCoursePage,
    addNewCoursePage,
    addNewCourse,
    updateCoursePage,
    updateCourse,
    deleteCourse
}