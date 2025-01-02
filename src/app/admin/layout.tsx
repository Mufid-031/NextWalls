import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";
import { AdminSidebarProvider } from "@/contexts/AdminSidebarContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
      <AdminSidebarProvider>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">{children}</main>
          </div>
        </div>
      </AdminSidebarProvider>
  );
}
