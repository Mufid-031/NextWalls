"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [])
  return (
    <main>
      <nav className="flex items-center justify-between p-4 h-20">
        <h3 className="text-3xl font-semibold">NextWalls</h3>
        <button onClick={() => signIn()}>SignIn</button>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-4">
        </div>
      </main>
    </main>
  );
}
