// src/Pages/Courses.jsx
import React, { useEffect, useState } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data.courses); // Assuming the response has a 'courses' array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 mt-16 min-h-svh">
      <h1 className="text-3xl font-bold mb-4">Courses Offered</h1>
      {courses.length === 0 ? (
        <p>No courses available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p>{course.description}</p>
              <p className="text-gray-500">Duration: {course.duration}</p>
              <p className="text-gray-500">Price: ${course.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;