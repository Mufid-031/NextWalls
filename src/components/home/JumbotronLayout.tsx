"use client";

import { cn } from "@/lib/utils";

export default function JumbotronLayout({ children, backgroundImage, className }: { children: React.ReactNode; backgroundImage: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      {backgroundImage}
      <div className="absolute inset-0 bg-black/30 w-[90%] mx-auto mt-28">
        <div className="container mx-auto h-full">
          <div className="flex flex-col justify-between h-full p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
