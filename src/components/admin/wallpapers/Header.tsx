import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useSelectedFilters } from "@/contexts/SelectedFiltersContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useCategories } from "@/contexts/CategoriesContext";

export default function Header() {
    const { categories, getCategories } = useCategories();
    const { selectedFilters, toggleFilter, getWallpapersBySelectedFilters } = useSelectedFilters();
    const { setWallpapers } = useWallpaper();

    useIsomorphicLayoutEffect(() => {
      getWallpapersBySelectedFilters(setWallpapers);
      if (categories.length === 0) getCategories();
    }, [selectedFilters])

    return (
        <header className="flex items-center bg-gray-700 gap-3 overflow-x-auto px-4 py-2">
        <div className="flex gap-1 p-2 bg-gray-800 rounded-md">
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
    )
}