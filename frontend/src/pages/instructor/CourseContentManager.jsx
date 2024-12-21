import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash, BookOpen, User, Calendar } from 'lucide-react';

const CourseContentManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewStyle, setViewStyle] = useState('grid'); // grid or shelf

  // Enhanced dummy data with more book-like properties
  function generateDummyCourses() {
    const subjects = ['Literature', 'Science', 'History', 'Mathematics', 'Arts'];
    const colors = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100'];
    
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Course ${i + 1}`,
      description: `Description for Course ${i + 1}`,
      instructor: `Professor ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5]}`,
      date: new Date().toLocaleDateString(),
      subject: subjects[i % subjects.length],
      color: colors[i % colors.length],
      pages: Math.floor(Math.random() * 300) + 100
    }));
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const dummyData = generateDummyCourses();
        setCourses(dummyData);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center items-center h-64">Loading library catalog...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  const BookCard = ({ course }) => (
    <div className={`${course.color} rounded-lg shadow-lg transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl`}>
      <div className="relative h-full p-6 flex flex-col">
        {/* Book spine effect */}
        <div className="absolute left-0 top-0 w-2 h-full bg-opacity-20 bg-black rounded-l-lg" />
        
        <div className="flex-1">
          <h3 className="text-lg font-serif font-bold mb-2">{course.title}</h3>
          <p className="text-sm mb-4">{course.description}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center">
              <BookOpen size={16} className="mr-2" />
              <span>{course.pages} pages</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{course.date}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 border-opacity-50">
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <Edit size={16} className="mr-1" /> Edit
          </button>
          <button className="text-red-600 hover:text-red-800 flex items-center">
            <Trash size={16} className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Library Catalog</h1>
        
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setViewStyle(viewStyle === 'grid' ? 'shelf' : 'grid')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg"
            >
              {viewStyle === 'grid' ? 'Shelf View' : 'Grid View'}
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="mr-2" /> Add to Catalog
            </button>
          </div>
        </div>

        <div className={`grid ${viewStyle === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {filteredCourses.map(course => (
            <BookCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContentManager;