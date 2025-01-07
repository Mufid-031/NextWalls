"use client";

import { Category } from "@prisma/client";
import axios from "axios";
import { createContext, useContext, useState } from "react";

export type CategoriesContextType = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  getCategories: () => Promise<void>;
  topCategories: topCategoriesType[];
  getTopCategories: () => Promise<void>;
};

type topCategoriesType = Category & {
  _count: {
    wallpapers: number;
  };
};

export const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [topCategories, setTopCategories] = useState<topCategoriesType[]>([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/category");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getTopCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/top");
      setTopCategories(data);
    } catch (error) {
      console.error("Error fetching top categories:", error);
    }
  };

  return <CategoriesContext.Provider value={{ categories, setCategories, getCategories, topCategories, getTopCategories }}>{children}</CategoriesContext.Provider>;
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
}
