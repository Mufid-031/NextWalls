"use client";

import { ImageGrid } from "@/components/home/ImageGrid";
import { NavBar } from "@/components/home/Navbar";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Jumbotron from "@/components/home/Jumbotron";
import { useQuery } from "@tanstack/react-query";
import { getWallpapersByColor } from "@/service/wallpaper";
import { Wallpaper } from "@/types/wallpaper.type";

export default function WallpaperRgbPage({ params }: { params: Promise<{ rgb: string }> }) {
  const { rgb } = use(params);
  const { push } = useRouter();
  const [relatedPalettes, setRelatedPalettes] = useState<Set<string>>(new Set());
  const [totalView, setTotalView] = useState<number>(0);
  const [totalSaved, setTotalSaved] = useState<number>(0);

  const { data: wallpapers, isLoading } = useQuery({
    queryKey: ["wallpapers"],
    queryFn: () => getWallpapersByColor(rgb),
  })

  useIsomorphicLayoutEffect(() => {
    setTotalView(wallpapers?.reduce((acc: number, wallpaper: Wallpaper) => acc + wallpaper?.views, 0));
    setTotalSaved(wallpapers?.reduce((acc: number, wallpaper: Wallpaper) => acc + wallpaper?.totalSaves, 0));

    const currentPalette = wallpapers[0]?.colorPalettes[0]?.colorPalette?.color;

    const newRelatedPalettes = new Set<string>();
    wallpapers?.forEach((wallpaper: Wallpaper) => {
      wallpaper?.colorPalettes?.forEach((color) => {
        if (color?.colorPalette?.color?.includes(currentPalette!) && newRelatedPalettes.size < 10) {
          newRelatedPalettes.add(color?.colorPalette?.color);
        }
      });
    });

    setRelatedPalettes(newRelatedPalettes);
  }, [wallpapers, rgb]);

  const handleRelatedPaletteClick = (tag: string) => {
    const wallpaperPalette = wallpapers?.map((wallpaper: Wallpaper) => wallpaper.colorPalettes
      .find((color) => color?.colorPalette?.color === tag)!)
      .filter((color: Wallpaper) => color);

    if (wallpaperPalette) push(`/color/${wallpaperPalette[0]?.colorPalette?.color}`);
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
          isLoaded={!isLoading}
          wallpapers={wallpapers ?? []}
        />

        <div className="container mx-auto px-4 py-8">
          <ImageGrid wallpapers={wallpapers} isLoaded={!isLoading} />
        </div>
      </main>
    </div>
  );
}
