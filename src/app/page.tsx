"use client";

export default function Home() {


  return (
    <main>
      <nav className="flex items-center justify-between p-4 h-20">
        <h3 className="text-3xl font-semibold">NextWalls</h3>
        <div className="flex gap-2 p-2 bg-slate-100 rounded-md">
          <select className="text-black p-1" name="options" id="options">
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
          <input className="text-black p-1 bg-slate-100" type="text" name="search" id="search" />
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-4">
        </div>
      </main>
    </main>
  );
}
