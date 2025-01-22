import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ rgb: string }> }) => {
  const rgb = (await params).rgb;

  const wallpapers = await prisma.wallpaper.findMany({
    where: {
      colorPalettes: {
        some: {
          colorPalette: {
            color: {
              equals: rgb,
            },
          },
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
      colorPalettes: {
        include: {
          colorPalette: true,
        },
      },
    },
  });

  if (wallpapers.length === 0) {
    return NextResponse.json({ error: "Wallpapers not found" }, { status: 404 });
  }

  return NextResponse.json(wallpapers, { status: 200 });
};
