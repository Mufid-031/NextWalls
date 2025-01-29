"use client";

import { useWallpaper } from "@/contexts/WallpaperContext";
import { formatNumber } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import { Tag, WallpaperTag } from "@prisma/client";
import { Search, Tags } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallpaper } from "@/types/wallpaper.type";

interface ImageCardProps {
  id: number;
  src: string;
  totalViews: number;
  resolution: string;
  wallpaperTags: WallpaperTag & { tag: Tag }[];
  handleAddCommentClick: () => void;
}

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
    },
  }),
};

function ImageCard({ id, src, totalViews, resolution, wallpaperTags, handleAddCommentClick }: ImageCardProps) {
  const [isOpenTags, setIsOpenTags] = useState(false);
  const { push } = useRouter();

  const handleTagClick = (e: React.MouseEvent<HTMLSpanElement>, tagId: string) => {
    e.stopPropagation();
    push(`/tag/${tagId}`);
  };

  return (
    <motion.div custom={id} variants={itemVariants} className="group relative overflow-hidden rounded-lg z-30" onClick={handleAddCommentClick}>
      {isOpenTags && (
        <div className="absolute top-0 left-0 right-0 bg-black/50 p-2 text-xs text-white flex gap-1 flex-wrap items-center">
          {wallpaperTags.map((wallpaperTag, index) => (
            <span key={wallpaperTag.tag.id + index} onClick={(e) => handleTagClick(e, wallpaperTag.tag.id.toString())} className="flex gap-1 items-center text-green-400 bg-gray-700 px-2 py-1 rounded-md cursor-pointer">
              {wallpaperTag.tag.name}
              <Search className="w-4 h-4 text-white" />
            </span>
          ))}
        </div>
      )}
      <Image src={src} alt="Wallpaper" width={400} height={225} className="h-[225px] w-full object-cover transition-transform duration-300" />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-xs text-white opacity-0 translate-y-[100%] group-hover:translate-y-0 transition-all duration-300 group-hover:opacity-100 flex justify-between items-center">
        <p>{formatNumber(totalViews)} views</p>
        <p>{resolution}</p>
        <p
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenTags(!isOpenTags);
          }}
        >
          <Tags className={cn("w-5 h-5", isOpenTags ? "text-green-400" : "text-white")} />
        </p>
      </div>
    </motion.div>
  );
}

export function ImageGrid({ wallpapers, isLoaded }: { wallpapers: Wallpaper[]; isLoaded: boolean }) {
  const { addView } = useWallpaper();
  const { push } = useRouter();

  const handleWallpaperDetailClick = (wallpaperId: number) => {
    const wallpaper = wallpapers.find((w) => w.id === wallpaperId);
    if (wallpaper) {
      addView(wallpaper);
      push(`/wallpapers/${wallpaperId}`);
    }
  };

  return (
    <div className="py-8 px-10">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wallpapers.length > 0 && isLoaded ? (
          wallpapers.map((wallpaper, index) => (
            <ImageCard
              id={index}
              key={wallpaper.title + wallpaper.id}
              src={wallpaper.imageUrl}
              totalViews={wallpaper.views}
              resolution={`${wallpaper.width}x${wallpaper.height}`}
              wallpaperTags={wallpaper.wallpaperTags}
              handleAddCommentClick={() => handleWallpaperDetailClick(wallpaper.id)}
            />
          ))
        ) : (
          <p>Not Found</p>
        )}
      </motion.div>
    </div>
  );
}
