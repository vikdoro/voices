import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { globSync } from "glob";

const inputDir = "scripts/image-conversion/input";
const outputDir = "scripts/image-conversion/output";
const patterns = ["**/*.{jpg,jpeg,png,webp,tiff,gif}"];

// Config
const removeAlpha = false;

// Function to empty the output directory
async function emptyOutputDir() {
  try {
    // Check if output directory exists
    await fs.access(outputDir);
    
    // Read all files in the output directory
    const files = await fs.readdir(outputDir);
    
    // Remove all files
    for (const file of files) {
      const filePath = path.join(outputDir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        // Remove directory recursively
        await fs.rm(filePath, { recursive: true, force: true });
      } else {
        // Remove file
        await fs.unlink(filePath);
      }
    }
    
    console.log(`Cleared output directory: ${outputDir}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Directory doesn't exist, create it
      await fs.mkdir(outputDir, { recursive: true });
      console.log(`Created output directory: ${outputDir}`);
    } else {
      console.error(`Error clearing output directory: ${error.message}`);
      throw error;
    }
  }
} 

// Width configuration map based on filename patterns
const widthMap = {
  // Glass images
  'glass-1': [346, 608],
  'glass-2': [152, 365],
  'glass-3': [169, 283],
  'glass-4': [100, 138],
  'glass-5': [202, 449],
  'glass-6': [124, 259],
  'glass-7': [178, 298],
  
  // People and output images
  'people': [246, 407],
  'output': [246, 407],
  
  // People page images
  'home': [378, 489, 600],
  
  // Background images
  'background-s': [1333],
  'background': [1920, 1330, 780],
  'footer-bg': [1920, 1330, 780],
  
  // Default fallback
  'default': [400, 800, 1200]
};

// Function to get widths based on filename
function getWidthsForFile(filename) {
  // Check for exact matches first
  for (const [pattern, widths] of Object.entries(widthMap)) {
    if (filename.includes(pattern)) {
      return widths;
    }
  }
  
  // If no pattern matches, log error and exit
  console.error(`No pattern found for ${filename}`);
  console.log('Available patterns:', Object.keys(widthMap).join(', '));
  process.exit(1);
}

// Main execution function
async function main() {
  // Clear output directory before processing
  await emptyOutputDir();

  const files = globSync(patterns, {
    cwd: inputDir,
    nocase: true,
    dot: false,
    // Don't reprocess outputs
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
    
    // Get widths based on filename
    const widths = getWidthsForFile(name);
    console.log(`Processing ${name} with widths: [${widths.join(', ')}]`);

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
}

// Run the main function
main().catch(console.error);
