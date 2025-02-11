"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Wallpaper } from "@/types/wallpaper.type";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ColorPalette from "./ColorPalette";
import Tag from "./Tag";
import Properti from "./Properti";

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

export default function Sidebar({ id, wallpaper }: { id: string; wallpaper: Wallpaper | null;}) {
  const { push } = useRouter();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [openTags, setOpenTags] = useState<boolean>(true);
  const [openProperties, setOpenProperties] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

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

  return (
    <motion.div className={cn("relative transition-all duration-700 p-2", isOpenSidebar ? "bg-gradient-to-r from-darkgunmetal to-black translate-x-0 w-[24rem]" : "bg-black w-2 -translate-x-full")}>
      <div className="z-0 absolute top-10 -right-7 w-10 h-10 rounded-r-full bg-black flex justify-center items-center">
        {isOpenSidebar ? <ChevronLeft className="w-5 h-5 text-white" onClick={() => setIsOpenSidebar(false)} /> : <ChevronRight className="w-5 h-5 text-white" onClick={() => setIsOpenSidebar(true)} />}
      </div>
      <AnimatePresence>
        {isOpenSidebar && isLoaded ? (
          <>
            <div className="w-full h-28 flex justify-center -ml-2 relative">
              <motion.h2 initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="text-3xl text-white mt-1">
                {wallpaper?.width} x {wallpaper?.height}
              </motion.h2>
              <motion.div initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="absolute bottom-5 flex pl-4">
                {wallpaper?.colorPalettes.map((color, index) => (
                  <ColorPalette key={color.colorPalette.color + index} color={color.colorPalette.color} onClick={() => handlePaletteClick(color.colorPalette.color)} />
                ))}
              </motion.div>
            </div>
            <motion.hr initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="mx-2 text-slate-500" />
            <motion.div initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="w-full pb-5">
              <Button onClick={() => setOpenTags(!openTags)} variant="ghost" className="text-green-500 flex gap-1">
                {openTags ? <ChevronDown className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
                Tags
              </Button>
              {openTags && <Tag wallpaper={wallpaper} itemsVariants={itemsVariants} id={id} />}
            </motion.div>
            <motion.hr initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="mx-2 text-slate-500" />
            <motion.div initial="hidden" animate="visible" exit="hidden" variants={itemsVariants} className="w-full pb-5">
              <Button onClick={() => setOpenProperties(!openProperties)} variant="ghost" className="text-sky-500 flex gap-1">
                {openProperties ? <ChevronDown className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
                Properties
              </Button>
              {openProperties && <Properti wallpaper={wallpaper} itemsVariants={itemsVariants} />}
            </motion.div>
          </>
        ) : (
          <div className="w-full h-[90vh] flex justify-center -ml-2 relative"></div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
