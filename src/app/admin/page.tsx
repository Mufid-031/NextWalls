'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Download, Eye, ImageIcon, Upload } from 'lucide-react'
import { useAdminSidebar } from '@/contexts/AdminSidebarContext'
import { cn } from '@/lib/utils'

export default function AdminDashboard() {
  const { isOpen } = useAdminSidebar()

  return (
    <div className={cn(
      "p-6 space-y-6 transition-all duration-300",
      isOpen ? "ml-64" : "ml-16"
    )}>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Wallpapers</CardTitle>
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,482</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245,678</div>
            <p className="text-xs text-muted-foreground">+10.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Views</CardTitle>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234,567</div>
            <p className="text-xs text-muted-foreground">+35.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">New Uploads</CardTitle>
            <Upload className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-16 h-9 bg-gray-200 rounded mr-4"></div>
                  <div>
                    <div className="font-medium">Wallpaper {i}</div>
                    <div className="text-sm text-muted-foreground">Uploaded 2 hours ago</div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">View All Uploads</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Nature', 'Abstract', 'Animals', 'Technology', 'Space'].map((category) => (
                <div key={category} className="flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-muted-foreground">1,234 wallpapers</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">Manage Categories</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

