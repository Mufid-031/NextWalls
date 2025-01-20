"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import { useSearch } from "@/contexts/SearchContext";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { cn } from "@/lib/utils";

export function NavBar() {
  const { search, setSearch, searchWallpapers } = useSearch();
  const { setWallpapers } = useWallpaper();

  const handleSearchWallpapersClick = () => {
    if (search) {
      searchWallpapers(setWallpapers);
    }
  }

  const navLinks = [
    {
      name: "Latest",
      href: "/latest",
      className: "text-green-500 hover:drop-shadow-[0_0_0_green]",
    },
    {
      name: "Hot",
      href: "/hot",
      className: "text-red-500 hover:drop-shadow-[0_0_0_red]",
    },
    {
      name: "Toplist",
      href: "/toplist",
      className: "text-purple-500 hover:drop-shadow-[0_0_0_purple]",
    },
    {
      name: "Random",
      href: "/random",
      className: "text-orange-500 hover:drop-shadow-[0_0_0_orange]",
    },
    {
      name: "upload",
      href: "/upload",
      className: "text-yellow-500 hover:drop-shadow-[0_0_0_yellow]",
    },
    {
      name: "Forums",
      href: "/forums",
      className: "text-blue-500 hover:drop-shadow-[0_0_0_blue]",
    },
  ];

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
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={cn("p-5 text-center text-foreground/60 border-slate-700 border", link.className)}>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="w-full flex items-center">
            <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-96 dark:bg-black bg-white" />
            <div onClick={handleSearchWallpapersClick} className="p-3 mt-1 border-[#1a1a1a] shadow-inner shadow-black">
              <Search className="h-4 w-4 text-muted-foreground dark:text-white text-gray-900" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="default" className="bg-purple-600 hover:bg-purple-700" onClick={() => signIn()}>
            Login
          </Button>
          <Button variant="default" className="bg-gray-800 hover:bg-gray-700">
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
