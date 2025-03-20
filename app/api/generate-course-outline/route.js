import generateStudyMaterial, { courseOutline } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server"

export async function POST(req) {
    try{
        const {courseId, topic, studyType, difficultyLevel, createdBy}=await req.json();
        const aiResp = await generateStudyMaterial(topic,studyType,difficultyLevel)
        const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
            courseId:courseId,
            courseType:studyType,
            createdBy:createdBy,
            topic:topic,
            courseLayout:aiResp,
            difficultyLevel
        }).returning({resp:STUDY_MATERIAL_TABLE})
    
    
        return NextResponse.json({result:dbResult[0]})
    }catch(error){
        console.log(error,"err")
        return NextResponse.json({error:error.message})
    }
   
}