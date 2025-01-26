"use client";

import { Wallpaper } from "@/types/wallpaper.type";
import axios from "axios";
import { useContext, useState, createContext } from "react";

type SearchContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchWallpapers: (setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState<string>("");

  const searchWallpapers = async (setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>) => {
    try {
      const response = await axios.get(`/api/wallpapers/search?name=${search}`);
      setWallpapers(response.data);
    } catch (error) {
      console.log("Error searching wallpapers:", error);
      setWallpapers([]);
    }
  };

  return <SearchContext.Provider value={{ search, setSearch, searchWallpapers }}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
