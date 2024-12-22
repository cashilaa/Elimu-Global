import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Groq } from "groq-sdk";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Define Course Schema
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  previewVideo: String,
});

const Course = mongoose.model("Course", courseSchema);

// Define Student Progress Schema
const progressSchema = new mongoose.Schema({
  userId: String,
  coursesInProgress: Number,
  completedCourses: Number,
  totalLearningHours: Number,
  recentActivity: [
    {
      course: String,
      action: String,
      date: Date,
    },
  ],
});

const Progress = mongoose.model("Progress", progressSchema);

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// AI Assistant route
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const systemContext = `You are an AI assistant for Elimu Global, an interactive learning platform.
    The platform features:
    - Interactive course previews and enrollment
    - Student progress tracking
    - Parent portal for monitoring children's education
    - Real-time communication features
    - Personalized learning paths

    Help users navigate the platform, understand available features, and provide guidance on:
    - Course selection and enrollment
    - Using the learning tools
    - Tracking progress
    - Parental controls and monitoring
    - Technical support

    Always be helpful, encouraging, and focused on educational success.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemContext,
        },
        {
          role: "user",
          content: req.body.message,
        },
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1000,
    });

    res.json({ response: completion.choices[0]?.message?.content });
  } catch (error) {
    console.error("Error calling Groq API:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

// Course Preview route
app.get("/api/courses/preview", async (req, res) => {
  try {
    const courses = await Course.find().limit(6);
    res.json(courses);
  } catch (error) {
    console.error("Error fetching course previews:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching course previews" });
  }
});

// Student Progress route
app.get("/api/student/progress", async (req, res) => {
  try {
    const userId = "example-user-id";
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({
        userId,
        coursesInProgress: 0,
        completedCourses: 0,
        totalLearningHours: 0,
        recentActivity: [],
      });
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error("Error fetching student progress:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching student progress" });
  }
});

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, '../../dist')));

// Handle React routing by sending all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling for server
httpServer.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});