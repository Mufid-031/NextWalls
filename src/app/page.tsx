import { NavBar } from "@/components/home/Navbar";
import { FilterBar } from "@/components/home/FilterBar";
import { ImageGrid } from "@/components/home/ImageGrid";

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-30 w-full">
        <NavBar />
        <FilterBar />
      </header>
      <main className="w-full px-10 pt-36 dark:bg-[#1a1a1a] bg-white">
        <ImageGrid />
        <div className="h-40 bg-white flex justify-center items-center">
          <div className="h-20 w-20 bg-red-500 rounded-md"></div>
        </div>
      </main>
    </div>
  );
}
