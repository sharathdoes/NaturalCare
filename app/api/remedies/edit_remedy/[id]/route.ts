// /app/api/remedies/[id]/edit/route.ts
import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, title, description, tags } = await req.json();

    if (!user?.id || !params?.id) {
      return NextResponse.json(
        { error: "Missing user ID or remedy ID" },
        { status: 400 }
      );
    }

    const result = await db
      .update(remedies)
      .set({ title, description, tags })
      .where(and(eq(remedies.id, params.id), eq(remedies.userId, user.id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Remedy not found or user not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
