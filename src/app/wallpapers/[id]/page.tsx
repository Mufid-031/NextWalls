"use client";

import { NavBar } from "@/components/home/Navbar";
import Sidebar from "@/components/wallpapers/Sidebar";
import WallpaperImage from "@/components/wallpapers/WallpaperImage";
import { Wallpaper } from "@/types/wallpaper.type";
import { use, useState } from "react";

export default function WallpaperTagPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 bg-[#1a1a1a] flex z-50">
        <Sidebar
          id={id}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
        />
        <WallpaperImage wallpaper={wallpaper!}  />
      </main>
    </div>
  );
}

