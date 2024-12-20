import React, { useState, ChangeEvent } from 'react';
import { Card } from '../../components/ui/Card';
import { VideoUpload } from '../../components/course/VideoUpload';
import { motion } from 'framer-motion';
import { Plus, Video, File, Book, X, Image, Calendar, Users, Clock } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { CoursePreview } from '../../components/course/CoursePreview';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { toast } from 'react-hot-toast';

interface CourseSession {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
}

interface CourseSection {
  id: number;
  title: string;
  description: string;
  content: CourseContent[];
}

interface CourseContent {
  id: number;
  type: 'video' | 'document' | 'quiz';
  title: string;
  description: string;
  file: File | null;
  duration: number;
  status: 'draft' | 'ready' | 'processing';
}

interface CourseSchedule {
  startDate: string;
  endDate: string;
  sessions: CourseSession[];
}

interface CourseSettings {
  enrollmentLimit: number;
  isPublic: boolean;
  requiresApproval: boolean;
  certificateEnabled: boolean;
}

interface Course {
  title: string;
  description: string;
  thumbnail: string | null;
  price: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningObjectives: string[];
  sections: CourseSection[];
  schedule: CourseSchedule;
  settings: CourseSettings;
}

export const CreateCoursePage: React.FC = () => {
  const [course, setCourse] = useState<Course>({
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

  const [showPreview, setShowPreview] = useState<boolean>(false);

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

  const addContent = (sectionId: number, type: 'video' | 'document' | 'quiz') => {
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

  const removeLearningObjective = (index: number) => {
    setCourse(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
    }));
  };

  const updateLearningObjective = (index: number, value: string) => {
    const newObjectives = [...course.learningObjectives];
    newObjectives[index] = value;
    setCourse({ ...course, learningObjectives: newObjectives });
  };

  const handleThumbnailUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse(prev => ({
          ...prev,
          thumbnail: reader.result as string
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
          <Button
            onClick={() => setShowPreview(true)}
            variant="outline"
          >
            Preview
          </Button>
          <Button variant="outline">
            Save Draft
          </Button>
          <Button variant="default">
            Publish Course
          </Button>
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
              <Input
                type="text"
                value={course.title}
                onChange={e => setCourse({ ...course, title: e.target.value })}
                placeholder="Enter course title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={course.description}
                onChange={e => setCourse({ ...course, description: e.target.value })}
                placeholder="Describe your course"
                className="h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select
                  value={course.category}
                  onValueChange={(value) => setCourse({ ...course, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Level</label>
                <Select
                  value={course.level}
                  onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => 
                    setCourse({ ...course, level: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
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
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Learning Objectives</label>
              <div className="space-y-3">
                {course.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={objective}
                      onChange={(e) => updateLearningObjective(index, e.target.value)}
                      placeholder="Enter learning objective"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeLearningObjective(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addLearningObjective}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Learning Objective
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="p-6">
            <div className="space-y-6">
              {course.sections.map((section) => (
                <div key={section.id} className="border rounded-lg p-4">
                  <Input
                    value={section.title}
                    onChange={(e) => {
                      setCourse(prev => ({
                        ...prev,
                        sections: prev.sections.map(s => 
                          s.id === section.id ? { ...s, title: e.target.value } : s
                        )
                      }));
                    }}
                    placeholder="Section Title"
                    className="mb-4"
                  />
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addContent(section.id, 'video')}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Add Video
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addContent(section.id, 'document')}
                    >
                      <File className="h-4 w-4 mr-2" />
                      Add Document
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addContent(section.id, 'quiz')}
                    >
                      <Book className="h-4 w-4 mr-2" />
                      Add Quiz
                    </Button>
                  </div>
                  {section.content.map((content) => (
                    <div key={content.id} className="border rounded p-3 mb-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize">{content.type}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCourse(prev => ({
                              ...prev,
                              sections: prev.sections.map(s => ({
                                ...s,
                                content: s.content.filter(c => c.id !== content.id)
                              }))
                            }));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSection}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="p-6">
            {/* Schedule content */}
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            {/* Settings content */}
          </Card>
        </TabsContent>
      </Tabs>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Course Preview</h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CoursePreview course={course} />
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreateCoursePage;
