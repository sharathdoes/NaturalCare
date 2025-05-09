import { db } from "@/drizzle/index";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/getUserFromSession";

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { username, bio } = await req.json();
  await db.update(users).set({ username, bio }).where(eq(users.id, user.id));

  return NextResponse.json({ success: true });
}
