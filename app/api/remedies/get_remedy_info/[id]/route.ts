// /app/api/remedies/[id]/route.ts
import { db } from "@/drizzle/index";
import { remedies, users } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const remedy = await db.query.remedies.findFirst({
    where: eq(remedies.id, id),
    with: {
      user: true,
    },
  });

  if (!remedy) {
    return NextResponse.json({ error: "Remedy not found" }, { status: 404 });
  }

  // Related remedies by shared tags
  const related = await db
    .select()
    .from(remedies)
    .where(
      sql`${remedy.tags} && ${remedies.tags} AND ${remedies.id} != ${id}`
    )
    .limit(5);

  return NextResponse.json({ remedy, related });
}
