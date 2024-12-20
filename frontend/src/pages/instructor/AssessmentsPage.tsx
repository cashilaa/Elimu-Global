import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Plus, FileText, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface Assessment {
  id: number;
  title: string;
  description: string;
  type: 'quiz' | 'assignment' | 'exam';
  dueDate: string;
  totalPoints: number;
  timeLimit?: number;
  status: 'draft' | 'published' | 'closed';
  questions: Question[];
}

interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'essay';
  points: number;
  options?: string[];
  correctAnswer?: string | number;
}

const AssessmentsPage: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAssessment, setNewAssessment] = useState<Partial<Assessment>>({
    title: '',
    description: '',
    type: 'quiz',
    status: 'draft',
    questions: []
  });

  const handleCreateAssessment = () => {
    if (!newAssessment.title || !newAssessment.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const assessment: Assessment = {
      ...newAssessment as Assessment,
      id: Date.now(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      totalPoints: 0,
      questions: []
    };

    setAssessments([...assessments, assessment]);
    setShowCreateDialog(false);
    setNewAssessment({
      title: '',
      description: '',
      type: 'quiz',
      status: 'draft',
      questions: []
    });
    toast.success('Assessment created successfully');
  };

  const handleDeleteAssessment = (id: number) => {
    setAssessments(assessments.filter(a => a.id !== id));
    toast.success('Assessment deleted successfully');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assessments</h1>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Assessment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Assessment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAssessment.title}
                  onChange={(e) => setNewAssessment({ ...newAssessment, title: e.target.value })}
                  placeholder="Enter assessment title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newAssessment.description}
                  onChange={(e) => setNewAssessment({ ...newAssessment, description: e.target.value })}
                  placeholder="Enter assessment description"
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={newAssessment.type}
                  onChange={(e) => setNewAssessment({ ...newAssessment, type: e.target.value as Assessment['type'] })}
                >
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                  <option value="exam">Exam</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAssessment}>
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Assessments</p>
              <p className="text-2xl font-semibold">{assessments.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-semibold">
                {assessments.filter(a => a.status === 'published').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-2xl font-semibold">
                {assessments.filter(a => a.status === 'draft').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <motion.div
                key={assessment.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{assessment.title}</h3>
                      <p className="text-sm text-gray-600">{assessment.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      assessment.status === 'published' ? 'bg-green-100 text-green-800' :
                      assessment.status === 'draft' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type</span>
                      <span>{assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Due Date</span>
                      <span>{new Date(assessment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Questions</span>
                      <span>{assessment.questions.length}</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {/* Handle edit */}}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAssessment(assessment.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published">
          {/* Similar grid for published assessments */}
        </TabsContent>

        <TabsContent value="drafts">
          {/* Similar grid for draft assessments */}
        </TabsContent>

        <TabsContent value="closed">
          {/* Similar grid for closed assessments */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssessmentsPage;
