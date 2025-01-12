import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import ColorThief from "colorthief";
import fs from "fs";

export const POST = async (req: NextRequest) => {
  try {
    const { imgUrl } = await req.json();
    const image = await loadImage(imgUrl);

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(canvas);
    const palette = colorThief.getPalette(canvas, 5);

    return NextResponse.json({ dominantColor, palette }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred" + error }, { status: 500 });
  }
};
