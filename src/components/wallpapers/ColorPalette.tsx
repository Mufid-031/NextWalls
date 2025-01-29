"use client";

import { HTMLMotionProps, motion } from "framer-motion";

interface ColorPaletteProps extends HTMLMotionProps<"div"> {
  color: string;
}

export default function ColorPalette({ color, ...props }: ColorPaletteProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      style={{ backgroundColor: color }}
      className="w-14 h-5 cursor-pointer"
      title={color}
      {...props}
    ></motion.div>
  );
}
