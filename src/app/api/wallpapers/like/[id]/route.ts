import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const likeInDB = await prisma.likedWallpaper.count({
        where: {
            wallpaperId: Number(body.wallpaperId),
            userId: Number(body.userId)
        }
    });

    if (likeInDB > 0) {
        return NextResponse.json({ error: "Like already exists" }, { status: 400 });
    }

    const like = await prisma.likedWallpaper.create({
        data: {
            wallpaperId: Number(body.wallpaperId),
            userId: Number(body.userId)
        }
    });

    return NextResponse.json(like, { status: 200 });
}

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    
    const likes = await prisma.likedWallpaper.findFirst({
        where: {
            wallpaperId: Number(id),
            userId: Number(id),
        }
    });

    if (!likes) {
        return NextResponse.json({ error: "Like not found" }, { status: 404 });
    }

    return NextResponse.json(likes, { status: 200 });
}