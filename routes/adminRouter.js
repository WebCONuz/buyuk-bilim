const router = require('express').Router();
const {
    getUserTablePage,
    getPostTablePage,
    getRegisterAdminPage,
    getRegisterAdmin,
    getLoginPage,
    loginAdmin,
    logoutAdmin,
    deleteUser,
    deletePost
} = require("../controllers/adminController");
const {protucted} = require("../middlewares/auth");



router.get('/usersTable', protucted, getUserTablePage);
router.get('/postTable', protucted, getPostTablePage);
router.get('/signup', protucted, getRegisterAdminPage);
router.post('/signup', protucted, getRegisterAdmin);
router.get('/login', getLoginPage);
router.post('/login', loginAdmin);
router.get('/logout', logoutAdmin);
router.post('/user/delete/:id', protucted, deleteUser); 
router.post('/post/delete/:id', protucted, deletePost);  


module.exports = router;