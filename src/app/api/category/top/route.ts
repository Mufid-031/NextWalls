import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const topCategories = await prisma.category.findMany({
        include: {
            _count: {
                select: {
                    wallpapers: true
                }
            }
        },
        orderBy: {
            wallpapers: {
                _count: "desc"
            }
        }
    })

    if (topCategories.length === 0) {
        return NextResponse.json({ message: "top wallpaper not found" }, { status: 404 })
    }
    
    return NextResponse.json(topCategories);
}