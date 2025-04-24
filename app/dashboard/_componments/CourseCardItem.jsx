import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

function CourseCardItem({ course }) {
  const courseData = course?.courseLayout;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='border rounded-lg shadow-md p-5'>
      <div>
        <div className='flex justify-between items-center'>
          <img src="/knowledge.png" alt="other" width={50} height={50} />
          <h2 className='text-[10px] p-1 px-2 rounded-full bg-primary text-white'>19 March 2025</h2>
        </div>
        <h2 className='mt-3 font-medium text-lg'>{courseData?.topic}</h2>

        <p className='text=xs line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout?.summary}</p>
 
         <div className='mt-3'>
             <Progress value={0}/>
         </div>

        <div className='mt-3 flex justify-end'>

        
        {course?.status=='Generating'?
             <h2 className='text-sm p-1 px-2 flex gap-2 items-center rounded-full bg-gray-400 text-white'>
                 <RefreshCw className='h-5 w-5'/>
                 Generating....</h2>
             :
             <Link href={'/course/'+course?.courseId}><Button>View</Button></Link>
             }  
        </div>
      </div>
    </div>
  );
}
      {/* Modal for Detailed Content */}

      {/*

        {isModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold'>{courseData?.topic}</h2>
                <button onClick={closeModal} className='text-gray-500 hover:text-gray-700'>
                  &times;
                </button>
              </div>
      */}
      
            {/* Display Chapters */}

      {/*      
            <div className='mt-3'>
              <h3 className='font-medium text-lg'>Chapters:</h3>
              {courseData?.chapters?.map((chapter, index) => (
                <div key={index} className='mt-4'>
                  <h4 className='font-medium text-md'>{chapter.title}</h4>
                  <p className='text-sm text-gray-600 mt-1'>{chapter.summary}</p>
                  <ul className='text-sm text-gray-600 list-disc list-inside mt-2'>
                    {chapter.topics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
      */}

                  {/* Display Exam Questions */}
       {/*
                  <div className='mt-3'>
                    <h5 className='font-medium text-sm'>Exam Questions:</h5>
                    {chapter.exam_questions?.map((question, qIndex) => (
                      <div key={qIndex} className='mt-2'>
                        <p className='text-sm text-gray-600'><strong>{question.type}:</strong> {question.question}</p>
                        {question.options && (
                          <ul className='text-sm text-gray-600 list-disc list-inside ml-4'>
                            {question.options.map((option, oIndex) => (
                              <li key={oIndex}>{option}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Display Revision Sheet */}
    {/*}
            <div className='mt-6'>
              <h3 className='font-medium text-lg'>Revision Sheet:</h3>
              <ul className='text-sm text-gray-600 list-disc list-inside mt-2'>
                {courseData?.revision_sheet?.map((item, index) => (
                  <li key={index}>
                    <strong>{item.concept}:</strong> {item.definition}
                  </li>
                ))}
              </ul>
            </div>

            <div className='mt-6 flex justify-end'>
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  */}

export default CourseCardItem;