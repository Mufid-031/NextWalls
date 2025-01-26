import { Home, Star, Upload } from "lucide-react";

export default function Menu() {
  return (
    <div className="flex justify-center absolute -top-5 left-[50%] translate-x-[-50%] drop-shadow-2xl">
      <div className="w-fit h-10 px-3 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
        <Home className="w-5 h-5 text-white" />
        <span className="text-white">Profile</span>
      </div>
      <div className="w-fit h-10 px-3 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
        <Upload className="w-5 h-5 text-white" />
        <span className="text-white">Uploads</span>
      </div>
      <div className="w-fit h-10 px-3 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
        <Star className="w-5 h-5 text-white" />
        <span className="text-white">Collections</span>
      </div>
    </div>
  );
}
