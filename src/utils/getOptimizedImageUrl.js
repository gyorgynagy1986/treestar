// Ez a függvény generálja a Next.js által használt optimalizált kép URL-t
const getOptimizedImageUrl = (src, width = 3840, quality = 75) => {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

export default getOptimizedImageUrl;
