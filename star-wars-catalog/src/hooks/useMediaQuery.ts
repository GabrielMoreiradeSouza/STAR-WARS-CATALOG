import { useState, useEffect } from 'react';

const QUERIES = {
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
} as const;

type Breakpoint = keyof typeof QUERIES;

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useBreakpoint(): Record<Breakpoint, boolean> {
  const mobile = useMediaQuery(QUERIES.mobile);
  const tablet = useMediaQuery(QUERIES.tablet);
  const desktop = useMediaQuery(QUERIES.desktop);

  return { mobile, tablet, desktop };
}
