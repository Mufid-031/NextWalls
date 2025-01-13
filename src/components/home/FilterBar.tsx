"use client";

import { Button } from "@/components/ui/Button";
import { useCategories } from "@/contexts/CategoriesContext";
import { useSelectedFilters } from "@/contexts/SelectedFiltersContext";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { Input } from "../ui/Input";

export function FilterBar() {
  const { categories, getCategories } = useCategories();
  const { selectedFilters, toggleFilter, getWallpapersBySelectedFilters } = useSelectedFilters();
  const { setWallpapers } = useWallpaper();

  useIsomorphicLayoutEffect(() => {
    getWallpapersBySelectedFilters(setWallpapers);
    if (categories.length === 0) getCategories();
  }, [selectedFilters]);

  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-white dark:bg-raisinblack bg-white">
      <div className="container flex items-center justify-center gap-2">
        <div className="flex items-center py-1 gap-5">
          <div className="flex rounded-md bg-[#1a1a1a] p-[2px]">
            {categories?.map((category) => (
              <div key={category.id}>
                <Input type="checkbox" id={category.name} className="hidden" checked={selectedFilters.has(category.name)} onChange={() => toggleFilter(category.name)} />
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn("transition-all duration-300 px-10 border border-[#1a1a1a]", selectedFilters.has(category.name) ? "bg-purple-500 text-white" : "bg-gray-600 text-gray-400")}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => toggleFilter(category.name)}
                >
                  {category.name}
                </Button>
              </div>
            ))}
          </div>
          <div className="flex items-center rounded-md bg-[#1a1a1a] p-[2px]">
            <Button variant="ghost" size="icon" className="border border-[#1a1a1a] bg-gray-500 px-10 text-nowrap">
              AI Art
            </Button>
          </div>
          <div className="flex items-center rounded-md bg-[#1a1a1a] p-[2px]">
            <Button variant="ghost" size="icon" className="border border-[#1a1a1a] bg-green-500 px-10 text-nowrap">
              SFW
            </Button>
            <Button variant="ghost" size="icon" className="border border-[#1a1a1a] bg-gray-500 px-10 text-nowrap">
              Sketchy
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="border border-[#1a1a1a] bg-gray-500 px-10 text-nowrap">
              Resolution
            </Button>
            <Button variant="ghost" size="icon" className="border border-[#1a1a1a] bg-gray-500 px-10 text-nowrap">
              Ratio
            </Button>
            <Button variant="ghost" size="icon" className="border border-[#1a1a1a] bg-gray-500 px-10 text-nowrap">
              Color
            </Button>
            <Button variant="ghost" size="icon" className="border border-[#1a1a1a] bg-gray-500 px-10 text-nowrap">
              Random
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
