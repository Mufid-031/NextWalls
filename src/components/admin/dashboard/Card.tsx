import { useDarkMode } from "@/contexts/DarkModeContext";
import { cn } from "@/lib/utils";

export default function Card({ icon, title, desc }: { icon: React.ReactNode; title: string, desc: string }) {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className={cn("w-full h-20 rounded-md flex items-center p-5 gap-4", isDarkMode ? "bg-gray-800" : "bg-white")}>
      {icon}
      <div>
        <h3 className={cn("font-semibold", isDarkMode ? "text-white" : "text-black")}>{title}</h3>
        <p className={cn("text-sm", isDarkMode ? "text-white" : "text-black")}>{desc}</p>
      </div>
    </div>
  );
}
