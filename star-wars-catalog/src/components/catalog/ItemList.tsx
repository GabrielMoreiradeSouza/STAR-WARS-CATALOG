import type { ReactNode } from 'react';
import { ErrorMessage } from '../ui/ErrorMessage';

interface ItemListProps {
  isLoading: boolean;
  error: Error | null;
  onRetry?: () => void;
  children: ReactNode;
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gap: '16px',
};

const skeletonStyle: React.CSSProperties = {
  height: '120px',
  background: 'var(--color-bg-elevated)',
  borderRadius: '4px',
  animation: 'pulse 1.5s ease-in-out infinite',
};

export function ItemList({ isLoading, error, onRetry, children }: ItemListProps) {
  if (isLoading) {
    return (
      <div className="grid-responsive" style={gridStyle}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={skeletonStyle} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message || 'Failed to load data'} onRetry={onRetry} />;
  }

  return <div className="grid-responsive" style={gridStyle}>{children}</div>;
}
