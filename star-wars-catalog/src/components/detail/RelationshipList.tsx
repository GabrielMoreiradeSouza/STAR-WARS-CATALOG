import { useResolveAll } from '../../hooks/useResolve';
import { ResourceLink } from './ResourceLink';

interface RelationshipListProps {
  label: string;
  urls: string[];
}

function getDisplayName(item: any): string {
  return item?.name || item?.title || 'Unknown';
}

export function RelationshipList({ label, urls }: RelationshipListProps) {
  const { data, isLoading } = useResolveAll<any>(urls);

  const containerStyle: React.CSSProperties = {
    padding: '10px 0',
    borderBottom: '1px solid var(--color-bg-card)',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: '13px',
    letterSpacing: '1px',
    color: 'var(--color-text-muted)',
    display: 'block',
    marginBottom: '6px',
  };

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>
        {label} ({urls.length})
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {isLoading ? (
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Loading...</span>
        ) : data && data.length > 0 ? (
          data.map((item: any) => (
            <ResourceLink key={item.url} url={item.url} name={getDisplayName(item)} />
          ))
        ) : (
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>None</span>
        )}
      </div>
    </div>
  );
}
