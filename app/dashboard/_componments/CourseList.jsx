"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { index } from 'drizzle-orm/gel-core';
import React, { useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';

function CourseList() {

    const {user}=useUser();
    const [CourseList,setCourseList]=useState([]);
    useEffect(()=>{
        user&&GetCourseList();
    },[user])

    const GetCourseList=async()=>{
        try{
            const result=await axios.post('/api/courses',
                {createdBy:user?.primaryEmailAddress?.emailAddress})
        
                if(result && result.data){
                    setCourseList(result.data.result);
                }
        }catch(error){
            console.log(error);
        }
     

    }

  return (
    <div className='mt-10'>
        <h2 className='flex-bold text-2xl'>Your Study Material</h2>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
            {CourseList && CourseList?.map((course,index)=>(
                <CourseCardItem course={course} key={index}/>
            ))}
        </div>
      
    </div>
  )
}

export default CourseList
