import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const wallpapers = await prisma.wallpaper.findMany();

    return NextResponse.json(wallpapers, { status: 200 });
}