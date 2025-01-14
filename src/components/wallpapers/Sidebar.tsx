"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { Wallpaper } from "@/types/wallpaper.type";
import ColorThief from "colorthief";

export default function Sidebar({ 
    id, 
    wallpaper, 
    setWallpaper 
}: { 
    id: string, 
    wallpaper: Wallpaper | null,
    setWallpaper: React.Dispatch<React.SetStateAction<Wallpaper | null>> 
}) {
    const { getWallpaperById } = useWallpaper();
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
    const [palette, setPalette] = useState<string[]>([]);
    const [openTags, setOpenTags] = useState<boolean>(true);
    const [openProperties, setOpenProperties] = useState<boolean>(true);

    useIsomorphicLayoutEffect(() => {
      getWallpaperById(id).then((data) => setWallpaper(data));
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
              <div className="w-full h-28 flex justify-center -ml-2 relative">
                <h2 className="text-3xl text-white mt-1">
                  {wallpaper?.width} x {wallpaper?.height}
                </h2>
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
              <div className="w-full pb-5">
                <Button 
                  onClick={() => setOpenTags(!openTags)} 
                  variant="ghost" 
                  className="text-green-500 flex gap-1"
                >
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
                        <span className="text-xs font-semibold bg-slate-800 text-green-400 p-1 rounded">
                          {wallpaperTag.tag.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <hr className="mx-2 text-slate-500" />
              <div className="w-full pb-5">
                <Button 
                  onClick={() => setOpenProperties(!openProperties)} 
                  variant="ghost" 
                  className="text-green-500 flex gap-1"
                >
                  {openProperties ? (
                    <ChevronDown className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white" />
                  )}
                  Properties
                </Button>
                <div>
                  <h3>Uploader : {wallpaper?.uploadedBy.name}</h3>
                </div>
              </div>
            </>
          )}
        </div>
    )
}