const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Adminstration", adminSchema); 