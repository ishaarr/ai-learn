import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award, BarChart2, Star } from 'lucide-react'
import React from 'react'

function CourseIntroCard({ course }) {
  // Calculate course progress (example - you would get this from your backend)
  const progress = Math.floor(Math.random() * 100)
  // Calculate average rating (example)
  const rating = (Math.random() * 2 + 3).toFixed(1)
  
  return (
    <div className="relative">
      {/* Premium Ribbon */}
      {course?.isPremium && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 flex items-center">
          <Star className="h-3 w-3 mr-1" fill="white" />
          PREMIUM
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white">
        {/* Course Image */}
        <div className="relative flex-shrink-0">
          <img 
            src={course?.imageUrl || '/knowledge.png'} 
            alt={course?.courseLayout?.topic}
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border border-gray-200"
          />
          <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow border border-gray-100">
            <div className="bg-primary-500 p-2 rounded-full text-white">
              {course?.category === 'coding' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              ) : (
                <BookOpen className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
        
        {/* Course Info */}
        <div className="flex-1">
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{course?.courseLayout?.topic}</h2>
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-sm">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" fill="#fbbf24" />
                  <span className="font-medium">{rating}</span>
                </div>
              </div>
              
              <p className="mt-2 text-gray-600 line-clamp-2">
                {course?.courseLayout?.chapters[0]?.summary || 'Comprehensive course covering all fundamental concepts'}
              </p>
              
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="h-4 w-4 mr-1 text-primary-500" />
                  {course?.courseLayout?.chapters?.length || 0} Chapters
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1 text-primary-500" />
                  {Math.floor(course?.duration || 8)} Hours
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Award className="h-4 w-4 mr-1 text-primary-500" />
                  {course?.difficulty || 'Intermediate'}
                </div>
              </div>
            </div>
            
            {/* Progress bar and CTA */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-primary-700">Progress</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              
              <div className="mt-4 flex space-x-3">
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors flex-1">
                  {progress > 0 ? 'Continue' : 'Start Learning'}
                </button>
                <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseIntroCard