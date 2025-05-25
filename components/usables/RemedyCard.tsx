"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";

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
    currentUserIsDoctor: boolean;
  };
};

export default function RemedyCard({ remedy }: RemedyCardProps) {
  const [likes, setLikes] = useState(remedy.likes);
  const [dislikes, setDislikes] = useState(remedy.dislikes);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null);

  const handleReaction = async (type: "like" | "dislike") => {
    try {
      let updatedLikes = likes;
    let updatedDislikes = dislikes;
    let newReaction: "like" | "dislike" | null = userReaction;

    if (userReaction === type) {
      if (type === "like") updatedLikes -= 1;
      else updatedDislikes -= 1;
      newReaction = null;
    } else {
      if (type === "like") {
        updatedLikes += 1;
        if (userReaction === "dislike") updatedDislikes -= 1;
      } else {
        updatedDislikes += 1;
        if (userReaction === "like") updatedLikes -= 1;
      }
      newReaction = type;
    }

      const res = await fetch("/api/remedies/likes_dislikes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: remedy.id,
          likes: updatedLikes,
          dislikes: updatedDislikes,
        }),
      });

     if (res.ok) {
      setLikes(updatedLikes);
      setDislikes(updatedDislikes);
      setUserReaction(newReaction); 
    } else {
        alert("Failed to update like/dislike.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async () => {
    try {
      const res = await fetch("/api/remedies/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: remedy.id }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to verify remedy.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="overflow-hidden transition-all rounded-lg h-64 w-108 border border-gray-300">
      {/* Header */}
      <div className="flex items-center pl-4 pt-1 pr-4 justify-between">
        <div className="flex gap-2 items-center">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-teal-100 text-teal-800">
              {remedy.user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <Link
              href={`/user/${encodeURIComponent(remedy.user.id)}`}
              className="text-sm hover:underline font-semibold"
            >
              {remedy.user.username}
            </Link>
            <p className="text-gray-600 text-sm">
              {(() => {
                const date = new Date(remedy.createdAt);
                const now = new Date();
                const diff = now.getTime() - date.getTime();
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                if (days < 1) return "Today";
                if (days < 7) return `${days} days ago`;
                if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
                if (days < 365) return `${Math.floor(days / 30)} months ago`;
                return `${Math.floor(days / 365)} years ago`;
              })()}
            </p>
          </div>
          {remedy.user.isDoctor && (
            <Badge className="text-blue-600 rounded-full h-5 font-semibold bg-blue-50 border border-gray-300">
              Doctor
            </Badge>
          )}
        </div>

        {/* Verify badge */}
        <div className="flex items-center gap-2">
          {remedy.isVerified ? (
            <Badge className="rounded-full border text-green-700 bg-green-50 border-gray-200">
              Verified
            </Badge>
          ) : remedy.currentUserIsDoctor ? (
            <Badge
              className="rounded-full border text-gray-700 border-gray-200 cursor-pointer"
              onClick={handleVerify}
            >
              Verify this
            </Badge>
          ) : (
            <Badge className="rounded-full border text-gray-700 bg-green-50 border-gray-200">
              Unverified
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="space-y-2">
        {/* Title */}
        <Link
          href={`/remedy/${remedy.id}`}
          className="text-lg font-bold hover:underline"
        >
          {remedy.title}
        </Link>

        {/* Description */}
        <p className="text-sm font-light text-muted-foreground">
          {remedy.description.slice(0, 50)}...
        </p>

        {/* Tags */}
        <div className="flex gap-2">
          {remedy.tags.map((tag, index) => (
            <Badge
              key={index}
              className="bg-green-50/50 text-green-700 rounded-full py-2 px-2 border border-gray-100 font-semibold hover:bg-teal-50 cursor-pointer"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Likes / Dislikes / Share */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleReaction("like")}
            >
              <ThumbsUp
                className={`w-5 h-5 font-light ${
                  userReaction === "like" ? "text-teal-600" : ""
                }`}
              />
              <div className="ml-2 mt-1 text-sm">{likes}</div>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleReaction("dislike")}
            >
              <ThumbsDown
                className={`w-5 h-5 font-light ${
                  userReaction === "dislike" ? "text-teal-600" : ""
                }`}
              />
              <div className="ml-2 mt-1 text-sm">{dislikes}</div>
            </div>
          </div>
          <Share2 className="w-5 h-5 font-light cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  );
}
