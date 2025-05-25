import { db } from "@/drizzle/index";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const {email, username, bio,educationalBackground, isDoctor } = await req.json();
  await db.update(users).set({ username, bio,educationalBackground, isDoctor }).where(eq(users.email, email));

  return NextResponse.json({ success: true });
}
