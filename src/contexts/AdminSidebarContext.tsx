"use client";

import React, { createContext, useContext, useState } from "react";

type AdminSidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggle = () => setIsOpen(!isOpen);

  return <AdminSidebarContext.Provider value={{ isOpen, toggle }}>{children}</AdminSidebarContext.Provider>;
}

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext);
  if (context === undefined) {
    throw new Error("useAdminSidebar must be used within a AdminSidebarProvider");
  }
  return context;
}
