import generateStudyMaterial, { determineCourseType } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      courseId,
      topic,
      difficultyLevel = "hard",
      createdBy,
    } = await req.json();
    const courseType = await determineCourseType(topic);
    const aiResp = await generateStudyMaterial({
      topic,
      courseType,
      difficultyLevel,
    });
    const aiResult = aiResp;
    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId: courseId,
        courseType: courseType || "other",
        createdBy: createdBy,
        topic: topic,
        courseLayout: aiResult,
      })
      .returning({ resp: STUDY_MATERIAL_TABLE });
    
    //Trigger the Inngest function to generate chapter notes
    const result = await inngest.send({
      name:'notes.generate',
      data:{
        course:dbResult[0].resp
      }
    });
    console.log(result);

    return NextResponse.json({ success:true,message:"successfully generated"});
  } catch (error) {
    console.log(error, "err");
    return NextResponse.json({ error: error.message });
  }
}
