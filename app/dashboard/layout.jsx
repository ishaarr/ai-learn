import DashboardHeader from './_componments/DashboardHeader'

import React from 'react'
import SideBar from './_componments/SideBar'

function DashboardLayout({children}) {
  return (
    <div>
        <div className='md:w-64 hidden md:block fixed'>
            <SideBar/>
        </div>
        <div className='md:ml-64'>
            <DashboardHeader/>
            <div className='p-10'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout
