import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const { wallpaperId: id } = await req.json();

  const wallpaper = await prisma.wallpaper.update({
    where: { id: Number(id) },
    data: { views: { increment: 1 } },
  });

  return NextResponse.json(wallpaper, { status: 201 });
};

export const GET = async () => {
  const wallpapersViews = await prisma.wallpaper.findMany({
    select: {
      views: true,
    },
  });

  const totalViews = wallpapersViews.reduce((acc, curr) => acc + curr.views, 0);

  return NextResponse.json({ totalViews }, { status: 200 });
};
