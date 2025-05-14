// app/api/create-user/route.js
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';

export async function POST(req) {
  try {
    const { user } = await req.json();

    if (!user || !user.primaryEmailAddress) {
      return NextResponse.json({ error: 'Missing user info' }, { status: 400 });
    }

    const result = await db
      .select()
      .from(USER_TABLE)
      .where(USER_TABLE.email === user.primaryEmailAddress.emailAddress);

    if (result.length === 0) {
      const inserted = await db
        .insert(USER_TABLE)
        .values({
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
        })
        .returning();

      return NextResponse.json({ status: 'created', user: inserted[0] });
    } else {
      return NextResponse.json({ status: 'exists', user: result[0] });
    }
  } catch (error) {
    console.error('[CREATE_USER_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}