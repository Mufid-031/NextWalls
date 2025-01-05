"use client";

import { Button } from "@/components/ui/Button";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import WallpaperModal from "@/components/admin/wallpapers/WallpaperModal";
import { Tag, WallpaperTag } from "@prisma/client";
import WallpapersCard from "@/components/admin/wallpapers/WallpapersCard";

interface Wallpaper {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userId: number;
  categoryId: number;
  views: number;
  totalSaves: number;
  totalLikes: number;
  width: number;
  height: number;
  wallpaperTags: WallpaperTag & {
    tag: Tag; 
  }[];
  createdAt: Date;
  updatedAt: Date;
  liked?: boolean;
}

interface Category {
  id: number;
  name: string;
}

export default function WallpapersPage() {
  const { isOpen } = useAdminSidebar();
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [categories, setCategories] = useState<Record<number, string>>({});
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await axios.get("/api/wallpapers");
        setWallpapers(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/category`);
        const categoriesData: Category[] = response.data;
        const categoriesMap = categoriesData.reduce((acc, category) => ({ ...acc, [category.id]: category.name }), {});
        setCategories(categoriesMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchWallpapers();
    fetchCategories();
  }, [selectedWallpaper]);

  useEffect(() => {
    const addView = async () => {
      if (selectedWallpaper) {
        try {
          await axios.patch(`/api/wallpapers/view`, {
            wallpaperId: selectedWallpaper.id,
          });
        } catch (error) {
          console.error("Error adding view:", error);
        }
      }
    };

    addView();
  }, [selectedWallpaper]);

  const handleWallpaperClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleCloseModal = () => {
    setSelectedWallpaper(null);
  };

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Wallpapers</h2>
        <Button variant="ghost" className="bg-purple-500 text-white hover:bg-purple-600">
          <Link href="/admin/upload">Upload</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {wallpapers.map((wallpaper, index) => (
          <WallpapersCard key={index} wallpaper={wallpaper} categories={categories} handleWallpaperClick={(wallpaper) => handleWallpaperClick(wallpaper)} />
        ))}
      </div>
      {selectedWallpaper && <WallpaperModal wallpaper={selectedWallpaper} category={categories[selectedWallpaper.categoryId] || "Unknown Category"} isOpen={!!selectedWallpaper} onClose={handleCloseModal} />}
    </div>
  );
}
