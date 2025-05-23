import { db } from "@/drizzle/index";
import { remedies, users } from "@/drizzle/schema";
import { eq, sql, desc, and, ilike } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body  = await req.json() 
  const tag = body.tag;
  let result;

  if (tag === "general") {
    console.log("general");
    result = await db
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
    .limit(12)
  }
 else if (tag === "popular") {
    // Sort by most likes
    console.log("popular");

    result = await db
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
      .orderBy(desc(remedies.likes));
  } else if (tag === "latest") {
    // Sort by latest creation
    result = await db
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
      }) // same as above
      .from(remedies)
      .innerJoin(users, eq(remedies.userId, users.id))
      .orderBy(desc(remedies.createdAt));
  } else if (tag === "verified") {
    // Filter verified only
    result = await db
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
      .where(eq(remedies.isVerified, true));
  } else {
    result = await db
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
      }) // same as above
      .from(remedies)
      .innerJoin(users, eq(remedies.userId, users.id))
      .where(sql`array_position(${remedies.tags}, ${tag}) IS NOT NULL`);
    }



  return Response.json(result);
}
