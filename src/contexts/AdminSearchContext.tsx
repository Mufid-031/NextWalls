"use client";

import { Wallpaper } from "@/types/wallpaper.type";
import axios from "axios";
import { useContext, useState, createContext } from "react";

type AdminSearchContextType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    searchWallpapers: (setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>) => void;
};

const AdminSearchContext = createContext<AdminSearchContextType | undefined>(undefined);

export function AdminSearchProvider({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState<string>('');

    const searchWallpapers = async (setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[]>>) => {
        try {
          const response = await axios.get(`/api/wallpapers/search?name=${search}`);
          setWallpapers(response.data);
        } catch (error) {
          console.error("Error searching wallpapers:", error);
        }
    }

    return (
        <AdminSearchContext.Provider value={{ search, setSearch, searchWallpapers }}>
            {children}
        </AdminSearchContext.Provider>
    );
}

export function useAdminSearch() {
    const context = useContext(AdminSearchContext);
    if (context === undefined) {
        throw new Error("useAdminSearch must be used within a AdminSearchProvider");
    }
    return context;
}