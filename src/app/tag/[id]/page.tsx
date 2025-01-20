"use client";

import { ImageGrid } from "@/components/home/ImageGrid";
import { NavBar } from "@/components/home/Navbar";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { use } from "react";

export default function WallpaperIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getWallpapersByTag } = useWallpaper();

  useIsomorphicLayoutEffect(() => {
    if (id) getWallpapersByTag(id);
  }, [id])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
      </header>
      <main className="w-full px-10 pt-36 dark:bg-[#1a1a1a] bg-white">
        <ImageGrid />
      </main>
    </div>
  );
}