"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Label from "@/components/auth/Label";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { Input } from "@/components/ui/Input";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ImageIcon } from 'lucide-react';
import Image from "next/image";

export default function UploadPage() {
  const { isOpen } = useAdminSidebar();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
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
      formData.append("description", description.trim());
      formData.append("email", session.user?.email || "");
      formData.append("file", files[0]);

      // Log formData contents for debugging
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You must be logged in to access this page.</div>;
  }

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <h2 className="text-3xl font-bold">Upload</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="description" className="text-xl">
                Description
              </Label>
              <textarea 
                name="description" 
                id="description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={10}
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="file" className="text-xl">
                Image
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
        <div className="w-full p-5 bg-white rounded-md shadow">
          <div className="w-full h-96 bg-gray-300 flex justify-center items-center overflow-hidden">
            {files.length > 0 ? (
              <Image
                src={URL.createObjectURL(files[0])}
                alt="Preview"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="w-10 h-10" />
            )}
          </div>
          <div className="mt-4">
            <h2 className={`text-2xl font-bold text-center w-1/2 h-10 ${title ? "line-clamp-1" : "bg-gray-300"} mx-auto rounded-md`}>{title || ""}</h2>
            <p className={`mt-2 text-center h-7 ${description ? "" : "bg-gray-300"} rounded-md`}>{description || ""}</p>
            {!description && (
              <>
                <p className="mt-2 text-center h-7 bg-gray-300 rounded-md">{description || ""}</p>
                <p className="mt-2 text-center h-7 bg-gray-300 rounded-md">{description || ""}</p>
                <p className="mt-2 text-center h-7 bg-gray-300 rounded-md">{description || ""}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

