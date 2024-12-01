const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;