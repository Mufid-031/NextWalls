"use client";

import { useWallpaper } from "@/contexts/WallpaperContext";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Eye, Image as ImageIcon, Search } from "lucide-react";
import { formatNumber } from "@/lib/format-number";
import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import JumbotronLayout from "./JumbotronLayout";
import { motion } from "framer-motion";
import { Wallpaper } from "@/types/wallpaper.type";

export default function Jumbotron({ id, relatedState, handleRelatedClick, totalView, totalSaved }: { id?: string; relatedState: Set<string>; handleRelatedClick: (related: string) => void; totalView: number; totalSaved: number }) {
  const { wallpapers } = useWallpaper();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

  useIsomorphicLayoutEffect(() => {
    const random = Math.floor(Math.random() * wallpapers.length);
    if (random) {
      setWallpaper(wallpapers[random]);
      setIsLoaded(true);
    }
  }, [wallpapers]);

  return (
    <JumbotronLayout
      className="h-[500px] overflow-hidden"
      backgroundImage={
        wallpaper?.imageUrl && isLoaded ? (
          <motion.div className="w-full h-full object-cover" initial={{ scale: 1.2 }} animate={{ scale: 1, transition: { duration: 1.5, ease: "easeInOut" } }}>
            <Image unoptimized src={wallpaper?.imageUrl || "/placeholder.svg"} alt="Wallpaper" width={1920} height={500} className="w-full h-full object-cover" />
          </motion.div>
        ) : null
      }
    >
      <div className="flex items-center space-x-2">
        <Link href="/wallpapers" className="text-white/80 hover:text-white">
          Wallpapers
        </Link>
        <span className="text-white/60">›</span>
        <Link href={`/${id ? "tags" : "color"}`} className="text-white/80 hover:text-white">
          {id ? "Tags" : "Colors"}
        </Link>
      </div>
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)]">
            #{id ? wallpapers[0]?.wallpaperTags.find((wallpapersTag) => wallpapersTag.tag.id === Number(id))?.tag.name : wallpapers[0]?.colorPalettes[0]?.colorPalette.color}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="appearance-none bg-black/50 backdrop-blur-sm text-white px-4 py-2 pr-8 rounded border border-white/20 hover:bg-black/60 transition-colors" name="alias" id="alias">
                <option value="zzz">Aliases: ZZZ</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <button className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded border border-white/20 hover:bg-black/60 transition-colors flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Search for more
            </button>
            <button className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded border border-white/20 hover:bg-black/60 transition-colors flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Subscribe
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white hover:underline cursor-pointer">{id ? "Related Tags: " : "Related Colors: "}</h3>
            {Array.from(relatedState).map((related, index) => (
              <span
                key={related + index}
                onClick={() => {
                  handleRelatedClick(related);
                }}
                className="text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)] flex gap-1 items-center"
              >
                #{related}
                <Search className="w-4 h-4" />
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-3 min-w-[200px]">
            <ImageIcon className="w-5 h-5" />
            <span className="text-lg">{formatNumber(wallpapers.length)}</span>
          </div>
          <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-3 min-w-[200px]">
            <Eye className="w-5 h-5" />
            <span className="text-lg">{formatNumber(totalView)}</span>
          </div>
          <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-3 min-w-[200px]">
            <Bookmark className="w-5 h-5" />
            <span className="text-lg">{formatNumber(totalSaved)}</span>
          </div>
        </div>
      </div>
    </JumbotronLayout>
  );
}
