import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Plus, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuizEditor = ({ onSave }) => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    timeLimit: 30,
    passingScore: 70,
    questions: []
  });

  const addQuestion = (type) => {
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, {
        id: Date.now(),
        type,
        text: '',
        options: type === 'multiple-choice' ? ['', ''] : [],
        correctAnswer: type === 'true-false' ? null : '',
        points: 1
      }]
    }));
  };

  const updateQuestion = (id, updates) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === id ? { ...q, ...updates } : q
      )
    }));
  };

  const removeQuestion = (id) => {
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
                onChange={e => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Passing Score (%)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={quiz.passingScore}
                onChange={e => setQuiz({ ...quiz, passingScore: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Questions</h2>
          <div className="flex gap-2">
            <button
              onClick={() => addQuestion('multiple-choice')}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            >
              Multiple Choice
            </button>
            <button
              onClick={() => addQuestion('true-false')}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            >
              True/False
            </button>
          </div>
        </div>

        <AnimatePresence>
          {quiz.questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border rounded-lg p-4"
            >
              {/* Question content */}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 border rounded hover:bg-gray-50">
            Save as Draft
          </button>
          <button
            onClick={() => onSave(quiz)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Publish Quiz
          </button>
        </div>
      </div>
    </div>
  );
}; 