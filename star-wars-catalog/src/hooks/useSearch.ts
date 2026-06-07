import { useState, useMemo } from 'react';

export function useSearch<T extends { name: string }>(items: T[] | undefined) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!items) return [];
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(lower));
  }, [items, query]);

  return { query, setQuery, filtered };
}
