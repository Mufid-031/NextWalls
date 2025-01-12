"use client";

import { NavBar } from "@/components/home/Navbar";
import { Button } from "@/components/ui/Button";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { Wallpaper } from "@/types/wallpaper.type";
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";
import React, { use, useState } from "react";
import ColorThief from "colorthief";

export default function WallpaperIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getWallpaperById } = useWallpaper();
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [openTags, setOpenTags] = useState<boolean>(true);
  const [palette, setPalette] = useState<string[]>([]);

  useIsomorphicLayoutEffect(() => {
    getWallpaperById(id).then(setWallpaper);
  }, [id, getWallpaperById]);

  useIsomorphicLayoutEffect(() => {
    if (wallpaper?.imageUrl) {
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";
      img.src = wallpaper.imageUrl;
      img.onload = () => {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(img, 5);
        setPalette(colors.map((color: number[]) => `rgb(${color[0]},${color[1]},${color[2]})`));
      };
    }
  }, [wallpaper?.imageUrl]);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 bg-[#1a1a1a] flex z-50">
        <div
          className={cn(
            "relative transition-all duration-300 p-2",
            isOpenSidebar
              ? "w-[24rem] bg-gradient-to-r from-darkgunmetal to-black translate-x-0"
              : "w-3 bg-black -translate-x-[0.4rem]"
          )}
        >
          <div className="z-0 absolute top-10 -right-7 w-10 h-10 rounded-r-full bg-black flex justify-center items-center">
            {isOpenSidebar ? (
              <ChevronLeft className="w-5 h-5 text-white" onClick={() => setIsOpenSidebar(false)} />
            ) : (
              <ChevronRight className="w-5 h-5 text-white" onClick={() => setIsOpenSidebar(true)} />
            )}
          </div>
          {isOpenSidebar && (
            <>
              <div className="w-full h-40 flex justify-center -ml-2 relative">
                <p className="absolute top-5 left-14 text-sm font-semibold text-green-500">Width</p>
                <h2 className="text-3xl font-bold text-white mt-10">
                  {wallpaper?.width} x {wallpaper?.height}
                </h2>
                <p className="absolute bottom-16 right-14 text-sm font-semibold text-red-500">Height</p>
                {/* Warna Dominan */}
                <div className="absolute bottom-5 flex pl-4">
                  {palette.map((color, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: color }}
                      className="w-14 h-5"
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>
              <hr className="mx-2 text-slate-500" />
              <div className="w-full h-80">
                <Button onClick={() => setOpenTags(!openTags)} variant="ghost" className="text-green-500 flex gap-1">
                  {openTags ? (
                    <ChevronDown className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white" />
                  )}
                  Tags
                </Button>
                {openTags && (
                  <div className="flex flex-wrap gap-1 pl-5">
                    {wallpaper?.wallpaperTags.map((wallpaperTag) => (
                      <div key={wallpaperTag.tag.id} className="flex items-center gap-2">
                        <span className="text-sm font-semibold bg-slate-600 text-green-400 p-1 rounded">
                          {wallpaperTag.tag.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <hr className="mx-2 text-slate-500" />
              <div className=""></div>
            </>
          )}
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="p-10 h-[42rem]">
            {wallpaper && (
              <Image
                className="w-full h-full object-cover"
                unoptimized={true}
                src={wallpaper.imageUrl}
                alt={wallpaper.title}
                width={500}
                height={500}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

