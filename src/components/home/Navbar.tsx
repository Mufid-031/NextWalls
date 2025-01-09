import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { cn } from "@/lib/utils";

export function NavBar() {
  const { isDarkMode } = useDarkMode();

  return (
    <header className={cn("w-full border-b px-3 text-white", isDarkMode ? "bg-gray-900" : "bg-white")}>
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex gap-5">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">
              <span className="text-purple-500">Next</span>Walls
            </span>
          </Link>
          <nav className="flex items-center text-sm font-medium">
            <div className="w-0.5 h-full bg-gray-700"></div>
            <Link href="/latest" className="p-5 text-center text-foreground/60 text-green-600 w-full h-full">
              Latest
            </Link>
            <div className="w-0.5 h-full bg-gray-700"></div>
            <Link href="/hot" className="p-5 text-center text-foreground/60 text-red-600 w-full h-full">
              Hot
            </Link>
            <div className="w-0.5 h-full bg-gray-700"></div>
            <Link href="/toplist" className="p-5 text-center text-foreground/60 text-purple-600">
              Toplist
            </Link>
            <div className="w-0.5 h-full bg-gray-700"></div>
            <Link href="/random" className="p-5 text-center text-foreground/60 text-orange-600">
              Random
            </Link>
            <div className="w-0.5 h-full bg-gray-700"></div>
            <Link href="/upload" className="p-5 text-center text-foreground/60 text-yellow-600">
              Upload
            </Link>
            <div className="w-0.5 h-full bg-gray-700"></div>
            <Link href="/forums" className="p-5 text-center text-foreground/60 text-blue-600">
              Forums
            </Link>
            <div className="w-0.5 h-full bg-gray-700"></div>
          </nav>
          <div className="relative w-full flex items-center">
            <Search className={cn("absolute left-2 h-4 w-4 text-muted-foreground", isDarkMode ? "text-gray-900" : "text-white")} />
            <Input placeholder="Search..." className="w-96 pl-8" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="default">Login</Button>
          <Button variant="default">Register</Button>
        </div>
      </div>
    </header>
  );
}
