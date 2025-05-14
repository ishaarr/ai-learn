"use client";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    user && CheckIsNewUser();
  }, [user]);

  const CheckIsNewUser = async () => {
    // try {
    //   //Check is user already exist
    //   const result = await db
    //     .select()
    //     .from(USER_TABLE)
    //     .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
    //   if (result?.length == 0) {
    //     //if not, then add to database
    //     const userResp = await db
    //       .insert(USER_TABLE)
    //       .values({
    //         name: user?.fullName,
    //         email: user?.primaryEmailAddress?.emailAddress,
    //       })
    //       .returning({ id: USER_TABLE.id });
    //   }
      
    // } catch (error) {
      const resp = await axios.post('/api/create-user',{user:user}); 
  };

  return <div>{children}</div>;
}

export default Provider;
