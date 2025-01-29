"use client";

import { formatNumber } from "@/lib/format-number";
import { Wallpaper } from "@/types/wallpaper.type";
import { motion, Variants } from "framer-motion";
import moment from "moment";
import Link from "next/link";

export default function Properti({ wallpaper, itemsVariants }: { wallpaper: Wallpaper | null; itemsVariants: Variants }) {
  return (
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
  );
}
