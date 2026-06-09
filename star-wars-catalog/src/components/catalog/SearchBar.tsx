import { useEffect, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search by name...' }: SearchBarProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => onChange(local), 300);
    return () => clearTimeout(timer);
  }, [local, onChange]);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <input
      type="text"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
      style={{ width: '100%', maxWidth: isMobile ? '100%' : '400px' }}
    />
  );
}
