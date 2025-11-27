import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Movie } from '@/types/movie';
import { getImageUrl } from '@/utils/image';
import { Star, ImageIcon } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
  index?: number;
}

export function MovieCard({ movie, priority = false, index = 0 }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, 'w300');
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block overflow-hidden rounded-xl bg-surface border border-border hover:border-primary/50 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 relative"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >

      <div className="aspect-[3/4] sm:aspect-[2/3] relative overflow-hidden">
        {posterUrl ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-surface-subtle animate-pulse" />
            )}
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'}`}
              sizes="(max-width: 475px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16.67vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-surface-subtle text-text-muted relative">
            <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-subtle animate-pulse" />
            <ImageIcon className="h-16 w-16 relative z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          </div>
        )}

        <div className="absolute top-3 right-3 rounded-full bg-bg/90 backdrop-blur-sm border border-primary/30 px-3 py-1.5 text-sm font-bold text-text shadow-lg flex items-center gap-1">
          <Star className="w-3 h-3 text-primary fill-current" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      <div className="p-3 sm:p-5 relative">
        <h3 className="font-bold text-base sm:text-lg leading-tight mb-2 overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-500 bg-gradient-to-r from-text to-text bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-text-muted mb-3">
          <div className="flex items-center space-x-2">
            {releaseYear && (
              <span className="px-2 py-1 bg-surface-subtle rounded-md text-xs font-medium">
                {releaseYear}
              </span>
            )}
            <span className="text-xs opacity-75">
              {movie.vote_count.toLocaleString()} votes
            </span>
          </div>
        </div>

        {movie.overview && (
          <div className="relative">
            <p
              className="text-sm text-text-muted leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {movie.overview}
            </p>
          </div>
        )}

      </div>
    </Link>
  );
}
