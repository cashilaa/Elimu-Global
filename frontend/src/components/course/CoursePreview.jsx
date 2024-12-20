import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Clock, Users, Star, BookOpen, Video, File, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const CoursePreview = ({ course }) => {
  const calculateDuration = () => {
    let totalMinutes = course.sections.reduce((acc, section) => {
      return acc + section.content.reduce((contentAcc, content) => {
        return contentAcc + (content.duration || 0);
      }, 0);
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const countContentItems = (type) => {
    return course.sections.reduce((acc, section) => {
      return acc + section.content.filter(content => content.type === type).length;
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="relative h-80 rounded-xl overflow-hidden mb-8">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {calculateDuration()}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {course.level}
              </Badge>
              {course.category && (
                <Badge variant="secondary">
                  {course.category}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">About This Course</h2>
            <p className="text-gray-600 mb-6">{course.description}</p>

            <h3 className="font-bold mb-2">What You'll Learn</h3>
            <ul className="grid grid-cols-2 gap-4">
              {course.learningObjectives.map((objective, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <Award className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>{objective}</span>
                </motion.li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg"
                >
                  <div className="p-4 bg-gray-50 font-medium flex justify-between items-center">
                    <span>{section.title}</span>
                    <span className="text-sm text-gray-500">
                      {section.content.length} items
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    {section.content.map(content => (
                      <div
                        key={content.id}
                        className="flex items-center gap-3 text-sm"
                      >
                        {content.type === 'video' ? (
                          <Video className="w-4 h-4 text-blue-500" />
                        ) : content.type === 'document' ? (
                          <File className="w-4 h-4 text-orange-500" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-purple-500" />
                        )}
                        <span>{content.title}</span>
                        {content.duration && (
                          <span className="text-gray-500 ml-auto">
                            {Math.floor(content.duration / 60)}:{(content.duration % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Course Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-500" />
                  <span>Videos</span>
                </div>
                <span className="font-medium">{countContentItems('video')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <File className="w-5 h-5 text-orange-500" />
                  <span>Documents</span>
                </div>
                <span className="font-medium">{countContentItems('document')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  <span>Quizzes</span>
                </div>
                <span className="font-medium">{countContentItems('quiz')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Total Duration</span>
                </div>
                <span className="font-medium">{calculateDuration()}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4">Course Settings</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span>Enrollment Limit</span>
                <Badge>{course.settings.enrollmentLimit || 'Unlimited'}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Access Type</span>
                <Badge>{course.settings.isPublic ? 'Public' : 'Private'}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Requires Approval</span>
                <Badge>{course.settings.requiresApproval ? 'Yes' : 'No'}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Certificate</span>
                <Badge>{course.settings.certificateEnabled ? 'Enabled' : 'Disabled'}</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}; 