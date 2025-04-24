import { Progress } from "@/components/ui/progress"
import React from 'react'

function CourseIntroCard({course}) {
  return (
    <div className='flex gap-5 items-center p-8 border shadow-md rounded-lg'>
      <img src={'/knowledge.png'} alt='other' width={70} height={90}/>
      <div>
        <h2 className='font-bold text-2xl '>{course?.courseLayout.topic}</h2>
        <Progress className = "mt-3"/>
        <p>{course?.courseLayout?.summary}</p>
        

        <h2 className='mt-3 text-lg text-blue-500'>Total Chapter:{course?.courseLayout?.chapters?.length}</h2>
      </div>
    </div>
  )
}

export default CourseIntroCard

