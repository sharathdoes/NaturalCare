import { db } from "@/drizzle/index";
import { remedies, users } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, title, description, tags } = body;

    if (!email || !title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find the user by email
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const user = userResult[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const result = await db
      .insert(remedies)
      .values({
        title,
        description,
        tags,
        likes: 0,
        dislikes: 0,
        bydoc: user.isDoctor,  // determined from DB
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
