const router = require('express').Router();
const {
    getRegisterPage,
    registerNewUser,
    addDescription
} = require("../controllers/authController");



router.get('/register', getRegisterPage);
router.post('/register', registerNewUser);
router.post('/description', addDescription);


module.exports = router;