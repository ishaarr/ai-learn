import { eq } from "drizzle-orm";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";

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
        const result= await step.run('Check User and Create New If Not In DB', async()=>{
            //Check is user already exist
            const result= await db.select().from(USER_TABLE)
            .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
           
            if (result?.length==0) {
            //if not, then add to database
            const userResp= await db.insert(USER_TABLE).values({
                name:user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress
                }).returning({id:USER_TABLE.id})
                return userResp;
               
            }
            return result;
        })
        return 'Success';

        // Step is to send "Welcome" email notification


        //Step to send email notification after 3 days once user join 
    }
)