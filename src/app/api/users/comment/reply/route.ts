import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, profileId, comment, parentId } = await req.json();

  const newProfileComment = await prisma.comment.create({
    data: {
      userId: Number(userId), // user login / user in session
      profileId: Number(profileId), // user profile comment
      content: comment,
      parentId: Number(parentId), // reply comment id
    },
  });

  return NextResponse.json(newProfileComment, { status: 200 });
};
