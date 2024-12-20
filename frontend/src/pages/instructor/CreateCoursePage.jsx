import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { VideoUpload } from '../../components/course/VideoUpload';
import { motion } from 'framer-motion';
import { Plus, Video, File, Book, X, Image, Calendar, Users, Clock } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { CoursePreview } from '../../components/course/CoursePreview';

export const CreateCoursePage = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    thumbnail: null,
    price: 0,
    category: '',
    level: 'beginner',
    prerequisites: [],
    learningObjectives: [''],
    sections: [],
    schedule: {
      startDate: '',
      endDate: '',
      sessions: []
    },
    settings: {
      enrollmentLimit: 0,
      isPublic: true,
      requiresApproval: false,
      certificateEnabled: true
    }
  });

  const [showPreview, setShowPreview] = useState(false);

  const addSection = () => {
    setCourse(prev => ({
      ...prev,
      sections: [...prev.sections, {
        id: Date.now(),
        title: 'New Section',
        description: '',
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
              file: null,
              duration: 0,
              status: 'draft'
            }]
          };
        }
        return section;
      })
    }));
  };

  const addLearningObjective = () => {
    setCourse(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const removeLearningObjective = (index) => {
    setCourse(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
    }));
  };

  const updateLearningObjective = (index, value) => {
    setCourse(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.map((obj, i) => 
        i === index ? value : obj
      )
    }));
  };

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse(prev => ({
          ...prev,
          thumbnail: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Preview
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Publish Course
          </button>
        </div>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="mb-8">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Course Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={course.title}
                onChange={e => setCourse({ ...course, title: e.target.value })}
                placeholder="Enter course title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full p-2 border rounded-lg h-32"
                value={course.description}
                onChange={e => setCourse({ ...course, description: e.target.value })}
                placeholder="Describe your course"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={course.category}
                  onChange={e => setCourse({ ...course, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Level</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={course.level}
                  onChange={e => setCourse({ ...course, level: e.target.value })}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
              <div className="border-2 border-dashed rounded-lg p-4">
                {course.thumbnail ? (
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt="Course thumbnail"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setCourse({ ...course, thumbnail: null })}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700">Upload a file</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                        />
                      </label>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Learning Objectives</label>
              <div className="space-y-2">
                {course.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded-lg"
                      value={objective}
                      onChange={e => updateLearningObjective(index, e.target.value)}
                      placeholder="What will students learn?"
                    />
                    <button
                      onClick={() => removeLearningObjective(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addLearningObjective}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Learning Objective
                </button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <div className="space-y-6">
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
                    placeholder="Section Title"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => addContent(section.id, 'video')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Add Video"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => addContent(section.id, 'document')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Add Document"
                    >
                      <File className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => addContent(section.id, 'quiz')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Add Quiz"
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
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Content Title"
                            className="w-full text-lg font-medium bg-transparent border-none focus:outline-none"
                            value={content.title}
                            onChange={e => {
                              setCourse(prev => ({
                                ...prev,
                                sections: prev.sections.map(s => ({
                                  ...s,
                                  content: s.content.map(c =>
                                    c.id === content.id ? { ...c, title: e.target.value } : c
                                  )
                                }))
                              }));
                            }}
                          />
                          {content.type === 'video' && (
                            <VideoUpload
                              onUpload={(file) => {
                                // Handle video upload
                              }}
                            />
                          )}
                        </div>
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
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  value={course.schedule.startDate}
                  onChange={e => setCourse(prev => ({
                    ...prev,
                    schedule: { ...prev.schedule, startDate: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  value={course.schedule.endDate}
                  onChange={e => setCourse(prev => ({
                    ...prev,
                    schedule: { ...prev.schedule, endDate: e.target.value }
                  }))}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Enrollment Limit</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={course.settings.enrollmentLimit}
                onChange={e => setCourse(prev => ({
                  ...prev,
                  settings: { ...prev.settings, enrollmentLimit: parseInt(e.target.value) }
                }))}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={course.settings.isPublic}
                  onChange={e => setCourse(prev => ({
                    ...prev,
                    settings: { ...prev.settings, isPublic: e.target.checked }
                  }))}
                />
                <label htmlFor="isPublic">Make course public</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="requiresApproval"
                  checked={course.settings.requiresApproval}
                  onChange={e => setCourse(prev => ({
                    ...prev,
                    settings: { ...prev.settings, requiresApproval: e.target.checked }
                  }))}
                />
                <label htmlFor="requiresApproval">Require enrollment approval</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="certificateEnabled"
                  checked={course.settings.certificateEnabled}
                  onChange={e => setCourse(prev => ({
                    ...prev,
                    settings: { ...prev.settings, certificateEnabled: e.target.checked }
                  }))}
                />
                <label htmlFor="certificateEnabled">Enable course completion certificate</label>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="relative bg-white rounded-lg">
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
              <CoursePreview course={course} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 