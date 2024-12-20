import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Plus, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Quiz, Question } from '../../types';

interface QuizEditorProps {
  onSave: (quiz: Omit<Quiz, 'id'>) => void;
}

interface QuizState extends Omit<Quiz, 'id'> {
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  questions: Question[];
}

export const QuizEditor: React.FC<QuizEditorProps> = ({ onSave }) => {
  const [quiz, setQuiz] = useState<QuizState>({
    title: '',
    description: '',
    timeLimit: 30,
    passingScore: 70,
    questions: []
  });

  const addQuestion = (type: Question['type']) => {
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, {
        id: Date.now().toString(),
        type,
        text: '',
        options: type === 'multiple-choice' ? ['', ''] : [],
        correctAnswer: type === 'true-false' ? '' : '',
        points: 1
      }]
    }));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === id ? { ...q, ...updates } : q
      )
    }));
  };

  const removeQuestion = (id: string) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Quiz Details</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Quiz Title"
            className="w-full p-2 border rounded"
            value={quiz.title}
            onChange={e => setQuiz({ ...quiz, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded h-24"
            value={quiz.description}
            onChange={e => setQuiz({ ...quiz, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Time Limit (minutes)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={quiz.timeLimit}
                onChange={e => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 30 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Passing Score (%)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={quiz.passingScore}
                onChange={e => setQuiz({ ...quiz, passingScore: parseInt(e.target.value) || 70 })}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Questions</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => addQuestion('multiple-choice')}
              className="px-3 py-1 text-sm"
            >
              <Plus className="w-4 h-4 mr-1" /> Multiple Choice
            </Button>
            <Button
              variant="outline"
              onClick={() => addQuestion('true-false')}
              className="px-3 py-1 text-sm"
            >
              <Plus className="w-4 h-4 mr-1" /> True/False
            </Button>
            <Button
              variant="outline"
              onClick={() => addQuestion('short-answer')}
              className="px-3 py-1 text-sm"
            >
              <Plus className="w-4 h-4 mr-1" /> Short Answer
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {quiz.questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-4 rounded-lg border"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">Question {index + 1}</h3>
                <Button
                  variant="ghost"
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Question text"
                  className="w-full p-2 border rounded"
                  value={question.text}
                  onChange={e => updateQuestion(question.id, { text: e.target.value })}
                />

                {question.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    {question.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Option ${optionIndex + 1}`}
                          className="flex-1 p-2 border rounded"
                          value={option}
                          onChange={e => {
                            const newOptions = [...(question.options || [])];
                            newOptions[optionIndex] = e.target.value;
                            updateQuestion(question.id, { options: newOptions });
                          }}
                        />
                        {question.options && question.options.length > 2 && (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              const newOptions = question.options?.filter((_, i) => i !== optionIndex);
                              updateQuestion(question.id, { options: newOptions });
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newOptions = [...(question.options || []), ''];
                        updateQuestion(question.id, { options: newOptions });
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Option
                    </Button>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Points</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={question.points}
                    onChange={e => updateQuestion(question.id, { points: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => onSave(quiz)}
          disabled={!quiz.title || quiz.questions.length === 0}
        >
          <Save className="w-4 h-4 mr-1" /> Save Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizEditor;
