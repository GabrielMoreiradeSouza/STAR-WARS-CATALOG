export interface FilterDef {
  key: string;
  label: string;
  type: 'select' | 'multi-select' | 'range';
  options?: string[];
}

export const CATEGORY_FILTERS: Record<string, FilterDef[]> = {
  people: [
    { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'n/a', 'none'] },
    { key: 'birth_year', label: 'Birth Year', type: 'range' },
  ],
  films: [
    { key: 'director', label: 'Director', type: 'select' },
    { key: 'release_date', label: 'Release Year', type: 'range' },
  ],
  planets: [
    { key: 'climate', label: 'Climate', type: 'select' },
    { key: 'terrain', label: 'Terrain', type: 'select' },
  ],
  starships: [
    { key: 'starship_class', label: 'Class', type: 'select' },
    { key: 'crew', label: 'Crew', type: 'range' },
  ],
  vehicles: [
    { key: 'vehicle_class', label: 'Class', type: 'select' },
    { key: 'crew', label: 'Crew', type: 'range' },
  ],
  species: [
    { key: 'classification', label: 'Classification', type: 'select' },
    { key: 'designation', label: 'Designation', type: 'select', options: ['sentient', 'non-sentient'] },
  ],
};

export type FilterValues = Record<string, string>;

function extractOptions(items: any[], key: string): string[] {
  const values = new Set<string>();
  for (const item of items) {
    const val = item[key];
    if (typeof val === 'string') {
      val.split(',').map((v: string) => v.trim()).filter(Boolean).forEach((v) => values.add(v));
    }
  }
  return Array.from(values).sort();
}

export function buildFilterOptions(items: any[], category: string): Record<string, string[]> {
  const defs = CATEGORY_FILTERS[category] || [];
  if (!defs) return {};

  const options: Record<string, string[]> = {};
  for (const def of defs) {
    if (def.type === 'select' && def.options) {
      options[def.key] = def.options;
    } else if (def.type === 'select') {
      options[def.key] = extractOptions(items, def.key);
    }
  }
  return options;
}

export function applyFilters(items: any[], filters: FilterValues): any[] {
  const active = Object.entries(filters).filter(([, v]) => v && v.trim());
  if (active.length === 0) return items;

  return items.filter((item) => {
    return active.every(([key, value]) => {
      const itemVal = item[key];
      if (!itemVal || itemVal === 'unknown' || itemVal === 'n/a') return false;
      return itemVal.toString().toLowerCase() === value.toLowerCase();
    });
  });
}
