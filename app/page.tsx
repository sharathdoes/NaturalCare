"use client";
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import SearchForm from "@/components/SearchForm";
import RemedyCard from "@/components/RemedyCard"
import { useSession } from "next-auth/react";

const workSansBold = localFont({
  src: "./fonts/WorkSans-ExtraBold.ttf",
});

type Remedy = {
  id: string;
  title: string;
  description: string;
  isVerified: boolean;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
};

export default function Page() {
  const [remedies, setRemedies] = useState<Remedy[]>([]);
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

  const isDoctor = (session as any)?.user?.isDoctor;

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
        <h1
          className={`uppercase bg-black px-6 py-2 ${workSansBold.className} font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5`}
        >
          Pitch Your Remedy, <br />
          Connect With People
        </h1>
        <p className="text-[20px] text-white max-w-2xl text-center break-words">
          Submit Ideas, Vote on Remedies, and Help Others Find Solutions
        </p>
        <SearchForm value={search} onChange={setSearch} />
      </section>

      {/* Remedies Section */}
      <section className="px-6 py-10 max-w-7xl mx-auto grid gap-6">
        {filteredRemedies.map((remedy) => (
          <RemedyCard key={remedy.id} remedy={remedy} isDoctor={isDoctor} />
        ))}
      </section>
    </>
  );
}
