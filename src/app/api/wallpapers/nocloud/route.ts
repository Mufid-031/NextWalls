import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import prisma from "@/lib/prisma";
import sharp from "sharp";
import MediaInfo from "mediainfo.js";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

async function getVideoResolution(fileBuffer: Buffer) {
  const mediaInfo = await MediaInfo({
    locateFile: () => `/MediaInfoModule.wasm`,
  });
  const result = await mediaInfo.analyzeData(
    () => fileBuffer.length,
    (chunkSize) => fileBuffer.slice(0, chunkSize)
  );

  const videoTrack = result.media?.track.find((track) => track["@type"] === "Video");
  return {
    width: parseInt(videoTrack?.Width?.toString() || "0"),
    height: parseInt(videoTrack?.Height?.toString() || "0"),
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const email = formData.get("email") as string;
    const categoryId = formData.get("categoryId") as string;

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

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);

    let width = 0;
    let height = 0;

    if (file.type.startsWith("image/")) {
      const image = await sharp(buffer).metadata();
      width = image.width!;
      height = image.height!;

      if (width < 800 || height < 600) {
        return NextResponse.json({ error: "Image resolution is too low. Minimum resolution is 800x600." }, { status: 400 });
      }
    }

    if (file.type.startsWith("video/")) {
      const videoRes = await getVideoResolution(buffer);

      if (videoRes.width < 1280 || videoRes.height < 720) {
        return NextResponse.json({ error: "Video resolution is too low. Minimum resolution is 1280x720." }, { status: 400 });
      }

      width = videoRes.width;
      height = videoRes.height;
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const categoryInDb = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    const wallpaper = await prisma.wallpaper.create({
      data: {
        title: title,
        description: description,
        imageUrl: `/uploads/${fileName}`,
        userId: user.id,
        categoryId: categoryInDb?.id || 0,
        width: width,
        height: height,
      },
    });

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        wallpaper,
      },
      { status: 201 }
    );
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
