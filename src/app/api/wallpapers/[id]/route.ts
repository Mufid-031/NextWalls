import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const wallpaper = await prisma.wallpaper.findUnique({
    where: { id: Number(id) },
    include: {
      uploadedBy: true,
      category: true,
      wallpaperTags: {
        include: {
          tag: true,
        },
      },
      colorPalettes: {
        include: {
          colorPalette: true,
        },
      },
    },
  });

  if (!wallpaper) {
    return NextResponse.json({ error: "Wallpaper not found" }, { status: 404 });
  }

  return NextResponse.json(wallpaper, { status: 200 });
}
