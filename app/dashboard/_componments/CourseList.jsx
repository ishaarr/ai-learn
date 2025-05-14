"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import {
  RefreshCw,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";



import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseCountContext } from "@/app/_context/CourseCountContext";

function CourseList() {
  const { user } = useUser();
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
    const {totalCourse,setTotalCourse} = useContext(CourseCountContext);
  useEffect(() => {
    user && GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result.data.result);
      if (result?.data?.result) {
        setCourseData(result.data.result);
        setLoading(false);
        setTotalCourse(result.data.result?.length);
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
          {courseData &&
            courseData.map((course, index) => (
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
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
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
              {formatDate(
                course.createdAt || new Date().getDate().toLocaleString()
              )}
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
        </CardContent>
        <Link href={`course/${course?.courseId}`} className="cursor-pointer">
          <CardFooter>
            <Button
              className="w-full group"
            >
              View Details
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Link>
      </Card>
    </>
  );
}

export default CourseList;
