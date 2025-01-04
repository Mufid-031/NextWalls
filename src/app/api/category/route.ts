import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const categoryInDB = await prisma.category.count({
        where: { name: body.name }
    });

    if (categoryInDB > 0) {
        return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }

    const category = await prisma.category.create({
        data: { name: body.name }
    });

    return NextResponse.json(category, { status: 200 });
}

export const GET = async () => {
    const categories = await prisma.category.findMany();

    if (categories.length === 0) {
        return NextResponse.json({ error: "Categories not found" }, { status: 404 });
    }

    return NextResponse.json(categories, { status: 200 });
}