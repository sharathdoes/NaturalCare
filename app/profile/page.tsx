"use client";
import { getUserFromSession } from "@/lib/getUserFromSession";
import React, { useEffect } from "react";
import Image from "next/image";

type Remedy = {
  id: string;
  title: string;
  description: string;
  isVerified: boolean;

  createdAt: string;
};
const Profile = () => {
  const [remedies, setRemedies] = React.useState<Remedy[]>([]);
  const [user, setUser] = React.useState<any>(null);

  useEffect(() => {
    const getUserSession = async () => {
      const se= await fetch("/api/session")
      const session=await se.json();
      if (session?.user) {
        setUser(session.user);
      }
    };
    const getuserremedies = async () => {
      const res = await fetch("/api/remedies/all");
      const remediesData = await res.json();
      setRemedies(remediesData);
    };
    getUserSession();
    getuserremedies();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <Image
        className="h-8 w-8"
        height={40}
        width={40}
        alt="imageofhim"
        src={user?.image || "/9.png"}
      />
      <h1>Remedies</h1>
      {remedies.map((r: any) => {
        return (
          <>
            <h1>{r.title}</h1>
            <h2>{r.description}</h2>
            <h2>{r.price}</h2>
            <h2>{r.category}</h2>
          </>
        );
      })}
    </div>
  );
};

export default Profile;
