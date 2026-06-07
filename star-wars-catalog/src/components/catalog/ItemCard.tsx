import { Link } from 'react-router-dom';

interface ItemCardProps {
  name: string;
  url: string;
  fields: { label: string; value: string }[];
  imageUrl?: string;
}

const cardStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  padding: '16px 20px',
  background: 'var(--color-bg-elevated)',
  border: '1px solid var(--color-bg-card)',
  borderRadius: '4px',
  textDecoration: 'none',
  transition: 'border-color 0.2s ease',
};

const nameStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '20px',
  letterSpacing: '1px',
  color: 'var(--color-text)',
  margin: '0 0 8px',
};

const imgStyle: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '4px',
  objectFit: 'contain',
  background: 'var(--color-bg-card)',
  flexShrink: 0,
};

const placeholderStyle: React.CSSProperties = {
  ...imgStyle,
  background: 'var(--color-bg-card)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  color: 'var(--color-text-muted)',
};

export function ItemCard({ name, url, fields, imageUrl }: ItemCardProps) {
  const parts = url.replace(/\/$/, '').split('/');
  const id = parts[parts.length - 1];
  const category = parts[parts.length - 2];

  return (
    <Link
      to={`/${category}/${id}`}
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-bg-card)';
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          style={imgStyle}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div style={placeholderStyle}>
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={nameStyle}>{name}</h3>
        {fields.map((f) => (
          <div
            key={f.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              padding: '2px 0',
            }}
          >
            <span>{f.label}</span>
            <span>{f.value === 'n/a' || f.value === 'unknown' ? '—' : f.value}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}
