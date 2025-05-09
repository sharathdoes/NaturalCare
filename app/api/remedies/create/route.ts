import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/getUserFromSession";

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description } = await req.json();

  const result = await db.insert(remedies).values({
    title,
    description,
    userId: user.id,
  }).returning();

  return NextResponse.json(result[0]);
}
