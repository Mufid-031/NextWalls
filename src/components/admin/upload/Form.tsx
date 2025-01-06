import { Input } from "@/components/ui/Input";
import Label from "@/components/auth/Label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { Category } from "@prisma/client";

export default function Form({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  handleAddTag,
  files,
  setFiles,
}: {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: string[];
  handleAddTag: (tag: string) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  const { data: session, status } = useSession();
  const { data: categories } = useFetch<Category[]>("/api/category", 60000);
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      formData.append("title", title.trim());
      formData.append("categoryId", category);
      formData.append("description", description.trim());
      formData.append("email", session.user?.email || "");
      formData.append("file", files[0]);
      formData.append("tags", JSON.stringify(tags));

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
    <div className="w-full p-5 bg-white rounded-md shadow">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-5">
          <Label htmlFor="title" className="text-xl">
            Title
          </Label>
          <Input 
            name="title" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
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
            {categories?.map((category: Category) => (
              <option key={category.id} value={category.id}>
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
            onKeyDown={(e) => {
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
        <Button variant="default" className="mt-5 bg-purple-500 text-white hover:bg-purple-600" whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-500">Upload successful!</p>}
    </div>
  );
}
