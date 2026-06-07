interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      style={{
        padding: '24px',
        background: 'var(--color-error)',
        color: 'var(--color-error-text)',
        borderRadius: '4px',
        textAlign: 'center',
        margin: '16px 0',
      }}
    >
      <p style={{ margin: '0 0 12px', fontSize: '15px' }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '8px 20px',
            background: 'var(--color-accent)',
            color: '#0a0a0a',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
