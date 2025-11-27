import { NextRequest, NextResponse } from 'next/server';
import { getPopularMovies } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const language = searchParams.get('language');
    const region = searchParams.get('region');

    const params = {
      ...(page && { page: parseInt(page) }),
      ...(language && { language }),
      ...(region && { region }),
    };

    const data = await getPopularMovies(params);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular movies' },
      { status: 500 }
    );
  }
}
