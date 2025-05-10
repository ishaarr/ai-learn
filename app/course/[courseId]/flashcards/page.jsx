import React from 'react'
import Flashcard from '@/components/Flashcard'

export default function FlashcardsPage() {
  // In a real app, you would fetch flashcards for this course
  const flashcards = [
    { id: 1, front: 'What is React?', back: 'A JavaScript library for building user interfaces' },
    { id: 2, front: 'What is JSX?', back: 'JavaScript XML - syntax extension for JavaScript' },
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Flashcards</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map(card => (
          <Flashcard key={card.id} front={card.front} back={card.back} />
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Premium Flashcards</h2>
        <p className="mb-4">Unlock 100+ additional flashcards with premium</p>
        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Upgrade to Premium
        </button>
      </div>
    </div>
  )
}