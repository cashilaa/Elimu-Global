import React, { useState } from 'react';
import { ChatInterface } from '../../components/course-generator/ChatInterface';
import { Card } from '../../components/ui/card';
import { motion } from 'framer-motion';

const CourseGenerator = () => {
  const [generatedCourse, setGeneratedCourse] = useState(null);

  const handleCourseGenerated = (courseData: any) => {
    setGeneratedCourse(courseData);
    // You can also automatically navigate to the course editor
    // or show a preview of the generated course
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-2rem)]"
      >
        <Card className="h-full overflow-hidden">
          <ChatInterface onCourseGenerated={handleCourseGenerated} />
        </Card>

        {generatedCourse && (
          <Card className="h-full overflow-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Generated Course Preview</h2>
            {/* Add your course preview component here */}
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default CourseGenerator; 