"use client";

// import { useWallpaper } from "@/contexts/WallpaperContext";
import { Wallpaper } from "@/types/wallpaper.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Tag({ wallpaper, itemsVariants, id }: { wallpaper: Wallpaper | null; itemsVariants: Variants; id: string }) {
  const [tagInput, setTagInput] = useState<string>("");
  // const { getWallpaperById } = useWallpaper();
  const { push } = useRouter();

  const handleAddNewTag = async () => {
    if (tagInput) {
      const form = new FormData();
      form.append("wallpaperId", id);
      form.append("name", tagInput);
      try {
        const response = await axios.post("/api/wallpapers/tag", form);
        setTagInput("");
        return response.data;
      } catch (error) {
        console.error("Error adding tag:", error);
        throw error;
      }
    }
  };
  
  const handleDeleteTag = (wallpaper: Wallpaper) => async (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`/api/wallpapers/tag`, { data: { wallpaperId: wallpaper.id, tagId: wallpaper.tag.id } });
      return response.data;
    } catch (error) {
      console.error("Error deleting tag:", error);
      throw error;
    }
  };

  const queryClient = useQueryClient();
  const { mutateAsync: MutateHandleAddNewTag } = useMutation({
    mutationFn: handleAddNewTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallpaper"] });
    }
  });

  const { mutateAsync: MutateHandleDeleteTag } = useMutation({
    mutationFn: (e: React.MouseEvent<SVGSVGElement>) => handleDeleteTag(wallpaper!)(e),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallpaper"] });
    }
  });

  const handleTagClick = (tag: string) => {
    push(`/tag/${tag}`);
  };



  return (
    <div className="flex flex-wrap pl-5 w-full">
      <motion.div initial="hidden" animate="visible" exit={{ y: 20, opacity: 0, transition: { duration: 0.2 } }} variants={itemsVariants} className="flex items-center mb-4">
        <input onChange={(e) => setTagInput(e.target.value)} className="text-xs bg-slate-800 hover:bg-slate-700 cursor-pointer text-green-400 p-1 w-56" type="text" name="addTag" id="addTags" placeholder="Add Tag..." />
        <span onClick={async () => await MutateHandleAddNewTag()} className="w-[1.5rem] h-[1.5rem] bg-slate-500 hover:bg-slate-600 cursor-pointer flex justify-center items-center">
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
            <X onClick={async (e: React.MouseEvent<SVGSVGElement>) => await MutateHandleDeleteTag(e)} className="w-3 h-3 text-white cursor-pointer" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
