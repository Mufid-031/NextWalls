import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, profileName, comment, parentId } = await req.json();

  const profileUser = await prisma.user.findFirst({
    where: { name: { equals: profileName } },
  });

  const newProfileComment = await prisma.comment.create({
    data: {
      userId: Number(userId), // user login / user in session
      profileId: Number(profileUser?.id), // user profile comment
      content: comment,
      parentId: Number(parentId), // reply comment id
    },
  });

  return NextResponse.json(newProfileComment, { status: 200 });
};
