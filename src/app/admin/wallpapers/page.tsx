"use client";

import { Button } from "@/components/ui/Button";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import WallpaperModal from "@/components/admin/wallpapers/WallpaperModal";
import WallpapersCard from "@/components/admin/wallpapers/WallpapersCard";
import useFetch from "@/hooks/useFetch";
import { Wallpaper } from "@/types/wallpaper.type";
import { useIsomorphicLayoutEffect } from "framer-motion";

export default function WallpapersPage() {
  const { isOpen } = useAdminSidebar();
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const { data: wallpapers } = useFetch("/api/wallpapers", 60000);
  const { data: categories } = useFetch(
    "/api/category",
    60000,
    (categories) => categories.reduce((acc: Record<number, string>, category: { id: number; name: string }) => ({ ...acc, [category.id]: category.name }), {})
  );

  useIsomorphicLayoutEffect(() => {
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
        {wallpapers?.map((wallpaper: Wallpaper) => (
          <WallpapersCard key={wallpaper.id} wallpaper={wallpaper} categories={categories} handleWallpaperClick={(wallpaper) => handleWallpaperClick(wallpaper)} />
        ))}
      </div>
      {selectedWallpaper && <WallpaperModal wallpaper={selectedWallpaper} category={categories[selectedWallpaper.categoryId] || "Unknown Category"} isOpen={!!selectedWallpaper} onClose={handleCloseModal} />}
    </div>
  );
}
