import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { globSync } from "glob";

const inputDir = "scripts/image-conversion/input";
const outputDir = "scripts/image-conversion/output";
const patterns = ["**/*.{jpg,jpeg,png,webp,tiff,gif}"];

// Config
const removeAlpha = false; 
// glass 1
// const widths = [346, 608];
// glass 2
// const widths = [170, 283];
// glass 3
// const widths = [153, 329];
// glass 4
// const widths = [100, 138];
// glass 5
// const widths = [203, 449];
// glass 6
const widths = [174, 259];
// glass 7
// const widths = [178, 298];

// people, output
// const widths = [1221, 814, 738, 512, 407, 246];

// output images home page
// const widths = [600, 489, 378];

// output images people page
// const widths = [378, 489, 600];

const files = globSync(patterns, {
  cwd: inputDir,
  nocase: true,
  dot: false,
  // Don’t reprocess outputs
  ignore: [`${outputDir}/**`],
  absolute: true,
});

if (files.length === 0) {
  console.log("No images found.");
  process.exit(0);
}

let processed = 0;
for (const file of files) {
  const { name } = path.parse(file);

  for (const baseWidth of widths) {
    // Generate 1x, 2x, and 3x versions
    const multipliers = [1, 2, 3];
    
    for (const multiplier of multipliers) {
      const actualWidth = baseWidth * multiplier;
      const outPath = path.join(outputDir, `${name}_w${actualWidth}.webp`);

      // Skip if already up-to-date
      try {
        const [srcStat, outStat] = await Promise.all([fs.stat(file), fs.stat(outPath)]);
        if (outStat.mtimeMs >= srcStat.mtimeMs) continue;
      } catch (_) {}

      const bg = '#000';

      // Resize without crop
      let pipeline = sharp(file, { animated: false })
        // Apply EXIF orientation
        .rotate()
        .resize({ width: actualWidth, withoutEnlargement: true });

      // Conditionally remove alpha channel
      if (removeAlpha) {
        pipeline = pipeline.flatten({ background: bg });
      }

      pipeline = pipeline.webp({
        quality: 82,     
        alphaQuality: 90,
        effort: 5, 
        smartSubsample: true,
        nearLossless: false,
      });

      await pipeline.toFile(outPath);
      processed++;
    }
  }
}

console.log(`Wrote ${processed} WebP variant(s).`);
