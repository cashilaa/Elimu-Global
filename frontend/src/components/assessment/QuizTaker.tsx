import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Timer, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Quiz, Question } from '../../types';

interface QuizTakerProps {
  quiz: Quiz;
  onSubmit: (answers: Record<number, string | boolean | number>) => void;
}

export const QuizTaker: React.FC<QuizTakerProps> = ({ quiz, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | boolean | number>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : 0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswer = (answer: string | boolean | number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onSubmit(answers);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{quiz.title}</CardTitle>
            {quiz.timeLimit && (
              <div className="flex items-center gap-2 text-orange-600">
                <Timer className="w-5 h-5" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-medium">
                {currentQuestionData.text}
              </p>

              <div className="mt-4 space-y-2">
                {currentQuestionData.type === 'multiple-choice' && currentQuestionData.options ? (
                  currentQuestionData.options.map((option, index) => (
                    <label
                      key={index}
                      className={`
                        flex items-center p-3 rounded-lg border cursor-pointer
                        ${answers[currentQuestion] === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}
                      `}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        checked={answers[currentQuestion] === option}
                        onChange={() => handleAnswer(option)}
                        className="hidden"
                      />
                      <span>{option}</span>
                    </label>
                  ))
                ) : currentQuestionData.type === 'true-false' ? (
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        checked={answers[currentQuestion] === 'true'}
                        onChange={() => handleAnswer('true')}
                      />
                      True
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        checked={answers[currentQuestion] === 'false'}
                        onChange={() => handleAnswer('false')}
                      />
                      False
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={answers[currentQuestion] as string || ''}
                    onChange={e => handleAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(prev => prev - 1)}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>

              {currentQuestion === quiz.questions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={isSubmitted}>
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  disabled={!answers[currentQuestion]}
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizTaker;
