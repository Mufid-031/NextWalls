"use client";
import JumbotronLayout from "@/components/home/JumbotronLayout";
import { NavBar } from "@/components/home/Navbar";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Bookmark, Mail } from "lucide-react";
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
    <>
        <header className="fixed top-0 z-50 w-full">
            <NavBar />
        </header>
        <JumbotronLayout 
            backgroundImage={
                wallpapers[0]?.imageUrl ? 
                <Image 
                    unoptimized 
                    src={wallpapers[0]?.imageUrl || "/placeholder.svg"} 
                    alt="Wallpaper" 
                    width={1920} 
                    height={500} 
                    className="w-full h-full object-cover" 
                /> : null
            }
            className="h-[350px]"
        >
            <div className="flex justify-between">
                <div className="w-full h-full flex gap-5 items-center mt-2">
                    <div className="w-48 h-48 bg-slate-600/80">
                        <Image src={wallpapers[1]?.imageUrl || "/placeholder.svg"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
                    </div>
                    <div className="p-5 w-[34rem] bg-white/30">
                        <h1 className="text-3xl text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)] font-bold">{name}</h1>
                        <p className="text-md mt-2 text-[#98ff98]">{session?.user.role}</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-14 h-14 shadow-inner shadow-black flex justify-center items-center">
                        <Bookmark className="w-7 h-7 text-white" />
                    </div>
                    <div className="w-14 h-14 shadow-inner shadow-black flex justify-center items-center">
                        <Mail className="w-7 h-7 text-white" />
                    </div>
                </div>
            </div>
        </JumbotronLayout>
    </>
  );
}
