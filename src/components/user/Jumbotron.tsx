"use client";

import { Bookmark, Edit2, Mail, Settings } from "lucide-react";
import Image from "next/image";
import JumbotronLayout from "../home/JumbotronLayout";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useSession } from "next-auth/react";

export default function Jumbotron({ name }: { name: string }) {
  const { wallpapers } = useWallpaper();
  const { data: session } = useSession();

  return (
    <JumbotronLayout
      backgroundImage={wallpapers[0]?.imageUrl ? <Image unoptimized src={wallpapers[0]?.imageUrl || "/placeholder.svg"} alt="Wallpaper" width={1920} height={500} className="w-full h-full object-cover" /> : null}
      className="h-[350px]"
    >
      <div className="flex justify-between">
        <div className="w-full h-full flex gap-5 items-center mt-2">
          <div className="w-48 h-48 bg-slate-600/80">
            <Image src={wallpapers[1]?.imageUrl || "/placeholder.svg"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
          </div>
          <div className="p-5 w-[34rem] bg-white/30">
            <h1 className="text-3xl text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)] font-bold">{name}</h1>
            <p className="text-md mt-2 text-[#98ff98]">{session?.user.role || "USER"}</p>
          </div>
        </div>
        <div className="flex">
          {name === session?.user?.name ? (
            <>
              <div className="w-12 h-12 shadow-inner shadow-black flex justify-center items-center cursor-pointer">
                <Edit2 className="w-7 h-7 text-white" />
              </div>
              <div className="w-12 h-12 shadow-inner shadow-black flex justify-center items-center cursor-pointer">
                <Settings className="w-7 h-7 text-white" />
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 shadow-inner shadow-black flex justify-center items-center cursor-pointer">
                <Bookmark className="w-7 h-7 text-white" />
              </div>
              <div className="w-12 h-12 shadow-inner shadow-black flex justify-center items-center cursor-pointer">
                <Mail className="w-7 h-7 text-white" />
              </div>
            </>
          )}
        </div>
      </div>
    </JumbotronLayout>
  );
}
