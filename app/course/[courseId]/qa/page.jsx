"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, Sparkles, Bookmark, Check, X } from "lucide-react";

export default function QAPage() {
  const { courseId } = useParams();
  const [qaPairs, setQaPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchQAPairs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/courses?courseId=${courseId}`);
        const data = await res.json();
        setQaPairs(data?.result?.courseLayout?.qa_pairs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQAPairs();
  }, [courseId]);

  const toggleQA = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleBookmark = (id) => {
    setBookmarked(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const filteredQAPairs = qaPairs.filter(pair => {
    const matchesFilter = filter === "all" || 
                         (filter === "bookmarked" && bookmarked.includes(pair.question)) ||
                         pair.related_chapter?.includes(filter);
    
    const matchesSearch = pair.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pair.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const chapters = [...new Set(qaPairs.map(pair => pair.related_chapter).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent inline-flex items-center"
        >
          <Sparkles className="mr-3" /> Q&A Knowledge Base
        </motion.h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Master key concepts through curated questions and detailed answers
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Questions</option>
              <option value="bookmarked">Bookmarked</option>
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-100">
          <h3 className="text-sm font-medium text-purple-800 mb-1">Total Questions</h3>
          <p className="text-3xl font-bold text-purple-600">{qaPairs.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-5 border border-green-100">
          <h3 className="text-sm font-medium text-green-800 mb-1">Bookmarked</h3>
          <p className="text-3xl font-bold text-green-600">{bookmarked.length}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
          <h3 className="text-sm font-medium text-amber-800 mb-1">Chapters</h3>
          <p className="text-3xl font-bold text-amber-600">{chapters.length}</p>
        </div>
      </div>

      {/* Q&A List */}
      <div className="space-y-4">
        {filteredQAPairs.length > 0 ? (
          filteredQAPairs.map((pair, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div 
                className={`p-5 cursor-pointer transition-colors ${activeIndex === index ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleQA(index)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {pair.related_chapter && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full">
                          {pair.related_chapter}
                        </span>
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(pair.question);
                        }}
                        className={`p-1 rounded-full ${bookmarked.includes(pair.question) ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'}`}
                      >
                        <Bookmark 
                          size={18} 
                          fill={bookmarked.includes(pair.question) ? "currentColor" : "none"} 
                        />
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{pair.question}</h3>
                  </div>
                  <div className="ml-4 text-gray-400">
                    {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                      <div className="prose max-w-none text-gray-700">
                        {pair.answer.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-3">{paragraph}</p>
                        ))}
                      </div>
                      
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              {searchTerm ? "No matching questions found" : "No questions available"}
            </h3>
            <p className="text-gray-500 mt-1">
              {searchTerm ? "Try a different search term" : "Check back later or add new questions"}
            </p>
          </div>
        )}
      </div>

   
    </div>
  );
}