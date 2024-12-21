import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <Link
          to="/dashboard/courses/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Course
        </Link>
      </div>

      {/* Course list will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">No courses yet</h3>
          <p className="text-gray-600 mt-2">Start creating your first course!</p>
        </div>
      </div>
    </div>
  );
};

export default Courses; 