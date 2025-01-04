"use client";

import { Button } from "@/components/ui/Button";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookmarkPlus, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";

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
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: number;
  name: string;
}

export default function WallpapersPage() {
  const { isOpen } = useAdminSidebar();
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [categories, setCategories] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await axios.get("/api/wallpapers");
        setWallpapers(response.data);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/category`);
        const categoriesData: Category[] = response.data;
        const categoriesMap = categoriesData.reduce((acc, category) => ({ ...acc, [category.id]: category.name }), {});
        setCategories(categoriesMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchWallpapers();
    fetchCategories();
  }, []);

  return (
    <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Wallpapers</h2>
        <Button variant="ghost" className="bg-purple-500 text-white hover:bg-purple-600" whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
          <Link href="/admin/upload">Upload</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {wallpapers.map((wallpaper) => (
          <div key={wallpaper.id}>
            <div className="w-full h-52 bg-white rounded-t-md relative">
              <span className="absolute top-2 left-2 text-sm font-semibold text-white bg-gray-700 p-2 rounded">
                {wallpaper.width}x{wallpaper.height}
              </span>
              <Image src={wallpaper.imageUrl} alt={wallpaper.title} width={500} height={500} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="flex flex-col gap-2 p-2 bg-gray-700 rounded-b-md">
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <p className="flex items-center gap-1 text-white text-sm font-semibold">
                    <Eye className="w-4 h-4" />
                    {wallpaper.views}
                  </p>
                  <p className="flex items-center gap-1 text-white text-sm font-semibold">
                    <Heart className="w-4 h-4" />
                    {wallpaper.totalLikes}
                  </p>
                  <p className="flex items-center gap-1 text-white text-sm font-semibold">
                    <BookmarkPlus className="w-4 h-4" />
                    {wallpaper.totalSaves}
                  </p>
                </div>
                <div className="text-md text-white bg-purple-500 px-2 py-1 rounded">{categories[wallpaper.categoryId] || "Unknown Category"}</div>
              </div>
              <div className="cursor-pointer w-full">
                <motion.h3 whileHover={{ color: "#8b5cf6" }} className="text-lg font-semibold text-white">{wallpaper.title}</motion.h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
