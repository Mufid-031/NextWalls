import { Button } from "@/components/ui/Button";
import { useCategories } from "@/contexts/CategoriesContext";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useSelectedFilters } from "@/contexts/SelectedFiltersContext";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { Input } from "../ui/Input";

export function FilterBar() {
  const { isDarkMode } = useDarkMode();
  const { categories, getCategories } = useCategories();
  const { selectedFilters, toggleFilter, getWallpapersBySelectedFilters } = useSelectedFilters();
  const { setWallpapers } = useWallpaper();

  useIsomorphicLayoutEffect(() => {
    getWallpapersBySelectedFilters(setWallpapers);
    if (categories.length === 0) getCategories();
  }, [selectedFilters]);

  return (
    <div className={cn("bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-white", isDarkMode ? "bg-gray-800" : "bg-white")}>
      <div className="container flex items-center justify-center gap-2">
        <div className="flex items-center p-2">
          <div className="flex gap-1 p-1 m-1 bg-gray-700 rounded-md">
            {categories?.map((category) => (
              <div key={category.id}>
                <Input type="checkbox" id={category.name} className="hidden" checked={selectedFilters.has(category.name)} onChange={() => toggleFilter(category.name)} />
                <Button
                  variant="ghost"
                  className={cn("transition-all duration-300", selectedFilters.has(category.name) ? "bg-purple-500 text-white" : "bg-gray-600 text-gray-400")}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => toggleFilter(category.name)}
                >
                  {category.name}
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="default">
            AI Art
          </Button>
          <Button variant="ghost" size="default">
            SFW
          </Button>
          <Button variant="ghost" size="default">
            Sketchy
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="default">
              Resolution
            </Button>
            <Button variant="outline" size="default">
              Ratio
            </Button>
            <Button variant="outline" size="default">
              Color
            </Button>
            <Button variant="outline" size="default">
              Random
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
