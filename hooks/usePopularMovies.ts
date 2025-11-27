import { useState, useEffect } from 'react';
import { Movie, MoviesResponse } from '@/types/movie';

interface UsePopularMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/*
 Hook to fetch popular movies
 @returns The popular movies, whether the movies are loading, the error, and the function to refetch the movies
*/
export function usePopularMovies(): UsePopularMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/movies/popular');
      if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
      }

      const data: MoviesResponse = await response.json();
      setMovies(data.results);
    } catch (err) {
      console.error('Failed to load popular movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to load popular movies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    isLoading,
    error,
    refetch: fetchMovies
  };
}
