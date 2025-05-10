"use client"
import React, { useState } from 'react'

const Flashcard= ({ front, back, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={`relative h-64 w-full cursor-pointer transition-transform duration-500 ${className}`}
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`absolute inset-0 flex items-center justify-center p-6 rounded-lg shadow-md transition-all duration-500 backface-visibility-hidden ${
          isFlipped ? 'bg-blue-50 rotate-y-180' : 'bg-white'
        }`}
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          backfaceVisibility: 'hidden',
        }}
      >
        <p className="text-lg font-medium text-center">{front}</p>
      </div>
      
      <div 
        className={`absolute inset-0 flex items-center justify-center p-6 rounded-lg shadow-md transition-all duration-500 backface-visibility-hidden ${
          isFlipped ? 'bg-white' : 'bg-blue-50 rotate-y-180'
        }`}
        style={{
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
        }}
      >
        <p className="text-lg text-center">{back}</p>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-gray-500">
        {isFlipped ? 'Click to see question' : 'Click to see answer'}
      </div>
    </div>
  )
}

export default Flashcard