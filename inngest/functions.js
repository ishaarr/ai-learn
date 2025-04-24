import { eq } from "drizzle-orm";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
import { generateNotesAiModel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser=inngest.createFunction(
    {id:'create-user'},
    {event:'user.create'},
    async({ event, step })=>{
        const {user}=event.data;
        //Get Event Data
        const result = await step.run('Check User and Create New If Not in DB', async()=>{
            //Check is user already exist
            const result= await db.select().from(USER_TABLE)
            .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
            console.log(result);
            if (result?.length==0) {
            //if not, then add to database
            const userResp= await db.insert(USER_TABLE).values({
                name:user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress
                }).returning({id:USER_TABLE.id})
                return userResp;
              console.log(userResp);
            }
            return result;
        })
        return 'Success';

        // Step is to send "Welcome" email notification


        //Step to send email notification after 3 days once user join 
    }
)

export const GenerateNotes=inngest.createFunction(
  {id:'generate-course'},
  {event:'notes.generate'},
  async({event,step})=>{
     const {course}=event.data;//all record info

     // Generate Notes for Each chapters with AI
     const notesResult=await step.run('Generate Chapter Notes', async () => {
      const Chapters=course?.courseLayout?.chapters;
      let index=0;
      Chapters.forEach(async (chapter) => {
        const PROMPT='Generate exam material detail content for each chapter, Make sure to include all topics point in the content, make sure to give content in html format (DO NOT ADD HTML, HEAD, BODY, TITLE, TAG), the chapters:'
        +JSON.stringify(chapter);

        const result=await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp=result.response.text();
        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId:index,
          courseId:course?.courseId,
          notes:aiResp
        })
        index=index+1;
      })
      return 'Completed'
     })

     //Update the Status to 'Ready'
     const updateCourseStatusResult=await step.run('Update Course status to Ready', async()=>{
      const result=await db.update(STUDY_MATERIAL_TABLE).set({
        status:'Ready'
      }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
      return 'Success';
     });
  } 
)
