import { db } from "@/drizzle/index";
import { remedies, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const result = await db
    .select({
      id: remedies.id,
      title: remedies.title,
      description: remedies.description,
      isVerified: remedies.isVerified,
      createdAt: remedies.createdAt,
      user: {
        id: users.id,
        username: users.username,
      },
    })
    .from(remedies)
    .leftJoin(users, eq(remedies.userId, users.id));

  return Response.json(result);
}
