"use client"
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

function SideBar() {

    const MenuList=[
        {
            name:'Dashboard',
            icon:LayoutDashboard,
            path:'/dashboard'
        },

        {
            name:'Upgrade',
            icon:Shield,
            path:'/dashboard/upgrade'
        },

        {
            name:'Profile',
            icon:UserCircle,
            path:'/dashboard/profile'
        },
    ]

    const {totalCourse,setTotalCourse} = useContext(CourseCountContext);
    const path=usePathname();
  return (
    <div className='h-screen shadow-md p-5'>
        <div className='flex gap-2'>
            <img src='logo.png' alt='logo' width={60} height={60}/>
            <h2 className='font-bold text-2xl '>EduVerse</h2>
        </div>

        <div className='mt-10'>
            <Link href={'/create'} className='w-full'>
                <Button className='w-full'>+ Create New</Button>
            </Link>
             {/* Dynamically render sidebar menu items */}
        <div className="mt-5">
          {MenuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <div
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer mb-2 
                  ${path === menu.path ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
              >
                <menu.icon className="text-xl" />
                <span>{menu.name}</span>
              </div>
            </Link>
          ))}
        </div>
        </div>
        <div className='border p-3  bg-slate-100 rounded-lg absolute bottom-10 w-[85%]'>
            <h2 className='text-lg mb-2'>Availabe Credits : {(5-totalCourse)}</h2>
            <Progress value={(totalCourse/5)*100} />
            <h2 className='text-sm'>{totalCourse} out of 5 Credits Used</h2>
            <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgrade to create more</Link>
        </div>
    </div>
  )
}


export default SideBar
