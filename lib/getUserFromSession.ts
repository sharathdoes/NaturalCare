// lib/getUserFromSession.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/drizzle/index";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getUserFromSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });

  return user;
};
