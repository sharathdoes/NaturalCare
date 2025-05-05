// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define the NextAuth options
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.SECRET || "",
};

// Export named handlers for GET and POST
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
