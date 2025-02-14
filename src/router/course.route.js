const express = require('express');
const courseCtrl = require("../controller/course.controller");
const { roleMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes (accessible by both students and teachers)
router.get('/', courseCtrl.getAllCourses);
router.get('/:id', courseCtrl.getCourseById);

// Protected routes (only accessible by teachers)
router.post('/', roleMiddleware(['teacher']), courseCtrl.createCourse);
router.put('/:id', roleMiddleware(['teacher']), courseCtrl.updateCourse);
router.delete('/:id', roleMiddleware(['teacher']), courseCtrl.deleteCourse);

module.exports = router;

