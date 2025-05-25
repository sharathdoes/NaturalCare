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
import { useUser } from "@/context/UserContext";
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
  currentUserIsDoctor: boolean;  // new prop
};


const TAG_OPTIONS = [
  { label: "Dry Skin", value: "dry skin" },
  { label: "Herbal ", value: "herbal" },
  { label: "Skin Care", value: "skin" },
  { label: "Stress Relief", value: "stress" },
  { label: "Immune Support", value: "immunity" },
];

const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Popular", value: "popular" },
  { label: "Verified", value: "verified" },
];
type UserInfo = {
  id?: number;
  email?: string;
  username?: string;
  isDoctor?: boolean;
  bio?: string;
  educationalBackground?: string;
};

export default function Page() {
    const [user, setUser] = useState<UserInfo | null>(null);
  
  const { user: contextUser } = useUser();
   useEffect(() => {
      setUser(contextUser);
    }, [contextUser]);
  
  const [remedies, setRemedies] = useState<RemedyCardProps["remedy"][]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<RemedyCardProps["remedy"][] | null>(null);
  // tagselected is now a string, only one tag allowed
  const [tagselected, setTagSelected] = useState<string>("general");
  const [sortOption, setSortOption] = useState<string>("");

  const handleSearch = async () => {
    if (!search.trim()) return;

    const res = await fetch(`/api/remedies/search?q=${encodeURIComponent(search)}`);
    if (res.ok) {
      try {
        const data = await res.json();
        console.log(data);
        setRemedies(data);
        setSearch("");
      } catch (e) {
        console.error("Failed to parse search response JSON", e);
        setRemedies([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const { data: session } = useSession();

  useEffect(() => {
    // Instead of sending tag as query param, send it in the POST body
    const fetchRemedies = async () => {
      let url = `/api/remedies/all`;
      let body: any = {};
      if (tagselected) {
        body.tag = tagselected;
      }
       if (sortOption) {
        body.tag = sortOption;
      }
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:  JSON.stringify(body) 
        });

        // Check for empty response
        const text = await res.json();
        console.log(res);
        if (!text) {
          setRemedies([]);
          return;
        }
        console.log(text);
        setRemedies(text);
      } catch (e) {
        console.error("Failed to fetch or parse remedies", e);
        setRemedies([]);
      }
    };
    fetchRemedies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagselected, sortOption]);

  const isDoctor = (session as any)?.user?.isDoctor;

  // Set tag selection (single select)
  const handleTagClick = (tag: string) => {
    setTagSelected((prev) => (prev === tag ? "" : tag));
  };

  // Set sort option (single select)
  const handleSortClick = (sort: string) => {
    setSortOption(sort);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
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
            className="rounded-full pl-10 pr-4 py-3 md:py-6  border border-gray-300 bg-white shadow-sm focus-visible:ring-teal-500 "
          />
          <Button onClick={handleSearch} className="bg-teal-600  absolute right-1 rounded-full text-white">
            Search
          </Button>
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          {TAG_OPTIONS.map((tag) => (
            <Badge
              key={tag.value}
              onClick={() => handleTagClick(tag.value)}
              className={`bg-white rounded-full py-2 px-2 border-1 border-gray-100  hover:bg-teal-50 cursor-pointer ${
                tagselected === tag.value ? "bg-teal-100 border-teal-400 text-teal-700" : ""
              }`}
            >
              {tag.label}
            </Badge>
          ))}
          <Button
            size="sm"
            className="text-teal-600 border-1 border-gray-100 hover:text-teal-700"
          >
            <Filter className="h-4 w-4 mr-1" /> More Filters
          </Button>
        </div>
      </section>

      <section className="w-full py-12 md:py-16  md:px-24 bg-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Popular Remedies</h2>
          <div className="flex items-center gap-2">
            {SORT_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                onClick={() => handleSortClick(opt.value)}
                size="sm"
                className={`rounded-md border border-gray-200 ${
                  sortOption === opt.value ? "bg-teal-100 border-teal-400 text-teal-700" : ""
                }`}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 pl-10 md:grid-cols-2 md:pl-0 lg:grid-cols-3 gap-6 ">
          {remedies.length > 0 ? (
            remedies.map((f) => {
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
                    likes: f.likes,
                    dislikes: f.dislikes,
                    tags: f.tags,
                    createdAt: f.createdAt,
                    currentUserIsDoctor: user?.isDoctor || false, 
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
