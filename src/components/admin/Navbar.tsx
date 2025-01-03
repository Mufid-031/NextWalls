"use client";

import { Bell, User, Menu, Search, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { cn } from "@/lib/utils";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";

export function Navbar() {
  const { isOpen, toggle } = useAdminSidebar();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const ctrls = useAnimation();

  const animate = {
    initial: {
      rotate: 180,
    },
    animate: {
      rotate: 0,
    },
  }

  useEffect(() => {
    ctrls.start(isDarkMode ? "initial" : "animate");
  }, [isDarkMode, ctrls]);

  return (
    <header className={cn("sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white border-b transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
      <div className="flex items-center flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-4 md:hidden" 
          onClick={toggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="relative w-full max-w-md"
        >
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-8 w-full" />
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }} 
        className="flex items-center space-x-4"
      >
        {isDarkMode ? (
          <Button 
            whileHover={{ rotate: 45 }} 
            variants={animate} 
            animate={ctrls} 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
          >
            <Moon className="w-5 h-5 hover:text-purple-500" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        ) : (
          <Button 
            whileHover={{ rotate: 45 }} 
            variants={animate} 
            animate={ctrls} 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
          >
            <Sun className="w-5 h-5 hover:text-purple-500" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}
        <Button 
          whileHover={{ transformOrigin: "top", rotate: [0, 10, -10, 10, 0] }} 
          variant="ghost" 
          size="icon"
        >
          <Bell className="w-5 h-5 hover:text-purple-500" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5 hover:text-purple-500" />
          <span className="sr-only">User</span>
        </Button>
      </motion.div>
    </header>
  );
}
