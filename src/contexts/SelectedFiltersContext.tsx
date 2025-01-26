"use client";

import { Wallpaper } from "@/types/wallpaper.type";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

type SelectedFiltersContextType = {
  selectedFilters: Set<string>;
  toggleFilter: (filterName: string) => void;
  getWallpapersBySelectedFilters: (setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>) => Promise<void>;
};

export const SelectedFiltersContext = createContext<SelectedFiltersContextType | undefined>(undefined);

export function SelectedFiltersProvider({ children }: { children: React.ReactNode }) {
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set(["General", "Anime", "SFW"]));

  const toggleFilter = (filterName: string) => {
    const newSelected = new Set(selectedFilters);
    if (newSelected.has(filterName)) {
      newSelected.delete(filterName);
    } else {
      newSelected.add(filterName);
    }
    setSelectedFilters(newSelected);
  };

  const getWallpapersBySelectedFilters = async (setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>) => {
    try {
      const response = await axios.get(`/api/wallpapers/filter?general=${selectedFilters.has("General") ? "General" : ""}&anime=${selectedFilters.has("Anime") ? "Anime" : ""}&people=${selectedFilters.has("People") ? "People" : ""}`);
      setWallpapers(response.data);
    } catch (error) {
      console.log("Error searching wallpapers:", error);
    }
  };
  
  return <SelectedFiltersContext.Provider value={{ selectedFilters, toggleFilter, getWallpapersBySelectedFilters }}>{children}</SelectedFiltersContext.Provider>;
}

export function useSelectedFilters() {
  const context = useContext(SelectedFiltersContext);
  if (context === undefined) {
    throw new Error("useSelectedFilters must be used within a SelectedFiltersProvider");
  }
  return context;
}
