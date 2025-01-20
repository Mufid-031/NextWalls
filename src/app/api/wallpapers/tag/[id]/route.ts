import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const wallpapers = await prisma.wallpaper.findMany({
    where: {
      wallpaperTags: {
        some: {
          tagId: Number(id),
        },
      },
    },
    include: {
      uploadedBy: true,
      category: true,
      wallpaperTags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (wallpapers.length === 0) {
    return NextResponse.json({ error: "Wallpapers not found" }, { status: 404 });
  }

  return NextResponse.json(wallpapers, { status: 200 });
};
