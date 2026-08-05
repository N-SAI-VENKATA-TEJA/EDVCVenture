import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { FileText, Award, Newspaper, FolderOpen, BookOpen, Lock } from 'lucide-react';
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickLinks = [
    { icon: <FileText size={28} strokeWidth={1.5} />, label: 'AI Resume Analyzer', desc: 'Get your ATS score and skill gap report.', path: '/analyzer', cta: 'Analyze now' },
    { icon: <Award size={28} strokeWidth={1.5} />, label: 'Certifications', desc: 'Browse top certifications for your role.', path: '/certifications', cta: 'Browse certs' },
    { icon: <Newspaper size={28} strokeWidth={1.5} />, label: 'Daily Digest', desc: 'Stay sharp with today\'s career signals.', path: '/digest', cta: 'Read digest' },
    { icon: <FolderOpen size={28} strokeWidth={1.5} />, label: 'Resume Library', desc: 'Learn from winning resume structures.', path: '/resumes', cta: 'View resumes' },
    { icon: <BookOpen size={28} strokeWidth={1.5} />, label: 'Free Resources', desc: 'Templates, guides, and roadmaps for you.', path: '/resources/free', cta: 'Explore' },
    {
      icon: <Lock size={28} strokeWidth={1.5} />,
      label: 'Exclusive Resources',
      desc: user?.subscriptionStatus === 'premium' ? 'Unlock premium content.' : 'Upgrade to access premium guides.',
      path: user?.subscriptionStatus === 'premium' ? '/resources/exclusive' : '/pricing',
      cta: user?.subscriptionStatus === 'premium' ? 'Access now' : 'Upgrade',
    },
  ];

  return (
    <div style={{ background: 'var(--brand--white)', minHeight: '100vh' }}>
      <PageHero
        overline="Dashboard"
        title={<>Good to see you, {user?.name?.split(' ')[0]} 👋</>}
        description={`Target role: ${user?.targetRole || 'Not set'}`}
      >
        {user?.subscriptionStatus === 'premium' && (
          <span style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--brand--white)', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', backdropFilter: 'blur(10px)' }}>Premium</span>
        )}
      </PageHero>

      {/* Cards */}
      <div className="section-padding">
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem 2.5rem' }}>
            {quickLinks.map((item, i) => (
                <div
                  key={item.label}
                  className="card_container anim-fade-up"
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    cursor: 'pointer',
                    padding: '2.5rem',
                    border: '1px solid var(--brand--blue-100)',
                    boxShadow: '0 4px 20px rgba(0, 76, 211, 0.05)'
                  }}
                  onClick={() => navigate(item.path)}
                >
                <div>
                  <div style={{ 
                    width: '3.5rem', 
                    height: '3.5rem', 
                    borderRadius: '50%', 
                    background: 'var(--brand--color)', 
                    color: 'var(--brand--white)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '2rem',
                    boxShadow: '0 4px 12px rgba(2, 78, 212, 0.25)'
                  }}>
                    {item.icon}
                  </div>
                  <h3 className="text-h4" style={{ marginBottom: '1rem', color: 'var(--brand--black)' }}>{item.label}</h3>
                  <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)', lineHeight: 1.6, marginBottom: '2.5rem' }}>{item.desc}</p>
                </div>
                <button
                  className="button"
                  style={{ alignSelf: 'flex-start', minHeight: '2.5rem', height: '2.5rem', fontSize: '0.875rem', padding: '0 1.5rem', pointerEvents: 'none', border: 'none' }}
                >
                  {item.cta}
                </button>
              </div>
            ))}
          </div>

          {user?.subscriptionStatus !== 'premium' && (
            <div
              className="anim-fade-up"
              style={{
                marginTop: '3rem',
                background: 'var(--brand--blue-50)',
                border: '1px solid var(--brand--blue-100)',
                borderRadius: '1.5rem',
                padding: '2rem 2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                flexWrap: 'wrap',
                animationDelay: '0.6s'
              }}
            >
              <div>
                <h3 className="text-h4" style={{ marginBottom: '0.5rem' }}>
                  Unlock the full platform
                </h3>
                <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>
                  Get the AI Analyzer, exclusive resources, and unlimited access.
                </p>
              </div>
              <Link to="/pricing" className="button" style={{ flexShrink: 0 }}>
                Upgrade to Premium
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
