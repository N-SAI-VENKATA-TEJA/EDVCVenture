import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Sticky Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        background: 'var(--brand--white)',
        padding: '1rem 0',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Left Side: Logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <div style={{ width: '2rem', height: '2rem', background: 'var(--brand--color)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                  <path d="M12 6V12L16 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand--black)', letterSpacing: '-0.02em' }}>
                CareerLens
              </span>
            </Link>
          </div>

          {/* Center: Nav Links */}
          {user && (
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
              <Link to="/" className="nav_links">Home</Link>
              <Link to="/dashboard" className="nav_links">Features</Link>
              <Link to="/digest" className="nav_links">Daily Digest</Link>
              <Link to="/certifications" className="nav_links">Certifications</Link>
              <Link to="/analyzer" className="nav_links">Resume Analyzer</Link>
            </nav>
          )}

          {/* Right Side: Auth Actions */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
            {user ? (
              <button onClick={logout} className="button" style={{ minHeight: '2.5rem', height: '2.5rem', fontSize: '0.875rem' }}>Log Out</button>
            ) : (
              <>
                <Link to="/" className="nav_links" style={{ fontWeight: 500 }}>Home</Link>
                <Link to="/login" className="button">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: '1', zIndex: 1, position: 'relative' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10,
        background: 'var(--brand--blue-50)',
        borderTop: '1px solid var(--brand--blue-100)'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
            
            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                <div style={{ width: '2rem', height: '2rem', background: 'var(--brand--color)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                    <path d="M12 6V12L16 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand--black)', letterSpacing: '-0.02em' }}>CareerLens</span>
              </div>
              <p className="text-body" style={{ maxWidth: '280px', color: 'var(--brand--neutral-lighter)' }}>
                Know the value before you invest the time. The ultimate career preparation portal for students.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand--black)', marginBottom: '1.5rem' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/analyzer" className="nav_links">Resume Analyzer</Link></li>
                <li><Link to="/certifications" className="nav_links">Ranked Certifications</Link></li>
                <li><Link to="/digest" className="nav_links">Daily Digest</Link></li>
                <li><Link to="/pricing" className="nav_links">Pricing</Link></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand--black)', marginBottom: '1.5rem' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/resources/free" className="nav_links">Free Resources</Link></li>
                <li><Link to="/resources/exclusive" className="nav_links">Exclusive Content</Link></li>
                <li><Link to="/resumes" className="nav_links">Resume Library</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand--black)', marginBottom: '1.5rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="#" className="nav_links">About Us</Link></li>
                <li><Link to="#" className="nav_links">Campus Ambassadors</Link></li>
                <li><Link to="#" className="nav_links">Privacy Policy</Link></li>
                <li><Link to="#" className="nav_links">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2rem', borderTop: '1px solid var(--brand--blue-100)' }}>
            <p className="text-small" style={{ color: 'var(--brand--neutral-lighter)' }}>© 2026 CareerLens. All rights reserved.</p>
            <p className="text-small" style={{ color: 'var(--brand--neutral-lighter)' }}>hello@careerlens.app</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
