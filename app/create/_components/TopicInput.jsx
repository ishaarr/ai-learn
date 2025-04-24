import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

function TopicInput({setTopic,setDefficultyLevel}) {
  return (
    <div className='mt-10 w-full flex-col'>
        <h2>Enter the Topic or Paste the content for which you want to generate study material</h2>
        <Textarea placeholder='Start Writing here' 
        className="mt-2 w-full" onChange={(event)=>setTopic(event.target.value)} />


        <h2 className='mt-5 mb-3'>Select the difficulty Level</h2>
        <Select onValueChange={(value)=>setDefficultyLevel(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Difficulty Level" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
</Select>

    </div>
  )
}

export default TopicInput
