import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import prisma from "@/lib/prisma";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds the limit" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}${path.extname(file.name)}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);
    
    // Ensure the uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    await fs.writeFile(filePath, buffer);

    const wallpaper = await prisma.wallpaper.create({
      data: {
        title,
        description,
        imageUrl: `/uploads/${fileName}`,
        userId: 4 // Note: You might want to get this dynamically
      }
    });

    return NextResponse.json({ 
      message: "File uploaded successfully", 
      wallpaper 
    }, { status: 201 });
  } catch (error) {
    console.error("File upload error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: `Failed to upload file: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

