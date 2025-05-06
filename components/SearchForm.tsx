import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { Search } from "lucide-react";

const SearchForm = () => {
    const [query, setQuery]=useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log(query)
        setQuery("");
    }
  return (
    <>
      <Form
      action='/'
        onSubmit={handleSubmit}
        className="max-w-3xl w-full min-h-[80px] bg-white text-black border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5"
      >
        <input
          type="text"
          placeholder="Search Startups "
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="flex-1 font-bold  placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none;"
        />
        <button
          type="submit"
          className="size-[50px] rounded-full bg-black flex justify-center items-center !important; text-white"
        >
          <Search className="size-5" />
        </button>
      </Form>
    </>
  );
};

export default SearchForm;
