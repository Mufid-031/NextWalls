"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { Wallpaper } from "@/types/wallpaper.type";
import moment from "moment";
import { useRouter } from "next/navigation";
import axios from "axios";
import { formatNumber } from "@/lib/format-number";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const itemsVariants = {
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
      delay: 0.3,
    },
  },
};

export default function Sidebar({ id, wallpaper, setWallpaper }: { id: string; wallpaper: Wallpaper | null; setWallpaper: React.Dispatch<React.SetStateAction<Wallpaper | null>> }) {
  const { getWallpaperById } = useWallpaper();
  const { push } = useRouter();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [openTags, setOpenTags] = useState<boolean>(true);
  const [openProperties, setOpenProperties] = useState<boolean>(true);
  const [tagInput, setTagInput] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useIsomorphicLayoutEffect(() => {
    const fetchWallpaper = async () => {
      try {
        setIsLoaded(false);
        const wallpaper = await getWallpaperById(id);
        setWallpaper(wallpaper);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching wallpaper:", error);
      }
    };

    fetchWallpaper();
  }, [id, getWallpaperById]);

  useIsomorphicLayoutEffect(() => {
    if (isOpenSidebar) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    } else {
      setIsLoaded(false);
    }
  }, [isOpenSidebar]);

  const handlePaletteClick = (color: string) => {
    push(`/color/${color}`);
  };

  const handleTagClick = (tag: string) => {
    push(`/tag/${tag}`);
  };

  const handleAddNewTag = async () => {
    if (tagInput) {
      const form = new FormData();
      form.append("wallpaperId", id);
      form.append("name", tagInput);
      try {
        await axios.post("/api/wallpapers/tag", form);
        setTagInput("");
        getWallpaperById(id).then((data) => setWallpaper(data));
      } catch (error) {
        console.error("Error adding tag:", error);
      }
    }
  };

  const handleDeleteTag = async (e: React.MouseEvent<SVGSVGElement>, wallpaperId: number, tagId: number) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/wallpapers/tag`, { data: { wallpaperId, tagId } });
      getWallpaperById(id).then((data) => setWallpaper(data));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <div className={cn("relative transition-all duration-700 p-2", isOpenSidebar ? "bg-gradient-to-r from-darkgunmetal to-black translate-x-0 w-[24rem]" : "bg-black w-2 -translate-x-full")}>
      <div className="z-0 absolute top-10 -right-7 w-10 h-10 rounded-r-full bg-black flex justify-center items-center">
        {isOpenSidebar ? <ChevronLeft className="w-5 h-5 text-white" onClick={() => setIsOpenSidebar(false)} /> : <ChevronRight className="w-5 h-5 text-white" onClick={() => setIsOpenSidebar(true)} />}
      </div>
      {isOpenSidebar && isLoaded ? (
        <>
          <div className="w-full h-28 flex justify-center -ml-2 relative">
            <motion.h2 initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="text-3xl text-white mt-1">
              {wallpaper?.width} x {wallpaper?.height}
            </motion.h2>
            <motion.div initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="absolute bottom-5 flex pl-4">
              {wallpaper?.colorPalettes.map((color, index) => (
                <motion.div
                  key={`${color.colorPalette.color}-${index}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePaletteClick(color.colorPalette.color)}
                  style={{ backgroundColor: color.colorPalette.color }}
                  className="w-14 h-5 cursor-pointer"
                  title={color.colorPalette.color}
                ></motion.div>
              ))}
            </motion.div>
          </div>
          <motion.hr initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="mx-2 text-slate-500" />
          <motion.div initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="w-full pb-5">
            <Button onClick={() => setOpenTags(!openTags)} variant="ghost" className="text-green-500 flex gap-1">
              {openTags ? <ChevronDown className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
              Tags
            </Button>
            <AnimatePresence>
              {openTags && (
                <div className="flex flex-wrap pl-5 w-full">
                  <motion.div initial="hidden" animate="visible" exit={{ y: 20, opacity: 0, transition: { duration: 0.2 } }} variants={itemsVariants} className="flex items-center mb-4">
                    <input onChange={(e) => setTagInput(e.target.value)} className="text-xs bg-slate-800 hover:bg-slate-700 cursor-pointer text-green-400 p-1 w-56" type="text" name="addTag" id="addTags" placeholder="Add Tag..." />
                    <span onClick={handleAddNewTag} className="w-[1.5rem] h-[1.5rem] bg-slate-500 hover:bg-slate-600 cursor-pointer flex justify-center items-center">
                      <Plus className="text-white" />
                    </span>
                  </motion.div>
                  <div className="flex flex-wrap gap-2">
                    {wallpaper?.wallpaperTags.map((wallpaperTag) => (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={itemsVariants}
                        key={wallpaperTag.tag.id}
                        onClick={() => handleTagClick(wallpaperTag.tag.id.toString())}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 cursor-pointer p-1 rounded-tl-md rounded-br-md"
                      >
                        <span className="text-xs text-green-400">{wallpaperTag.tag.name}</span>
                        <X onClick={(e: React.MouseEvent<SVGSVGElement>) => handleDeleteTag(e, wallpaper!.id, wallpaperTag.tag.id)} className="w-3 h-3 text-white cursor-pointer" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.hr initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="mx-2 text-slate-500" />
          <motion.div initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="w-full pb-5">
            <Button onClick={() => setOpenProperties(!openProperties)} variant="ghost" className="text-sky-500 flex gap-1">
              {openProperties ? <ChevronDown className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
              Properties
            </Button>
            <AnimatePresence>
              {openProperties && (
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="flex flex-col gap-2 pl-10 text-white">
                  <Link href={`/user/${wallpaper?.uploadedBy.name}`} className="text-sm text-sky-200">
                    Uploader : {wallpaper?.uploadedBy.name}
                  </Link>
                  <p className="text-sm text-sky-200">Upload Date : {moment(wallpaper?.createdAt).fromNow()}</p>
                  <p className="text-sm text-sky-200">
                    Category:
                    <span className="text-green-400 bg-slate-700 px-2 py-1 rounded ml-1">{wallpaper?.category.name}</span>
                  </p>
                  {/* <p className="text-sm text-sky-200">Size : {getWallpaperSize(wallpaper!)}</p> */}
                  <p className="text-sm text-sky-200">Views : {formatNumber(wallpaper?.views as number)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      ) : (
        <div className="w-full h-[90vh] flex justify-center -ml-2 relative"></div>
      )}
    </div>
  );
}
