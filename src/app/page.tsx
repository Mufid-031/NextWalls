"use client";

import { NavBar } from "@/components/home/Navbar";
import { FilterBar } from "@/components/home/FilterBar";
import { ImageGrid } from "@/components/home/ImageGrid";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { cn } from "@/lib/utils";

export default function Home() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-30 w-full">
        <NavBar />
        <FilterBar />
      </header>
      <main className={cn("flex-1 container px-10 pt-36", isDarkMode ? "bg-gray-900" : "bg-gray-100")}>
        <ImageGrid />
      </main>
    </div>
  );
}
