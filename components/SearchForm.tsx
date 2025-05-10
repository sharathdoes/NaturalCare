"use client";
import React from "react";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchForm = ({ value, onChange }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full min-h-[80px] bg-white text-black border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5"
    >
      <input
        type="text"
        placeholder="Search Remedy "
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none"
      />
      <button
        type="submit"
        className="size-[50px] rounded-full bg-black flex justify-center items-center text-white"
      >
        <Search className="size-5" />
      </button>
    </form>
  );
};

export default SearchForm;
