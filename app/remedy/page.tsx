// app/remedy/create/page.tsx
"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { toast } from "sonner"

export default function CreateRemedyPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");  // Changed to string for input

    const handleCreate = async () => {
        if (!session) {
            toast("You have to be Logged In", {
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
            return;
        }

        // Convert tags string to array and trim whitespace
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
                    console.log("Creating remedy with data:", { title, description, tags: tagsArray })

        const response = await fetch("/api/remedies/create", {
            method: "POST",
            body: JSON.stringify({ title, description, tags: tagsArray }),
        });

        if (response.ok) {
            toast("Remedy created successfully", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
            router.push('/remedy'); // Redirect after successful creation
        } else {
            toast("Failed to Create Remedy", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Create a New Remedy</h1>
            <Card>
                <CardContent className="p-4">
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full"
                        />
                        <Textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full"
                            rows={6}
                        />
                        <Input
                            type="text"
                            placeholder="Tags (comma-separated)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full"
                        />
                        <Button onClick={handleCreate} className="w-full mt-4">
                            Create Remedy
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
