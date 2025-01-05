"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Background({ x }: { x: string }) {
  return (
    <motion.section 
      className="relative hidden lg:block w-1/2 bg-purple-600" 
      initial={{ x: x }} 
      animate={{ x: 0 }} 
      exit={{ x: x }}
      transition={{ duration: 0.7 }}
    >
      <header className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white">
        <span className="outline-text">Next</span>Walls
      </header>
      <style jsx>
        {`
          .outline-text {
            -webkit-text-stroke: 1px white;
            color: transparent;
          }
        `}
      </style>
      <Image 
        src="/low-poly-grid-haikei.svg" 
        alt="Auth Background" 
        width={500} 
        height={500} 
        className="w-full h-full object-cover" 
      />
    </motion.section>
  );
}
