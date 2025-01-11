"use client";

import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import moment from "moment";
import Image from "next/image";

export default function RecentWallpapers() {
  const { recentWallpapers, getRecentWallpapers } = useWallpaper();

  useIsomorphicLayoutEffect(() => {
    if (recentWallpapers.length === 0) {
      getRecentWallpapers();
    }

    const intervalId = setInterval(() => {
      getRecentWallpapers();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className="w-full p-5 rounded-md flex flex-col gap-4 dark:bg-gray-800 bg-white">
      <h3 className="font-bold text-lg dark:text-white text-black">Recent Uploads</h3>
      <ul className="flex flex-col gap-4">
        {recentWallpapers?.map((wallpaper) => (
          <li key={wallpaper.id} className="flex gap-2">
            <div className="w-20 h-10 bg-gray-300 rounded">
              <Image src={wallpaper.imageUrl} alt={wallpaper.title} width={100} height={100} />
            </div>
            <div>
              <h3 className="font-semibold dark:text-white text-black">{wallpaper.title}</h3>
              <p className="text-sm dark:text-white text-black">Uploads {moment(wallpaper.createdAt).fromNow()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
