import React from 'react'

export default function QAPage() {
  const [activeTab, setActiveTab] = React.useState('common')
  
  const commonQuestions = [
    { id: 1, question: 'How do I use React hooks?', answer: 'Hooks are functions that let you use state...' },
    { id: 2, question: 'What is the difference between props and state?', answer: 'Props are passed to a component...' }
  ]

  const premiumQuestions = [
    { id: 101, question: 'Advanced performance optimization techniques', answer: '' },
    { id: 102, question: 'Server-side rendering best practices', answer: '' }
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Questions & Answers</h1>
      
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab('common')}
          className={`px-4 py-2 ${activeTab === 'common' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Common Questions
        </button>
        <button
          onClick={() => setActiveTab('premium')}
          className={`px-4 py-2 ${activeTab === 'premium' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Premium Questions
        </button>
      </div>

      {activeTab === 'common' ? (
        <div className="space-y-4">
          {commonQuestions.map(q => (
            <div key={q.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{q.question}</h3>
              <p className="mt-2 text-gray-700">{q.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {premiumQuestions.map(q => (
            <div key={q.id} className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold">{q.question}</h3>
              <div className="mt-4 bg-yellow-50 p-3 rounded">
                <p className="mb-2">This answer is part of our premium content</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded">
                  Upgrade to View Answer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}