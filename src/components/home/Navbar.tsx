import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function NavBar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">Wallhaven</span>
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
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
          <Button variant="default">Login</Button>
          <Button variant="default">Register</Button>
        </div>
      </div>
    </header>
  );
}
