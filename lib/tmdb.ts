import type {
  MovieDetails,
  MoviesResponse,
  SearchMoviesParams,
  PopularMoviesParams
} from '@/types/movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function tmdbFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('TMDB_API_KEY environment variable is not set. Please create a .env.local file with your TMDB API key.');
  }

  url.searchParams.set('api_key', apiKey);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    // Throw specific error for 404 (movie not found)
    if (response.status === 404) {
      throw new Error('MOVIE_NOT_FOUND');
    }
    // Throw generic error for other API issues
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getPopularMovies(params: PopularMoviesParams = {}): Promise<MoviesResponse> {
  const queryParams: Record<string, string> = {};

  if (params.language) queryParams.language = params.language;
  if (params.page) queryParams.page = params.page.toString();
  if (params.region) queryParams.region = params.region;

  return tmdbFetch<MoviesResponse>('/movie/popular', queryParams);
}

export async function searchMovies(params: SearchMoviesParams): Promise<MoviesResponse> {
  const queryParams: Record<string, string> = {
    query: params.query,
  };

  if (params.page) queryParams.page = params.page.toString();
  if (params.include_adult !== undefined) queryParams.include_adult = params.include_adult.toString();
  if (params.language) queryParams.language = params.language;
  if (params.primary_release_year) queryParams.primary_release_year = params.primary_release_year;
  if (params.region) queryParams.region = params.region;
  if (params.year) queryParams.year = params.year;

  return tmdbFetch<MoviesResponse>('/search/movie', queryParams);
}

export async function getMovieDetails(movieId: number, language?: string): Promise<MovieDetails> {
  const queryParams: Record<string, string> = {};
  if (language) queryParams.language = language;

  return tmdbFetch<MovieDetails>(`/movie/${movieId}`, queryParams);
}
