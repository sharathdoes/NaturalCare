import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
try{
 const {likes, dislikes, id}= await req.json();
  
  await db.update(remedies).set({ likes,dislikes }).where(eq(remedies.id, id));
  return NextResponse.json({ success: true });
}
catch(err){
    console.error("Error updating likes/dislikes:", err);
    return NextResponse.json({ success: false, error: "Failed to update likes/dislikes." });
}
 
}
