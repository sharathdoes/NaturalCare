import { db } from "@/drizzle/index";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existing) {
    await db.insert(users).values({ username: name, email });
  }

  return NextResponse.json({ success: true });
}
