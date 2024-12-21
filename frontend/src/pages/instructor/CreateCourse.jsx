import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseForm from '../../components/instructor/CourseForm';
import AIAssistantButton from '../../components/course-generator/AIAssistantButton';
import { toast } from 'react-hot-toast';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();

  const handleCourseGenerated = (data) => {
    setCourseData(data);
    toast.success('Course structure generated! Review and customize it below.');
  };

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Course created successfully!');
        navigate('/instructor/courses');
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Course</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <CourseForm 
          initialData={courseData}
          onSubmit={handleSubmit}
        />
      </div>

      <AIAssistantButton onCourseGenerated={handleCourseGenerated} />
    </div>
  );
};

export default CreateCourse;
      