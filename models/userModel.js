const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true

    },
    phone: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);