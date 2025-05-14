import Dashboard from "@/app/dashboard/layout"
import { Layout } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow">
        
      <div className='flex gap-2'>
            <img src='logo.png' alt='logo' width={60} height={60}/>
            <h2 className='font-bold text-2xl '>EduVerse</h2>
        </div>
    </header>
  );
}

