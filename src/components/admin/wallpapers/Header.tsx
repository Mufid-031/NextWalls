import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useState } from "react";

export default function Header() {
    const { data: categories } = useFetch<Category[]>("/api/category", 60000);
    const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set(["General", "Anime"]));

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
    )
}