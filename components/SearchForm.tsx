import React from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import  Form from "next/form"

const SearchForm = () => {
  return (
    <>
        <Form
        action="/"
        className="max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5"
      >
        <input
          type="text"
          placeholder="Search Startups"
          className="flex-1 font-bold  placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none;"
        />
      </Form>
    </>
  );
};

export default SearchForm;
