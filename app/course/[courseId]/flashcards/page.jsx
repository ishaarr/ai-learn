"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Clock, BarChart2, Layers } from "lucide-react";

const Flashcard = ({ front, back, difficulty }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Difficulty color mapping
  const difficultyColors = {
    Easy: "bg-green-100 border-green-400 text-green-800",
    Medium: "bg-amber-100 border-amber-400 text-amber-800",
    Hard: "bg-red-100 border-red-400 text-red-800",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsFlipped(!isFlipped)}
      className={`cursor-pointer rounded-xl border-2 p-6 shadow-sm transition-all ${
        difficultyColors[difficulty] || "bg-gray-100 border-gray-300"
      }`}
    >
      {!isFlipped ? (
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              difficultyColors[difficulty] || "bg-gray-200 text-gray-800"
            }`}>
              {difficulty}
            </span>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold flex-grow flex items-center justify-center text-center">
            {front}
          </h3>
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-end">
            Click to reveal
            <Zap className="h-4 w-4 ml-1" />
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              difficultyColors[difficulty] || "bg-gray-200 text-gray-800"
            }`}>
              {difficulty}
            </span>
            <BarChart2 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-grow flex items-center justify-center">
            <code className="bg-black/10 px-3 py-2 rounded-lg font-mono text-lg">
              {back}
            </code>
          </div>
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-end">
            Click to return
            <Layers className="h-4 w-4 ml-1" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function FlashcardsPage() {
  const [flashCards, setFlashCards] = useState([]);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/courses?courseId=${courseId}`);
        const data = await res.json();
        
        // Transform your data structure to include difficulty
        const cards = data?.result?.courseLayout?.flashcards?.map(card => ({
          ...card,
          difficulty: card.difficulty || "Medium" // Default to Medium if not specified
        })) || [];
        
        setFlashCards(cards);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-purple-200 h-12 w-12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
          <Zap className="text-purple-500 mr-3" />
          Algorithm Flashcards
        </h1>
        <p className="text-gray-600 mt-2">Master time complexities and key concepts</p>
      </div>

      {flashCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashCards.map((card) => (
            <Flashcard 
              key={card.id}
              front={card.front}
              back={card.back}
              difficulty={card.difficulty}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No flashcards available for this course yet.</p>
        </div>
      )}

      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-purple-500" />
          Flashcard Tips
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Click cards to flip between question and answer</li>
          <li>• Colors indicate difficulty level (Green=Easy, Yellow=Medium, Red=Hard)</li>
          <li>• Focus on cards marked as Hard for more challenging concepts</li>
        </ul>
      </div>
    </div>
  );
}