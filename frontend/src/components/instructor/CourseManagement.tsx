import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import CourseForm from './CourseForm';
import CourseAnalytics from './CourseAnalytics';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { TypewriterText } from '../shared/TypewriterText';
import { CourseCarousel } from '../shared/CourseCarousel';
import { Course } from '../../types';

export default function CourseManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [view, setView] = useState<'grid' | 'carousel'>('grid');

  const { data: courses, isLoading, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await axios.get('/api/courses');
      return data.map((course: any) => ({
        id: course._id,
        title: course.title,
        description: course.description,
        duration: course.duration || '',
        price: course.price || 0,
        maxStudents: course.maxStudents || 30,
        level: course.level || 'beginner',
        prerequisites: course.prerequisites,
        objectives: course.objectives || '',
        status: course.status || 'draft',
        analytics: course.analytics || {
          views: 0,
          completionRate: 0,
          averageRating: 0,
          totalEnrollments: 0,
          revenueGenerated: 0
        }
      }));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (courseId: string) => {
      await axios.delete(`/api/courses/${courseId}`);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <TypewriterText
          text="Course Management"
          className="text-3xl font-bold text-gray-900"
        />
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-md ${
                view === 'grid'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setView('carousel')}
              className={`p-2 rounded-md ${
                view === 'carousel'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Carousel View
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedCourse(null);
              setIsOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            New Course
          </motion.button>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {courses?.map((course: Course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="bg-white shadow-lg rounded-lg p-6 transition-shadow hover:shadow-xl"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {course.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusColor(course.status)
                      }`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteMutation.mutate(course.id)}
                        className="p-2 text-red-400 hover:text-red-500 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {course.description}
                  </p>

                  <CourseAnalytics analytics={course.analytics} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="carousel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CourseCarousel
                courses={courses}
                onSelect={(course) => {
                  setSelectedCourse(course);
                  setIsOpen(true);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white rounded-lg p-8 max-w-lg w-full mx-4 shadow-xl"
            >
              <CourseForm
                course={selectedCourse}
                onSubmit={async (data) => {
                  if (selectedCourse) {
                    await axios.put(`/api/courses/${selectedCourse.id}`, data);
                  } else {
                    await axios.post('/api/courses', data);
                  }
                  setIsOpen(false);
                  refetch();
                }}
                onCancel={() => setIsOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
