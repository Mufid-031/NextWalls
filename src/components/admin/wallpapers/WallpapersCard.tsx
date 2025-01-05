import { Eye, Heart, BookmarkPlus } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tag, WallpaperTag } from "@prisma/client";

interface Wallpaper {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userId: number;
  categoryId: number;
  views: number;
  totalSaves: number;
  totalLikes: number;
  width: number;
  height: number;
  wallpaperTags: WallpaperTag &
    {
      tag: Tag;
    }[];
  createdAt: Date;
  updatedAt: Date;
  liked?: boolean;
}

export default function WallpapersCard({
  key,
  wallpaper,
  categories,
  handleWallpaperClick,
}: {
  key: number;
  wallpaper: Wallpaper;
  categories: Record<number, string>;
  handleWallpaperClick: (wallpaper: Wallpaper) => void;
}) {
  return (
    <motion.div key={key} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => handleWallpaperClick(wallpaper)}>
      <div className="w-full h-64 bg-white rounded-t-md relative">
        <span className="absolute top-2 left-2 text-sm font-semibold text-white bg-gray-700 p-2 rounded">
          {wallpaper.width}x{wallpaper.height}
        </span>
        <Image 
            src={wallpaper.imageUrl} 
            alt={wallpaper.title} 
            width={500} 
            height={500} 
            className="w-full h-full object-cover rounded-md" 
        />
      </div>
      <div className="flex flex-col gap-2 p-2 bg-gray-700 rounded-b-md">
        <div className="flex gap-2 justify-between px-5 mt-5">
          <div className="flex gap-2">
            <p className="flex items-center gap-1 text-white text-sm font-semibold">
              <Eye className="w-4 h-4 text-blue-500" />
              {wallpaper.views}
            </p>
            <p className="flex items-center gap-1 text-white text-sm font-semibold">
              <Heart className="w-4 h-4 text-pink-600" />
              {wallpaper.totalLikes}
            </p>
            <p className="flex items-center gap-1 text-white text-sm font-semibold">
              <BookmarkPlus className="w-4 h-4 text-green-500" />
              {wallpaper.totalSaves}
            </p>
          </div>
          <div className="text-md text-white bg-purple-500 px-2 py-1 rounded">{categories[wallpaper.categoryId] || "Unknown Category"}</div>
        </div>
        <div className="cursor-pointer w-full pb-5 px-5">
          <motion.h3 whileHover={{ color: "#8b5cf6" }} className="text-lg font-semibold text-white">
            {wallpaper.title}
          </motion.h3>
        </div>
      </div>
    </motion.div>
  );
}
