"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Wallpaper } from "@/types/wallpaper.type";
import { useAnimate, usePresence } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function WallpaperImage({ wallpaper }: { wallpaper: Wallpaper}) {
  const wallpaperRef = useRef(null);
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useIsomorphicLayoutEffect(() => {

    if (isPresent) {
      const enterAnimation = async () => {
        await animate(wallpaperRef.current, { opacity: 1, scale: 1 }, { duration: 0.5 });
      }
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(wallpaperRef.current, { opacity: 0, scale: 0 }, { duration: 0.5 });
        safeToRemove();
      }
      exitAnimation();
    }

  }, [isPresent])

    return (
        <div ref={scope} className="flex justify-center items-center w-full">
          <div className="p-10 h-[42rem]">
            {wallpaper && (
              <Image
                ref={wallpaperRef}
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
    )
}