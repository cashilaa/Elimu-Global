import React from 'react';
import { API_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const GroupManagement = () => {
  return (
    <DashboardLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Group Management</h1>
      {/* Add group management features */}
      <form className="mt-6 space-y-4" onSubmit={async (e) => {
        e.preventDefault();
        const groupName = e.target.groupName.value;
        const instructorId = e.target.instructorId.value;
        const studentIds = e.target.studentIds.value.split(',').map(id => id.trim());
        try {
          const apiURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : API_URL;

          await axios.post(`${apiURL}/groups`, { name: groupName, instructorId, studentIds });
          toast.success(`Group ${groupName} created`);
        } catch (error) {
          console.error('Error creating group:', error);
        }
      }}>
        <div className="space-y-2">
          <label className="block">
            <span className="text-gray-700">Group Name</span>
            <input type="text" name="groupName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </label>
          <label className="block">
            <span className="text-gray-700">Instructor ID</span>
            <input type="text" name="instructorId" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </label>
          <label className="block">
            <span className="text-gray-700">Student IDs (comma-separated)</span>
            <input type="text" name="studentIds" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </label>
        </div>
        <button type="submit" className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Group
        </button>
      </form>

      
    </div>
  </DashboardLayout>
  );
};

export default GroupManagement;
