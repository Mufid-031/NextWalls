"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";
import { AdminSidebarProvider } from "@/contexts/AdminSidebarContext";
import { AdminSearchProvider } from "@/contexts/AdminSearchContext";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();

  return (
    <AdminSidebarProvider>
      <AdminSearchProvider>
        <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar />
            <main className={`flex-1 overflow-x-hidden overflow-y-auto ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>{children}</main>
          </div>
        </div>
      </AdminSearchProvider>
    </AdminSidebarProvider>
  );
}
