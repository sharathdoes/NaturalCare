"use client";
import React from "react";
import localFont from "next/font/local";
import SearchForm from "@/components/SearchForm";

const workSansBold = localFont({
  src: "./fonts/WorkSans-ExtraBold.ttf"
})

function page() {
  return (
    <>
      <section className="w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
        <h1 className={`uppercase bg-black px-6 py-2 ${workSansBold.className} font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5`}>
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="text-[20px]  text-white max-w-2xl text-center break-words">
          Submit Ideas, Vote on Pitches, get Noticed in Virtual Competitions
        </p>
        <SearchForm/>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
     
      </section>
    </>
  );
}

export default page;
