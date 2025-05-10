"use client";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function ViewNotes() {
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses?courseId=${courseId}`);
        // const result=await axios.get('/api/courses?courseId='+courseId);
        const data = await res.json();
        console.log(data,"data")
        setChapters(data?.result?.courseLayout?.chapters || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const navigateChapter = (direction) => {
    setCurrentChapter(prev => {
      if (direction === "prev" && prev > 0) return prev - 1;
      if (direction === "next" && prev < chapters.length - 1) return prev + 1;
      return prev;
    });
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

  if (chapters.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="mb-4">No chapters available for this course</p>
        <Button onClick={() => router.back()}>Back to Course</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4">
      {/* Chapter Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => navigateChapter("prev")}
          disabled={currentChapter === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {chapters.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentChapter(idx)}
              className={`h-2 w-8 rounded-full cursor-pointer transition-colors ${
                idx <= currentChapter ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          onClick={() => navigateChapter("next")}
          disabled={currentChapter === chapters.length - 1}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Chapter Content */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4">
          Chapter {currentChapter + 1}: {chapters[currentChapter]?.title}
        </h1>
        
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {chapters[currentChapter]?.notes}
          </ReactMarkdown>
        </div>

        {/* Key Points */}
        {chapters[currentChapter]?.key_points?.length && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Key Points</h2>
            <ul className="space-y-2 list-disc pl-5">
              {chapters[currentChapter]?.key_points?.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Chapter Completion */}
      {currentChapter === chapters.length - 1 && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-medium mb-4">Course Complete!</h2>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setCurrentChapter(0)}>
              Review Again
            </Button>
            <Button onClick={() => router.push(`/course/${courseId}/quiz`)}>
              Take Final Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}