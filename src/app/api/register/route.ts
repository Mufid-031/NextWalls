import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const userCount = await prisma.user.count(
        { where: { email } }
    );

    if (userCount > 0) {
        return NextResponse.json({
            message: "User already exists",
        }, { status: 400 })
    }

    const user = await prisma.user.create({
        data: {
            name: email.split("@")[0],
            email,
            password
        }
    })

    return NextResponse.json({
        message: "User created successfully",
        data: user
    }, { status: 200 })

}