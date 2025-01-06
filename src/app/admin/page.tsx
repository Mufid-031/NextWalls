"use client";

import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";

type topCategoriesType = Category & {
  _count: {
    wallpapers: number;
  };
};

export default function AdminPage() {
  const { isOpen } = useAdminSidebar();
  const { data: topCategories } = useFetch<topCategoriesType[]>("/api/category/top");

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full h-40 bg-white rounded-md"></div>
        <div className="w-full h-40 bg-white rounded-md"></div>
        <div className="w-full h-40 bg-white rounded-md"></div>
        <div className="w-full h-40 bg-white rounded-md"></div>
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
