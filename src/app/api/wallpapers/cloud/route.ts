import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseForm = (req: any) => {
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.parse(req, (err: Error, fields: formidable.Fields, files: formidable.Files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    }
  );
};

export async function POST(req: NextRequest) {
  try {
    const { fields, files } = await parseForm(req.json());

    const file = files.file as unknown as formidable.File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload file ke Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    const user = await prisma.user.findUnique({
      where: { email: fields.email as unknown as string },
    });

    const wallpaper = await prisma.wallpaper.create({
      data: {
        title: fields.title as unknown as string,
        description: fields.description as unknown as string | undefined,
        imageUrl: result.secure_url,
        userId: user?.id as unknown as number,
      },
    });

    return NextResponse.json({ message: "File uploaded successfully", wallpaper }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}