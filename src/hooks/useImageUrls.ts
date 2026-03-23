import { useState, useEffect } from 'react';

export function useImageUrls(images: File[] | string[]) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!images?.length) {
      setImageUrls([]);
      return;
    }

    if (typeof images[0] === 'string') {
      setImageUrls(images as string[]);
      return;
    }

    const urls = (images as File[]).map(file => {
      return URL.createObjectURL(file);
    });
    setImageUrls(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  return imageUrls;
}