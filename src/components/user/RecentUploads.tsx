"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Wallpaper } from "@/types/wallpaper.type";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Title from "./Title";

export default function RecentUploads({ name }: { name: string }) {
  const [recentWallpapers, setRecentWallpapers] = useState<Wallpaper[]>([]);

  useIsomorphicLayoutEffect(() => {
    const getRecentWallpapers = async (name: string) => {
      try {
        const response = await axios.get(`/api/users/recent/${name}`);
        const data = await response.data;
        setRecentWallpapers(data);
      } catch (error) {
        console.log("error fetch recent wallpapers: ", error);
      }
    };

    getRecentWallpapers(name);
  }, [name]);

  return (
    <>
      <Title iconLink={false}>Recent Uploads</Title>
      <div className="w-full bg-[#272727] flex flex-wrap justify-center py-2 mb-5">
        {recentWallpapers.map((wallpaper, index) => (
          <Link href={`/wallpapers/${wallpaper.id}`} key={wallpaper.title + index} className="w-36 h-20">
            <Image src={wallpaper?.imageUrl || "/placeholder.svg"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
          </Link>
        ))}
      </div>
    </>
  );
}
