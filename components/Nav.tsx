"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Leaf, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

const NavBarClient = () => {
  const { data: session, status } = useSession();
  const { setUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      if (!session?.user?.email || !session?.user?.name) return;
      const res = await fetch(`/api/auth/userSignIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          name: session?.user?.name,
        }),
      });
      const data = await res.json();
      setUser(data.user);
      console.log(data.user, "user data");
    };
    getUserData();
  }, [session?.user]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <header className="sticky top-0 z-50 w-full border border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 md:px-10 flex h-16 justify-between items-center">
        {/* Left logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Leaf className="size-6 text-green-700" />
          </Link>
          <Link href='/' className="text-xl font-bold">NaturalCure</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex md:pr-20 text-sm gap-5">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <Link href="/create" className="hover:text-teal-600">Create Remedy</Link>
          <Link href="/research" className="hover:text-teal-600">Research</Link>
          <Link href="/about" className="hover:text-teal-600">About</Link>
        </div>

        {/* Auth + Profile */}
        <div className="hidden md:flex items-center gap-4">
          {session?.user ? (
            <>
              <button
                className="text-sm font-medium"
                onClick={() => signOut()}
              >
                Logout
              </button>
              <Link href="/profile">
                <Image
                  src={session.user.image || "/default-avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            </>
          ) : (
            <button
              className="text-sm font-semibold bg-teal-600 text-white py-2 px-4 rounded-lg"
              onClick={() => signIn("google")}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="size-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-3 bg-white shadow-md border-t flex flex-col gap-3 text-sm">
          <Link href="/" className="hover:text-teal-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/create" className="hover:text-teal-600" onClick={() => setMenuOpen(false)}>Create Remedy</Link>
          <Link href="/research" className="hover:text-teal-600" onClick={() => setMenuOpen(false)}>Research</Link>
          <Link href="/about" className="hover:text-teal-600" onClick={() => setMenuOpen(false)}>About</Link>
          {session?.user ? (
            <>
              <button
                className="text-left"
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
              <Link href="/profile" onClick={() => setMenuOpen(false)}>
                <div className="flex items-center gap-2">
                  <Image
                    src={session.user.image || "/default-avatar.png"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{session.user.name}</span>
                </div>
              </Link>
            </>
          ) : (
            <button
              className="bg-teal-600 text-white py-2 px-4 rounded-lg"
              onClick={() => {
                signIn("google");
                setMenuOpen(false);
              }}
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBarClient;
