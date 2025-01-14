"use client";

import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Tag, WallpaperTag } from "@prisma/client";
import { Tags } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ImageCardProps {
  src: string;
  totalViews: number;
  resolution: string;
  wallpaperTags: WallpaperTag & { tag: Tag }[];
}

function ImageCard({ src, totalViews, resolution, wallpaperTags }: ImageCardProps) {
  const [isOpenTags, setIsOpenTags] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    console.log(wallpaperTags);
  }, [isOpenTags])

  return (
    <div className="group relative overflow-hidden rounded-lg z-30">
      {isOpenTags && (
        <div className="absolute top-0 left-0 right-0 bg-black/50 p-2 text-xs text-white flex gap-1 flex-wrap">
          {wallpaperTags.map((wallpaperTag) => (
            <span key={wallpaperTag.tag.id} className="text-green-400 bg-gray-700 px-1">{wallpaperTag.tag.name}</span>
          ))}
        </div>
      )}
      <Image src={src} alt="Wallpaper" width={400} height={225} className="h-[225px] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex justify-between items-center">
        <p>{totalViews} views</p>
        <p>{resolution}</p>
        <p onClick={(e) => {
            e.stopPropagation();
            setIsOpenTags(!isOpenTags);
          }}
        >
          <Tags className="w-5 h-5 text-green-400"/>
        </p>
      </div>
    </div>
  );
}

export function ImageGrid() {
  const { wallpapers, getWallpapers } = useWallpaper();
  const { push } = useRouter();

  useIsomorphicLayoutEffect(() => {
    if (wallpapers.length === 0) {
      getWallpapers();
    }
  }, []);

  const handleWallpaperDetailClick = (wallpaperId: number) => {
    push(`/wallpapers/${wallpaperId}`);
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wallpapers.length > 0 ? wallpapers.map((wallpaper) => (
          <div onClick={() => handleWallpaperDetailClick(wallpaper.id)} key={wallpaper.id}>
            <ImageCard totalViews={wallpaper.views} src={wallpaper.imageUrl} resolution={`${wallpaper.width}x${wallpaper.height}`} wallpaperTags={wallpaper.wallpaperTags} />
          </div>
        )) : null}
      </div>
    </div>
  );
}
