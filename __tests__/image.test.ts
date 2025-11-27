import { getImageUrl } from '@/utils/image'

describe('getImageUrl', () => {
  it('should return null for null path', () => {
    expect(getImageUrl(null)).toBeNull()
  })

  it('should return null for undefined path', () => {
    expect(getImageUrl(null)).toBeNull()
  })

  it('should return full TMDB image URL for valid path', () => {
    const path = '/abc123.jpg'
    const result = getImageUrl(path, 'w500')
    expect(result).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg')
  })

  it('should use w500 as default size', () => {
    const path = '/def456.jpg'
    const result = getImageUrl(path)
    expect(result).toBe('https://image.tmdb.org/t/p/w500/def456.jpg')
  })

  it('should support different image sizes', () => {
    const path = '/ghi789.jpg'
    expect(getImageUrl(path, 'w200')).toBe('https://image.tmdb.org/t/p/w200/ghi789.jpg')
    expect(getImageUrl(path, 'original')).toBe('https://image.tmdb.org/t/p/original/ghi789.jpg')
  })
})
