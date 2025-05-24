"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RemedyCard from "@/components/usables/widthCard";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserInfo = {
  id?: number;
  email?: string;
  username?: string;
  isDoctor?: boolean;
  bio?: string;
  educationalBackground?: string;
};

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

const PublicProfile = () => {
  const [remedies, setRemedies] = useState<RemedyCardProps["remedy"][]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const { id } = useParams();



  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch(`/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
      const userandposts = await res.json();
      setRemedies(userandposts.posts || []);
      setUser(userandposts.user || null);
    };

    getUserData();
  }, []);

  const verifiedRemedies = remedies.filter((remedy) => remedy.isVerified);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Profile Sidebar */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-8">
              {/* Profile Header */}
              <div className="p-8 mb-6 mr-4">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                     <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-teal-100 text-teal-800">
              {user?.username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {user?.username || "Loading..."}
                  </h1>
                  {remedies[0]?.user?.isDoctor ? (
                    <Badge className="mb-4 bg-green-100 text-teal-600 font-semibold border-0 rounded-lg">
                       Verified 
                    </Badge>
                  ) : (
                    <Badge className="mb-4 bg-green-100 text-teal-600 font-semibold border-0 rounded-lg">
                       Unverified
                    </Badge>
                  )}
                  <div className="flex gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{remedies.length}</div>
                      <div className="text-sm text-gray-600">Remedies</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{verifiedRemedies.length}</div>
                      <div className="text-sm text-gray-600">Verified</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {remedies.reduce((acc, remedy) => acc + remedy.likes, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Likes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expertise */}
              <div className="p-6 border border-gray-200 shadow-sm rounded-lg bg-white mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3" >Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-teal-600 font-semibold border-0 rounded-lg">
                     Ayurveda
                  </Badge>
                  <Badge className="bg-green-100 text-teal-600 font-semibold border-0 rounded-lg">
                     Skin Care
                  </Badge>
                  <Badge className="bg-green-100 text-teal-600 font-semibold border-0 rounded-lg">
                     Nutrition
                  </Badge>
                 
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-teal-600 px-8 py-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  🏥 Health Remedies
                </h1>
                <p className="text-white mt-1">Discover natural healing solutions</p>
              </div>

              <div className="p-8">
                <Tabs defaultValue="remedies" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-md">
                    <TabsTrigger value="remedies" className="data-[state=active]:bg-white rounded-lg font-medium">
                       All Remedies ({remedies.length})
                    </TabsTrigger>
                    <TabsTrigger value="verified" className="data-[state=active]:bg-white rounded-lg font-medium">
                       Verified ({verifiedRemedies.length})
                    </TabsTrigger>
                    <TabsTrigger value="about" className="data-[state=active]:bg-white rounded-lg font-medium">
                      ℹ About
                    </TabsTrigger>
                  </TabsList>

                    <TabsContent value="remedies" className="space-y-6">
                    <div className="max-h-[600px] overflow-y-auto pr-4">
                      {remedies.length > 0 ? (
                      <div className="grid gap-6">
                        {remedies.map((remedy) => (
                        <div key={remedy.id}>
                          <RemedyCard remedy={remedy} />
                        </div>
                        ))}
                      </div>
                      ) : (
                      <div className="text-center py-16">
                        <div className="text-6xl mb-4">🌱</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No remedies yet</h3>
                        <p className="text-gray-600">Start sharing your knowledge to help others!</p>
                      </div>
                      )}
                    </div>
                    </TabsContent>

                  <TabsContent value="verified" className="space-y-6">
                    {verifiedRemedies.length > 0 ? (
                      <div className="grid gap-6">
                        {verifiedRemedies.map((remedy) => (
                          <div key={remedy.id}>
                            <RemedyCard remedy={remedy} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="text-6xl mb-4">⏳</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No verified remedies yet</h3>
                        <p className="text-gray-600">Your remedies are pending verification by our medical team.</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="about" className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        👋 About {user?.username}
                      </h3>
                      <div className="space-y-4 text-gray-700">
                        <p>
                          <strong>Bio:</strong> {user?.bio || "No bio provided yet."}
                        </p>
                        <p>
                          <strong>Educational Background:</strong>{" "}
                          {user?.educationalBackground || "Not provided yet."}
                        </p>
                        <p>
                          <strong>Verification Status:</strong>{" "}
                          {remedies[0]?.user?.isDoctor ? (
                            <span className="text-green-600 font-medium">✓ Verified Medical Professional</span>
                          ) : (
                            <span className="text-amber-600 font-medium">⏳ Pending Verification</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
