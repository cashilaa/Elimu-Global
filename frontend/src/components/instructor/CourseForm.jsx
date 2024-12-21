import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, X, FileText, Video, AlertCircle, Check } from 'lucide-react';

const API_BASE_URL = 'https://elimu-instructor-bc.onrender.com'; // e.g., 'http://localhost:3000/api'

const CourseForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    status: 'draft',
    price: '',
    category: '',
    prerequisites: '',
    materials: [],
    level: 'beginner'
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      setUploading(true);

      const formDataToSend = new FormData();

      const courseData = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        status: formData.status,
        price: formData.price,
        category: formData.category,
        prerequisites: formData.prerequisites,
        level: formData.level
      };
      formDataToSend.append('courseData', JSON.stringify(courseData));

      formData.materials.forEach((file) => {
        if (file.rawFile) {
          formDataToSend.append('files', file.rawFile);
        }
      });

      const response = await axios.post(`${API_BASE_URL}/courses`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setSuccess('Course created successfully!');
      if (onSubmit) {
        onSubmit(response.data);
      }
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || 'Error creating course. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e, type) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    setError('');

    try {
      const uploadedFiles = await Promise.all(files.map(async (file) => {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name} exceeds 10MB limit`);
        }
        if (type === 'pdf' && file.type !== 'application/pdf') {
          throw new Error(`${file.name} is not a PDF file`);
        }
        if (type === 'video' && !file.type.startsWith('video/')) {
          throw new Error(`${file.name} is not a video file`);
        }
        return {
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
          rawFile: file
        };
      }));

      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, ...uploadedFiles]
      }));
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeMaterial = (index) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <section className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Course Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (in hours)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
              <textarea
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="List any prerequisites for this course"
              />
            </div>
          </div>

          {/* Course Materials Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Course Materials</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e, 'pdf')}
                  accept=".pdf"
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition-colors"
                >
                  <FileText className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Upload PDF Materials</span>
                </button>
              </div>

              <div>
                <input
                  type="file"
                  ref={videoInputRef}
                  onChange={(e) => handleFileUpload(e, 'video')}
                  accept="video/*"
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition-colors"
                >
                  <Video className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Upload Video Content</span>
                </button>
              </div>
            </div>

            {/* Uploaded Files List */}
            {formData.materials.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
                {formData.materials.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2">
                      {file.type === 'application/pdf' ? (
                        <FileText className="w-4 h-4 text-red-500" />
                      ) : (
                        <Video className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-sm text-gray-600">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status and Price Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm pl-7 pr-12 p-2"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-50 text-red-800 border-red-200 p-4 rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span className="ml-2">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-800 border-green-200 p-4 rounded-md">
              <Check className="h-4 w-4" />
              <span className="ml-2">{success}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Creating Course...' : 'Create Course'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CourseForm;