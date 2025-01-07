import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import sharp from "sharp";
import supabase from "@/lib/supabase";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const email = formData.get("email") as string;
    const categoryId = formData.get("categoryId") as string;
    const tags = JSON.parse(formData.get("tags") as string);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds the limit" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}${file.name.split(".").pop()}`;

    // Upload to Supabase Storage
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(`wallpapers/${fileName}`, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload file to Supabase" }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from("uploads").getPublicUrl(`wallpapers/${fileName}`);

    // Validate resolution if image
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

    // Fetch user and category
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const categoryInDb = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    const tagsInDb = await prisma.tag.findMany({
      where: { name: { in: tags } },
    });

    if (tagsInDb.length !== tags.length) {
      await prisma.tag.createMany({
        data: tags
          .filter((tag: string) => !tagsInDb.map((t: {name: string}) => t.name).includes(tag))
          .map((tag: string) => ({
            name: tag,
          })),
      });
    }

    const tagsInTags = await prisma.tag.findMany({
      where: { name: { in: tags } },
    });

    // Create wallpaper entry
    const wallpaper = await prisma.wallpaper.create({
      data: {
        title: title,
        description: description,
        imageUrl: publicUrl,
        userId: user.id,
        categoryId: categoryInDb?.id || 0,
        width: width,
        height: height,
      },
    });

    await prisma.wallpaperTag.createMany({
      data: tagsInTags.map((tag: { id: number }) => ({
        wallpaperId: wallpaper.id,
        tagId: tag.id,
      }))
    })

    return NextResponse.json({ message: "File uploaded successfully", wallpaper }, { status: 201 });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export const config = {
  api: { bodyParser: false },
};
