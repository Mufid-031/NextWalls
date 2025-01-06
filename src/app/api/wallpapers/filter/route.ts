import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const general = searchParams.get("general");
  const anime = searchParams.get("anime");
  const people = searchParams.get("people");

  const categories = [];
  if (general || (!anime && !people)) categories.push("general");
  if (anime) categories.push("anime");
  if (people) categories.push("people");

  const wallpapers = await prisma.wallpaper.findMany({
    where: {
      category: {
        name: {
          in: categories,
        },
      },
    },
    include: { category: true, wallpaperTags: { include: { tag: true } } },
  });

  if (wallpapers.length === 0) {
    return NextResponse.json({ error: "Wallpapers not found" }, { status: 404 });
  }

  return NextResponse.json(wallpapers, { status: 200 });
};
