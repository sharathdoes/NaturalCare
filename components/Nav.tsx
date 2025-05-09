"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const NavBarClient = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const ensureUserInDB = async () => {
      if (session?.user?.email) {
        await fetch("/api/auth/ensure-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user.email,
            name: session.user.name || "Unnamed",
          }),
        });
      }
    };

    if (status === "authenticated") {
      ensureUserInDB();
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <header className="px-5 py-3 bg-white shadow-md">
      <nav className="flex justify-between items-center pr-5 pl-5">
        <Link href="/">
          <Image src="/wellvet.svg" alt="Logo" width={140} height={140} />
        </Link>

        {session?.user ? (
          <div className="flex items-center gap-5 text-black">
            <Link href="/create">
              <button className="text-lg">Create</button>
            </Link>
            <button className="text-lg" onClick={() => signOut()}>
              Logout
            </button>
            <Link href={`/profile`}>
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <button
            className="hover:underline hover:text-blue-500"
            onClick={() => signIn("google")}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default NavBarClient;
