"use client";

import { useWallpaper } from "@/contexts/WallpaperContext";
import { Wallpaper } from "@/types/wallpaper.type";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Tag({ wallpaper, setWallpaper, itemsVariants, id }: { wallpaper: Wallpaper | null; setWallpaper: React.Dispatch<React.SetStateAction<Wallpaper | null>>; itemsVariants: Variants; id: string }) {
  const [tagInput, setTagInput] = useState<string>("");
  const { getWallpaperById } = useWallpaper();
  const { push } = useRouter();

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
        getWallpaperById(id).then((data) => setWallpaper(data!));
      } catch (error) {
        console.error("Error adding tag:", error);
      }
    }
  };

  const handleDeleteTag = async (e: React.MouseEvent<SVGSVGElement>, wallpaperId: number, tagId: number) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/wallpapers/tag`, { data: { wallpaperId, tagId } });
      getWallpaperById(id).then((data) => setWallpaper(data!));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
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
  );
}
