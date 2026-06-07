import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Something went wrong</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', fontSize: '14px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            style={{
              padding: '10px 24px',
              background: 'var(--color-accent)',
              color: '#0a0a0a',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Return Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
