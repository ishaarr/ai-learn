"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, BookOpen, Clock, Layers, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function CourseList() {
  const { user } = useUser();
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      if (result?.data?.result) {
        setCourseData(result.data.result);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Study Materials
        </h2>
        <Button
          variant="outline"
          onClick={GetCourseList}
          className="gap-2"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : courseData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.map((course, index) => (
            <CourseCardItem key={index} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No study materials yet
          </h3>
          <p className="text-gray-500 mb-6">
            Generate your first study material to get started
          </p>
        </div>
      )}
    </div>
  );
}

function CourseCardItem({ course }) {
  const courseData = course?.courseLayout;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="outline" className="text-xs">
              {formatDate(course.createdAt || new Date().getDate().toLocaleString())}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mt-3 line-clamp-2">
            {courseData?.topic}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {courseData?.courseType}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {courseData?.difficultyLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {courseData?.chapters?.[0]?.summary || "No description available"}
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>0%</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </CardContent>
        <CardFooter>
          {course?.status === "Generating" ? (
            <Button variant="outline" className="w-full" disabled>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </Button>
          ) : (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full group"
            >
              View Details
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {courseData?.topic}
            </DialogTitle>
            <div className="flex gap-2 pt-2">
              <Badge variant="outline">
                <Layers className="h-3 w-3 mr-1" />
                {courseData?.courseType}
              </Badge>
              <Badge variant="outline">
                <Award className="h-3 w-3 mr-1" />
                {courseData?.difficultyLevel}
              </Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Course Content
              </h3>
              <div className="space-y-4">
                {courseData?.chapters?.map((chapter, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium text-md flex items-center">
                      <span className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2">
                        {index + 1}
                      </span>
                      {chapter.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2 pl-8">
                      {chapter.summary}
                    </p>
                    {chapter.topics?.length > 0 && (
                      <div className="mt-3 pl-8">
                        <h5 className="text-sm font-medium mb-1">Topics:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {chapter.topics.map((topic, i) => (
                            <li key={i} className="flex items-start">
                              <span className="h-1 w-1 rounded-full bg-gray-400 mt-2 mr-2"></span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {chapter.exam_questions?.length > 0 && (
                      <div className="mt-4 pl-8">
                        <h5 className="text-sm font-medium mb-2">
                          Practice Questions:
                        </h5>
                        <div className="space-y-3">
                          {chapter.exam_questions.map((question, qIndex) => (
                            <div
                              key={qIndex}
                              className="bg-gray-50 dark:bg-gray-800 rounded p-3"
                            >
                              <p className="text-sm font-medium">
                                {question.type}: {question.question}
                              </p>
                              {question.options && (
                                <ul className="mt-2 space-y-1">
                                  {question.options.map((option, oIndex) => (
                                    <li
                                      key={oIndex}
                                      className="text-sm text-gray-600 flex items-start"
                                    >
                                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-1.5 mr-2"></span>
                                      {option}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              <div className="mt-2 text-xs text-primary font-medium">
                                Answer: {question.answer}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {courseData?.revision_sheet?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Quick Revision
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {courseData.revision_sheet.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h4 className="font-medium text-sm">{item.concept}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CourseList;