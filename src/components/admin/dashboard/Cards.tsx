"use client";

import { useWallpaper } from "@/contexts/WallpaperContext";
import Card from "./Card";
import { Images as ImageIcon, ChartBarStacked, Eye, Heart } from "lucide-react";
import { useCategories } from "@/contexts/CategoriesContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export default function Cards() {
  const { wallpapers, getWallpapers, totalViews, getTotalViews } = useWallpaper();
  const { topCategories } = useCategories();

  useIsomorphicLayoutEffect(() => {
    if (wallpapers.length === 0 || wallpapers.length !== 3) {
      getWallpapers();
      getTotalViews();
    }

    const intervalId = setInterval(() => {
      getTotalViews();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex gap-2">
        <Card icon={<ImageIcon className="w-10 h-10 text-purple-500" />} title="Total Wallpapers" desc={`${wallpapers?.length} Wallpapers`} />
        <Card icon={<ChartBarStacked className="w-10 h-10 text-purple-500" />} title="Total Categories" desc={`${topCategories?.length} Categories`} />
      </div>
      <div className="flex gap-2">
        <Card icon={<Eye className="w-10 h-10 text-purple-500" />} title="Total Views" desc={`${totalViews} Views`} />
        <Card icon={<Heart className="w-10 h-10 text-purple-500" fill="#a855f7" />} title="Total Likes" desc={`100 Likes`} />
      </div>
    </>
  );
}
