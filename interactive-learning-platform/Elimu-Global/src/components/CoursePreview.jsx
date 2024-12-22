import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CoursePreview = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/preview');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(error.message);
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Course Previews</h2>
        {error && <p className="text-red-500 text-center">Error fetching courses: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Watch Preview
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedCourse.title}</h3>
            <video
              src={selectedCourse.previewVideo}
              controls
              className="w-full mb-4"
            ></video>
            <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
            <div className="flex justify-between">
              <a
                href={`https://student.com/enroll/${selectedCourse._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Enroll Now
              </a>
              <button
                onClick={() => setSelectedCourse(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default CoursePreview;
