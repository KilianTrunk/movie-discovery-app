import { notFound } from 'next/navigation';
import { getMovieDetails } from '@/lib/tmdb';
import { getImageUrl } from '@/utils/image';
import { MovieDetails } from '@/types/movie';
import { HeroImage } from '@/components/movie/HeroImage';
import { MoviePoster } from '@/components/movie/MoviePoster';
import { ContentHeader } from '@/components/movie/ContentHeader';
import { ContentDescription } from '@/components/movie/ContentDescription';
import { EntityList } from '@/components/movie/EntityList';
import { InfoGrid } from '@/components/movie/InfoGrid';
import { Container } from '@/components/ui/Container';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

async function getMovie(id: string): Promise<{ movie: MovieDetails | null; error: string | null; isNotFound: boolean }> {
  try {
    const movieId = parseInt(id);
    if (isNaN(movieId)) {
      return { movie: null, error: 'Invalid movie ID', isNotFound: true };
    }

    const movie = await getMovieDetails(movieId);
    return { movie, error: null, isNotFound: false };
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to load movie details';
    const isNotFound = errorMessage === 'MOVIE_NOT_FOUND';

    return {
      movie: null,
      error: errorMessage,
      isNotFound
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const { movie, error, isNotFound } = await getMovie(id);

  if (isNotFound) {
    notFound();
  }

  if (error || !movie) {
    // Handle other errors (network, API issues) with error page
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Movie</h1>
          <p className="text-gray-300">{error || 'An unexpected error occurred'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HeroImage imageUrl={movie.backdrop_path ? getImageUrl(movie.backdrop_path, 'original') : null} alt={movie.title} priority />

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
              <ContentHeader
                title={movie.title}
                subtitle={movie.tagline}
                metadata={[
                  ...(movie.release_date ? [{ label: 'year', value: new Date(movie.release_date).getFullYear() }] : []),
                  ...(movie.runtime ? [{ label: 'runtime', value: `${movie.runtime} min` }] : []),
                  {
                    label: 'rating',
                    value: `${movie.vote_average.toFixed(1)} (${movie.vote_count.toLocaleString()} votes)`,
                    icon: 'star'
                  }
                ]}
                badges={movie.genres?.map(genre => ({ id: genre.id, label: genre.name }))}
              />
              <ContentDescription content={movie.overview} />
              <EntityList
                title="Production"
                items={movie.production_companies.map(company => {
                  const logoUrl = company.logo_path ? getImageUrl(company.logo_path, 'w200') : null;
                  return {
                    id: company.id,
                    name: company.name,
                    logoUrl: logoUrl || undefined,
                    subtitle: company.origin_country
                  };
                })}
              />
              <InfoGrid
                items={[
                  {
                    label: 'Budget',
                    value: movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : null,
                    condition: movie.budget > 0
                  },
                  {
                    label: 'Revenue',
                    value: movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : null,
                    condition: movie.revenue > 0
                  },
                  {
                    label: 'Original Language',
                    value: movie.original_language?.toUpperCase(),
                    condition: !!movie.original_language
                  },
                  {
                    label: 'Status',
                    value: movie.status,
                    condition: !!movie.status
                  },
                  {
                    label: 'Languages',
                    value: movie.spoken_languages.map(lang => lang.english_name).join(', '),
                    condition: movie.spoken_languages.length > 0
                  },
                  {
                    label: 'Official Website',
                    value: (
                      <a
                        href={movie.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Visit Website
                      </a>
                    ),
                    condition: !!movie.homepage
                  }
                ]}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params;
  const { movie, error, isNotFound } = await getMovie(id);

  if (isNotFound) {
    return {
      title: 'Movie Not Found',
    };
  }

  if (error || !movie) {
    return {
      title: 'Error Loading Movie',
    };
  }

  return {
    title: `${movie.title}${movie.release_date ? ` (${new Date(movie.release_date).getFullYear()})` : ''}`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.poster_path ? [getImageUrl(movie.poster_path, 'w500')] : [],
    },
  };
}
