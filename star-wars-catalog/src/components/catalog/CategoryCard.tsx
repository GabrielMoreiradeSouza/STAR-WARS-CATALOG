import { useMediaQuery } from '../../hooks/useMediaQuery';

interface CategoryCardProps {
  name: string;
  slug: string;
  itemCount: number;
  onClick?: (slug: string) => void;
}

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px 24px',
  background: 'var(--color-bg-elevated)',
  border: '1px solid var(--color-bg-card)',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, transform 0.2s ease',
};

const cardStyleMobile: React.CSSProperties = {
  ...cardStyle,
  padding: '24px 16px',
};

const accentStyle: React.CSSProperties = {
  width: '40px',
  height: '3px',
  background: 'var(--color-accent)',
  marginBottom: '16px',
  borderRadius: '2px',
};

export function CategoryCard({ name, slug, itemCount, onClick }: CategoryCardProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const handleClick = () => onClick?.(slug);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-accent)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-bg-card)';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
      style={isMobile ? cardStyleMobile : cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={accentStyle} />
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '2px', margin: 0 }}>
        {name}
      </h2>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
        {itemCount} items
      </span>
    </div>
  );
}
