const { default: mongoose } = require("mongoose");

const professorSchema = mongoose.schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },

})

const Professor = mongoose.model("Professor", professorSchema);
module.exports = Professor;