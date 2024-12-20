import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Plus, Save, X, Edit2, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

export const QuizCreator = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    timeLimit: 0,
    passingScore: 0,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState(null);

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      text: '',
      options: type === 'multiple-choice' ? ['', ''] : [],
      correctAnswer: type === 'true-false' ? null : '',
      points: 1
    };
    setCurrentQuestion(newQuestion);
  };

  const saveQuestion = () => {
    if (currentQuestion.id) {
      setQuiz(prev => ({
        ...prev,
        questions: prev.questions.map(q => 
          q.id === currentQuestion.id ? currentQuestion : q
        )
      }));
    } else {
      setQuiz(prev => ({
        ...prev,
        questions: [...prev.questions, currentQuestion]
      }));
    }
    setCurrentQuestion(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Quiz</CardTitle>
        </CardHeader>
        <CardContent>
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
              className="w-full p-2 border rounded"
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Questions</CardTitle>
            <div className="flex gap-2">
              <Button onClick={() => addQuestion('multiple-choice')}>
                <Plus className="w-4 h-4 mr-1" /> Multiple Choice
              </Button>
              <Button onClick={() => addQuestion('true-false')}>
                <Plus className="w-4 h-4 mr-1" /> True/False
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                    <p className="font-medium">{question.text || 'Untitled Question'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentQuestion(question)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setQuiz(prev => ({
                        ...prev,
                        questions: prev.questions.filter(q => q.id !== question.id)
                      }))}
                      className="p-1 hover:bg-gray-100 rounded text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {currentQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Edit Question</CardTitle>
                <button onClick={() => setCurrentQuestion(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  placeholder="Question text"
                  className="w-full p-2 border rounded"
                  value={currentQuestion.text}
                  onChange={e => setCurrentQuestion({
                    ...currentQuestion,
                    text: e.target.value
                  })}
                />

                {currentQuestion.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="radio"
                          name="correct"
                          checked={currentQuestion.correctAnswer === index}
                          onChange={() => setCurrentQuestion({
                            ...currentQuestion,
                            correctAnswer: index
                          })}
                        />
                        <input
                          type="text"
                          className="flex-1 p-2 border rounded"
                          value={option}
                          onChange={e => {
                            const newOptions = [...currentQuestion.options];
                            newOptions[index] = e.target.value;
                            setCurrentQuestion({
                              ...currentQuestion,
                              options: newOptions
                            });
                          }}
                        />
                        <button
                          onClick={() => {
                            const newOptions = currentQuestion.options.filter((_, i) => i !== index);
                            setCurrentQuestion({
                              ...currentQuestion,
                              options: newOptions
                            });
                          }}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <Button
                      onClick={() => setCurrentQuestion({
                        ...currentQuestion,
                        options: [...currentQuestion.options, '']
                      })}
                    >
                      Add Option
                    </Button>
                  </div>
                )}

                {currentQuestion.type === 'true-false' && (
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="true-false"
                        checked={currentQuestion.correctAnswer === true}
                        onChange={() => setCurrentQuestion({
                          ...currentQuestion,
                          correctAnswer: true
                        })}
                      />
                      True
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="true-false"
                        checked={currentQuestion.correctAnswer === false}
                        onChange={() => setCurrentQuestion({
                          ...currentQuestion,
                          correctAnswer: false
                        })}
                      />
                      False
                    </label>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Points</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={currentQuestion.points}
                    onChange={e => setCurrentQuestion({
                      ...currentQuestion,
                      points: parseInt(e.target.value)
                    })}
                  />
                </div>

                <Button onClick={saveQuestion}>
                  <Save className="w-4 h-4 mr-1" /> Save Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}; 