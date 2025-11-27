/*
 Utility function to get full TMDB image URL
 @param path - The path of the image
 @param size - The size of the image
 @returns The full TMDB image URL
*/
export function getImageUrl(path: string | null, size: 'w200' | 'w300' | 'w400' | 'w500' | 'original' = 'w500'): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
