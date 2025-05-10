import React from 'react'
import DashboardHeader from '@/app/dashboard/_componments/DashboardHeader';

function CourseViewLayout({children}) {
  return (
    <div>
        <DashboardHeader/>
        <div className='w-full lg:w-[70%] m-auto'>
            {children}
        </div>
    </div>
  )
}

export default CourseViewLayout
