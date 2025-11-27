'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClearSearch: () => void;
}

export function SearchBar({ onSearch, onClearSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  const debouncedSearch = useDebounce((searchQuery: string) => onSearch(searchQuery), 300);

  // Handle hydration and sessionStorage restoration
  useEffect(() => {
    setIsHydrated(true);
    const storedQuery = sessionStorage.getItem('movieSearchQuery');
    if (storedQuery) {
      setQuery(storedQuery);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      debouncedSearch(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isHydrated]);

  // Save query to sessionStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      if (query.trim()) {
        sessionStorage.setItem('movieSearchQuery', query);
      } else {
        sessionStorage.removeItem('movieSearchQuery');
      }
    }
  }, [query, isHydrated]);

  const handleClear = () => {
    setQuery('');
    onClearSearch();
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mb-8 group">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Discover your next favorite movie..."
          className="w-full px-5 py-4 pl-14 pr-14 text-text bg-surface/80 backdrop-blur-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 placeholder-text-muted hover:border-primary/30 transition-all duration-300"
        />

        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 text-text-muted transition-all duration-300 ${query ? 'text-primary' : 'group-focus-within:text-primary'}`} />
        </div>

        {/* Clear button */}
        <button
          onClick={handleClear}
          className={`absolute inset-y-0 right-0 pr-5 flex items-center text-text-muted hover:text-primary transition-all duration-300 group ${
            query ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}

