const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true

    },
    phone: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);