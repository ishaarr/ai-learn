"use client";
import React, { useState } from 'react';

export default function QuizQuestion({ 
  question, 
  questionNumber, 
  totalQuestions,
  selectedOption,
  onAnswerSelected 
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const getOptionClasses = (index) => {
    let classes = 'p-4 border rounded-lg mb-3 cursor-pointer transition-colors ';
    
    if (isSubmitted) {
      if (index === question.answer) {
        classes += 'bg-green-50 border-green-400 ';
      } else if (index === selectedOption && index !== question.answer) {
        classes += 'bg-red-50 border-red-400 ';
      }
    } else {
      classes += 'hover:bg-gray-50 ';
      if (index === selectedOption) {
        classes += 'bg-blue-50 border-blue-400 ';
      }
    }
    
    return classes;
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <h2 className="text-xl font-semibold mt-1">{question.question}</h2>
      </div>
      
      <div className="space-y-3">
        {question.options && question.options.map((option, index) => (
          <div
            key={index}
            className={getOptionClasses(index)}
            onClick={() => !isSubmitted && onAnswerSelected(index)}
          >
            <div className="flex items-start">
              <div className={`flex items-center justify-center h-6 w-6 rounded-full mr-3 mt-0.5 flex-shrink-0 ${
                isSubmitted
                  ? index === question.answer
                    ? 'bg-green-100 text-green-600'
                    : index === selectedOption
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100'
                  : selectedOption === index
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <div>{option}</div>
            </div>
          </div>
        ))}
      </div>

      {isSubmitted && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="font-medium text-blue-800">Explanation:</p>
          <p className="mt-1 text-blue-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}