interface DetailFieldProps {
  label: string;
  value: string;
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid var(--color-bg-card)',
  fontSize: '14px',
};

export function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div style={rowStyle}>
      <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '1px', fontSize: '13px' }}>
        {label}
      </span>
      <span style={{ color: 'var(--color-text)', textAlign: 'right', maxWidth: '60%' }}>
        {value}
      </span>
    </div>
  );
}
