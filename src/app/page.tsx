"use client";

import { NavBar } from "@/components/home/Navbar";
import { FilterBar } from "@/components/home/FilterBar";
import { ImageGrid } from "@/components/home/ImageGrid";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-30 w-full">
        <NavBar />
        <FilterBar />
      </header>
      <main className="flex-1 container px-10 mt-36">
        <ImageGrid />
      </main>
    </div>
  );
}
