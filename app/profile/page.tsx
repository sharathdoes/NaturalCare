"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import RemedyCard from "@/components/usables/widthCard";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from  "@/components/ui/badge";

type RemedyCardProps = {
  remedy: {
    id: string;
    title: string;
    description: string;
    isVerified: boolean;
    user: {
      id: string;
      username: string;
      isDoctor: boolean;
    };
    likes: number;
    dislikes: number;
    createdAt: Timestamp;
    tags: string[];
  };
};

const Profile = () => {
  const [remedies, setRemedies] = useState<RemedyCardProps["remedy"][]>([]);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const getUserData = async () => {
      if (!user?.email) return;
      console.log(user.email, "user email");
      const res = await fetch(`/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const userandposts = await res.json();
      setRemedies(userandposts.posts || []);
    };

    getUserData();
  }, [user?.email]);

  return (
    <div className="flex  min-h-screen py-2">
      <div
        id="profile"
        className="py-8  pl-4 gap-3 flex w-[36%] flex-col items-center max-w-4xl mx-auto"
      >
        <Image
          className="size-24 rounded-full"
          height={40}
          width={40}
          alt="Profile Picture"
          src={user?.image || "/9.png"}
        />
        <h1 className=" font-bold text-2xl ">{user?.name}</h1>
        {remedies[0]?.user?.isDoctor ? (
          <Badge className="rounded-full border text-green-700 bg-green-50 border-gray-200">
            Verified
          </Badge>
        ) : (
          <Badge className="rounded-full border text-green-700 bg-green-50 border-gray-200">
            Not Verified
          </Badge>
        )}
      </div>
      <div id="cards" className="flex w-[64%] flex-col gap-4 mt-4">
        <h1>Remedies</h1>
        {remedies.length > 0 ? (
          remedies.map((f) => (
            <RemedyCard
              key={f.id}
              remedy={{
                id: f.id,
                title: f.title,
                description: f.description,
                isVerified: f.isVerified,
                user: f.user,
                likes: f.likes,
                dislikes: f.dislikes,
                tags: f.tags,
                createdAt: f.createdAt,
              }}
            />
          ))
        ) : (
          <h1>No remedies found</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
