// /app/api/remedies/search/route.ts
import { db } from "@/drizzle/index";
import { remedies ,users} from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { ilike, or, SQL, sql,eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  const result = await db
    .select({
      id: remedies.id,
      title: remedies.title,
      description: remedies.description,
      tags: remedies.tags,
      likes: remedies.likes,
      dislikes: remedies.dislikes,
      isVerified: remedies.isVerified,
      createdAt: remedies.createdAt,
      bydoc: remedies.bydoc,
      user: {
        id: users.id,
        username: users.username,
        email: users.email,
        isDoctor: users.isDoctor,
      },
    })
    .from(remedies)
    .innerJoin(users, eq(remedies.userId, users.id))
    .where(
      or(
        ilike(remedies.title, `%${query}%`),
        sql`${query} = ANY (${remedies.tags})`
      )
    );

  return NextResponse.json(result);
}


