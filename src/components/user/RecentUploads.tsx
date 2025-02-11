"use client";

import { Wallpaper } from "@/types/wallpaper.type";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Title from "./Title";
import { useQuery } from "@tanstack/react-query";

export default function RecentUploads({ name }: { name: string }) {
  const getRecentWallpapers = async (name: string) => {
    try {
      const response = await axios.get(`/api/users/recent/${name}`);
      return response.data;
    } catch (error) {
      console.log("error fetch recent wallpapers: ", error);
      throw error;
    }
  };

  const { data: recentUploads } = useQuery({
    queryKey: ["recentUploads"],
    queryFn: () => getRecentWallpapers(name),
  });

  return (
    <>
      <Title iconLink={false}>Recent Uploads</Title>
      <div className="w-full bg-[#272727] flex flex-wrap justify-center py-2 mb-5">
        {recentUploads?.map((wallpaper: Wallpaper, index: number) => (
          <Link href={`/wallpapers/${wallpaper.id}`} key={wallpaper.title + index} className="w-36 h-20">
            <Image src={wallpaper?.imageUrl || "/placeholder.svg"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
          </Link>
        ))}
      </div>
    </>
  );
}
