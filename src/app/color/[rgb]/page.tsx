"use client";

import { ImageGrid } from "@/components/home/ImageGrid";
import { NavBar } from "@/components/home/Navbar";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Jumbotron from "@/components/home/Jumbotron";

export default function WallpaperIdPage({ params }: { params: Promise<{ rgb: string }> }) {
  const { rgb } = use(params);
  const { push } = useRouter();
  const { wallpapers, getWallpapersByColor } = useWallpaper();
  const [relatedPalettes, setRelatedPalettes] = useState<Set<string>>(new Set());
  const [totalView, setTotalView] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (rgb) getWallpapersByColor(rgb);
  }, [rgb]);

  useIsomorphicLayoutEffect(() => {
    setTotalView(wallpapers.reduce((acc, wallpaper) => acc + wallpaper.views, 0));
    setTotalSaved(wallpapers.reduce((acc, wallpaper) => acc + wallpaper.totalSaves, 0));

    const currentPalette = wallpapers[0]?.colorPalettes[0].colorPalette.color;

    const newRelatedPalettes = new Set<string>();
    wallpapers.forEach((wallpaper) => {
      wallpaper.colorPalettes.forEach((color) => {
        if (color.colorPalette.color.includes(currentPalette!) && newRelatedPalettes.size < 10) {
          newRelatedPalettes.add(color.colorPalette.color);
        }
      });
    });

    setRelatedPalettes(newRelatedPalettes);
  }, [wallpapers, rgb]);

  const handleRelatedPaletteClick = (tag: string) => {
    const wallpaperPalette = wallpapers
      .map((wallpaper) => wallpaper.colorPalettes
      .find((color) => color.colorPalette.color === tag)!)
      .filter((color) => color);

    if (wallpaperPalette) push(`/color/${wallpaperPalette[0].colorPalette.color}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
      </header>
      <main className="flex-1 w-full dark:bg-[#1a1a1a] bg-white pt-16">
        <Jumbotron
          relatedState={relatedPalettes}
          handleRelatedClick={handleRelatedPaletteClick}
          totalView={totalView}
          totalSaved={totalSaved}
        />

        <div className="container mx-auto px-4 py-8">
          <ImageGrid />
        </div>
      </main>
    </div>
  );
}
