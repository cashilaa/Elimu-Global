const express = require('express');
const multer = require('multer');
const upload = require('../middleware/upload');

const router = express.Router();

// In-memory storage for courses
let courses = [];

// Update categories to include Mathematics, English, etc.
const validCategories = ['Mathematics', 'English', 'Science', 'History', 'Art', 'Geography', 'Computer Science'];

// Create a new course
router.post('/', upload.array('files'), (req, res) => {
    const { courseData } = req.body;
    const course = JSON.parse(courseData);

    // Validate category
    if (!validCategories.includes(course.category)) {
        return res.status(400).json({ message: 'Invalid category. Allowed categories are: ' + validCategories.join(', ') });
    }

    course.materials = req.files.map(file => ({
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        url: `uploads/${file.filename}`
    }));

    courses.push(course);
    res.status(201).json({ message: 'Course created successfully!', course });
});

module.exports = router;
