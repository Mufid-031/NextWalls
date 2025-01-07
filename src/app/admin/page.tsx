"use client";

import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { useWallpaper } from "@/contexts/WallpaperContext";
import useFetch from "@/hooks/useFetch";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Images as ImageIcon, ChartBarStacked, Eye, Heart } from "lucide-react";

type topCategoriesType = Category & {
  _count: {
    wallpapers: number;
  };
};

export default function AdminPage() {
  const { isOpen } = useAdminSidebar();
  const { data: topCategories } = useFetch<topCategoriesType[]>("/api/category/top");
  const { wallpapers, getWallpapers, totalViews, getTotalViews } = useWallpaper();

  useIsomorphicLayoutEffect(() => {
    getWallpapers();
    getTotalViews();
  }, [])

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-2">
          <div className="w-full h-20 bg-white rounded-md flex items-center p-5 gap-4">
            <ImageIcon className="w-10 h-10 text-purple-500" />
            <div>
              <h3 className="font-semibold">Total Wallpapers</h3>
              <p className="text-sm">{wallpapers.length} Wallpapers</p>
            </div>
          </div>
          <div className="w-full h-20 bg-white rounded-md flex items-center p-5 gap-4">
            <ChartBarStacked className="w-10 h-10 text-purple-500" />
            <div>
              <h3 className="font-semibold">Total Categories</h3>
              <p className="text-sm">{topCategories?.length} Categories</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-full h-20 bg-white rounded-md flex items-center p-5 gap-4">
            <Eye className="w-10 h-10 text-purple-500" />
            <div>
              <h3 className="font-semibold">Total Views</h3>
              <p className="text-sm">{totalViews} Views</p>
            </div>
          </div>
          <div className="w-full h-20 bg-white rounded-md flex items-center p-5 gap-4">
            <Heart className="w-10 h-10 text-purple-500" fill="#a855f7"  />
            <div>
              <h3 className="font-semibold">Total Likes</h3>
              <p className="text-sm">100 Likes</p>
            </div>
          </div>
        </div>
        <div className="w-full p-5 bg-white rounded-md flex flex-col gap-4">
          <h3 className="font-bold text-lg">Recent Uploads</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-2">
              <div className="w-20 h-10 bg-gray-300 rounded"></div>
              <div>
                <h3 className="font-semibold">Wallpaper 1</h3>
                <p className="text-sm">Uploaded 2 hours ago</p>
              </div>
            </li>
            <li className="flex gap-2">
              <div className="w-20 h-10 bg-gray-300 rounded"></div>
              <div>
                <h3 className="font-semibold">Wallpaper 1</h3>
                <p className="text-sm">Uploaded 2 hours ago</p>
              </div>
            </li>
            <li className="flex gap-2">
              <div className="w-20 h-10 bg-gray-300 rounded"></div>
              <div>
                <h3 className="font-semibold">Wallpaper 1</h3>
                <p className="text-sm">Uploaded 2 hours ago</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-full p-5 bg-white rounded-md flex flex-col gap-4">
          <h3 className="font-bold text-lg">Top Categories</h3>
          <ul className="flex flex-col gap-4">
            {topCategories?.map((category) => (
              <li key={category.id} className="flex justify-between">
                <h3 className="font-semibold">{category.name}</h3>
                <p>{category._count.wallpapers} wallpapers</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
