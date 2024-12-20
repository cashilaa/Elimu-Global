import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Plus, Save, X, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Quiz, Question } from '../../types';

interface QuizState extends Omit<Quiz, 'id'> {
  id?: string;
}

interface CurrentQuestion extends Omit<Question, 'id'> {
  id?: string;
}

export const QuizCreator: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizState>({
    title: '',
    description: '',
    timeLimit: 0,
    passingScore: 0,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion | null>(null);

  const addQuestion = (type: Question['type']) => {
    const newQuestion: CurrentQuestion = {
      id: Date.now().toString(),
      type,
      text: '',
      options: type === 'multiple-choice' ? ['', ''] : [],
      correctAnswer: type === 'true-false' ? '' : '',
      points: 1
    };
    setCurrentQuestion(newQuestion);
  };

  const saveQuestion = () => {
    if (!currentQuestion) return;
    
    if (currentQuestion.id) {
      setQuiz(prev => ({
        ...prev,
        questions: prev.questions.map(q => 
          q.id === currentQuestion.id ? currentQuestion as Question : q
        )
      }));
    } else {
      setQuiz(prev => ({
        ...prev,
        questions: [...prev.questions, { ...currentQuestion, id: Date.now().toString() } as Question]
      }));
    }
    setCurrentQuestion(null);
  };

  const addOption = () => {
    if (!currentQuestion || currentQuestion.type !== 'multiple-choice') return;
    setCurrentQuestion({
      ...currentQuestion,
      options: [...(currentQuestion.options || []), '']
    });
  };

  const updateOption = (index: number, value: string) => {
    if (!currentQuestion || !currentQuestion.options) return;
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions
    });
  };

  const removeOption = (index: number) => {
    if (!currentQuestion || !currentQuestion.options) return;
    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options.filter((_, i) => i !== index)
    });
  };

  const editQuestion = (question: Question) => {
    setCurrentQuestion(question);
  };

  const deleteQuestion = (questionId: string) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
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
                  onChange={e => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Passing Score (%)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={quiz.passingScore}
                  onChange={e => setQuiz({ ...quiz, passingScore: parseInt(e.target.value) || 0 })}
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
              <Button onClick={() => addQuestion('short-answer')}>
                <Plus className="w-4 h-4 mr-1" /> Short Answer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentQuestion && (
            <div className="mb-6 p-4 border rounded bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">
                  {currentQuestion.id ? 'Edit Question' : 'New Question'}
                </h3>
                <Button variant="ghost" onClick={() => setCurrentQuestion(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Question Text"
                  className="w-full p-2 border rounded"
                  value={currentQuestion.text}
                  onChange={e => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                />
                
                {currentQuestion.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 p-2 border rounded"
                          value={option}
                          onChange={e => updateOption(index, e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          onClick={() => removeOption(index)}
                          disabled={currentQuestion.options?.length <= 2}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button onClick={addOption}>
                      <Plus className="w-4 h-4 mr-1" /> Add Option
                    </Button>
                  </div>
                )}

                {currentQuestion.type === 'true-false' && (
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="correct-answer"
                        value="true"
                        checked={currentQuestion.correctAnswer === 'true'}
                        onChange={e => setCurrentQuestion({
                          ...currentQuestion,
                          correctAnswer: e.target.value
                        })}
                      />
                      <span className="ml-2">True</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="correct-answer"
                        value="false"
                        checked={currentQuestion.correctAnswer === 'false'}
                        onChange={e => setCurrentQuestion({
                          ...currentQuestion,
                          correctAnswer: e.target.value
                        })}
                      />
                      <span className="ml-2">False</span>
                    </label>
                  </div>
                )}

                {currentQuestion.type === 'multiple-choice' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Correct Answer</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={currentQuestion.correctAnswer as string}
                      onChange={e => setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswer: e.target.value
                      })}
                    >
                      <option value="">Select correct answer</option>
                      {currentQuestion.options?.map((option, index) => (
                        <option key={index} value={option}>
                          {option || `Option ${index + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {currentQuestion.type === 'short-answer' && (
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    className="w-full p-2 border rounded"
                    value={currentQuestion.correctAnswer as string}
                    onChange={e => setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: e.target.value
                    })}
                  />
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Points</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={currentQuestion.points}
                    onChange={e => setCurrentQuestion({
                      ...currentQuestion,
                      points: parseInt(e.target.value) || 0
                    })}
                  />
                </div>

                <Button onClick={saveQuestion}>
                  <Save className="w-4 h-4 mr-1" /> Save Question
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="p-4 border rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <p>{question.text}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => editQuestion(question)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => deleteQuestion(question.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          disabled={!quiz.title || quiz.questions.length === 0}
          onClick={() => console.log('Save quiz:', quiz)}
        >
          <Save className="w-4 h-4 mr-1" /> Save Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizCreator;
