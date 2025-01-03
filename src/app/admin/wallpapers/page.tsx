"use client";

import { Button } from "@/components/ui/Button";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Wallpaper {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function WallpapersPage() {
  const { isOpen } = useAdminSidebar();
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await axios.get("/api/wallpapers");
        setWallpapers(response.data);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      }
    };

    fetchWallpapers();
  }, []);

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Wallpapers</h2>
        <Button variant="ghost" className="bg-purple-500 text-white hover:bg-purple-600" whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
          <Link href="/admin/upload">Upload</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {wallpapers.map((wallpaper) => (
          <div className="w-full h-52 bg-white rounded-md" key={wallpaper.id}>
            <Image src={wallpaper.imageUrl} alt={wallpaper.title} width={500} height={500} className="w-full h-full object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
