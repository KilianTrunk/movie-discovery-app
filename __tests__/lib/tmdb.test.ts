import { getPopularMovies, searchMovies, getMovieDetails } from '@/lib/tmdb'

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('TMDB API', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    process.env.TMDB_API_KEY = 'test-api-key'
  })

  afterEach(() => {
    delete process.env.TMDB_API_KEY
  })

  describe('getPopularMovies', () => {
    it('should fetch popular movies successfully', async () => {
      const mockResponse = {
        page: 1,
        results: [
          { id: 1, title: 'Movie 1', overview: 'Description 1' }
        ],
        total_pages: 10,
        total_results: 200
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await getPopularMovies()

      const url = mockFetch.mock.calls[0][0]
      expect(url).toContain('movie/popular')
      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })

      await expect(getPopularMovies()).rejects.toThrow('TMDB API error: 500 Internal Server Error')
    })

    it('should include page parameter when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ page: 2, results: [] })
      })

      await getPopularMovies({ page: 2 })

      const url = mockFetch.mock.calls[0][0]
      expect(url).toContain('page=2')
    })
  })

  describe('searchMovies', () => {
    it('should search movies successfully', async () => {
      const mockResponse = {
        page: 1,
        results: [
          { id: 1, title: 'Batman', overview: 'Dark knight' }
        ],
        total_pages: 5,
        total_results: 50
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await searchMovies({ query: 'batman' })

      const url = mockFetch.mock.calls[0][0]
      expect(url).toContain('search/movie')
      expect(url).toContain('query=batman')
      expect(result).toEqual(mockResponse)
    })

    it('should require query parameter', async () => {
      await expect(searchMovies({ query: '' })).rejects.toThrow()
    })

    it('should include optional parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ page: 1, results: [] })
      })

      await searchMovies({
        query: 'test',
        page: 2,
        language: 'en',
        include_adult: false
      })

      const url = mockFetch.mock.calls[0][0]
      expect(url).toContain('query=test')
      expect(url).toContain('page=2')
      expect(url).toContain('language=en')
      expect(url).toContain('include_adult=false')
    })
  })

  describe('getMovieDetails', () => {
    it('should fetch movie details successfully', async () => {
      const mockMovie = {
        id: 123,
        title: 'Test Movie',
        overview: 'Test description',
        release_date: '2023-01-01'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockMovie)
      })

      const result = await getMovieDetails(123)

      const url = mockFetch.mock.calls[0][0]
      expect(url).toContain('movie/123')
      expect(result).toEqual(mockMovie)
    })

    it('should include language parameter when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 123 })
      })

      await getMovieDetails(123, 'es')

      const url = mockFetch.mock.calls[0][0]
      expect(url).toContain('language=es')
    })

    it('should handle 404 errors for non-existent movies', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      })

      await expect(getMovieDetails(999999)).rejects.toThrow('MOVIE_NOT_FOUND')
    })
  })

  describe('API key validation', () => {
    it('should throw error when TMDB_API_KEY is not set', async () => {
      delete process.env.TMDB_API_KEY

      await expect(getPopularMovies()).rejects.toThrow(
        'TMDB_API_KEY environment variable is not set'
      )
    })
  })
})
