import { db } from "@/drizzle/index";
import { remedies } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { getUserFromSession } from "@/lib/getUserFromSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();
  if (!user || !user.isDoctor)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json();
  await db.update(remedies).set({ isVerified: true }).where(eq(remedies.id, id));
  return NextResponse.json({ success: true });
}
