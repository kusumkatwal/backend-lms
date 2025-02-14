const express = require("express");
const app = express();
const assignmentCtrl = require("../controller/assignment.controller")

app.post("/",  assignmentCtrl.createAssignment);
app.get("/", assignmentCtrl.getAssignment);
app.get("/:id" , assignmentCtrl.getAssignmentById);
app.post("/update/:id", assignmentCtrl.updateAssignment);
app.delete("/delete/:id", assignmentCtrl.deleteAssignment);

module.exports = app;