const router = require('express').Router();
const {
    getOfflineCoursePage,
    getOnlineCoursePage,
    addNewCoursePage,
    addNewCourse,
    getAllCoursePage,
    updateCoursePage,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");
const upload = require('../utils/fileUpload'); 
const {protucted} = require("../middlewares/auth");


router.get('/offline', getOfflineCoursePage); 
router.get('/online', getOnlineCoursePage);
router.get('/add', protucted, addNewCoursePage);
router.post('/add', protucted, upload.single('courseImg'), addNewCourse);
router.get('/all', protucted, getAllCoursePage);
router.get('/:id', protucted, updateCoursePage);
router.post('/:id/edit', protucted, upload.single('courseImg'), updateCourse); 
router.post('/:id/delete', protucted, deleteCourse);



module.exports = router;