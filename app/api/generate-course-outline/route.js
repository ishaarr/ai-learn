import { courseOutline } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server"

export async function POST(req) {


    const {courseID, topic, courseType, difficultyLevel, createdBy}=await req.json();
    console.log(req.json(),"res v")
    const PROMPT='Generate a study material for '+topic+' for '+courseType+' and level of difficuilty will be '+difficultyLevel+' with summary for each chapter, Topic list in each chapter in JSON format'
    //generate Course Layout using AI
    const aiResp=await courseOutline.sendMessage(PROMPT);
   console.log(aiResp,"aiResp")
    const aiResult=JSON.parse(aiResp.response);
    //Save the result along with user input
    const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseID,
        courseType:courseType,
        createdBy:createdBy,
        topic:topic,
        courseLayout:aiResult,
    }).returning({resp:STUDY_MATERIAL_TABLE})


    return NextResponse.json({result:dbResult[0]})
}