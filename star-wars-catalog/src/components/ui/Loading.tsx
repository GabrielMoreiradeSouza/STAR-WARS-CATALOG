interface LoadingProps {
  variant?: 'skeleton' | 'spinner' | 'pulse';
  count?: number;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px 0',
  },
  skeleton: {
    height: '20px',
    background: 'var(--color-bg-card)',
    borderRadius: '4px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid var(--color-bg-card)',
    borderTopColor: 'var(--color-accent)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '24px auto',
  },
  pulse: {
    width: '100%',
    height: '100px',
    background: 'var(--color-bg-card)',
    borderRadius: '4px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};

export function SkeletonLine({ width = '100%' }: { width?: string }) {
  return <div style={{ ...styles.skeleton, width }} />;
}

export function Loading({ variant = 'spinner', count = 3 }: LoadingProps) {
  if (variant === 'spinner') {
    return <div style={styles.spinner} />;
  }

  if (variant === 'pulse') {
    return <div style={styles.pulse} />;
  }

  return (
    <div style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonLine key={i} width={`${80 - i * 15}%`} />
      ))}
    </div>
  );
}
