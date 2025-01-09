import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";

interface ImageCardProps {
  src: string;
  resolution: string;
}

function ImageCard({ src, resolution }: ImageCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Image src={src} alt="Wallpaper" width={400} height={225} className="h-[225px] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{resolution}</div>
    </div>
  );
}

export function ImageGrid() {
  const { wallpapers, getWallpapers } = useWallpaper();

  useIsomorphicLayoutEffect(() => {
    if (wallpapers.length === 0) {
      getWallpapers();
    }
  }, []);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wallpapers.map((wallpaper) => (
          <ImageCard key={wallpaper.id} src={wallpaper.imageUrl} resolution={`${wallpaper.width}x${wallpaper.height}`} />
        ))}
      </div>
    </div>
  );
}
