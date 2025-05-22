"use client";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Bookmark, CheckCircle } from "lucide-react"

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
    <Card className="overflow-hidden transition-all  rounded-lg h-64 w-108 border-1 border-gray-300">
      <div className="flex  items-center pl-4 pt-1 pr-4 justify-between">
        <div className="flex  gap-2">
  
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-teal-100 text-teal-800">
              {remedy.user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col  justify-center">

          <h1 className="text-sm  font-semibold">{remedy.user.username}</h1>
            <p className="text-gray-600 text-sm">
            {(() => {
              const date = new Date(remedy.createdAt);
              const now = new Date();
              const diff = now.getTime() - date.getTime();
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              if (days < 1) return 'Today';
              if (days < 7) return `${days} days ago`;
              if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
              if (days < 365) return `${Math.floor(days / 30)} months ago`;
              return `${Math.floor(days / 365)} years ago`;
            })()}
            </p>
          </div>
          {remedy.user.isDoctor && (
            <Badge className="text-blue-600 rounded-full h-5 font-semibold bg-blue-50 border-1 border-gray-300">Doctor</Badge>
          )}
        </div>

        <div className="flex  justify-between items-center">
        
          {remedy.isVerified ? (
            <Badge variant="default" className="rounded-full border text-green-700 bg-green-50 border-gray-200">Verified</Badge>
          ) : (
            <Badge className="rounded-full border text-gray-700 bg-green-50 border-gray-200">Unverified</Badge>
          )}
        </div>
      </div>
      <CardContent className=" space-y-2">
          <Link
            href={`/remedy/${remedy.id}`}
            className="text-xl font-semibold hover:underline"
          >
            {remedy.title}
          </Link>
        <p className=" text-sm font-light text-muted-foreground">
          {remedy.description.slice(0,50)}...
        </p>

        <div className="flex justify-between items-center">
         
          <div className="flex gap-2">
            {remedy.tags.map((tag, index) => (
              <Badge key={index} className="bg-green-50/50 text-green-700 rounded-full py-2 px-2 border-1 border-gray-100 font-semibold hover:bg-teal-50 cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
       
        </div>
        <div className="flex gap-4  justify-between items-center">
          <div className="flex gap-2 size-10 font-light "><ThumbsUp/><ThumbsDown/> </div>
           <div className="flex gap-2 size-10 font-light "><Share2/> <Bookmark/></div>
        </div>
      </CardContent>
    </Card>
  );
}
