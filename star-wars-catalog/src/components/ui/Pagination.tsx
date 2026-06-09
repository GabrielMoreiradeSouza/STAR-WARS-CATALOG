import { useMediaQuery } from '../../hooks/useMediaQuery';

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

const btnMobileStyle: React.CSSProperties = {
  ...btnStyle,
  padding: '6px 12px',
  fontSize: '12px',
};

const disabledBtnStyle: React.CSSProperties = {
  ...btnStyle,
  opacity: 0.4,
  cursor: 'not-allowed',
};

const disabledBtnMobileStyle: React.CSSProperties = {
  ...btnMobileStyle,
  opacity: 0.4,
  cursor: 'not-allowed',
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  if (totalPages <= 1) return null;

  const bStyle = isMobile ? btnMobileStyle : btnStyle;
  const dBtnStyle = isMobile ? disabledBtnMobileStyle : disabledBtnStyle;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '4px' : '8px',
        padding: isMobile ? '16px 0' : '24px 0',
      }}
    >
      <button
        style={currentPage === 1 ? dBtnStyle : bStyle}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: isMobile ? '12px' : '14px',
          color: 'var(--color-text-muted)',
          padding: '0 8px',
        }}
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        style={currentPage === totalPages ? dBtnStyle : bStyle}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
