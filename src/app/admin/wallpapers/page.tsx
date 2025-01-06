"use client";

import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import WallpaperModal from "@/components/admin/wallpapers/WallpaperModal";
import WallpapersCard from "@/components/admin/wallpapers/WallpapersCard";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import axios from "axios";
import { useState, useCallback } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Wallpaper } from "@/types/wallpaper.type";
import Header from "@/components/admin/wallpapers/Header";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useAdminSearch } from "@/contexts/AdminSearchContext";

type CategoryMap = Record<number, string>;

export default function WallpapersPage() {
  const { isOpen } = useAdminSidebar();
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const { wallpapers, setWallpapers, getWallpapers } = useWallpaper();
  const { search } = useAdminSearch();
  // const { data: wallpapers } = useFetch<Wallpaper[]>("/api/wallpapers", 60000);
  const { data: categoriesName } = useFetch<Category[], CategoryMap>(
    "/api/category",
    60000,
    useCallback((categories: Category[]) => 
      categories.reduce((acc, category) => ({ ...acc, [category.id]: category.name }), {} as CategoryMap),
    []),
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
    getWallpapers();
  }, [selectedWallpaper]);

  useIsomorphicLayoutEffect(() => {
    if (search) {
      const searchWallpapers = async () => {
        try {
          const response = await axios.get(`/api/wallpapers/search?name=${search}`);
          setWallpapers(response.data);
        } catch (error) {
          console.error("Error searching wallpapers:", error);
        }
      }
      searchWallpapers();
    } else {
      getWallpapers();
    }
  }, [search])

  const handleWallpaperClick = useCallback((wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedWallpaper(null);
  }, []);

  return (
    <div className={cn("transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <Header />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {wallpapers?.map((wallpaper) => (
            <WallpapersCard 
              key={wallpaper.id} 
              wallpaper={wallpaper} 
              categories={categoriesName || {}} 
              handleWallpaperClick={handleWallpaperClick} 
            />
          ))}
        </div>
      </div>
      {selectedWallpaper && categoriesName && (
        <WallpaperModal 
          wallpaper={selectedWallpaper} 
          category={categoriesName[selectedWallpaper.categoryId] || "Unknown Category"} 
          isOpen={!!selectedWallpaper} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

