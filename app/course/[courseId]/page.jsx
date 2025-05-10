"use client"
import DashboardHeader from '@/app/dashboard/_componments/DashboardHeader';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntroCard from './_components/CourseIntroCard';
import axios from 'axios';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';

function Course() {
    const {courseId}=useParams();
    const [course,setCourse]=useState();
    useEffect(()=>{
      GetCourse();
  },[])
  const GetCourse=async() =>{
    try {
      const result=await axios.get('/api/courses?courseId='+courseId);
      setCourse(result.data.result);
      console.log(result.data.result,"result");
    } catch (error) {
      console.log(error,"err")
    }
      

  }


  return (
    <div className='w-full mt-10'>
      
      <div className=''>
        {/* Course Intro */}
        <CourseIntroCard course ={course} />
        {/* Study Materials Options */}
        <StudyMaterialSection courseId={courseId}/>
        {/* Chapter List */}
        <ChapterList chapters={course?.courseLayout?.chapters}/>
      </div>
    </div>
  )
}

export default Course
