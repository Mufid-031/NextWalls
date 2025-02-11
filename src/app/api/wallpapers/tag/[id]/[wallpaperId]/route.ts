import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string; wallpaperId: string }> }) => {
    const tagId = (await params).id;
    const wallpaperId = (await params).wallpaperId;

    const wallpaperTag = await prisma.wallpaperTag.delete({
      where: {
        wallpaperId_tagId: {
          wallpaperId: Number(wallpaperId),
          tagId: Number(tagId),
        },
      },
    });
  
    return NextResponse.json(wallpaperTag, { status: 200 });
  };