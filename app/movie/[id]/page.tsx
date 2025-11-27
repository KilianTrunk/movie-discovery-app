import { getMovieDetails } from '@/lib/tmdb';
import { getImageUrl } from '@/utils/image';
import { MovieDetails } from '@/types/movie';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Container } from '@/components/ui/Container';
import { MovieBackdrop } from '@/components/movie/MovieBackdrop';
import { MoviePoster } from '@/components/movie/MoviePoster';
import { MovieHeader } from '@/components/movie/MovieHeader';
import { MovieOverview } from '@/components/movie/MovieOverview';
import { MovieProductionCompanies } from '@/components/movie/MovieProductionCompanies';
import { MovieDetailsGrid } from '@/components/movie/MovieDetailsGrid';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

async function getMovie(id: string): Promise<{ movie: MovieDetails | null; error: string | null }> {
  try {
    const movieId = parseInt(id);
    if (isNaN(movieId)) {
      return { movie: null, error: 'Invalid movie ID' };
    }

    const movie = await getMovieDetails(movieId);
    return { movie, error: null };
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    return {
      movie: null,
      error: error instanceof Error ? error.message : 'Failed to load movie details'
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const { movie, error } = await getMovie(id);

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Container>
          <ErrorMessage
            title={error === 'Invalid movie ID' ? 'Invalid Movie ID' : 'Failed to Load Movie'}
            message={
              error === 'Invalid movie ID'
                ? 'The movie ID in the URL is not valid.'
                : 'Sorry, we encountered an error while loading this movie. Please try again later.'
            }
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <MovieBackdrop backdropPath={movie.backdrop_path} title={movie.title} />

      <div className="relative -mt-24 sm:-mt-32 pb-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1 relative z-10 flex justify-center lg:justify-start">
              <div className="w-full max-w-[200px] sm:max-w-[250px] lg:max-w-none">
                <MoviePoster posterPath={movie.poster_path} title={movie.title} />
              </div>
            </div>

            {/* Movie details */}
            <div className="lg:col-span-2 space-y-6 relative z-10">
              <MovieHeader movie={movie} genres={movie.genres} />
              <MovieOverview overview={movie.overview} />
              <MovieProductionCompanies companies={movie.production_companies} />
              <MovieDetailsGrid movie={movie} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params;
  const { movie, error } = await getMovie(id);

  if (error || !movie) {
    return {
      title: error === 'Invalid movie ID' ? 'Invalid Movie ID' : 'Movie Not Found',
    };
  }

  return {
    title: `${movie.title} (${new Date(movie.release_date).getFullYear()})`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.poster_path ? [getImageUrl(movie.poster_path, 'w500')] : [],
    },
  };
}
