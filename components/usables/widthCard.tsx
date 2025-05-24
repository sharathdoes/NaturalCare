"use client";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  CheckCircle,
} from "lucide-react";

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

export default function RemedyCard({ remedy }: RemedyCardProps) {
  const handleVerify = async () => {
    await fetch("/api/remedies/verify", {
      method: "POST",
      body: JSON.stringify({ id: remedy.id }),
    });
    window.location.reload(); // OR better: Optimistically update state
  };

  return (
   <Card className="rounded-lg border border-gray-200 shadow-sm p-4">


  <CardContent className="space-y-3 pt-3">
    <Link href={`/remedy/${remedy?.id}`} className="text-lg font-bold hover:underline">
      {remedy?.title}
    </Link>
    <p className="text-sm text-muted-foreground">
      {remedy?.description.slice(0, 400)}...
    </p>

    <div className="flex flex-wrap gap-2">
      {remedy.tags.map((tag, idx) => (
        <Badge
          key={idx}
          className="bg-emerald-50 text-emerald-800 rounded-full px-3 py-1 text-xs font-medium border border-gray-200"
        >
          {tag}
        </Badge>
      ))}
    </div>

    <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
      <div className="flex gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <ThumbsUp className="size-4" />
          {remedy?.likes}
        </div>
        <div className="flex items-center gap-1">
          <ThumbsDown className="size-4" />
          {remedy?.dislikes}
        </div>
      </div>
      <Share2 className="size-4 cursor-pointer text-gray-500 hover:text-black" />
    </div>
  </CardContent>
</Card>

  );
}
