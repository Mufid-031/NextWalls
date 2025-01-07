"use client";

import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { Wallpaper } from "@/types/wallpaper.type";

interface WallpaperContext {
  wallpapers: Wallpaper[];
  setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>;
  getWallpapers: () => Promise<void>;
  totalViews: number;
  getTotalViews: () => Promise<void>;
}

const WallpaperContext = createContext<WallpaperContext | undefined>(undefined);

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [totalViews, setTotalViews] = useState<number>(0);

  const getWallpapers = async () => {
    try {
      const response = await axios.get("/api/wallpapers");
      setWallpapers(response.data);
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    }
  };

  const getTotalViews = async () => {
    try {
      const response = await axios.get("/api/wallpapers/view");
      setTotalViews(response.data.totalViews);
    } catch (error) {
      console.error("Error fetching total views:", error);
    }
  };

  return <WallpaperContext.Provider value={{ wallpapers, setWallpapers, getWallpapers, totalViews, getTotalViews }}>{children}</WallpaperContext.Provider>;
}

export function useWallpaper() {
  const context = useContext(WallpaperContext);
  if (context === undefined) {
    throw new Error("useWallpaper must be used within a WallpaperProvider");
  }
  return context;
}
