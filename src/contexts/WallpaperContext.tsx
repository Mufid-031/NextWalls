"use client";

import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { Wallpaper } from "@/types/wallpaper.type";

interface WallpaperContext {
  wallpapers: Wallpaper[];
  setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>;
  getWallpapers: () => Promise<void>;
}

const WallpaperContext = createContext<WallpaperContext | undefined>(undefined);

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

  const getWallpapers = async () => {
    try {
      const response = await axios.get("/api/wallpapers");
      setWallpapers(response.data);
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    }
  };

  return <WallpaperContext.Provider value={{ wallpapers, setWallpapers, getWallpapers }}>{children}</WallpaperContext.Provider>;
}

export function useWallpaper() {
  const context = useContext(WallpaperContext);
  if (context === undefined) {
    throw new Error("useWallpaper must be used within a WallpaperProvider");
  }
  return context;
}
