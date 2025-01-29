"use client";

import { Wallpaper } from "@/types/wallpaper.type";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WallpaperImage({ wallpaper }: { wallpaper: Wallpaper}) {

    return (
        <div className="flex justify-center items-center w-full">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.5 } }} className="p-10 h-[42rem]">
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
          </motion.div>
        </div>
    )
}