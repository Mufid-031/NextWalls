"use client";

import { Button } from "@/components/ui/Button";
import { useSelectedFilters } from "@/contexts/SelectedFiltersContext";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { cn } from "@/lib/utils";
import { Input } from "../ui/Input";
import { ChevronDown, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 1,
    },
  },
};

export function FilterBar() {
  const { selectedFilters, toggleFilter, getWallpapersBySelectedFilters } = useSelectedFilters();
  const { setWallpapers } = useWallpaper();

  const handleFilterWallpaperClick = () => {
    getWallpapersBySelectedFilters(setWallpapers);
  };

  const categories = [{ name: "General" }, { name: "Anime" }, { name: "People" }];

  const optionsFilters = [
    {
      name: "Resolution",
      className: "px-12",
    },
    {
      name: "Ratio",
      className: "px-8",
    },
    {
      name: "Color",
      className: "px-8",
    },
    {
      name: "Random",
      className: "px-10",
    },
  ];

  return (
    <div className="hidden lg:block bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-white dark:bg-raisinblack bg-white py-1">
      <div className="flex items-center justify-center gap-2">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex items-center py-1 gap-2">
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex rounded-md bg-[#1a1a1a] p-[2px]">
            {categories?.map((category) => (
              <div key={category.name}>
                <Input type="checkbox" id={category.name} className="hidden" checked={selectedFilters.has(category.name)} onChange={() => toggleFilter(category.name)} />
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn("transition-all duration-300 px-8 border border-[#1a1a1a] shadow-inner shadow-black", selectedFilters.has(category.name) ? "bg-purple-500 text-white" : "bg-gray-600 text-gray-400")}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => toggleFilter(category.name)}
                >
                  {category.name}
                </Button>
              </div>
            ))}
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex items-center rounded-md bg-[#1a1a1a] p-[2px]">
            <Button
              variant="ghost"
              size="icon"
              className={cn("transition-all duration-300 px-8 border border-[#1a1a1a] shadow-inner shadow-black text-nowrap", selectedFilters.has("AI Art") ? "bg-purple-500 text-white" : "bg-gray-600 text-gray-400")}
              onClick={() => toggleFilter("AI Art")}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.01 }}
            >
              AI Art
            </Button>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex items-center rounded-md bg-[#1a1a1a] p-[2px]">
            <Button
              variant="ghost"
              size="icon"
              className={cn("transition-all duration-300 px-8 border border-[#1a1a1a] shadow-inner shadow-black text-nowrap", selectedFilters.has("SFW") ? "bg-green-500 text-white" : "bg-gray-600 text-gray-400")}
              onClick={() => toggleFilter("SFW")}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.01 }}
            >
              SFW
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("transition-all duration-300 px-8 border border-[#1a1a1a] shadow-inner shadow-black text-nowrap", selectedFilters.has("Sketchy") ? "bg-yellow-500 text-white" : "bg-gray-600 text-gray-400")}
              onClick={() => toggleFilter("Sketchy")}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.01 }}
            >
              Sketchy
            </Button>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="ml-auto flex items-center gap-2">
            {optionsFilters.map((option, index) => (
              <Button key={index} variant="ghost" size="icon" className={cn("flex items-center gap-1 text-gray-200 border border-[#1a1a1a] bg-[#1a1a1a] shadow-inner shadow-black text-nowrap hover:bg-[#2a2a2a]", option.className)}>
                {option.name}
                <div>
                  <ChevronDown className="w-4 h-4 text-white" />
                </div>
              </Button>
            ))}
          </motion.div>
          <Button onClick={handleFilterWallpaperClick} variant="ghost" size="icon" className="text-gray-200 border border-[#1a1a1a] bg-sky-600 shadow-inner shadow-black text-nowrap hover:bg-sky-700">
            <motion.span whileHover={{ rotate: 360, transition: { duration: 2, repeat: Infinity } }}>
              <RefreshCw className="w-4 h-4 text-white" />
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
