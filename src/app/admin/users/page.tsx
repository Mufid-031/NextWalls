"use client";

import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";

export default function UsersPage() {
    const { isOpen } = useAdminSidebar();

    return (
        <div className={cn("p-6 space-y-6 transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
            <h3>Users</h3>
        </div>
    )
}