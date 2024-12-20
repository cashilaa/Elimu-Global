import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    // Implement search logic here
    // Example:
    const results = [
      { type: 'course', title: 'React Fundamentals', link: '/dashboard/courses/1' },
      { type: 'student', title: 'John Doe', link: '/dashboard/students/1' },
      // Add more results...
    ];
    setSearchResults(results);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <Search className="h-5 w-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setIsOpen(false)} />
            <div className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search courses, students, or content..."
                  className="w-full p-4 pl-12 pr-10 text-gray-900 placeholder-gray-500 border-0 focus:ring-0"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto p-4">
                {searchResults.map((result, index) => (
                  <a
                    key={index}
                    href={result.link}
                    className="block p-4 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 uppercase">{result.type}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="font-medium">{result.title}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 