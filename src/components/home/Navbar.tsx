"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn, useSession } from "next-auth/react";
import { useSearch } from "@/contexts/SearchContext";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { cn } from "@/lib/utils";
import {  motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { searchWallpapers } from "@/service/wallpaper";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delay: 0.5,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.5,
    },
  },
};

export function NavBar() {
  const { search, setSearch } = useSearch();
  const { getWallpapers } = useWallpaper();
  const { data: session } = useSession();
  // const session = getSession();

  const queryClient = useQueryClient();
  const { mutateAsync: mutateSearchWallpapers } = useMutation({
    mutationFn: searchWallpapers,
    onSuccess: (data) => {
      queryClient.setQueryData(["wallpapers"], data);
    },
  });

  const handleSearchWallpapersClick = async () => {
    if (search) {
      await mutateSearchWallpapers(search);
    } else {
      getWallpapers();
    }
  };

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
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="container flex h-14 items-center justify-between">
        <div  className="mr-4 flex gap-5">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <motion.span initial="hidden" animate="visible" variants={itemVariants} className="text-2xl font-bold">
              <span className="text-purple-500">Next</span>Walls
            </motion.span>
          </Link>
          <motion.nav initial="hidden" animate="visible" variants={itemVariants} className="items-center text-sm font-medium hidden lg:flex">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={cn("py-4 px-5 text-center text-foreground/60 border-slate-700 border-l border-r", link.className)}>
                {link.name}
              </Link>
            ))}
          </motion.nav>
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="w-full flex items-center gap-2">
            <Input onKeyDown={(e) => e.key === "Enter" && handleSearchWallpapersClick()} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-96 dark:bg-[#2a2a2a] bg-white" />
            <div onClick={handleSearchWallpapersClick} className="p-[10px] border-[#1a1a1a] shadow-inner shadow-black bg-[#1a1a1a]">
              <Search className="h-4 w-4 text-muted-foreground dark:text-white text-gray-900" />
            </div>
          </motion.div>
        </div>
        <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex items-center space-x-4">
          {session?.user.name ? (
            <>
              <Link href={`/user/${session.user.name}`} className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-400 cursor-pointer">
                <span>{session.user.name.slice(0, 1).toUpperCase()}</span>
              </Link>
            </>
          ) : (
            <>
              <Button variant="default" className="bg-gray-800 hover:bg-gray-700">
                <Link href="/auth/register">Register</Link>
              </Button>
              <Button variant="default" className="bg-purple-600 hover:bg-purple-700" onClick={() => signIn()}>
                Login
              </Button>
            </>
          )}
        </motion.div>
      </motion.div>
    </header>
  );
}
