import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");

  const wallpapers = await prisma.wallpaper.findMany({
    where: {
      OR: [
        {
          title: { contains: name! },
        },
        {
          category: {
            name: name!,
          },
        },
        {
          wallpaperTags: {
            some: {
              tag: {
                name: {
                  contains: name!,
                },
              },
            },
          },
        },
      ],
    },
    include: {
      category: true,
    }
  });

  if (wallpapers.length === 0) {
    return NextResponse.json({ error: "Wallpapers not found" }, { status: 404 });
  }

  return NextResponse.json(wallpapers, { status: 200 });
};
