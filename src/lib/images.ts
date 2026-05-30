/**
 * Image resolver.
 * ----------------------------------------------------------------------------
 * Lets the content config (src/config/site.ts) reference photos by file name
 * only (e.g. "hero.jpg"). Drop images into src/assets/ and they get picked up
 * here automatically — no import statements to manage.
 *
 * Returns the ImageMetadata Astro's <Image /> needs for optimization.
 */
import type { ImageMetadata } from 'astro';

// Eagerly import every image in src/assets/ keyed by absolute path.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true }
);

// Re-key the map by bare file name so the config can use "hero.jpg".
const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(images)) {
  const fileName = path.split('/').pop();
  if (fileName) byName.set(fileName, mod.default);
}

/**
 * Resolve a file name (from the config) to its optimized ImageMetadata.
 * Throws a clear, actionable error if the file is missing so a typo in the
 * config doesn't fail silently.
 */
export function resolveImage(fileName: string): ImageMetadata {
  const img = byName.get(fileName);
  if (!img) {
    const available = [...byName.keys()].sort().join(', ') || '(none found)';
    throw new Error(
      `Image "${fileName}" was referenced in src/config/site.ts but not found in src/assets/.\n` +
        `Make sure the file exists and the name matches exactly (case-sensitive).\n` +
        `Available images: ${available}`
    );
  }
  return img;
}
