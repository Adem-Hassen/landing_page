// Generates the optimized WebP images in public/ from the originals in image-sources/.
// Runs automatically before `npm run build` (prebuild) and skips outputs that are up to date.
// To add an image: put the original in image-sources/ and add a job below.
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const QUALITY = 78;

/**
 * src:    original in image-sources/
 * out:    output path in public/ without extension; `-<width>` is appended for each width
 * widths: output widths (never larger than the source)
 * crop:   optional exact width/height (cover crop) instead of widths
 */
const jobs = [
  ...['mohamed-aziz', 'rayan-bensalem', 'youssef-mejri'].flatMap((id) => [
    { src: `teachers/${id}.jpg`, out: `teachers/${id}`, widths: [448, 896] },
    // 96px avatars in the results tabs, same 3:4 shape so the CSS crop is unchanged
    { src: `teachers/${id}.jpg`, out: `teachers/${id}-avatar`, crop: [192, 256] },
  ]),
  ...['audience-beginner', 'audience-business-hijab', 'audience-income'].map((n) => ({
    src: `audience/${n}.jpg`, out: `audience/${n}`, widths: [576, 1152],
  })),
  ...['problem-information-overload', 'problem-self-doubt', 'problem-trust-advice'].map((n) => ({
    src: `problems/${n}.jpg`, out: `problems/${n}`, widths: [512, 1024],
  })),
  ...[1, 2, 3, 4].map((n) => ({ src: `journey/step-${n}.webp`, out: `journey/step-${n}`, widths: [600, 1200] })),
  { src: 'offer/online-course.png', out: 'offer/online-course', widths: [800] },
  // Hero video poster (YouTube thumbnail); the facade loads the real player on click.
  { src: 'video/hero-poster.jpg', out: 'video/hero-poster', widths: [640, 1280] },
];

const mtime = async (file) => (await stat(file).catch(() => null))?.mtimeMs ?? 0;

let written = 0;
for (const job of jobs) {
  const src = path.join(root, 'image-sources', job.src);
  const srcTime = await mtime(src);
  if (!srcTime) throw new Error(`Missing source image: image-sources/${job.src}`);
  const meta = await sharp(src).metadata();
  const targets = job.crop
    ? [{ file: `${job.out}.webp`, resize: { width: job.crop[0], height: job.crop[1], fit: 'cover', position: 'north' } }]
    : job.widths.map((w) => ({ file: `${job.out}-${w}.webp`, resize: { width: Math.min(w, meta.width) } }));

  for (const t of targets) {
    const dest = path.join(root, 'public', t.file);
    if ((await mtime(dest)) > srcTime) continue;
    await mkdir(path.dirname(dest), { recursive: true });
    // sharp strips metadata by default.
    await sharp(src).resize(t.resize).webp({ quality: QUALITY, effort: 6 }).toFile(dest);
    written++;
  }
}
console.log(`optimize-images: ${written} file(s) written, others up to date`);
