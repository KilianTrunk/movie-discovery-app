import { useRef } from 'react';

/*
 Debounce hook
 @param callback - The function to debounce
 @param delay - The delay in milliseconds
 @returns The debounced function that will be called after the delay
*/
export function useDebounce<Args extends readonly unknown[], Return>(
  callback: (...args: Args) => Return,
  delay: number
): (...args: Args) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (...args: Args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
