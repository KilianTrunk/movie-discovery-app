'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getImageUrl } from '@/utils/image';

interface MovieBackdropProps {
  backdropPath: string | null;
  title: string;
}

export function MovieBackdrop({ backdropPath, title }: MovieBackdropProps) {
  const backdropUrl = getImageUrl(backdropPath, 'original');
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden ${backdropUrl ? 'h-48 sm:h-64 md:h-80 lg:h-96' : 'h-32 sm:h-40 md:h-44 lg:h-48'}`}>
      {backdropUrl ? (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black animate-pulse" />
          )}
          <Image
            src={backdropUrl}
            alt={title}
            fill
            className={`object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority
            onLoad={() => setImageLoaded(true)}
          />
        </>
      ) : (
        // Fallback gradient background when no backdrop image
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  );
}
