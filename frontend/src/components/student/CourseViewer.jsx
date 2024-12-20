import React, { useState, useEffect } from 'react';
import { VideoPlayer } from '../video/VideoPlayer';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, PlayCircle, FileText, Book } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const CourseViewer = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentContent, setCurrentContent] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
    fetchProgress();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCourse(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await fetch(`/api/progress/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setProgress(data);
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  const handleContentComplete = async (contentId) => {
    try {
      await fetch(`/api/progress/${courseId}/content/${contentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      fetchProgress();
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const isContentLocked = (content) => {
    if (!progress.completedContent) return false;
    const previousContent = getPreviousContent(content);
    return previousContent && !progress.completedContent.includes(previousContent.id);
  };

  const getPreviousContent = (content) => {
    const allContent = course.sections.flatMap(section => section.content);
    const currentIndex = allContent.findIndex(c => c.id === content.id);
    return currentIndex > 0 ? allContent[currentIndex - 1] : null;
  };

  const renderContent = () => {
    if (!currentContent) return null;

    switch (currentContent.type) {
      case 'video':
        return (
          <VideoPlayer
            src={currentContent.videoUrl}
            onProgress={(progress) => {
              // Update progress in real-time
              if (progress >= 90) {
                handleContentComplete(currentContent.id);
              }
            }}
            onComplete={() => handleContentComplete(currentContent.id)}
          />
        );
      case 'document':
        return (
          <iframe
            src={currentContent.documentUrl}
            className="w-full h-[600px] rounded-lg"
            title={currentContent.title}
          />
        );
      case 'quiz':
        return (
          <div>Quiz component here</div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold">{course?.title}</h2>
          <div className="mt-2 text-sm text-gray-500">
            {Math.round(progress.overallProgress || 0)}% Complete
          </div>
        </div>

        <div className="space-y-2 p-4">
          {course?.sections.map(section => (
            <div key={section.id}>
              <h3 className="font-medium mb-2">{section.title}</h3>
              <div className="space-y-1">
                {section.content.map(content => {
                  const isCompleted = progress.completedContent?.includes(content.id);
                  const isLocked = isContentLocked(content);

                  return (
                    <button
                      key={content.id}
                      onClick={() => !isLocked && setCurrentContent(content)}
                      className={`
                        w-full flex items-center gap-3 p-2 rounded-lg text-left
                        ${currentContent?.id === content.id ? 'bg-blue-50 text-blue-600' : ''}
                        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
                      `}
                      disabled={isLocked}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        content.type === 'video' ? <PlayCircle className="w-5 h-5" /> :
                        content.type === 'document' ? <FileText className="w-5 h-5" /> :
                        <Book className="w-5 h-5" />
                      )}
                      <span>{content.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {currentContent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">{currentContent.title}</h2>
              {renderContent()}
            </Card>
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            Select a lesson to begin
          </div>
        )}
      </div>
    </div>
  );
}; 