import { Tag, WallpaperTag } from "@prisma/client";

export interface Wallpaper {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userId: number;
  categoryId: number;
  views: number;
  totalSaves: number;
  totalLikes: number;
  width: number;
  height: number;
  category: { name: string };
  wallpaperTags: WallpaperTag &
    {
      tag: Tag;
    }[];
  createdAt: Date;
  updatedAt: Date;
}
