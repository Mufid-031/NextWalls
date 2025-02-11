"use client";

import { NavBar } from "@/components/home/Navbar";
import { FilterBar } from "@/components/home/FilterBar";
import { ImageGrid } from "@/components/home/ImageGrid";
import { useQuery } from "@tanstack/react-query";
import { getWallpapers } from "@/service/wallpaper";

export default function Home() {
  const { data: wallpapers, isLoading } = useQuery({
    queryKey: ["wallpapers"],
    queryFn: getWallpapers,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
        <FilterBar />
      </header>
      <main className="w-full px-10 pt-36 dark:bg-[#1a1a1a] bg-white">
        <ImageGrid wallpapers={wallpapers ?? []} isLoaded={!isLoading} />
      </main>
    </div>
  );
}
