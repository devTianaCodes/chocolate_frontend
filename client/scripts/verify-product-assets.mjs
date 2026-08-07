import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_MAIN_IMAGE_BYTES = 225 * 1024;
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(scriptDirectory, '../dist/product-images');

function imagePath(asset, variant) {
  return path.join(outputDirectory, `${asset}-${variant}.jpg`);
}

async function verifyJpeg(filePath) {
  await access(filePath);
  const signature = await readFile(filePath, { encoding: null, flag: 'r' });

  if (signature[0] !== 0xff || signature[1] !== 0xd8 || signature[2] !== 0xff) {
    throw new Error(`Expected a JPEG file: ${filePath}`);
  }
}

async function verifyAsset(asset) {
  const mainPath = imagePath(asset, 'main');
  const detailPath = imagePath(asset, 'detail');

  await Promise.all([verifyJpeg(mainPath), verifyJpeg(detailPath)]);

  const mainStats = await stat(mainPath);
  if (mainStats.size > MAX_MAIN_IMAGE_BYTES) {
    throw new Error(
      `${path.basename(mainPath)} is ${mainStats.size} bytes; maximum is ${MAX_MAIN_IMAGE_BYTES}.`
    );
  }
}

const outputFiles = await readdir(outputDirectory);
const productAssets = outputFiles
  .filter((fileName) => fileName.endsWith('-main.jpg'))
  .map((fileName) => fileName.replace(/-main\.jpg$/, ''));

if (productAssets.length === 0) {
  throw new Error('No optimized product images were emitted.');
}

await Promise.all(productAssets.map(verifyAsset));
console.log(`Verified ${productAssets.length * 2} optimized product images.`);
