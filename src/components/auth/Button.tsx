"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Button({ 
    children, 
    className, 
    type = "button", 
    ...props
}: { 
    children: React.ReactNode; 
    className?: string;
    type: "submit" | "reset" | "button";
}) {
  return (
    <motion.button
        whileTap={{ scale: 0.9 }}
        className={cn("flex justify-center items-center gap-2 rounded cursor-pointer", className)} type={type} {...props}>
        {children}
    </motion.button>
  )
}

