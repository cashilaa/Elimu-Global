const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data for demonstration
let courses = [
  
];
let students = [];
let instructors = [];

// API endpoint to get courses
app.get('/api/courses', (req, res) => {
  res.json({ courses });
});

// API endpoint to add a new course
app.post('/api/courses', (req, res) => {
  const { title, description, duration, price } = req.body;
  const newCourse = {
    id: courses.length + 1, // Simple ID generation
    title,
    description,
    duration,
    price,
  };
  courses.push(newCourse);
  res.status(201).json({ message: 'Course added successfully!', course: newCourse });
});

// API endpoint to get registered students
app.get('/api/students', (req, res) => {
  res.json({ students });
});

// API endpoint to register a new student
app.post('/api/students', (req, res) => {
  const { name, email } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    email,
  };
  students.push(newStudent);
  res.status(201).json({ message: 'Student registered successfully!', student: newStudent });
});

// API endpoint to get registered instructors
app.get('/api/instructors', (req, res) => {
  res.json({ instructors });
});

// API endpoint to register a new instructor
app.post('/api/instructors', (req, res) => {
  const { name, email } = req.body;
  const newInstructor = {
    id: instructors.length + 1,
    name,
    email,
  };
  instructors.push(newInstructor);
  res.status(201).json({ message: 'Instructor registered successfully!', instructor: newInstructor });
});
// API endpoint to add a new course
app.post('/api/courses', (req, res) => {
  const { title, description, duration, price } = req.body;

  // Check for missing fields
  if (!title || !description || !duration || !price) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newCourse = {
    id: courses.length + 1, // Simple ID generation
    title,
    description,
    duration,
    price,
  };
  courses.push(newCourse);
  res.status(201).json({ message: 'Course added successfully!', course: newCourse });
});

// API endpoint to register a new student
app.post('/api/students', (req, res) => {
  const { name, email } = req.body;

  // Check for missing fields
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    email,
  };
  students.push(newStudent);
  res.status(201).json({ message: 'Student registered successfully!', student: newStudent });
});

// API endpoint to register a new instructor
app.post('/api/instructors', (req, res) => {
  const { name, email } = req.body;

  // Check for missing fields
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  const newInstructor = {
    id: instructors.length + 1,
    name,
    email,
  };
  instructors.push(newInstructor);
  res.status(201).json({ message: 'Instructor registered successfully!', instructor: newInstructor });
});

// API endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Here you would typically handle the message, e.g., save it to a database or send an email
  console.log(`Received contact form submission: ${name}, ${email}, ${phone}, ${message}`);

  // Send a response back to the client
  res.status(200).json({ message: 'Contact form submitted successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});