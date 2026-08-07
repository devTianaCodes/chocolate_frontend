import { access, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_MAIN_IMAGE_BYTES = 225 * 1024;
const PRODUCT_ASSETS = [
  'amber-single-origin',
  'artisan-chocolate-bars',
  'cacao-rich-vegan-and-dairy-free',
  'estate-spreads-and-creams',
  'golden-gift-boxes',
  'hand-tempered-white-chocolate',
  'luxe-seasonal-and-limited-edition',
  'midnight-sugar-free',
  'roasted-milk-chocolate',
  'signature-chocolate-covered-nuts',
  'silk-smooth-drinking-chocolate',
  'single-harvest-ruby-chocolate',
  'stone-ground-filled-and-pralines',
  'velvety-dark-chocolate',
  'vintage-raw-and-organic',
];

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

await Promise.all(PRODUCT_ASSETS.map(verifyAsset));
console.log(`Verified ${PRODUCT_ASSETS.length * 2} optimized product images.`);
