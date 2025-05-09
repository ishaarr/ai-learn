import { eq } from "drizzle-orm";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { generateNotesAiModel, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;

    return await step.run("Check and Insert User", async () => {
      const existing = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      if (existing.length === 0) {
        const inserted = await db
          .insert(USER_TABLE)
          .values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
          })
          .returning({ id: USER_TABLE.id });

        await step.log("User inserted:", inserted);
        return inserted;
      }

      await step.log("User already exists:", existing);
      return existing;
    });
  }
);


export const GenerateNotes=inngest.createFunction(
  {id:'generate-course'},
  {event:'notes.generate'},
  async({event,step})=>{
     const {course}=event.data;//all record info

     // Generate Notes for Each chapters with AI
     const notesResult=await step.run('Generate Chapter Notes', async () => {
      const Chapters=course?.courseLayout?.chapters;
      let index = 0;
      for (const chapter of Chapters) {
        const PROMPT = 'Generate exam material detail content for each chapter, Make sure to include all topics point in the content, make sure to give content in html format (DO NOT ADD HTML, HEAD, BODY, TITLE, TAG), the chapters:' + JSON.stringify(chapter);

        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp = result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResp,
        });

        index += 1;
      }
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

//Used to generate Flashcard, Quiz, Question Answer
export const GenerateStudyTypeContent = inngest.createFunction(
  {id:'Generate Study Type Content'},
  {event:'studyType.content'},

  async({event,step})=>{
    const {studyType,prompt,courseId,recordId}=event.data;

    const FlashcardAiResult = await step.run('Generating Flashcard using AI',async()=>{
      const result = await GenerateStudyTypeContentAiModel.sendMessage(prompt);
      const AIResult = JSON.parse(result.response.text());
      return AIResult;
    })

    // Save the result

    const DbResult = await step.run('Save Result to DB', async()=>{
      const result = await db.update(STUDY_TYPE_CONTENT_TABLE).set({
        content:FlashcardAiResult
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))

      return 'Data Inserted'
    })
  }
)