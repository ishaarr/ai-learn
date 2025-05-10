"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft, ChevronRight, Trophy, BookOpen } from 'lucide-react';
import QuizQuestion from '@/components/QuizQuestion';
export default function QuizPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/courses/${courseId}/quiz`);
        if (!res.ok) throw new Error("Failed to fetch quiz");
        const data = await res.json();
        
        // Flatten all chapter questions into one array
        const allQuestions = data.quizzes?.flatMap((quiz) => quiz.questions) || [];
        setQuestions(allQuestions);
        setAnswers(new Array(allQuestions.length).fill(null));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, [courseId]);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentQuestion(prev => Math.max(prev - 1, 0));
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

  if (questions.length === 0) {
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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Quiz</h1>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <QuizQuestion
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          selectedOption={answers[currentQuestion]}
          onAnswerSelected={(optionIndex) => handleAnswerSelect(currentQuestion, optionIndex)}
        />
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
          <Button onClick={calculateScore}>
            Submit Quiz
            <Trophy className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}