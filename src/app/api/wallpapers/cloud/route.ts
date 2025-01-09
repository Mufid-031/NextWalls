import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";
import prisma from "@/lib/prisma";
import { Readable } from "stream";
export const config = {
  api: {
    bodyParser: false,
  },
};
function convertNextRequestToNodeRequest(req: NextRequest): NodeJS.ReadableStream & { headers: Record<string, string>, method: string } {
  const { body, headers, method } = req;
  const readable = Readable.from(body as unknown as Iterable<Uint8Array>);
  const nodeRequest = new Readable().wrap(readable) as NodeJS.ReadableStream & { headers: Record<string, string>, method: string };
  nodeRequest.method = method;
  nodeRequest.headers = Object.fromEntries(headers.entries());
  return nodeRequest;
}
const parseForm = (req: NodeJS.ReadableStream & { headers: Record<string, string>, method: string }) => {
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
export async function POST(req: NextRequest) {
  try {
    const nodeReq = convertNextRequestToNodeRequest(req);
    const { fields, files } = await parseForm(nodeReq);
    // // Input validation
    // if (!fields.title || typeof fields.title !== 'string') {
    //   return NextResponse.json({ error: "Title is required" }, { status: 400 });
    // }
    // if (!fields.email || typeof fields.email !== 'string') {
    //   return NextResponse.json({ error: "Email is required" }, { status: 400 });
    // }
    const file = files.file as formidable.File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "wallpapers",
      public_id: `wallpaper_${new Date().getTime()}`,
      overwrite: true,
      resource_type: "auto",
    });
    return NextResponse.json({ message: "File uploaded successfully", result }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}