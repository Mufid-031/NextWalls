"use client";

import { NavBar } from "@/components/home/Navbar";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Wallpaper } from "@/types/wallpaper.type";
import React, { use, useState } from "react";

export default function WallpaperIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getWallpaperById } = useWallpaper();
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

  useIsomorphicLayoutEffect(() => {
    getWallpaperById(id).then(setWallpaper);
  }, [id, getWallpaperById]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-30 w-full">
        <NavBar />
      </header>
      <main className="flex-1 container px-10 pt-36">
        <h1 className="text-4xl text-black">{wallpaper?.title}</h1>
      </main>
    </div>
  );
}
