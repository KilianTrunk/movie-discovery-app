export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: ProductionCompany[];
  revenue: number;
  runtime: number | null;
  spoken_languages: Language[];
  status: string;
  tagline: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface SearchMoviesParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  region?: string;
  year?: string;
}

export interface PopularMoviesParams {
  language?: string;
  page?: number;
  region?: string;
}
