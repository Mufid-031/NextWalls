"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import { useSearch } from "@/contexts/SearchContext";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function NavBar() {
  const { search, setSearch, searchWallpapers } = useSearch();
  const { wallpapers, setWallpapers, getWallpapers } = useWallpaper();

  useIsomorphicLayoutEffect(() => {
    if (search) {
      searchWallpapers(setWallpapers);
    } else if (!search || wallpapers.length === 0) {
      getWallpapers();
    }
  }, [search]);

  return (
    <header className="w-full px-3 text-white dark:bg-gradient-to-b dark:from-darkgunmetal dark:to-black bg-white">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex gap-5">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-purple-500">Next</span>Walls
            </span>
          </Link>
          <nav className="items-center text-sm font-medium hidden lg:flex">
            <Link href="/latest" className="p-5 text-center text-foreground/60 text-green-500 w-full h-full border border-slate-700 hover:drop-shadow-[0_0_0_green]">
              Latest
            </Link>
            <Link href="/hot" className="p-5 text-center text-foreground/60 text-red-500 w-full h-full border border-slate-700 hover:drop-shadow-[0_0_0_red]">
              Hot
            </Link>
            <Link href="/toplist" className="p-5 text-center text-foreground/60 text-purple-500 border border-slate-700 hover:drop-shadow-[0_0_0_purple]">
              Toplist
            </Link>
            <Link href="/random" className="p-5 text-center text-foreground/60 text-orange-500 border border-slate-700 hover:drop-shadow-[0_0_0_orange]">
              Random
            </Link>
            <Link href="/upload" className="p-5 text-center text-foreground/60 text-yellow-500 border border-slate-700 hover:drop-shadow-[0_0_0_yellow]">
              Upload
            </Link>
            <Link href="/forums" className="p-5 text-center text-foreground/60 text-blue-500 border border-slate-700 hover:drop-shadow-[0_0_0_blue]">
              Forums
            </Link>
          </nav>
          <div className="relative w-full flex items-center">
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground dark:text-white text-gray-900" />
            <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-96 pl-8 dark:bg-[#1a1a1a] bg-white" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="default" className="bg-purple-600 hover:bg-purple-700" onClick={() => signIn()}>Login</Button>
          <Button variant="default" className="bg-gray-800 hover:bg-gray-700">
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
