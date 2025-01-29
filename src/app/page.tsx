"use client";

import { NavBar } from "@/components/home/Navbar";
import { FilterBar } from "@/components/home/FilterBar";
import { ImageGrid } from "@/components/home/ImageGrid";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useSearch } from "@/contexts/SearchContext";
import { useState } from "react";

export default function Home() {
  const { wallpapers, getWallpapers, setWallpapers } = useWallpaper();
  const { search, searchWallpapers } = useSearch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    if (search) {
      searchWallpapers(setWallpapers);
    }
    getWallpapers();
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
        <FilterBar />
      </header>
      <main className="w-full px-10 pt-36 dark:bg-[#1a1a1a] bg-white">
        <ImageGrid wallpapers={wallpapers} isLoaded={isLoaded} />
      </main>
    </div>
  );
}
