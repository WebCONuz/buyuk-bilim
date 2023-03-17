const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    type: { 
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    mentor: {
        type: String,
        required: true
    },
    courseImg: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);