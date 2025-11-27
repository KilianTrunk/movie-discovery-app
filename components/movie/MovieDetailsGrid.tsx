import { MovieDetails } from '@/types/movie';

interface MovieDetailsGridProps {
  movie: MovieDetails;
}

export function MovieDetailsGrid({ movie }: MovieDetailsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {movie.budget > 0 && (
        <div>
          <h3 className="font-semibold mb-1">Budget</h3>
          <p className="text-gray-300">${movie.budget.toLocaleString()}</p>
        </div>
      )}

      {movie.revenue > 0 && (
        <div>
          <h3 className="font-semibold mb-1">Revenue</h3>
          <p className="text-gray-300">${movie.revenue.toLocaleString()}</p>
        </div>
      )}

      {movie.original_language && (
        <div>
          <h3 className="font-semibold mb-1">Original Language</h3>
          <p className="text-gray-300 uppercase">{movie.original_language}</p>
        </div>
      )}

      {movie.status && (
        <div>
          <h3 className="font-semibold mb-1">Status</h3>
          <p className="text-gray-300">{movie.status}</p>
        </div>
      )}

      {movie.spoken_languages.length > 0 && (
        <div>
          <h3 className="font-semibold mb-1">Languages</h3>
          <p className="text-gray-300">
            {movie.spoken_languages.map(lang => lang.english_name).join(', ')}
          </p>
        </div>
      )}

      {movie.homepage && (
        <div>
          <h3 className="font-semibold mb-1">Official Website</h3>
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Visit Website
          </a>
        </div>
      )}
    </div>
  );
}
