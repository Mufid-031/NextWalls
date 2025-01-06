"use client";

import { Wallpaper } from "@prisma/client";
import React, { createContext, useContext, useState } from "react";

interface WallpaperContext {
    wallpapers: Wallpaper[];
    setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>;
}

const WallpaperContext = createContext<WallpaperContext | undefined>(undefined);

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
    const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

    return (
        <WallpaperContext.Provider value={{ wallpapers, setWallpapers }}>
            {children}
        </WallpaperContext.Provider>
    );
}

export function useWallpaper() {
    const context = useContext(WallpaperContext);
    if (context === undefined) {
        throw new Error("useWallpaper must be used within a WallpaperProvider");
    }
    return context;
}