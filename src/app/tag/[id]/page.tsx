"use client"

import { ImageGrid } from "@/components/home/ImageGrid"
import { NavBar } from "@/components/home/Navbar"
import { useWallpaper } from "@/contexts/WallpaperContext"
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect"
import Image from "next/image"
import Link from "next/link"
import { Suspense, use, useState } from "react"
import { Bookmark, Eye, ImageIcon, Search } from "lucide-react"

export default function WallpaperIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { wallpapers, getWallpapersByTag } = useWallpaper()
  const [totalView, setTotalView] = useState<number>(0);
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [relatedTags, setRelatedTags] = useState<Set<string[]> | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (id) getWallpapersByTag(id)
  }, [id])

  useIsomorphicLayoutEffect(() => {
    setTotalView(wallpapers.reduce((acc, wallpaper) => acc + wallpaper.views, 0));
    setTotalSaved(wallpapers.reduce((acc, wallpaper) => acc + wallpaper.totalSaves, 0));
    setRelatedTags(new Set(wallpapers.map((wallpaper) => wallpaper.wallpaperTags.map((wallpaperTag) => wallpaperTag.tag.name))));
    console.log(relatedTags);
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
      </header>
      <main className="flex-1 w-full dark:bg-[#1a1a1a] bg-white pt-16">
        <div className="relative w-full h-[500px]">
          {wallpapers[0]?.imageUrl ? (
            <Suspense>
              <Image
                unoptimized
                src={wallpapers[Math.floor(Math.random() * wallpapers.length)]?.imageUrl}
                alt="Wallpaper"
                width={1920}
                height={500}
                className="w-full h-full object-cover"
              />
            </Suspense>
          ) : null}

          <div className="absolute inset-0 bg-black/30 w-[90%] mx-auto mt-28">
            <div className="container mx-auto h-full">
              <div className="flex flex-col justify-between h-full p-6">
                <div className="flex items-center space-x-2">
                  <Link href="/wallpapers" className="text-white/80 hover:text-white hover:underline">
                    Wallpapers
                  </Link>
                  <span className="text-white/60">{">"}</span>
                  <Link href="/tags" className="text-white/80 hover:text-white hover:underline">
                    Tags
                  </Link>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-4">
                    <h1 className="text-5xl font-bold text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)]">
                      #
                      {
                        wallpapers[0]?.wallpaperTags.find((wallpapersTag) => wallpapersTag.tag.id === Number(id))?.tag
                          .name
                      }
                    </h1>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <select
                          className="appearance-none bg-black/50 backdrop-blur-sm text-white px-4 py-2 pr-8 rounded border border-white/20 hover:bg-black/60 transition-colors"
                          name="alias"
                          id="alias"
                        >
                          <option value="zzz">Aliases: ZZZ</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <button className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded border border-white/20 hover:bg-black/60 transition-colors flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Search for more
                      </button>
                      <button className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded border border-white/20 hover:bg-black/60 transition-colors flex items-center gap-2">
                        <Bookmark className="w-4 h-4" />
                        Subscribe
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white hover:underline cursor-pointer">Related Tags: </h3>
                      {relatedTags && Array.from(relatedTags).map((tag, index) => (
                        <span key={index} className="text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)] flex gap-1 items-center">
                          #{tag}
                          <Search className="w-4 h-4" />
                        </span>
                      ))}
                      {/* <span className="text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)] flex gap-1 items-center">
                        #tag2
                        <Search className="w-4 h-4" />
                      </span>
                      <span className="text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)] flex gap-1 items-center">
                        #tag3
                        <Search className="w-4 h-4" />
                      </span>
                      <span className="text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)] flex gap-1 items-center">
                        #tag4
                        <Search className="w-4 h-4" />
                      </span> */}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-3 min-w-[200px]">
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-lg">{wallpapers?.length}</span>
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-3 min-w-[200px]">
                      <Eye className="w-5 h-5" />
                      <span className="text-lg">{totalView}</span>
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-3 min-w-[200px]">
                      <Bookmark className="w-5 h-5" />
                      <span className="text-lg">{totalSaved}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <ImageGrid />
        </div>
      </main>
    </div>
  )
}

