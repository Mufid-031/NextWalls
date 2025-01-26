import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, profileName, comment } = await req.json();

  const profile = await prisma.user.findFirst({
    where: { name: { equals: profileName } },
  });

  const newProfileComment = await prisma.comment.create({
    data: {
      userId: Number(userId), // user login / user in session
      profileId: Number(profile?.id), // user profile comment
      content: comment,
      parentId: null,
    },
  });

  return NextResponse.json(newProfileComment, { status: 200 });
};
