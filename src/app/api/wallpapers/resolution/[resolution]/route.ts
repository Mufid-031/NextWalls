import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, params: { params: Promise<{ resolution: string }>}) => {
    const resolution = (await params.params).resolution;

    const wallpapers = await prisma.wallpaper.findMany({
        where: { 
            width: Number(resolution.split("x")[0]), 
            height: Number(resolution.split("x")[1]) 
        },
    })

    if (wallpapers.length === 0) {
        return NextResponse.json({ error: "Wallpapers not found" }, { status: 404 });
    }

    return NextResponse.json(wallpapers, { status: 200 });
}