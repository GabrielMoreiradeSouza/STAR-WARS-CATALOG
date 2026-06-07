interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  background: 'var(--color-bg-card)',
  color: 'var(--color-text)',
  borderRadius: '4px',
  fontSize: '14px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
};

const disabledBtnStyle: React.CSSProperties = {
  ...btnStyle,
  opacity: 0.4,
  cursor: 'not-allowed',
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '24px 0',
      }}
    >
      <button
        style={currentPage === 1 ? disabledBtnStyle : btnStyle}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          padding: '0 8px',
        }}
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        style={currentPage === totalPages ? disabledBtnStyle : btnStyle}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
