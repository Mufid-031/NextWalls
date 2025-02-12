"use client";

import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { Wallpaper } from "@/types/wallpaper.type";

interface WallpaperContext {
  wallpapers: Wallpaper[];
  setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>;
  getWallpapers: () => Promise<void>;
  recentWallpapers: Wallpaper[];
  getRecentWallpapers: () => Promise<void>;
  totalViews: number;
  getTotalViews: () => Promise<void>;
  getWallpaperById: (id: string) => Promise<Wallpaper | null>;
  addView: (selectedWallpaper: Wallpaper) => Promise<void>;
  getWallpapersByTag: (tag: string) => Promise<void>;
  getWallpapersByColor: (color: string) => Promise<void>;
}

const WallpaperContext = createContext<WallpaperContext | undefined>(undefined);

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [recentWallpapers, setRecentWallpapers] = useState<Wallpaper[]>([]);
  const [totalViews, setTotalViews] = useState<number>(0);

  const getWallpapers = async () => {
    try {
      const response = await axios.get("/api/wallpapers");
      setWallpapers(response.data);
    } catch (error) {
      console.log("Error fetching wallpapers:", error);
      setWallpapers([]);
    }
  };

  const getRecentWallpapers = async () => {
    try {
      const response = await axios.get("/api/wallpapers/recent");
      setRecentWallpapers(response.data);
    } catch (error) {
      console.log("Error fetching recent wallpapers:", error);
      setRecentWallpapers([]);
    }
  };

  const getTotalViews = async () => {
    try {
      const response = await axios.get("/api/wallpapers/view");
      setTotalViews(response.data.totalViews);
    } catch (error) {
      console.log("Error fetching total views:", error);
      setTotalViews(0);
    }
  };

  const getWallpaperById = async (id: string) => {
    try {
      const response = await axios.get(`/api/wallpapers/${id}`);
      return await response.data;
    } catch (error) {
      console.log("Error fetching wallpaper by ID:", error);
      return [];
    }
  };

  const addView = async (selectedWallpaper: Wallpaper) => {
    if (selectedWallpaper) {
      try {
        await axios.patch(`/api/wallpapers/view`, {
          wallpaperId: selectedWallpaper.id,
        });
      } catch (error) {
        console.log("Error adding view:", error);
      }
    }
  };

  const getWallpapersByTag = async (tag: string) => {
    try {
      const response = await axios.get(`/api/wallpapers/tag/${tag}`);
      setWallpapers(response.data);
    } catch (error) {
      console.log("Error fetching wallpapers by tag:", error);
      setWallpapers([]);
    }
  }

  const getWallpapersByColor = async (color: string) => {
    try {
      const response = await axios.get(`/api/wallpapers/color/${color}`);
      setWallpapers(response.data);
    } catch (error) {
      console.log("Error fetching wallpapers by color:", error);
    }
  }

  return <WallpaperContext.Provider 
    value={{ 
      wallpapers, 
      setWallpapers, 
      getWallpapers, 
      recentWallpapers, 
      getRecentWallpapers, 
      totalViews, 
      getTotalViews, 
      getWallpaperById,
      addView,
      getWallpapersByTag,
      getWallpapersByColor
    }}>
      {children}
    </WallpaperContext.Provider>;
}

export function useWallpaper() {
  const context = useContext(WallpaperContext);
  if (context === undefined) {
    throw new Error("useWallpaper must be used within a WallpaperProvider");
  }
  return context;
}
