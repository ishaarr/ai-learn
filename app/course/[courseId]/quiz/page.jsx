"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft, ChevronRight, Trophy, BookOpen } from 'lucide-react';

export default function QuizPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/courses?courseId=${courseId}`);
        const data = await res.json();
        
        // Get MCQ questions only
        const quizData = data?.result?.courseLayout?.quizzes || [];
        const allQuestions = quizData.flatMap(quiz => 
          quiz.questions.filter(q => q.type === 'MCQ')
        ) || [];
        
        setQuestions(allQuestions);
        setAnswers(new Array(allQuestions.length).fill(null));
      } catch (err) {
        setError(err.message || "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, [courseId]);

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1));
    setShowResult(false);
  };

  const handlePrev = () => {
    setCurrentQuestion(prev => Math.max(prev - 1, 0));
    setShowResult(false);
  };

  const calculateScore = () => {
    const correct = questions.reduce((acc, question, index) => {
      return acc + (answers[index] === question.answer ? 1 : 0);
    }, 0);
    setScore(Math.round((correct / questions.length) * 100));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="mb-4">No quiz questions available for this course</p>
        <Button onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
      </div>
    );
  }

  if (score !== null) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
          <div className="flex justify-center mb-6">
            <div className={`h-24 w-24 rounded-full flex items-center justify-center ${
              score >= 70 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
            }`}>
              <span className="text-3xl font-bold">{score}%</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">
            {score >= 70 ? 'Congratulations!' : 'Keep Practicing!'}
          </h1>
          <p className="text-gray-600 mb-6">
            {score >= 70 
              ? 'You passed the quiz with flying colors!'
              : 'Review the course materials and try again.'}
          </p>
          
          <div className="flex justify-center gap-4">
            <Button onClick={() => {
              setScore(null);
              setCurrentQuestion(0);
              setShowResult(false);
            }}>
              <Trophy className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => router.push(`/course/${courseId}`)}>
              <BookOpen className="mr-2 h-4 w-4" />
              Review Course
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Quiz</h1>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <h2 className="text-xl font-semibold mt-1">{currentQ.question}</h2>
          </div>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              let optionClasses = 'p-4 border rounded-lg mb-3 cursor-pointer transition-colors ';
              
              if (showResult) {
                if (index === currentQ.answer) {
                  optionClasses += 'bg-green-50 border-green-400 ';
                } else if (index === answers[currentQuestion] && index !== currentQ.answer) {
                  optionClasses += 'bg-red-50 border-red-400 ';
                }
              } else {
                optionClasses += 'hover:bg-gray-50 ';
                if (index === answers[currentQuestion]) {
                  optionClasses += 'bg-blue-50 border-blue-400 ';
                }
              }
              
              return (
                <div
                  key={index}
                  className={optionClasses}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                >
                  <div className="flex items-start">
                    <div className={`flex items-center justify-center h-6 w-6 rounded-full mr-3 mt-0.5 flex-shrink-0 ${
                      showResult
                        ? index === currentQ.answer
                          ? 'bg-green-100 text-green-600'
                          : index === answers[currentQuestion]
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100'
                        : answers[currentQuestion] === index
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div>{option}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {showResult && currentQ.explanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-medium text-blue-800">
                {answers[currentQuestion] === currentQ.answer ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="mt-1 text-blue-700">{currentQ.explanation}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {currentQuestion === questions.length - 1 ? (
          <Button onClick={calculateScore} disabled={!showResult}>
            Submit Quiz
            <Trophy className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!showResult}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}