"use client";
import JumbotronLayout from "@/components/home/JumbotronLayout";
import { NavBar } from "@/components/home/Navbar";
import { Button } from "@/components/ui/Button";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Bookmark, Home, Link, Mail, Plus, Star, Upload } from "lucide-react";
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
              <p className="text-md mt-2 text-[#98ff98]">{session?.user.role}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-12 h-12 shadow-inner shadow-black flex justify-center items-center cursor-pointer">
              <Bookmark className="w-7 h-7 text-white" />
            </div>
            <div className="w-12 h-12 shadow-inner shadow-black flex justify-center items-center cursor-pointer">
              <Mail className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </JumbotronLayout>
      <main className="w-[90%] h-screen mx-auto bg-black/30 shadow-2xl relative">
        <div className="flex justify-center absolute -top-5 left-[50%] translate-x-[-50%] drop-shadow-2xl">
          <div className="w-40 h-10 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
            <Home className="w-5 h-5 text-white" />
            <span className="text-white">Profile</span>
          </div>
          <div className="w-40 h-10 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
            <Upload className="w-5 h-5 text-white" />
            <span className="text-white">Uploads</span>
          </div>
          <div className="w-40 h-10 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
            <Star className="w-5 h-5 text-white" />
            <span className="text-white">Collections</span>
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 px-10">
          <div className="w-full h-full cursor-pointer overflow-hidden">
            <span className="flex justify-between group">
              <h3 className="text-teal-400 font-bold pb-1">1 Comments</h3>
              <Link className="w-5 h-5 text-[#383838] group-hover:text-white" />
            </span>
            <hr className="border-[#383838] mb-4" />
            <div className="flex justify-center items-center mb-5">
              <Button size="default" variant="ghost" className="bg-green-400">
                <Plus className="w-4 h-4 text-black" />
                <span>Add Comment</span>
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-full h-16 bg-slate-400 flex items-center px-2 gap-1">
                <div className="w-10 h-10">
                  <Image src={wallpapers[2]?.imageUrl || "/placeholder.svg"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
                </div>
                <div className="flex flex-col w-full">
                  <div className="w-full flex justify-between items-center">
                    <h5>
                      <span>Imam</span>-1 week ago
                    </h5>
                    <div>
                      <span>Reply</span> #65732
                    </div>
                  </div>
                  <div>Bagus bang</div>
                </div>
              </div>
              <div className="w-full h-16 bg-slate-400 ml-10"></div>
            </div>
          </div>
          <div className="w-full h-full">1</div>
        </section>
      </main>
    </>
  );
}
