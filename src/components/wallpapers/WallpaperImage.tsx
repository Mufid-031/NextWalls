import { Wallpaper } from "@/types/wallpaper.type";
import Image from "next/image";

export default function WallpaperImage({ wallpaper }: { wallpaper: Wallpaper }) {

    return (
        <div className="flex justify-center items-center w-full">
          <div className="p-10 h-[42rem]">
            {wallpaper && (
              <Image
                className="w-full h-full object-cover"
                unoptimized={true}
                src={wallpaper.imageUrl}
                alt={wallpaper.title}
                width={500}
                height={500}
              />
            )}
          </div>
        </div>
    )
}