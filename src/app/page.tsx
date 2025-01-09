"use client";

import { NavBar } from "@/components/home/Navbar"
import { FilterBar } from "@/components/home/FilterBar"
import { ImageGrid } from "@/components/home/ImageGrid"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <FilterBar />
      <main className="flex-1 container px-10">
        <ImageGrid />
      </main>
    </div>
  )
}

