"use client";

import Label from "@/components/auth/Label";
import { FileUpload } from "@/components/ui/FileUpload";
import { Input } from "@/components/ui/Input";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function UploadPage() {
  const { isOpen } = useAdminSidebar();
  const [title, setTitle] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <h2 className="text-3xl font-bold">Upload</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full p-5 bg-white rounded-md">
          <form>
            <div className="flex flex-col gap-2 mb-5">
              <Label htmlFor="title" className="text-xl">
                Title
              </Label>
              <Input name="title" id="title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <Label htmlFor="deskripsi" className="text-xl">
                Deskripsi
              </Label>
              <Input name="deskripsi" id="deskripsi" onChange={(e) => setDeskripsi(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="file" className="text-xl">Image</Label>
              <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
              </div>
            </div>
          </form>
        </div>
        <div className="w-full p-5 bg-white rounded-md">
          <div className="w-full h-96 bg-gray-300 flex justify-center items-center">
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
          <div>
            <h2 className="text-2xl font-bold">{title ? title : "Title"}</h2>
            <p>{deskripsi ? deskripsi : "Deskripsi"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
