import { NextRequest, NextResponse } from 'next/server';
import { searchMovies } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page');
    const language = searchParams.get('language');
    const includeAdult = searchParams.get('include_adult');
    const primaryReleaseYear = searchParams.get('primary_release_year');
    const region = searchParams.get('region');
    const year = searchParams.get('year');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const params = {
      query,
      ...(page && { page: parseInt(page) }),
      ...(language && { language }),
      ...(includeAdult && { include_adult: includeAdult === 'true' }),
      ...(primaryReleaseYear && { primary_release_year: primaryReleaseYear }),
      ...(region && { region }),
      ...(year && { year }),
    };

    const data = await searchMovies(params);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error searching movies:', error);
    return NextResponse.json(
      { error: 'Failed to search movies' },
      { status: 500 }
    );
  }
}
