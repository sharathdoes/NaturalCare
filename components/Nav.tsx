"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Leaf } from "lucide-react";
import localFont from "next/font/local";
const workSans = localFont({
  src: "../app/fonts/WorkSans-Bold.ttf",
})

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
    <header className=" sticky top-0 z-50 w-full border border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className=" container  px-10 flex h-16 justify-between  items-center ">
        <div className=" ml-12 flex items-center gap-1 ">
          <Link href="/">
            <Leaf className="size-6  text-green-700" />
          </Link>
          <h1 className="text-xl font-bold">NaturalCure</h1>
        </div>

        <div className="flex text-sm  mr-36 gap-5">
               <h2 className="text-sm font-medium transition-colors hover:text-teal-600">Home</h2>
               <h2 className="text-sm font-medium transition-colors hover:text-teal-600">Create Remedy  </h2>
            <h2 className="text-sm font-medium transition-colors hover:text-teal-600">Explore</h2>
        </div>
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
          <>
       
            <button
              className="text-sm font-semibold bg-teal-600 text-white mr-12 py-2 px-4  rounded-lg"
              onClick={() => signIn("google")}
            >
              Sign up
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBarClient;
