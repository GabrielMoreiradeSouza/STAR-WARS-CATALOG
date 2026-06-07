import { Link } from 'react-router-dom';

const headerStyle: React.CSSProperties = {
  background: 'var(--color-bg-elevated)',
  borderBottom: '1px solid var(--color-bg-card)',
  padding: '16px 24px',
};

const innerStyle: React.CSSProperties = {
  maxWidth: 'var(--max-width)',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '28px',
  letterSpacing: '2px',
  color: 'var(--color-accent)',
  textDecoration: 'none',
};

export function Header() {
  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <Link to="/" style={titleStyle}>
          STAR WARS CATALOG
        </Link>
      </div>
    </header>
  );
}
