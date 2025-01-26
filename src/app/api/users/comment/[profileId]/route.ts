import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ profileId: string }> }) => {
  const profileId = (await params).profileId;

  const profileComments = await prisma.comment.findMany({
    where: {
      profileId: Number(profileId),
      parentId: null,
    },
    include: {
      user: true,
      replies: true,
    },
  });

  if (profileComments.length === 0) {
    return NextResponse.json({ error: "Profile comments not found" }, { status: 404 });
  }

  return NextResponse.json(profileComments, { status: 200 });
};
