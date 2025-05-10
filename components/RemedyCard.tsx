"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type RemedyCardProps = {
  remedy: {
    id: string;
    title: string;
    description: string;
    isVerified: boolean;
    user: {
      id: string;
      username: string;
    };
  };
  isDoctor: boolean;
};

export default function RemedyCard({ remedy, isDoctor }: RemedyCardProps) {
  const handleVerify = async () => {
    await fetch("/api/remedies/verify", {
      method: "POST",
      body: JSON.stringify({ id: remedy.id }),
    });
    window.location.reload(); // OR better: Optimistically update state
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <Link
            href={`/remedy/${remedy.id}`}
            className="text-xl font-semibold hover:underline"
          >
            {remedy.title}
          </Link>
          {remedy.isVerified ? (
            <Badge variant="default">Verified</Badge>
          ) : (
            <Badge >Unverified</Badge>
          )}
        </div>

        <p className="text-muted-foreground">
          {remedy.description.slice(0, 100)}...
        </p>

        <div className="flex justify-between items-center">
          <Link
            href={`/user/${remedy.user.id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            @{remedy.user.username}
          </Link>
          {!remedy.isVerified && isDoctor && (
            <Button size="sm" onClick={handleVerify}>
              Verify
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
