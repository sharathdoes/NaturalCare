// app/api/session/route.ts (or /pages/api/session.ts if using pages)
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextAuthOptions } from "next-auth";
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  return Response.json(session);
}
