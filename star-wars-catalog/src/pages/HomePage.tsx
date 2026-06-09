import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSwapiList } from '../hooks/useSwapiList';
import { useCharacterImages } from '../hooks/useCharacterImages';
import { useSearch } from '../hooks/useSearch';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ItemCard } from '../components/catalog/ItemCard';
import { ItemList } from '../components/catalog/ItemList';
import { SearchBar } from '../components/catalog/SearchBar';
import { FilterPanel } from '../components/catalog/FilterPanel';
import { Pagination } from '../components/ui/Pagination';
import { CATEGORIES, type SwapiCategory } from '../types/swapi';
import { applyFilters, type FilterValues } from '../utils/filters';
import { listResources } from '../api/swapi';

const FIELD_CONFIGS: Record<string, { label: string; key: string }[]> = {
  people: [
    { label: 'Height', key: 'height' },
    { label: 'Mass', key: 'mass' },
    { label: 'Gender', key: 'gender' },
    { label: 'Birth Year', key: 'birth_year' },
  ],
  films: [
    { label: 'Episode', key: 'episode_id' },
    { label: 'Director', key: 'director' },
    { label: 'Release Date', key: 'release_date' },
  ],
  planets: [
    { label: 'Climate', key: 'climate' },
    { label: 'Terrain', key: 'terrain' },
    { label: 'Population', key: 'population' },
  ],
  starships: [
    { label: 'Model', key: 'model' },
    { label: 'Class', key: 'starship_class' },
    { label: 'Crew', key: 'crew' },
  ],
  vehicles: [
    { label: 'Model', key: 'model' },
    { label: 'Class', key: 'vehicle_class' },
    { label: 'Crew', key: 'crew' },
  ],
  species: [
    { label: 'Classification', key: 'classification' },
    { label: 'Designation', key: 'designation' },
    { label: 'Language', key: 'language' },
  ],
};

const filterBarStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginBottom: '24px',
  justifyContent: 'center',
};

const filterBtnBase: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '16px',
  letterSpacing: '1px',
  padding: '8px 20px',
  borderRadius: '4px',
  border: '1px solid var(--color-bg-card)',
  background: 'var(--color-bg-elevated)',
  color: 'var(--color-text-muted)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const filterBtnBaseMobile: React.CSSProperties = {
  ...filterBtnBase,
  fontSize: '13px',
  padding: '6px 14px',
};

const filterBtnActive: React.CSSProperties = {
  ...filterBtnBase,
  background: 'var(--color-accent)',
  color: '#0a0a0a',
  borderColor: 'var(--color-accent)',
};

const filterBtnActiveMobile: React.CSSProperties = {
  ...filterBtnBaseMobile,
  background: 'var(--color-accent)',
  color: '#0a0a0a',
  borderColor: 'var(--color-accent)',
};

const tagStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '11px',
  letterSpacing: '1px',
  color: 'var(--color-accent)',
  display: 'block',
  marginBottom: '4px',
};

export default function HomePage() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as SwapiCategory | null;
  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem('homePage_page');
    return saved ? Number(saved) : 1;
  });

  const { data: imageMap } = useCharacterImages();

  const pageRef = useRef(page);
  useEffect(() => { pageRef.current = page; }, [page]);

  useEffect(() => {
    return () => {
      sessionStorage.setItem('homePage_page', String(pageRef.current));
      sessionStorage.setItem('homePage_scrollY', String(window.scrollY));
    };
  }, []);

  const validCategory = categoryParam && CATEGORIES.some((c) => c.slug === categoryParam)
    ? categoryParam
    : null;

  const singleCategory = useSwapiList<any>(validCategory, page);

  const allCategories = useQuery({
    queryKey: ['swapi', 'all'],
    queryFn: async () => {
      const results = await Promise.all(
        CATEGORIES.map(async (cat) => {
          const data = await listResources<any>(cat.slug, 1);
          return { category: cat.slug, items: data.results, total: data.count };
        }),
      );
      return results;
    },
    enabled: !validCategory,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = validCategory ? singleCategory.isLoading : allCategories.isLoading;
  const error = validCategory ? singleCategory.error : allCategories.error;
  const refetch = validCategory ? singleCategory.refetch : allCategories.refetch;

  const restored = useRef(false);
  useEffect(() => {
    if (!restored.current && !isLoading) {
      const savedScrollY = sessionStorage.getItem('homePage_scrollY');
      if (savedScrollY) {
        requestAnimationFrame(() => window.scrollTo(0, Number(savedScrollY)));
        sessionStorage.removeItem('homePage_scrollY');
      }
      restored.current = true;
    }
  }, [isLoading]);

  const allItems = useMemo(() => {
    if (validCategory) return singleCategory.data?.results || [];
    if (!allCategories.data) return [];
    return allCategories.data.flatMap((r) =>
      r.items.map((item: any) => ({
        ...item,
        _category: r.category,
      })),
    );
  }, [validCategory, singleCategory.data, allCategories.data]);

  const totalCount = useMemo(() => {
    if (validCategory) return singleCategory.data?.count || 0;
    if (!allCategories.data) return 0;
    return allCategories.data.reduce((sum, r) => sum + r.total, 0);
  }, [validCategory, singleCategory.data, allCategories.data]);

  const { query, setQuery } = useSearch<{ name: string }>(
    allItems.map((i: any) => ({ name: i.name || i.title || '' })),
  );

  const namedResults = allItems.filter((i: any) => {
    const name = i.name || i.title || '';
    if (!query.trim()) return true;
    return name.toLowerCase().includes(query.toLowerCase());
  });

  const filters: FilterValues = {};
  for (const [key, value] of searchParams.entries()) {
    if (key !== 'category' && key !== 'search') filters[key] = value;
  }

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  };

  const filteredItems = applyFilters(namedResults, filters);

  const totalPages = validCategory && singleCategory.data
    ? Math.ceil(singleCategory.data.count / 10)
    : 1;

  const fields = validCategory ? FIELD_CONFIGS[validCategory] || [] : [];
  const hasFilters = Object.values(filters).some(Boolean);

  const selectCategory = (slug: string) => {
    const next = new URLSearchParams(searchParams);
    if (slug === validCategory) {
      next.delete('category');
    } else {
      next.set('category', slug);
    }
    next.delete('search');
    setSearchParams(next);
    setPage(1);
  };

  return (
    <div className="page">
      <Header />
      <main className="main">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h1>Star Wars Catalog</h1>
          </div>

          <div style={filterBarStyle}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                style={
                  isMobile
                    ? (cat.slug === validCategory ? filterBtnActiveMobile : filterBtnBaseMobile)
                    : (cat.slug === validCategory ? filterBtnActive : filterBtnBase)
                }
                onClick={() => selectCategory(cat.slug)}
                onMouseEnter={(e) => {
                  if (cat.slug !== validCategory) {
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (cat.slug !== validCategory) {
                    e.currentTarget.style.borderColor = 'var(--color-bg-card)';
                  }
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              <SearchBar value={query} onChange={setQuery} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                {(query || hasFilters) ? filteredItems.length : totalCount} items
              </span>
            </div>

            {validCategory && allItems.length > 0 && (
              <FilterPanel
                category={validCategory}
                items={allItems}
                filters={filters}
                onChange={setFilter}
              />
            )}
          </div>

          <ItemList isLoading={isLoading} error={error as Error | null} onRetry={refetch}>
            {filteredItems.map((item: any) => (
              <div key={item.url}>
                {!validCategory && (
                  <span style={tagStyle}>{item._category}</span>
                )}
                <ItemCard
                  name={item.name || item.title || 'Unknown'}
                  url={item.url}
                  imageUrl={imageMap?.[(item.name || '').toLowerCase()]}
                  fields={(validCategory ? fields : FIELD_CONFIGS[item._category] || []).map((f: any) => ({
                    label: f.label,
                    value: item[f.key] || '—',
                  }))}
                />
              </div>
            ))}
          </ItemList>

          {validCategory && !query && !hasFilters && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
