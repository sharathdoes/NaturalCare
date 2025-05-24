import { db } from "@/drizzle/index";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name } = body; 
   if (!email || !name) {
    return NextResponse.json({ error: "Enter details" }, { status: 400 });
  }
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if(user)
      return NextResponse.json({ message: "User created", user }, { status: 201 });

  let newUser;
  if (!user) {
    newUser = await db.insert(users).values({
    email,
    username: name, 
  }).returning();
  }

 

  return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
}
