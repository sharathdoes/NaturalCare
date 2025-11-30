import { db } from "@/drizzle/index";
import { remedies, users } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await db
      .select({
        id: remedies.id,
        title: remedies.title,
        description: remedies.description,
        isVerified: remedies.isVerified,
        likes: remedies.likes,
        dislikes: remedies.dislikes,
        tags: remedies.tags,
        createdAt: remedies.createdAt,
        user: {
          id: users.id,
          username: users.username,
          isDoctor: users.isDoctor,
        },
      })
      .from(remedies)
      .leftJoin(users, eq(remedies.userId, users.id))
      .where(eq(remedies.id, id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Remedy not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching remedy:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, description, tags } = body;

    // Fetch the remedy to check ownership
    const remedy = await db
      .select()
      .from(remedies)
      .where(eq(remedies.id, id))
      .limit(1);

    if (remedy.length === 0) {
      return NextResponse.json({ error: "Remedy not found" }, { status: 404 });
    }

    const user = await db
        .select()
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1);

    if (!user.length) {
         return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Allow update if user is the owner or is a doctor/admin (assuming doctors have some privileges, or strictly owner)
    // For now, let's restrict to owner.
    if (remedy[0].userId !== user[0].id) {
       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db
      .update(remedies)
      .set({
        title: title || remedy[0].title,
        description: description || remedy[0].description,
        tags: tags || remedy[0].tags,
      })
      .where(eq(remedies.id, id));

    return NextResponse.json({ message: "Remedy updated successfully" });
  } catch (error) {
    console.error("Error updating remedy:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

     // Fetch the remedy to check ownership
    const remedy = await db
      .select()
      .from(remedies)
      .where(eq(remedies.id, id))
      .limit(1);

    if (remedy.length === 0) {
      return NextResponse.json({ error: "Remedy not found" }, { status: 404 });
    }

    const user = await db
        .select()
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1);

    if (!user.length) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Only allow owner to delete
    if (remedy[0].userId !== user[0].id) {
       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.delete(remedies).where(eq(remedies.id, id));

    return NextResponse.json({ message: "Remedy deleted successfully" });
  } catch (error) {
    console.error("Error deleting remedy:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
