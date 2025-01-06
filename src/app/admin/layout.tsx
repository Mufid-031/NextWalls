import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";
import { AdminSidebarProvider } from "@/contexts/AdminSidebarContext";
import { AdminSearchProvider } from "@/contexts/AdminSearchContext";
import { WallpaperProvider } from "@/contexts/WallpaperContext";
import { SelectedFiltersProvider } from "@/contexts/SelectedFiltersContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSidebarProvider>
      <SelectedFiltersProvider>
        <AdminSearchProvider>
          <WallpaperProvider>
            <div className="flex min-h-screen bg-gray-100">
              <Sidebar />
              <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">{children}</main>
              </div>
            </div>
          </WallpaperProvider>
        </AdminSearchProvider>
      </SelectedFiltersProvider>
    </AdminSidebarProvider>
  );
}
