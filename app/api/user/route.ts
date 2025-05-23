import { db } from "@/drizzle/index";
import { users, remedies } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;
console.log(email, 'email');
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const posts = await db.query.remedies.findMany({
    where: eq(remedies.userId, user.id)
  });

  return NextResponse.json({ user, posts });
}
