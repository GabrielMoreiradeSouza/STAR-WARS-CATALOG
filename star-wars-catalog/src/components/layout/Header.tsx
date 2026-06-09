import { Link } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const headerStyle: React.CSSProperties = {
  background: 'var(--color-bg-elevated)',
  borderBottom: '1px solid var(--color-bg-card)',
  padding: '16px 24px',
};

const headerStyleMobile: React.CSSProperties = {
  ...headerStyle,
  padding: '12px 16px',
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

const titleStyleMobile: React.CSSProperties = {
  ...titleStyle,
  fontSize: '22px',
};

export function Header() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <header style={isMobile ? headerStyleMobile : headerStyle}>
      <div style={innerStyle}>
        <Link to="/" style={isMobile ? titleStyleMobile : titleStyle}>
          STAR WARS CATALOG
        </Link>
      </div>
    </header>
  );
}
