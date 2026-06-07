import { useMemo } from 'react';
import { CATEGORY_FILTERS, buildFilterOptions, type FilterValues } from '../../utils/filters';

interface FilterPanelProps {
  category: string;
  items: any[];
  filters: FilterValues;
  onChange: (key: string, value: string) => void;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
  marginTop: '12px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '12px',
  letterSpacing: '1px',
  color: 'var(--color-text-muted)',
  display: 'block',
  marginBottom: '4px',
};

const selectStyle: React.CSSProperties = {
  padding: '6px 12px',
  fontSize: '13px',
  minWidth: '140px',
};

export function FilterPanel({ category, items, filters, onChange }: FilterPanelProps) {
  const defs = CATEGORY_FILTERS[category] || [];
  const options = useMemo(() => buildFilterOptions(items, category), [items, category]);

  if (defs.length === 0) return null;

  return (
    <div style={containerStyle}>
      {defs.map((def) => {
        if (def.type !== 'select') return null;

        const opts = options[def.key] || def.options || [];

        return (
          <div key={def.key}>
            <span style={labelStyle}>{def.label}</span>
            <select
              style={selectStyle}
              value={filters[def.key] || ''}
              onChange={(e) => onChange(def.key, e.target.value)}
            >
              <option value="">All</option>
              {opts.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
