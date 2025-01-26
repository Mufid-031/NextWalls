import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ profileName: string }> }) => {
  const profileName = (await params).profileName;

  const profileUser = await prisma.user.findFirst({
    where: {
      name: profileName,
    },
  });

  if (!profileUser) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const profileComments = await prisma.comment.findMany({
    where: {
      profileId: Number(profileUser.id),
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
