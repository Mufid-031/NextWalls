import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
        return NextResponse.json({ error: "Users not found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
}