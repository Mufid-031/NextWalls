"use client";

import { NavBar } from "@/components/home/Navbar";
import Sidebar from "@/components/wallpapers/Sidebar";
import WallpaperImage from "@/components/wallpapers/WallpaperImage";
import { getWallpaperById } from "@/service/wallpaper";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function WallpaperTagPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: wallpaper } = useQuery({
    queryKey: ["wallpaper"],
    queryFn: () => getWallpaperById(id),
  });

  return (
    <div className="flex flex-col">
      <NavBar />
      <main className="flex-1 bg-[#1a1a1a] flex z-50">
        <Sidebar
          id={id}
          wallpaper={wallpaper}
        />
        <WallpaperImage wallpaper={wallpaper!}  />
      </main>
    </div>
  );
}

