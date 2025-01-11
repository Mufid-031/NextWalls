"use client";

import { useState } from "react";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import Form from "@/components/admin/upload/Form";
import PreviewCard from "@/components/admin/upload/PreviewCard";

export default function UploadPage() {
  const { isOpen } = useAdminSidebar();
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleResetTag = () => setTags([]);

  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <h2 className="text-3xl font-bold dark:text-white text-black">Upload</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form 
          title={title} 
          setTitle={setTitle} 
          description={description} 
          setDescription={setDescription} 
          tags={tags} 
          handleAddTag={handleAddTag} 
          files={files} 
          setFiles={setFiles}
          handleResetTag={handleResetTag}
        />
        <PreviewCard
          title={title}
          description={description}
          tags={tags}
          files={files}
          handleRemoveTag={handleRemoveTag}
        />
      </div>
    </div>
  );
}

