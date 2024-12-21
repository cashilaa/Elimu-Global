const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

router.post('/courses/generate', courseController.generateAICourse);

module.exports = router; 