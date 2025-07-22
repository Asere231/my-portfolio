import { useEffect, useState } from "react";

export function usePreloadImages(imageUrls) {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setAllImagesLoaded(true);
      return;
    }

    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, url]));
          resolve(url);
        };
        img.onerror = reject;
        img.src = url;
      });
    };

    Promise.allSettled(imageUrls.map(preloadImage)).then(() => {
      setAllImagesLoaded(true);
    });
  }, [imageUrls]);

  return {
    loadedImages,
    allImagesLoaded,
    loadProgress: loadedImages.size / imageUrls.length,
  };
}
