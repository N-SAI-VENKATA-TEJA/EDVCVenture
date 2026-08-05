import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

interface PageHeroProps {
  overline?: string;
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode; // For actions like Select dropdowns or buttons
}

export const PageHero: React.FC<PageHeroProps> = ({ overline, title, description, children }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const showBackToDashboard = user && location.pathname !== '/dashboard';

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, var(--brand--dark-blue) 0%, var(--brand--color) 100%)', 
        borderRadius: '2rem', 
        padding: '5rem 2rem', 
        textAlign: 'center',
        color: 'var(--brand--white)',
        position: 'relative',
        boxShadow: '0 213.54px 59.43px #0a438000, 0 135.98px 54.39px #0a438003, 0 76.55px 46.33px #0a43800d, 0 34.24px 34.24px #0a438017, 0 8.05px 19.13px #0a43801a'
      }}>
        {showBackToDashboard && (
          <Link 
            to="/dashboard" 
            style={{ 
              position: 'absolute', 
              top: '2.5rem', 
              left: '3rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'rgba(255,255,255,0.8)', 
              textDecoration: 'none', 
              fontSize: '0.875rem', 
              fontWeight: 600,
              transition: 'color 0.2s',
              background: 'rgba(255,255,255,0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }} 
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }} 
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        )}
        {overline && (
          <div style={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
            {overline}
          </div>
        )}
        <h1 className="text-h1" style={{ marginBottom: '1.5rem', color: 'var(--brand--white)', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {title}
        </h1>
        <p className="text-large" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto', marginBottom: children ? '2.5rem' : '0' }}>
          {description}
        </p>
        {children && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
