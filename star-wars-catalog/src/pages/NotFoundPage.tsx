import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export default function NotFoundPage() {
  return (
    <div className="page">
      <Header />
      <main className="main">
        <div
          className="container"
          style={{
            textAlign: 'center',
            paddingTop: '80px',
          }}
        >
          <h1 style={{ fontSize: '96px', color: 'var(--color-accent)', marginBottom: '8px' }}>
            404
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
            This is not the page you're looking for.
          </p>
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '18px',
              letterSpacing: '2px',
              color: 'var(--color-accent)',
            }}
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
