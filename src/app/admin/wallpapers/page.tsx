"use client";

import { Button } from "@/components/ui/Button";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import WallpaperModal from "@/components/admin/wallpapers/WallpaperModal";
import WallpapersCard from "@/components/admin/wallpapers/WallpapersCard";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Wallpaper } from "@/types/wallpaper.type";
import { Input } from "@/components/ui/Input";

type CategoryMap = Record<number, string>;

export default function WallpapersPage() {
  const { isOpen } = useAdminSidebar();
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useFetch<Category[]>("/api/category", 60000);
  const { data: wallpapers, isLoading: wallpapersLoading, error: wallpapersError } = useFetch<Wallpaper[]>("/api/wallpapers", 60000);
  const { data: categoriesName, isLoading: categoriesNameLoading, error: categoriesNameError } = useFetch<Category[], CategoryMap>(
    "/api/category",
    60000,
    useCallback((categories: Category[]) => 
      categories.reduce((acc, category) => ({ ...acc, [category.id]: category.name }), {} as CategoryMap),
    []),
  );
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set(["General", "Anime"]));
  
  useIsomorphicLayoutEffect(() => {
    const addView = async () => {
      if (selectedWallpaper) {
        try {
          await axios.patch(`/api/wallpapers/view`, {
            wallpaperId: selectedWallpaper.id,
          });
        } catch (error) {
          console.error("Error adding view:", error);
        }
      }
    };

    addView();
  }, [selectedWallpaper]);

  const handleWallpaperClick = useCallback((wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedWallpaper(null);
  }, []);

  if (categoriesLoading || wallpapersLoading || categoriesNameLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError || wallpapersError || categoriesNameError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const toggleFilter = (filterName: string) => {
    const newSelected = new Set(selectedFilters);
    if (newSelected.has(filterName)) {
      newSelected.delete(filterName);
    } else {
      newSelected.add(filterName);
    }
    setSelectedFilters(newSelected);
  };

  return (
    <div className={cn("transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <header className="flex justify-center items-center h-16 bg-gray-700 gap-3 overflow-x-auto">
        <div className="flex gap-1 p-1 bg-gray-800 rounded">
          {categories?.map((category) => (
            <div key={category.id}>
              <Input
                type="checkbox"
                id={category.name}
                className="hidden"
                checked={selectedFilters.has(category.name)}
                onChange={() => toggleFilter(category.name)}
              />
              <Button
                variant="ghost"
                className={cn(
                  "transition-all duration-300",
                  selectedFilters.has(category.name)
                  ? "bg-purple-500 text-white"
                  : "bg-gray-700 text-gray-400"
                )}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => toggleFilter(category.name)}
              >
                {category.name}
              </Button>
            </div>
          ))}
        </div>
      </header>
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">Wallpapers</h2>
          <Button variant="ghost" className="bg-purple-500 text-white hover:bg-purple-600">
            <Link href="/admin/upload">Upload</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {wallpapers?.map((wallpaper) => (
            <WallpapersCard 
              key={wallpaper.id} 
              wallpaper={wallpaper} 
              categories={categoriesName || {}} 
              handleWallpaperClick={handleWallpaperClick} 
            />
          ))}
        </div>
      </div>
      {selectedWallpaper && categoriesName && (
        <WallpaperModal 
          wallpaper={selectedWallpaper} 
          category={categoriesName[selectedWallpaper.categoryId] || "Unknown Category"} 
          isOpen={!!selectedWallpaper} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

