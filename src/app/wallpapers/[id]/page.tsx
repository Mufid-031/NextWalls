import { NavBar } from "@/components/home/Navbar";
import React from "react";

export default async function WallpaperIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-30 w-full">
        <NavBar />
      </header>
      <main className="flex-1 container px-10 pt-36">
        <h1 className="text-4xl text-black">{id}</h1>
      </main>
    </div>
  );
}
