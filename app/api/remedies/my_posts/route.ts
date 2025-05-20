// /app/api/remedies/my/route.ts
import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { getUserFromSession } from "@/lib/getUserFromSession";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const user = await req.json();
  const result = await db.query.remedies.findMany({
    where: eq(remedies.userId, user.id),
  });

  return NextResponse.json(result);
}
