const geminiService = require('../services/geminiService');

class CourseController {
  // ... other methods ...

  async generateAICourse(req, res) {
    try {
      const { subject, educationLevel, term } = req.body;

      if (!subject || !educationLevel || !term) {
        return res.status(400).json({ 
          error: 'Missing required parameters' 
        });
      }

      const courseContent = await geminiService.generateCourseContent({
        subject,
        educationLevel,
        term
      });

      res.json(courseContent);
    } catch (error) {
      console.error('Error in generateAICourse:', error);
      res.status(500).json({ 
        error: 'Failed to generate course content' 
      });
    }
  }
}

module.exports = new CourseController(); 