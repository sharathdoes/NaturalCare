import { db } from "@/drizzle/index";
import { remedies, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
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
    .innerJoin(users, eq(remedies.userId, users.id)); // ✅ JOIN to populate user

  return Response.json(result);
}
