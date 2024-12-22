import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Groq } from 'groq-sdk';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Define Course Schema
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  previewVideo: String
});

const Course = mongoose.model('Course', courseSchema);

// Define Student Progress Schema
const progressSchema = new mongoose.Schema({
  userId: String,
  coursesInProgress: Number,
  completedCourses: Number,
  totalLearningHours: Number,
  recentActivity: [{
    course: String,
    action: String,
    date: Date
  }]
});

const Progress = mongoose.model('Progress', progressSchema);

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// AI Assistant route
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: req.body.message }],
      model: "mixtral-8x7b-32768",
    });

    res.json({ response: completion.choices[0]?.message?.content });
  } catch (error) {
    console.error('Error calling Groq API:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Course Preview route
app.get('/api/courses/preview', async (req, res) => {
  try {
    const courses = await Course.find().limit(6);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching course previews:', error);
    res.status(500).json({ error: 'An error occurred while fetching course previews' });
  }
});

// Student Progress route
app.get('/api/student/progress', async (req, res) => {
  try {
    // In a real application, you would get the userId from the authenticated user's session
    const userId = 'example-user-id';
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      // If no progress found, create a new one with default values
      progress = new Progress({
        userId,
        coursesInProgress: 0,
        completedCourses: 0,
        totalLearningHours: 0,
        recentActivity: []
      });
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error('Error fetching student progress:', error);
    res.status(500).json({ error: 'An error occurred while fetching student progress' });
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

