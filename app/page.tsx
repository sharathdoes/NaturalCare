"use client";
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import SearchForm from "@/components/usables/SearchForm";
import RemedyCard from "@/components/usables/RemedyCard";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";


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

export default function Page() {
  const [remedies, setRemedies] = useState<RemedyCardProps["remedy"][]>([]);
  const [search, setSearch] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRemedies = async () => {
      const res = await fetch("/api/remedies/all");
      const data = await res.json();
      setRemedies(data);
    };
    fetchRemedies();
  }, []);

  const filteredRemedies = remedies.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );
console.log("Filtered Remedies: ", filteredRemedies);
  const isDoctor = (session as any)?.user?.isDoctor;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 overflow-hidden" >
      {/* Hero Section */}
      <section className="w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6 bg-gradient-to-b from-teal-50 to-white">
        <h1 className="text-3xl text-center mb-3 tracking-tighter font-bold md:text-6xl">
          Natural Remedies for{" "}
          <span className="text-teal-600">Better Health</span>
        </h1>
        <h2 className="text-gray-600 mb-3 text-center max-w-[700px]  md:text-xl">
          Discover and share natural remedies from around the world. Connect
          with a community that values traditional healing methods.
        </h2>
        <div className="flex relative items-center gap-2 mt-4 w-full max-w-2xl">
          <Search className=" absolute left-3 " />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for remedies"
            className="rounded-full pl-10 pr-4 py-6  border border-gray-300 bg-white shadow-sm focus-visible:ring-teal-500 "
          />
          <Button className="bg-teal-600  absolute right-1 rounded-full text-white">
            Search
          </Button>
        </div>
        <div className="flex gap-2 mt-4">
          <Badge className="bg-white rounded-full py-2 px-2 border-1 border-gray-100 font-semibold  hover:bg-teal-50 cursor-pointer">
            Cold & Flu
          </Badge>
          <Badge className="bg-white rounded-full py-2 px-2 border-1 border-gray-100 font-semibold hover:bg-teal-50 cursor-pointer">
            Digestive Health
          </Badge>
          <Badge className="bg-white rounded-full py-2 px-2 border-1 border-gray-100 font-semibold hover:bg-teal-50 cursor-pointer">
            Skin Care
          </Badge>
          <Badge className="bg-white rounded-full py-2 px-2 border-1 border-gray-100 font-semibold hover:bg-teal-50 cursor-pointer">
            Stress Relief
          </Badge>
          <Badge className="bg-white  rounded-full py-2 px-2 border-1 border-gray-100 font-semibold hover:bg-teal-50 cursor-pointer">
            Immune Support
          </Badge>
          <Button
            size="sm"
            className="text-teal-600 border-1 border-gray-100 hover:text-teal-700"
          >
            <Filter className="h-4 w-4 mr-1" /> More Filters
          </Button>
        </div>
      </section>

      <section className="w-full py-12 md:py-16  md:px-24 bg-white">
        <h2 className="text-2xl font-semibold mb-4 ">Popular Remedies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {filteredRemedies.length > 0 ? ( 
          filteredRemedies.map((f) => {
            return (
              <RemedyCard
                key={f.id}
                remedy={{
                  id: f.id,
                  title: f.title,
                  description: f.description,
                  isVerified: f.isVerified,
                  user: {
                    id: f.user.id,
                    username: f.user.username,
                    isDoctor: f.user.isDoctor,
                  },
                  tags: f.tags,
                  createdAt: f.createdAt,
                }}
              />
            );
          })
        ) : (
          <></>
        )}
        </div>

         <div className="flex justify-center mt-10">
            <Button className="bg-teal-600 text-white rounded-lg py-1 hover:bg-teal-700">Load More Remedies</Button>
          </div>
        
      </section>
    </div>
  );
}
