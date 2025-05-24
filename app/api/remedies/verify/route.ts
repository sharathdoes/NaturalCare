import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body=req.json();
  const {id}= await body;
  
  await db.update(remedies).set({ isVerified: true }).where(eq(remedies.id, id));
  return NextResponse.json({ success: true });
}
