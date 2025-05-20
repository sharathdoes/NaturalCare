// /app/api/remedies/search/route.ts
import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { ilike, or, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  const result = await db
    .select()
    .from(remedies)
    .where(
      or(
        ilike(remedies.title, `%${query}%`),
        sql`${query} = ANY (${remedies.tags})`
      )
    );

  return NextResponse.json(result);
}
