"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button";
}

export default function Button({ 
    children, 
    className, 
    type = "button", 
    ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={cn("flex justify-center items-center gap-2 rounded cursor-pointer", className)} 
      type={type} 
      {...props}
      >
        {children}
    </motion.button>
  )
}

