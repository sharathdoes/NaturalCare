"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const CreateRemedy = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput.trim())) {
      setError("Tag already exists");
      return;
    }
    if (tags.length >= 5) {
      setError("Maximum 5 tags allowed");
      return;
    }
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
    setError(null);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="m-10 p-6 rounded-lg border-1 w-[50%] h-150 border-gray-300 justify-center ">
        <h1 className="text-xl font-semibold mb-2">Create a New Remedy</h1>
        <p className="text-gray-600 text-sm mb-4">
          Share your natural remedy with the community. Be detailed and specific
          to help others.
        </p>
        <p className="text-sm mb-4">Title</p>
        <Input
          className="rounded-lg border mb-4  border-gray-200 focus:ring-teal-500 py-2  text-sm px-2 w-full text-black"
          type="text"
          placeholder="E.g., Honey and Ginger Tea for Sore Throat"
        ></Input>
        <p className="text-sm mb-4 ">Description</p>
        <Textarea
          className="rounded-lg border border-gray-200 h-40  focus:ring-teal-500 py-2 px-2 w-full text-black tetx-sm"
          placeholder="Describe your remedy in detail. Include ingredients, preparation steps, usage instructions, and any precautions."
        ></Textarea>

        <div className="space-y-2 mb-6 mt-6">
          <Label htmlFor="tags">Tags (max 5)</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="E.g., cold, flu, herbal"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-200 focus:ring-teal-500"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              className="bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-teal-100 rounded-lg  border-0 text-teal-800 hover:bg-teal-200 pl-2"
                >
                  {tag}
                  <Button
                    size="sm"
                    className="h-5 w-5 p-0 ml-1  rounded-lg border-0 text-teal-800 hover:bg-transparent hover:text-teal-900"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

             
            </div>
          )}
        </div>
         <div className="flex justify-between  py-6 ">
          <Button className="rounded-lg bg-white border border-gray-200 text-black">
            Cancel
          </Button>
          <Button className="bg-teal-600 rounded-lg text-white hover:bg-teal-700" >
            Publish Remedy
          </Button>
        </div>
    
      </div>
    </div>
  );
};

export default CreateRemedy;
