"use client";

import { NavBar } from "@/components/home/Navbar";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { Wallpaper } from "@/types/wallpaper.type";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React, { use, useState } from "react";

export default function WallpaperIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getWallpaperById } = useWallpaper();
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);

  useIsomorphicLayoutEffect(() => {
    getWallpaperById(id).then(setWallpaper);
  }, [id, getWallpaperById]);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 bg-[#1a1a1a] flex">
        <div className={cn("grid grid-rows-3 relative transition-all duration-300", isOpenSidebar ? "w-[30rem] bg-gradient-to-r from-darkgunmetal to-black" : "w-3 bg-black")}>
          <div className="absolute top-10 -right-7 w-10 h-10 rounded-r-full bg-black flex justify-center items-center">
            {isOpenSidebar ? (
              <ChevronLeft className="w-5 h-5 text-white" onClick={() => setIsOpenSidebar(false)} />
            ): (
              <ChevronLeft className="w-5 h-5 text-white" onClick={() => setIsOpenSidebar(true)} />
            )}
          </div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className="p-5">{wallpaper && <Image className="w-full h-full object-cover" unoptimized={true} src={wallpaper?.imageUrl} alt={wallpaper?.title} width={500} height={500} />}</div>
      </main>
    </div>
  );
}
