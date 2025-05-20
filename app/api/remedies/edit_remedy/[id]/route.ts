// /app/api/remedies/[id]/edit/route.ts
import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
 
  const { user, title, description, tags } = await req.json();

  const result = await db
    .update(remedies)
    .set({ title, description, tags })
    .where(and(eq(remedies.id, params.id), eq(remedies.userId, user.id)))
    .returning();

  return NextResponse.json(result[0]);
}
