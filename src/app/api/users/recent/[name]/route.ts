import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ name: string }> }) => {
  const name = (await params).name;

  const user = await prisma.user.findFirst({
    where: {
      name: name,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const recentUploads = await prisma.wallpaper.findMany({
    where: {
      uploadedBy: {
        id: user.id,
      },
    },
    take: 8,
    orderBy: {
      id: "desc",
    },
  });

  if (recentUploads.length === 0) {
    return NextResponse.json({ error: "User don't have recent uploads" }, { status: 404 });
  }

  return NextResponse.json(recentUploads, { status: 200 });
};
