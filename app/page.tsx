'use client';

import { MovieCard } from '@/components/movie/MovieCard';
import { MovieCardSkeleton } from '@/components/movie/MovieCardSkeleton';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { SearchBar } from '@/components/SearchBar';
import { Container } from '@/components/ui/Container';
import { usePopularMovies } from '@/hooks/usePopularMovies';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import { RefreshCw, FileX, Film } from 'lucide-react';

export default function HomePage() {
  const { movies: popularMovies, isLoading, error, refetch } = usePopularMovies();
  const { searchResults, isSearching, searchMovies, clearSearch } = useMovieSearch();

  const displayedMovies = searchResults.length > 0 ? searchResults : popularMovies;
  const isShowingSearchResults = searchResults.length > 0;

  // Check if user has searched but got no results
  const hasSearchedWithNoResults = !isShowingSearchResults &&
    !isSearching &&
    typeof window !== 'undefined' &&
    sessionStorage.getItem('movieSearchQuery') &&
    popularMovies.length > 0;

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Container>
          <ErrorBoundary message={error} onRetry={refetch} />
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 via-transparent to-transparent blur-3xl" />

        {/* Animated particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary/60 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-secondary/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
      </div>


      {/* Main content */}
      <main className="py-12 relative">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent" />

        <Container className="relative z-10">
          <>
            {/* Search bar */}
            <div className="mb-8">
              <SearchBar
                onSearch={searchMovies}
                onClearSearch={clearSearch}
              />
            </div>

            {/* Search fallback message */}
            {hasSearchedWithNoResults && (
              <div className="mb-6">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Film className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-text font-medium">No movies found for your search</p>
                      <p className="text-text-muted text-sm">Check out these popular movies instead!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Movies grid / loading / empty states */}
            {(isLoading && !isShowingSearchResults) || isSearching ? (
              // Skeletons while loading popular movies or searching
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                {Array.from({ length: 20 }, (_, index) => (
                  <MovieCardSkeleton key={`skeleton-${index}`} index={index} />
                ))}
              </div>
            ) : displayedMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                {displayedMovies.map((movie, index) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    priority={index < 8} // Prioritize first 8 images for better LCP
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4">
                <div className="relative mb-8">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-50" />
                  <div className="relative bg-surface border border-border rounded-2xl p-8 shadow-2xl">
                    <FileX className="mx-auto h-20 w-20 text-primary animate-float" />
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="absolute top-4 right-4 w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-text mb-3">
                  {isShowingSearchResults ? '🎭 No Cinematic Matches' : '🎬 Collection Loading'}
                </h3>
                <p className="text-text-muted text-lg max-w-md mx-auto leading-relaxed">
                  {isShowingSearchResults
                    ? 'The search lights couldn\'t find that title. Try different keywords or browse our collection.'
                    : 'Our digital reels are being prepared. Check back soon for the latest blockbusters.'
                  }
                </p>

                {/* Call to action */}
                <div className="mt-8">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-bg font-semibold rounded-xl hover:from-primary-hover hover:to-secondary-hover transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25 flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh Collection
                  </button>
                </div>
              </div>
            )}
          </>
        </Container>
      </main>
    </div>
  );
}
