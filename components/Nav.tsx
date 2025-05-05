// NavBarClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react"; // ✅ Use next-auth here
import { useSession } from "next-auth/react";

const NavBarClient = () => {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <header className="px-5 py-2 bg-white shadow-md">
      <nav className="flex justify-between items-center pr-5 pl-5">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={70} height={40} />
        </Link>
        {session && session.user ? (
        <>
          <div className="flex items-center gap-5 text-black">
            <Link href="/dashboard" className="text-lg">
              Create
            </Link>
            <button  className="text-lg" onClick={() => signOut()}>SignOut</button>
            <div className="flex items-center gap-2">
              <Image
                src={session.user.image || ""}
                alt="Profile"
                width={40}
                height={20}
                className="rounded-full"
              />
          </div>
          </div>
        </>
        ):(
        <button onClick={() => signIn("google")}>SignIn</button>)}
      </nav>
    </header>
  );
};

export default NavBarClient;

