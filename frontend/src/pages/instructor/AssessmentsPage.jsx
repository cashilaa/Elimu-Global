import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { Plus, FileText, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AssessmentsPage = () => {
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: 'React Fundamentals Quiz',
      type: 'quiz',
      course: 'React Development',
      dueDate: '2024-03-20',
      submissions: 15,
      averageScore: 85,
      status: 'active'
    },
    // Add more mock data
  ]);

  const stats = [
    {
      title: 'Total Assessments',
      value: assessments.length,
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Completed',
      value: '45',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Pending',
      value: '12',
      icon: Clock,
      color: 'orange'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assessments</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Assessment
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Assessments</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{assessment.title}</h3>
                      <p className="text-sm text-gray-500">{assessment.course}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Due Date</p>
                        <p className="text-sm text-gray-500">{assessment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Submissions</p>
                        <p className="text-sm text-gray-500">{assessment.submissions}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Average Score</p>
                        <p className="text-sm text-gray-500">{assessment.averageScore}%</p>
                      </div>
                      <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            {/* Active assessments content */}
          </TabsContent>

          <TabsContent value="draft">
            {/* Draft assessments content */}
          </TabsContent>

          <TabsContent value="completed">
            {/* Completed assessments content */}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AssessmentsPage; 