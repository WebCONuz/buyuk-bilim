const multer = require('multer');
const path = require('path');

// Set Storage 
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// Initialise Upload 
const upload = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
})

// Check file or img 
function checkFileType(file, cb){
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error! You can only uploads image files.');
    }
}

module.exports = upload;