'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getImageUrl } from '@/utils/image';

interface MoviePosterProps {
  posterPath: string | null;
  title: string;
  className?: string;
}

export function MoviePoster({ posterPath, title, className = '' }: MoviePosterProps) {
  const posterUrl = getImageUrl(posterPath, 'w500');
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`${className}`}>
      {posterUrl ? (
        <>
          {!imageLoaded && (
            <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg animate-pulse ring-4 ring-black/20"></div>
          )}
          <Image
            src={posterUrl}
            alt={title}
            width={400}
            height={600}
            className={`w-full rounded-lg shadow-2xl shadow-black/50 ring-4 ring-black/20 transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority
            onLoad={() => setImageLoaded(true)}
          />
        </>
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center ring-4 ring-black/20">
          <svg
            className="h-24 w-24 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 10l2-3 2 1 3-4 2 2v4H8v-1l-1 1z"/>
          </svg>
        </div>
      )}
    </div>
  );
}
