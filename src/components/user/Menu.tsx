import { Home, Star, Upload } from "lucide-react";
import Link from "next/link";

export default function Menu({ name }: { name: string }) {
  return (
    <div className="flex justify-center absolute -top-5 left-[50%] translate-x-[-50%] drop-shadow-2xl">
      <div className="w-fit h-10 px-3 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
        <Home className="w-5 h-5 text-white" />
        <Link href={`/user/${name}`} className="text-white">
          Profile
        </Link>
      </div>
      <div className="w-fit h-10 px-3 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
        <Upload className="w-5 h-5 text-white" />
        <Link href={`/user/${name}/uploads`} className="text-white">Uploads</Link>
      </div>
      <div className="w-fit h-10 px-3 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
        <Star className="w-5 h-5 text-white" />
        <Link href={`/user/${name}/favorites`} className="text-white">Collections</Link>
      </div>
    </div>
  );
}
