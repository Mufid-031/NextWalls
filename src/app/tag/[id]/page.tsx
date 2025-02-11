"use client";

import { ImageGrid } from "@/components/home/ImageGrid";
import { NavBar } from "@/components/home/Navbar";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Jumbotron from "@/components/home/Jumbotron";
import { useQuery } from "@tanstack/react-query";
import { getWallpapersByTag } from "@/service/wallpaper";
import { Wallpaper } from "@/types/wallpaper.type";

export default function WallpaperIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { push } = useRouter();
  // const { wallpapers, getWallpapersByTag } = useWallpaper();
  const [relatedTags, setRelatedTags] = useState<Set<string>>(new Set());
  const [totalView, setTotalView] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);

  const { data: wallpapers, isLoading } = useQuery({
    queryKey: ["wallpapers"],
    queryFn: () => getWallpapersByTag(id),
  });

  useIsomorphicLayoutEffect(() => {
    setTotalView(wallpapers?.reduce((acc: number, wallpaper: Wallpaper) => acc + wallpaper?.views, 0));
    setTotalSaved(wallpapers?.reduce((acc: number, wallpaper: Wallpaper) => acc + wallpaper?.totalSaves, 0));

    const currentTag = wallpapers?.[0]?.wallpaperTags
      .find((wallpapersTag: Wallpaper) => wallpapersTag.tag.id === Number(id))?.tag.name;

    const newRelatedTags = new Set<string>();
    wallpapers?.forEach((wallpaper: Wallpaper) => {
      wallpaper?.wallpaperTags?.forEach((tag) => {
        if (tag.tag.name.includes(currentTag!) && newRelatedTags.size < 10) {
          newRelatedTags.add(tag.tag.name);
        }
      });
    });

    setRelatedTags(newRelatedTags);
  }, [wallpapers, id]);

  const handleRelatedTagClick = (tag: string) => {
    const wallpaperTag = wallpapers
      .map((wallpaper: Wallpaper) => wallpaper.wallpaperTags
      .find((wallpaperTag) => wallpaperTag.tag.name === tag))
      .filter((wallpaperTag: Wallpaper) => wallpaperTag);

    if (wallpaperTag) push(`/tag/${wallpaperTag[0].tag.id}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
      </header>
      <main className="flex-1 w-full dark:bg-[#1a1a1a] bg-white pt-16">
        <Jumbotron 
          id={id} 
          relatedState={relatedTags} 
          handleRelatedClick={handleRelatedTagClick} 
          totalView={totalView} 
          totalSaved={totalSaved} 
          isLoaded={!isLoading} 
          wallpapers={wallpapers ?? []}
        />

        <div className="container mx-auto px-4 py-8">
          <ImageGrid wallpapers={wallpapers ?? []} isLoaded={!isLoading} />
        </div>
      </main>
    </div>
  );
}
