import { MovieDetails, Genre } from '@/types/movie';
import { Star } from 'lucide-react';

interface MovieHeaderProps {
  movie: MovieDetails;
  genres?: Genre[];
}

export function MovieHeader({ movie, genres = [] }: MovieHeaderProps) {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
      {movie.tagline && (
        <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
      )}

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
        {releaseYear && <span>{releaseYear}</span>}
        {movie.runtime && <span>{movie.runtime} min</span>}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-primary fill-current" />
          <span>{movie.vote_average.toFixed(1)}</span>
          <span>({movie.vote_count.toLocaleString()} votes)</span>
        </div>
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
