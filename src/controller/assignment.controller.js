const { ReturnDocument } = require("mongodb");
const Assignment = require("../model/assignment.model");

class AssignmentController {
    createAssignment = async(req, res) => {
        const payload = req.body;
        const newAssignment = new Assignment(payload);
        const response = await newAssignment.save();
        res.status(201).json({
            status: "success",
            response,
            message: "Assignment created successfully."
        });
    }
    
    getAssignment = async (req, res) => {
        const assignments = await Assignment.find({marks: 100}).populate("course", "title").populate("professor", "name role");
        res.status(200).json({
            status: "success",
            assignments,
            message: "Assignments retrieved successfully"
        })
    
    }

    getAssignmentById = async(req, res) => {
        const assignment = await Assignment.findById(req.params.id).populate("course", "title").populate("professor", "user role");
        res.status(200).json({
            status: "success",
            assignment,
            message: "Assignment retrieved successfully."
        })
    }

    updateAssignment = async(req,res) => {
        const payload = req.body;
        const id = req.params.id;
        const assignment = await Assignment.findByIdAndUpdate(req.params.id , req.body, {new: "true"});
        if(!assignment)
        {
            return res.status(400).json({
                message: "Assignment not found."
            })
        }
        res.status(201).json({
            status: "success",
            assignment,
            message: "Assignment updated successfully."
        })
    }

    deleteAssignment = async(req,res) => {
        const deletedassignment = await Assignment.findByIdAndDelete(req.params.id);
        if(!deletedassignment)
        {
            res.status(400).json({
                success: "false",
                message: "Assignment not found."
            })
        }
        res.status(200).json({
            status: "true",
            message: "Assignment deleted successfully."
        })
    }
}

const assignmentCtrl = new AssignmentController();
module.exports = assignmentCtrl;