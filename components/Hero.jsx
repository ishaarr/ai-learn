// components/Hero.tsx
'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
        AI-Powered <span className="text-blue-600">Exam Prep</span><br />Material Generator
      </h1>
      <p className="text-gray-600 mb-6 text-lg max-w-xl">
        Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
      </p>

      {/* Show these buttons when NOT signed in */}
      <SignedOut>
        <div className="space-x-4">
          <Link href="/sign-up">
            <button className="bg-black text-white px-6 py-3 rounded-md">Sign up</button>
          </Link>
          <Link href="/sign-in">
            <button className="bg-black text-white px-6 py-3 rounded-md">Log in</button>
          </Link>
        </div>
      </SignedOut>

      {/* Show this button when signed in */}
      <SignedIn>
        <Link href="/dashboard">
          <button className="bg-black text-white px-6 py-3 rounded-md">Go to Dashboard</button>
        </Link>
      </SignedIn>
    </section>
  );
}
