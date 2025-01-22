"use client";

import { ImageGrid } from "@/components/home/ImageGrid";
import { NavBar } from "@/components/home/Navbar";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function WallpaperIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { wallpapers, getWallpapersByTag } = useWallpaper();

  useIsomorphicLayoutEffect(() => {
    if (id) getWallpapersByTag(id);
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
      </header>
      <main className="w-full pt-7 dark:bg-[#1a1a1a] bg-white relative">
        <div className="w-full h-80 bg-white">
          <Image 
            unoptimized 
            src={wallpapers[0]?.imageUrl} 
            alt="Wallpaper" 
            width={500} 
            height={500} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute top-[25rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] bg-white bg-opacity-20 flex flex-col">
          <div className="flex justify-between p-5 w-full h-[15rem]">
            <div className="flex flex-col bg-black bg-opacity-20 p-5 pr-20">
              <div className="flex">
                <div className="flex items-center px-3 w-28 h-9 bg-gray-900 relative after:absolute after:-right-3 after:top-[5px] after:rotate-45 after:w-[1.6rem] after:h-[1.6rem] after:bg-gray-900 after:border-r-2 after:border-t-2 after:border-slate-400 after:z-10">
                  <Link className="text-white hover:underline font-semibold" href="/wallpapers">Wallpapers</Link>
                </div>
                <div className="flex items-center px-8 w-24 h-9 bg-gray-900 relative after:absolute after:-right-3 after:top-[5px] after:rotate-45 after:w-[1.6rem] after:h-[1.6rem] after:bg-gray-900 after:border-r-2 after:border-t-2 after:border-slate-400">
                  <Link className="text-white hover:underline font-semibold" href="/tags">Tags</Link>
                </div>
              </div>
              <h1>{wallpapers[0]?.wallpaperTags.find((wallpapersTag) => wallpapersTag.tag.id === Number(id))?.tag.name ?? ""}</h1>
            </div>
            <div></div>
          </div>
          <ImageGrid />
        </div>
      </main>
    </div>
  );
}
