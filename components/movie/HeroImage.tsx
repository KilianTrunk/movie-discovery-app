'use client';

import Image from 'next/image';
import { useState, ReactNode } from 'react';

interface HeroImageProps {
  imageUrl?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  fallback?: ReactNode;
  overlay?: boolean;
}

export function HeroImage({
  imageUrl,
  alt,
  className = "h-48 sm:h-64 md:h-80 lg:h-96",
  priority = false,
  fallback,
  overlay = true
}: HeroImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden ${imageUrl ? className : 'h-32 sm:h-40 md:h-44 lg:h-48'}`}>
      {imageUrl ? (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black animate-pulse" />
          )}
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority={priority}
            onLoad={() => setImageLoaded(true)}
          />
        </>
      ) : (
        fallback || (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
        )
      )}

      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </>
      )}
    </div>
  );
}
