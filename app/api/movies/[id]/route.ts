import { NextRequest, NextResponse } from 'next/server';
import { getMovieDetails } from '@/lib/tmdb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movieId = parseInt(id);
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');

    if (isNaN(movieId)) {
      return NextResponse.json(
        { error: 'Invalid movie ID' },
        { status: 400 }
      );
    }

    const data = await getMovieDetails(movieId, language || undefined);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    );
  }
}
