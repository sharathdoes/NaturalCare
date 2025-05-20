import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
 
    const body = await req.json();
    const { user, title, description, tags } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db
      .insert(remedies)
      .values({
        title,
        description,
        tags,
        likes: 0,
        dislikes: 0,
        bydoc: user.isDoctor,
        comments: [],
        isVerified: false,
        userId: user.id,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating remedy:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
