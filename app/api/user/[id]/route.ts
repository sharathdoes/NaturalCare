import { db } from "@/drizzle/index";
import { users, remedies } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, params.id),
  });

  const posts = await db.query.remedies.findMany({
    where: eq(remedies.userId, params.id),
  });

  return Response.json({ user, posts });
}
