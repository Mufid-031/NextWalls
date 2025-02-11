import { Wallpaper } from "@/types/wallpaper.type";
import axios from "axios";

export const getWallpapers = async () => {
  try {
    const response = await axios.get("/api/wallpapers");
    return response.data;
  } catch (error) {
    console.log("Error fetching wallpapers:", error);
    throw error;
  }
};

export const getRecentWallpapers = async () => {
  try {
    const response = await axios.get("/api/wallpapers/recent");
    return response.data;
  } catch (error) {
    console.log("Error fetching recent wallpapers:", error);
    throw error;
  }
};

export const getTotalViews = async () => {
  try {
    const response = await axios.get("/api/wallpapers/view");
    return response.data.totalViews;
  } catch (error) {
    console.log("Error fetching total views:", error);
    throw error;
  }
};

export const getWallpaperById = async (id: string) => {
  try {
    const response = await axios.get(`/api/wallpapers/${id}`);
    return await response.data;
  } catch (error) {
    console.log("Error fetching wallpaper by ID:", error);
    throw error;
  }
};

export const addView = async (selectedWallpaper: Wallpaper) => {
  if (selectedWallpaper) {
    try {
      await axios.patch(`/api/wallpapers/view`, {
        wallpaperId: selectedWallpaper.id,
      });
    } catch (error) {
      console.log("Error adding view:", error);
      throw error;
    }
  }
};

export const getWallpapersByTag = async (tag: string) => {
  try {
    const response = await axios.get(`/api/wallpapers/tag/${tag}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching wallpapers by tag:", error);
    throw error;
  }
};

export const getWallpapersByColor = async (color: string) => {
  try {
    const response = await axios.get(`/api/wallpapers/color/${color}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching wallpapers by color:", error);
    throw error;
  }
};

export const searchWallpapers = async (search: string) => {
  try {
    const response = await axios.get(`/api/wallpapers/search?name=${search}`);
    return response.data;
  } catch (error) {
    console.log("Error searching wallpapers:", error);
    throw error;
  }
};
