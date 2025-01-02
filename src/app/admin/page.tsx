"use client";

import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";


export default function AdminPage() {
  const { isOpen } = useAdminSidebar();
  const { data: session } = useSession();

  return (
    <div className={cn(
      "p-6 space-y-6 transition-all duration-300",
      isOpen ? "ml-64" : "ml-16"
    )}>
      <h2 className="text-3xl font-bold">Dashboard {session && session.user?.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-40 bg-white rounded-md"></div>
        <div className="w-full h-40 bg-white rounded-md"></div>
        <div className="w-full h-40 bg-white rounded-md"></div>
        <div className="w-full h-40 bg-white rounded-md"></div>
        <div className="w-full p-5 bg-white rounded-md flex flex-col gap-4">
          <h3 className="font-bold text-lg">Recent Uploads</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-2">
              <div className="w-20 h-10 bg-gray-300 rounded"></div>
              <div>
                <h3 className="font-semibold">Wallpaper 1</h3>
                <p className="text-sm">Uploaded 2 hours ago</p>
              </div>
            </li>
            <li className="flex gap-2">
              <div className="w-20 h-10 bg-gray-300 rounded"></div>
              <div>
                <h3 className="font-semibold">Wallpaper 1</h3>
                <p className="text-sm">Uploaded 2 hours ago</p>
              </div>
            </li>
            <li className="flex gap-2">
              <div className="w-20 h-10 bg-gray-300 rounded"></div>
              <div>
                <h3 className="font-semibold">Wallpaper 1</h3>
                <p className="text-sm">Uploaded 2 hours ago</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-full p-5 bg-white rounded-md flex flex-col gap-4">
        <h3 className="font-bold text-lg">Top Categories</h3>
        <ul className="flex flex-col gap-4">
          <li className="flex justify-between">
            <h3 className="font-semibold">Nature</h3>
            <p>1,234 wallpapers</p>
          </li>
          <li className="flex justify-between">
            <h3 className="font-semibold">Nature</h3>
            <p>1,234 wallpapers</p>
          </li>
          <li className="flex justify-between">
            <h3 className="font-semibold">Nature</h3>
            <p>1,234 wallpapers</p>
          </li>
        </ul>
        </div>
      </div>
    </div>
  );
}
