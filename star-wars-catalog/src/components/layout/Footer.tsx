const footerStyle: React.CSSProperties = {
  background: 'var(--color-bg-elevated)',
  borderTop: '1px solid var(--color-bg-card)',
  padding: '16px 24px',
  textAlign: 'center',
};

const textStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  color: 'var(--color-text-muted)',
  margin: 0,
};

export function Footer() {
  return (
    <footer style={footerStyle}>
      <p style={textStyle}>
        Powered by{' '}
        <a href="https://swapi.dev" target="_blank" rel="noopener noreferrer">
          SWAPI
        </a>{' '}
        &mdash; Star Wars is property of Lucasfilm Ltd.
      </p>
    </footer>
  );
}
