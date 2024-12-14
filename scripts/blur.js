// scripts/blur.js
const { exec } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const execAsync = promisify(exec);

async function generateBlurPlaceholder() {
  const svgPath = path.join(process.cwd(), "public/img/background.svg");
  const pngPath = path.join(process.cwd(), "public/img/background-preview.png");
  const tempPngPath = path.join(process.cwd(), "temp-blur.png");

  try {
    // First convert SVG to small PNG using ImageMagick
    // await execAsync(
    //   `magick convert "${svgPath}" -resize "300x300>" "${tempPngPath}"`
    // );

    // Read the PNG file and convert to base64
    const pngBuffer = fs.readFileSync(pngPath);
    const base64 = pngBuffer.toString("base64");
    const blurDataURL = `data:image/png;base64,${base64}`;

    console.log(blurDataURL);

    // Clean up temporary file
    //fs.unlinkSync(tempPngPath);
  } catch (error) {
    console.error("Error generating blur placeholder:", error);
  }
}

generateBlurPlaceholder();
