import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const wallpapers = await prisma.wallpaper.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3
  });

  if (wallpapers.length === 0) {
    return NextResponse.json({ error: "Wallpapers not found" }, { status: 404 });
  }

  return NextResponse.json(wallpapers);
};
