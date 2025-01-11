"use client";

import { NavBar } from "@/components/home/Navbar";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Wallpaper } from "@/types/wallpaper.type";
import Image from "next/image";
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
      <NavBar />
      <main className="flex-1 bg-gray-950 grid grid-cols-[3fr_10fr]">
        <div className="bg-gray-900 grid grid-rows-3 gap-2 p-2">
          <div className="bg-gray-700"></div>
          <div className="bg-gray-700"></div>
          <div className="bg-gray-700"></div>
        </div>
        <div className="p-5">{wallpaper && <Image className="w-full h-full object-cover" unoptimized={true} src={wallpaper?.imageUrl} alt={wallpaper?.title} width={500} height={500} />}</div>
      </main>
    </div>
  );
}
