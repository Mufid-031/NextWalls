import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function NavBar() {
  return (
    <header className="w-full border-b bg-gray-900 px-3 text-white">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex gap-5">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">
              <span className="text-purple-500">Next</span>Walls
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/latest" className="text-foreground/60 hover:text-foreground">
              Latest
            </Link>
            <Link href="/hot" className="text-foreground/60 hover:text-foreground">
              Hot
            </Link>
            <Link href="/toplist" className="text-foreground/60 hover:text-foreground">
              Toplist
            </Link>
            <Link href="/random" className="text-foreground/60 hover:text-foreground">
              Random
            </Link>
            <Link href="/upload" className="text-foreground/60 hover:text-foreground">
              Upload
            </Link>
            <Link href="/forums" className="text-foreground/60 hover:text-foreground">
              Forums
            </Link>
          </nav>
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
