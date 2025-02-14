const { default: mongoose } = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required: true
    },
    description: {
        type: String,
        required: false
    },
    deadline: {
        type: Date,
        required: true
    },
    file: {
        type: String,
        required: false
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
});
const Assignment = mongoose.model('Assignment',AssignmentSchema );
module.exports = Assignment;