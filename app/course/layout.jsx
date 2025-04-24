import React from 'react'
import DashboardHeader from '@/app/dashboard/_componments/DashboardHeader';

function CourseViewLayout({children}) {
  return (
    <div>
        <DashboardHeader/>
        <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
            {children}
        </div>
    </div>
  )
}

export default CourseViewLayout
