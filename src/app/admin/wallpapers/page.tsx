"use client";

import { Button } from "@/components/ui/Button";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function WallpapersPage() {
  const { isOpen } = useAdminSidebar();

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Wallpapers</h2>
        <Button variant="ghost" className="bg-purple-500 text-white hover:bg-purple-600" whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
            <Link href="/admin/upload">Upload</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="w-full h-52 bg-white rounded-md"></div>
        <div className="w-full h-52 bg-white rounded-md"></div>
        <div className="w-full h-52 bg-white rounded-md"></div>
        <div className="w-full h-52 bg-white rounded-md"></div>
        <div className="w-full h-52 bg-white rounded-md"></div>
        <div className="w-full h-52 bg-white rounded-md"></div>
        <div className="w-full h-52 bg-white rounded-md"></div>
        <div className="w-full h-52 bg-white rounded-md"></div>
        <div className="w-full h-52 bg-white rounded-md"></div>
      </div>
    </div>
  );
}
