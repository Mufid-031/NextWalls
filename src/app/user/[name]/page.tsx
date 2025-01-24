"use client";
import JumbotronLayout from "@/components/home/JumbotronLayout";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use } from "react";

export default function UserProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const { wallpapers, getWallpapers } = useWallpaper();
  const { data: session } = useSession();

  useIsomorphicLayoutEffect(() => {
    getWallpapers();
  }, []);

  return (
    <JumbotronLayout backgroundImage={wallpapers[0]?.imageUrl ? <Image unoptimized src={wallpapers[0]?.imageUrl || "/placeholder.svg"} alt="Wallpaper" width={1920} height={500} className="w-full h-full object-cover" /> : null}>
      <div className="flex justify-between items-center">
        <div className="w-[50%] h-full flex gap-5 items-center mt-10">
          <div className="w-60 h-60 bg-slate-600/80"></div>
          <div className="p-7 bg-white/30">
            <h1 className="text-6xl text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)] font-bold">{name}</h1>
            <p className="text-md mt-5 text-[#98ff98]">{session?.user.role}</p>
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </JumbotronLayout>
  );
}
