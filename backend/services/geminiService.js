const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateCourseContent({ subject, educationLevel, term }) {
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    };

    const chatSession = this.model.startChat({ generationConfig });

    const prompt = `
      Create a detailed course curriculum for ${subject} at ${educationLevel} level for ${term}.
      Include the following:
      1. Course description
      2. Learning objectives
      3. Course requirements
      4. Detailed curriculum structure with:
         - Units/Chapters
         - Topics for each unit
         - Brief description for each topic
         - Suggested activities or exercises
      5. Assessment methods
      
      Format the response as a JSON object with the following structure:
      {
        "basic": {
          "title": "",
          "description": "",
          "category": "${subject}",
          "educationLevel": "${educationLevel}",
          "term": "${term}"
        },
        "curriculum": {
          "sections": [
            {
              "unit": "Unit 1",
              "title": "",
              "lectures": [
                {
                  "title": "",
                  "type": "",
                  "description": ""
                }
              ]
            }
          ]
        },
        "requirements": [],
        "outcomes": []
      }
    `;

    try {
      const result = await chatSession.sendMessage(prompt);
      const courseContent = JSON.parse(result.response.text());
      return courseContent;
    } catch (error) {
      console.error('Error generating course content:', error);
      throw new Error('Failed to generate course content');
    }
  }
}

module.exports = new GeminiService(); 