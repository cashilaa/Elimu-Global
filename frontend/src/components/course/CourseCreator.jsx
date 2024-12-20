import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { VideoUpload } from './VideoUpload';
import { motion } from 'framer-motion';
import { Plus, Video, File, Book, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';

export const CourseCreator = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    sections: [],
  });

  const [currentSection, setCurrentSection] = useState(null);

  const addSection = () => {
    setCourse(prev => ({
      ...prev,
      sections: [...prev.sections, {
        id: Date.now(),
        title: 'New Section',
        content: []
      }]
    }));
  };

  const addContent = (sectionId, type) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            content: [...section.content, {
              id: Date.now(),
              type,
              title: '',
              description: '',
              status: 'draft'
            }]
          };
        }
        return section;
      })
    }));
  };

  const handleVideoUpload = async (sectionId, contentId, formData) => {
    try {
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      updateContent(sectionId, contentId, { videoId: data.id, status: 'ready' });
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const updateContent = (sectionId, contentId, updates) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            content: section.content.map(content => {
              if (content.id === contentId) {
                return { ...content, ...updates };
              }
              return content;
            })
          };
        }
        return section;
      })
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            className="w-full p-2 border rounded"
            value={course.title}
            onChange={e => setCourse({ ...course, title: e.target.value })}
          />
          <textarea
            placeholder="Course Description"
            className="w-full p-2 border rounded h-32"
            value={course.description}
            onChange={e => setCourse({ ...course, description: e.target.value })}
          />
        </div>
      </Card>

      <div className="space-y-4">
        {course.sections.map(section => (
          <Card key={section.id} className="p-6">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={section.title}
                onChange={e => {
                  setCourse(prev => ({
                    ...prev,
                    sections: prev.sections.map(s => 
                      s.id === section.id ? { ...s, title: e.target.value } : s
                    )
                  }));
                }}
                className="text-xl font-semibold bg-transparent border-none focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => addContent(section.id, 'video')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Video className="w-5 h-5" />
                </button>
                <button
                  onClick={() => addContent(section.id, 'document')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <File className="w-5 h-5" />
                </button>
                <button
                  onClick={() => addContent(section.id, 'quiz')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Book className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {section.content.map(content => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <input
                      type="text"
                      placeholder="Content Title"
                      className="text-lg font-medium bg-transparent border-none focus:outline-none"
                      value={content.title}
                      onChange={e => updateContent(section.id, content.id, { title: e.target.value })}
                    />
                    <button
                      onClick={() => {
                        setCourse(prev => ({
                          ...prev,
                          sections: prev.sections.map(s => ({
                            ...s,
                            content: s.content.filter(c => c.id !== content.id)
                          }))
                        }));
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {content.type === 'video' && (
                    <VideoUpload
                      onUpload={(formData) => handleVideoUpload(section.id, content.id, formData)}
                    />
                  )}

                  {content.type === 'document' && (
                    <div>Document upload component here</div>
                  )}

                  {content.type === 'quiz' && (
                    <div>Quiz creator component here</div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        ))}

        <button
          onClick={addSection}
          className="w-full p-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Section
        </button>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Save Draft
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Publish Course
        </button>
      </div>
    </div>
  );
}; 