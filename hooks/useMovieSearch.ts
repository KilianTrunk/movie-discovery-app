import { useState, useCallback, useEffect } from 'react';
import { Movie, MoviesResponse } from '@/types/movie';

interface UseMovieSearchResult {
  searchResults: Movie[];
  isSearching: boolean;
  searchError: string | null;
  searchMovies: (query: string) => void;
  clearSearch: () => void;
}

/*
 Hook to search for movies
 @returns The search results, whether the search is in progress, the search error, the function to search for movies, and the function to clear the search
*/
export function useMovieSearch(): UseMovieSearchResult {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasRestoredFromStorage, setHasRestoredFromStorage] = useState(false);

  // Restore search results from sessionStorage after hydration
  useEffect(() => {
    const stored = sessionStorage.getItem('movieSearchResults');
    if (stored) {
      try {
        const parsedResults = JSON.parse(stored);
        setSearchResults(parsedResults);
        setHasRestoredFromStorage(true);
      } catch (error) {
        console.error('Failed to parse stored search results:', error);
        sessionStorage.removeItem('movieSearchResults');
      }
    }
  }, []);

  // Save search results to sessionStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (searchResults.length > 0) {
        sessionStorage.setItem('movieSearchResults', JSON.stringify(searchResults));
      } else {
        sessionStorage.removeItem('movieSearchResults');
      }
    }
  }, [searchResults]);

  const searchMovies = useCallback(async (query: string) => {
    const trimmed = query.trim();

    if (!trimmed) {
      setSearchResults([]);
      setSearchError(null);
      setIsSearching(false);
      setHasRestoredFromStorage(false);
      return;
    }

    // If we have restored results from storage and this is the same query, don't make API call
    if (hasRestoredFromStorage && searchResults.length > 0) {
      setHasRestoredFromStorage(false); // Reset the flag after first use
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch(`/api/movies/search?query=${encodeURIComponent(trimmed)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: MoviesResponse = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      setSearchError(error instanceof Error ? error.message : 'Search failed');
    } finally {
      setIsSearching(false);
    }
  }, [hasRestoredFromStorage, searchResults.length]);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchError(null);
    setIsSearching(false);
    setHasRestoredFromStorage(false);
    // Clear sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('movieSearchQuery');
      sessionStorage.removeItem('movieSearchResults');
    }
  }, []);

  return {
    searchResults,
    isSearching,
    searchError,
    searchMovies,
    clearSearch
  };
}
