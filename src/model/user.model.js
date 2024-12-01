const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: false,
    },
    dob: {
        type: Date,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        // enum: ['student', 'teacher'],
        default: 'student'
    },
    password: {
        type: String,
        required: true
    },

})

const User = mongoose.model("User", userSchema);
module.exports = User;