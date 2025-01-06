"use client";

import { useContext, useState, createContext } from "react";

type AdminSearchContextType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const AdminSearchContext = createContext<AdminSearchContextType | undefined>(undefined);

export function AdminSearchProvider({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState<string>('');

    return (
        <AdminSearchContext.Provider value={{ search, setSearch }}>
            {children}
        </AdminSearchContext.Provider>
    );
}

export function useAdminSearch() {
    const context = useContext(AdminSearchContext);
    if (context === undefined) {
        throw new Error("useAdminSearch must be used within a AdminSearchProvider");
    }
    return context;
}