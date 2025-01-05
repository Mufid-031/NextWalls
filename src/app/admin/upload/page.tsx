"use client";

import { useState } from "react";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import { ImageIcon, X } from 'lucide-react';
import Image from "next/image";
import { motion } from "framer-motion";
import Form from "@/components/admin/upload/Form";



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

  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
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
        <Form 
          title={title} 
          setTitle={setTitle} 
          description={description} 
          setDescription={setDescription} 
          tags={tags} 
          handleAddTag={handleAddTag} 
          files={files} 
          setFiles={setFiles} 
        />
        <div className="w-full p-5 bg-white rounded-md shadow">
          <div className="w-full h-96 bg-gray-300 flex justify-center items-center overflow-hidden">
            {files.length > 0 ? (
              files[0].type.startsWith("image/") ? (
                <Image
                  src={URL.createObjectURL(files[0])}
                  alt="Preview"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              ) : files[0].type.startsWith("video/") ? (
                <video
                  controls
                  className="w-full h-full object-cover"
                >
                  <source src={URL.createObjectURL(files[0])} type={files[0].type} />
                  Your browser does not support the video tag.
                </video>
              ) : null
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
            <div className="flex gap-2 mt-5">
                {tags.map((tag) => (
                  <motion.span key={tag} whileHover={{ scale: 1.1 }} className="px-2 py-1 text-sm bg-purple-500 text-white rounded-md flex gap-2 items-center font-semibold cursor-pointer">
                    {tag} <X className="w-4 h-4 cursor-pointer text-red-600 bg-white" onClick={() => handleRemoveTag(tag)} />
                  </motion.span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

