import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/getUserFromSession";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession();
  
       if (!user) {
      console.error("❌ No user found in session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("User found in session:", user);

    const body = await req.json();
    const { title, description, tags } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db
      .insert(remedies)
      .values({
        title,
        description,
        tags,
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
