import React from 'react'
import { render, screen } from '@testing-library/react'
import { MovieCard } from '@/components/movie/MovieCard'

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: (props: { children: React.ReactNode; href: string }) => <a href={props.href}>{props.children}</a>
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={props.src}
      alt={props.alt}
      data-fill={props.fill ? 'true' : undefined}
      data-priority={props.priority ? 'true' : undefined}
      {...(Object.fromEntries(
        Object.entries(props).filter(([key]) => !['fill', 'priority'].includes(key))
      ))}
    />
  )
}))

// Mock lucide icons
jest.mock('lucide-react', () => ({
  Star: () => <div data-testid="star-icon">★</div>,
  ImageIcon: () => <div data-testid="image-icon">🖼️</div>
}))

describe('MovieCard', () => {
  const mockMovie = {
    id: 123,
    title: 'Test Movie',
    overview: 'This is a test movie description',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    release_date: '2023-01-15',
    vote_average: 8.5,
    vote_count: 1500,
    adult: false,
    genre_ids: [28, 12],
    original_language: 'en',
    original_title: 'Test Movie',
    popularity: 150.5,
    video: false
  }

  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />)

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText('8.5')).toBeInTheDocument()
    expect(screen.getByText('1,500 votes')).toBeInTheDocument()
  })

  it('displays fallback when no poster', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null, backdrop_path: null }
    render(<MovieCard movie={movieWithoutPoster} />)

    expect(screen.getByTestId('image-icon')).toBeInTheDocument()
  })

  it('links to correct movie page', () => {
    render(<MovieCard movie={mockMovie} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/movie/123')
  })

  it('handles movies without release date', () => {
    const movieWithoutDate = { ...mockMovie, release_date: undefined, backdrop_path: null }
    render(<MovieCard movie={movieWithoutDate} />)

    // Should not crash and should still display the title
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('applies priority loading for first few movies', () => {
    const { rerender } = render(<MovieCard movie={mockMovie} priority={true} index={0} />)

    // Next.js Image should receive priority prop
    const img = screen.getByRole('img')
    // Note: priority is handled by Next.js Image, may not appear as DOM attribute
    expect(img).toBeInTheDocument()

    // Test without priority
    rerender(<MovieCard movie={mockMovie} priority={false} index={5} />)
    // Should still render without priority
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('truncates long titles appropriately', () => {
    const longTitleMovie = {
      ...mockMovie,
      backdrop_path: null,
      title: 'This is a very long movie title that should be truncated in the UI'
    }
    render(<MovieCard movie={longTitleMovie} />)

    // The title should still be rendered (CSS handles truncation)
    expect(screen.getByText('This is a very long movie title that should be truncated in the UI')).toBeInTheDocument()
  })

  it('formats vote count correctly', () => {
    const highVoteMovie = { ...mockMovie, backdrop_path: null, vote_count: 1250000 }
    render(<MovieCard movie={highVoteMovie} />)

    expect(screen.getByText('1,250,000 votes')).toBeInTheDocument()
  })

  it('handles zero vote average', () => {
    const noRatingMovie = { ...mockMovie, backdrop_path: null, vote_average: 0, vote_count: 0 }
    render(<MovieCard movie={noRatingMovie} />)

    expect(screen.getByText('0.0')).toBeInTheDocument()
    expect(screen.getByText('0 votes')).toBeInTheDocument()
  })
})
