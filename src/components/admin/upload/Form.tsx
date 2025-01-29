"use client";

import { Input } from "@/components/ui/Input";
import Label from "@/components/auth/Label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { Category } from "@prisma/client";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import ColorThief from "colorthief";

export default function Form({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  handleAddTag,
  files,
  setFiles,
  handleResetTag,
}: {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: string[];
  handleAddTag: (tag: string) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  handleResetTag: () => void;
}) {
  const [palette, setPalette] = useState<string[]>([]);
  const { data: session, status } = useSession();
  const { data: categories } = useFetch<Category[]>("/api/category", 60000);
  const [category, setCategory] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);
  

  useIsomorphicLayoutEffect(() => {
    const getPalette = async () => {
      const imageElement = ref.current ?? document.createElement("img");
      imageElement.crossOrigin = "Anonymous";
      imageElement.src = URL.createObjectURL(files[0]) as string;
      (imageElement as HTMLImageElement).onload = () => {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(imageElement, 5);
        setPalette(colors.map((color: number[]) => `rgb(${color[0]},${color[1]},${color[2]})`));
      }
    };
    
    if (files[0]) {
      getPalette();
    }

  }, [files[0]])

  useIsomorphicLayoutEffect(() => {
    console.log(palette)
  }, [palette])

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "authenticated") {
      setError("You must be logged in to upload wallpapers");
      return;
    }
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (files.length === 0) {
      setError("Please select a file to upload");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.forEach((value, key) => console.log(key, value));
      formData.append("title", title.trim());
      formData.append("categoryId", category);
      formData.append("description", description.trim());
      formData.append("email", session.user?.email || "");
      formData.append("file", files[0]);
      formData.append("tags", JSON.stringify(tags));
      formData.append("palette", JSON.stringify(palette));

      const response = await axios.post("/api/wallpapers/nocloud", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setTitle("");
        setDescription("");
        setFiles([]);
        handleResetTag();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "An error occurred during upload");
      } else {
        setError("An unexpected error occurred");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-5 bg-white dark:bg-gray-800 rounded-md shadow">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-5">
          <Label htmlFor="title" className="text-xl dark:text-white text-black">
            Title
          </Label>
          <Input 
            name="title" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="dark:bg-gray-900 dark:text-white text-black"
          />
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <Label htmlFor="category" className="text-xl">
            Category
          </Label>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories?.map((category: Category, index: number) => (
              <option key={category.name + index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <Label htmlFor="tags" className="text-xl">
            Tags
          </Label>
          <Input
            name="tags"
            id="tags"
            className="text-black"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <Label htmlFor="description" className="text-xl">
            Description
          </Label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="file" className="text-xl">
            Image/Video
          </Label>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>
        </div>
        <Button 
          variant="default" 
          className="mt-5 bg-purple-500 text-white hover:bg-purple-600" 
          whileTap={{ scale: 0.9 }} 
          whileHover={{ scale: 1.1 }} 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-500">Upload successful!</p>}
    </div>
  );
}
