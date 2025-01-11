"use client";

import Card from "@/components/admin/dashboard/Card";
import { Images as ImageIcon, ChartBarStacked, Eye, Heart } from "lucide-react";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useCategories } from "@/contexts/CategoriesContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import Image from "next/image";
import moment from "moment";

export default function AdminPage() {
  const { isOpen } = useAdminSidebar();
  const { topCategories, getTopCategories } = useCategories();
  const { wallpapers, recentWallpapers, getRecentWallpapers, totalViews, getTotalViews } = useWallpaper();

  useIsomorphicLayoutEffect(() => {
    if (wallpapers.length === 0 || wallpapers.length !== 3) {
      getTotalViews();
    }

    if (recentWallpapers.length === 0) {
      getRecentWallpapers();
    }

    if (topCategories.length === 0) {
      getTopCategories();
    }

    const intervalId = setInterval(() => {
      getRecentWallpapers();
      getTotalViews();
      getTopCategories();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <h2 className={cn("text-3xl font-bold dark:text-white text-black")}>Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-2">
          <Card icon={<ImageIcon className="w-10 h-10 text-purple-500" />} title="Total Wallpapers" desc={`${wallpapers?.length} Wallpapers`} />
          <Card icon={<ChartBarStacked className="w-10 h-10 text-purple-500" />} title="Total Categories" desc={`${topCategories?.length} Categories`} />
        </div>
        <div className="flex gap-2">
          <Card icon={<Eye className="w-10 h-10 text-purple-500" />} title="Total Views" desc={`${totalViews} Views`} />
          <Card icon={<Heart className="w-10 h-10 text-purple-500" fill="#a855f7" />} title="Total Likes" desc={`100 Likes`} />
        </div>
        <div className={cn("w-full p-5 rounded-md flex flex-col gap-4 dark:bg-gray-800 bg-white")}>
          <h3 className={cn("font-bold text-lg dark:text-white text-black")}>Recent Uploads</h3>
          <ul className="flex flex-col gap-4">
            {recentWallpapers?.map((wallpaper) => (
              <li key={wallpaper.id} className="flex gap-2">
                <div className="w-20 h-10 bg-gray-300 rounded">
                  <Image src={wallpaper.imageUrl} alt={wallpaper.title} width={100} height={100} />
                </div>
                <div>
                  <h3 className={cn("font-semibold dark:text-white text-black")}>{wallpaper.title}</h3>
                  <p className={cn("text-sm dark:text-white text-black")}>Uploads {moment(wallpaper.createdAt).fromNow()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn("w-full p-5 rounded-md flex flex-col gap-4 dark:bg-gray-800 bg-white")}>
          <h3 className={cn("font-bold text-lg dark:text-white text-black")}>Top Categories</h3>
          <ul className="flex flex-col gap-4">
            {topCategories?.map((category) => (
              <li key={category.id} className="flex justify-between">
                <h3 className={cn("font-semibold dark:text-white text-black")}>{category.name}</h3>
                <p className={cn("text-sm dark:text-white text-black")}>{category._count.wallpapers} wallpapers</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
