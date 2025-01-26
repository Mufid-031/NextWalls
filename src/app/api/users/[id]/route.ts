import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const users = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
            commentsMade: true,
            savedWallpapers: true,
            likedWallpapers: true,
            wallpapers: true,
        }
    });

    if (!users) {
        return NextResponse.json({ error: "Users not found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
}