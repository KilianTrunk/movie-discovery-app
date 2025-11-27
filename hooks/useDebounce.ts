import { useRef } from 'react';

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
