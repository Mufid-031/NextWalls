"use client";

import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import Cards from "@/components/admin/dashboard/Cards";
import RecentWallpapers from "@/components/admin/dashboard/RecentWallpapers";
import TopCategories from "@/components/admin/dashboard/TopCategories";

export default function AdminPage() {
  const { isOpen } = useAdminSidebar();

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <h2 className="text-3xl font-bold dark:text-white text-black">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Cards />
        <RecentWallpapers />
        <TopCategories />
      </div>
    </div>
  );
}
