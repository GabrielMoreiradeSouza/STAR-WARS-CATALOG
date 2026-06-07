export function formatValue(value: string): string {
  if (!value || value === 'n/a' || value === 'unknown') return '—';
  return value;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function formatReleaseDate(date: string): string {
  if (!date || date === 'n/a' || date === 'unknown') return '—';
  try {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return date;
  }
}

export function formatCredits(value: string): string {
  const num = Number(value);
  if (isNaN(num) || !value || value === 'unknown') return '—';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function formatMass(value: string): string {
  if (value === 'unknown' || !value) return '—';
  return `${value} kg`;
}

export function formatHeight(value: string): string {
  if (value === 'unknown' || !value) return '—';
  return `${value} cm`;
}
