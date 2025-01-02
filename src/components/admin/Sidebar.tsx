'use client'

import Link from 'next/link'
import { Home, Image, Upload, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAdminSidebar } from '@/contexts/AdminSidebarContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: Image, label: 'Wallpapers', href: '/admin/wallpapers' },
  { icon: Upload, label: 'Upload', href: '/admin/upload' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export function Sidebar() {
  const { isOpen, toggle } = useAdminSidebar()

  return (
    <div className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-white border-r transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className={cn(
        "flex items-center h-16 px-4 border-b",
        isOpen ? "justify-between" : "justify-center"
      )}>
        {isOpen && (
          <span className="text-2xl font-semibold">Wallpaper Admin</span>
        )}
        <Button variant="ghost" size="icon" onClick={toggle}>
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="h-[calc(100vh-4rem)] overflow-y-auto">
        <ul className="p-4 space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center p-2 text-gray-700 rounded hover:bg-gray-100",
                  isOpen ? "justify-start" : "justify-center"
                )}
              >
                <item.icon className={cn("w-5 h-5", isOpen && "mr-3")} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

