"use client";

import Header from "@/components/admin/wallpapers/Header";
import WallpaperModal from "@/components/admin/wallpapers/WallpaperModal";
import WallpapersCard from "@/components/admin/wallpapers/WallpapersCard";
import { cn } from "@/lib/utils";
import { Wallpaper } from "@/types/wallpaper.type";
import { useState, useCallback } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useSearch } from "@/contexts/SearchContext";


export default function WallpapersPage() {
  const { isOpen } = useAdminSidebar();
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const { wallpapers, setWallpapers, getWallpapers, addView } = useWallpaper();
  const { search, searchWallpapers } = useSearch();

  useIsomorphicLayoutEffect(() => {
    if (wallpapers.length === 0) getWallpapers();

    const intervalId = setInterval(() => {
      getWallpapers();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useIsomorphicLayoutEffect(() => {
    addView(selectedWallpaper!);

    const intervalId = setInterval(() => {
      getWallpapers();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [selectedWallpaper]);

  useIsomorphicLayoutEffect(() => {
    if (search) {
      searchWallpapers(setWallpapers);
    } else if (!search || wallpapers.length === 0) {
      getWallpapers();
    }
  }, [search]);

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
              handleWallpaperClick={handleWallpaperClick} 
            />
          ))}
        </div>
      </div>
      {selectedWallpaper
       && wallpapers 
       && <WallpaperModal 
       wallpaper={selectedWallpaper} 
       isOpen={!!selectedWallpaper} 
       onClose={handleCloseModal} 
      />}
    </div>
  );
}
