"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, Lock } from "lucide-react";

function ChapterList({ chapters }) {
  const [chapterData, setChapterData] = useState();
  const [expandedChapter, setExpandedChapter] = useState(null);

  useEffect(() => {
    setChapterData(chapters || []);
  }, [chapters]);

  const toggleChapter = (id) => {
    setExpandedChapter(expandedChapter === id ? null : id);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course Chapters</h2>
        <span className="text-sm text-gray-500">
          {chapterData?.length}{" "}
          {chapterData?.length === 1 ? "Chapter" : "Chapters"}
        </span>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {chapterData && chapterData.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`border rounded-xl overflow-hidden ${
                expandedChapter === chapter.id
                  ? "border-primary-500 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`p-5 cursor-pointer transition-colors ${
                  expandedChapter === chapter.id
                    ? "bg-primary-50"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => toggleChapter(chapter.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-full ${
                        expandedChapter === chapter.id
                          ? "bg-primary-100 text-primary-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800">
                          {chapter.title}
                        </h3>
                        {chapter.isPremium && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            <Lock size={12} className="mr-1" /> Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {chapter.summary}
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        {chapter.duration && (
                          <span className="text-xs text-gray-400 flex items-center">
                            ⏱️ {chapter.duration}
                          </span>
                        )}
                        {chapter.progress !== undefined && (
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-primary-500 h-1.5 rounded-full"
                              style={{ width: `${chapter.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    {expandedChapter === chapter.id ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedChapter === chapter.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-gray-100 bg-white">
                      {chapter.isPremium ? (
                        <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100 flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-amber-800">
                              Premium Content
                            </h4>
                            <p className="text-sm text-amber-600 mt-1">
                              Upgrade to access this chapter and all premium
                              materials.
                            </p>
                          </div>
                          <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                            Unlock Chapter
                          </button>
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none text-gray-600">
                          <p>
                            This is where your detailed chapter content would
                            appear. It could include:
                          </p>
                          <ul>
                            <li>Learning objectives</li>
                            <li>Detailed explanations</li>
                            <li>Code examples (for technical courses)</li>
                            <li>Embedded videos or interactive elements</li>
                          </ul>
                          <div className="mt-4 flex space-x-3">
                            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                              Start Learning
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                              Save for Later
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ChapterList;
