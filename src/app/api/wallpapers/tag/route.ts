import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.formData();
  const wallpaperId = body.get("wallpaperId");
  const name = body.get("name");

  let tag = await prisma.tag.findFirst({
    where: { name: name as string },
  });

  if (!tag) {
    tag = await prisma.tag.create({
      data: { name: name as string },
    });
  }

  const wallpaperTag = await prisma.wallpaperTag.create({
    data: {
      wallpaperId: Number(wallpaperId),
      tagId: tag.id,
    },
  });

  return NextResponse.json(wallpaperTag, { status: 201 });
};
