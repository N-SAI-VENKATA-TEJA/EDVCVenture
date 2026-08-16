import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

interface Certification {
  _id: string;
  title: string;
  issuerName: string;
  compositeValueScore: number;
  roleTags: string[];
}

const getScoreLabel = (score: number) => {
  if (score >= 8) return { color: '#2ecc71', bg: 'rgba(46,204,113,0.1)', label: 'Top Rated' };
  if (score >= 5) return { color: 'var(--brand--color)', bg: 'var(--brand--blue-50)', label: 'Recommended' };
  return { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', label: 'Emerging' };
};

const getCardStyle = (index: number) => {
  const styles = [
    { color: '#004cd3', bg: 'rgba(0, 76, 211, 0.08)' },
    { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
    { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)' },
  ];
  return styles[index % styles.length];
};

const Certifications = () => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [roles, setRoles] = useState<{name: string}[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/certifications/roles`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setRoles(res.data);
        const target = user?.targetRole;
        if (target && res.data.some((r: any) => r.name === target)) {
          setSelectedRole(target);
        } else if (res.data.length > 0) {
          setSelectedRole(res.data[0].name);
        }
      } catch (err) { console.error(err); }
    };
    if (user?.token) fetch();
  }, [user]);

  useEffect(() => {
    if (!selectedRole) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/certifications?role=${encodeURIComponent(selectedRole)}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setCerts(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [selectedRole, user]);

  return (
    <>
      <PageHero
        overline="Platform"
        title={<>Certifications <span style={{ opacity: 0.8 }}>Directory</span></>}
        description="Ranked by market demand, employer recognition, and career ROI."
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            style={{ 
              appearance: 'none',
              WebkitAppearance: 'none',
              width: '100%', 
              minWidth: '260px', 
              height: '3.5rem',
              padding: '0 3rem 0 1.5rem', 
              borderRadius: '100px', 
              border: 'none', 
              background: 'var(--brand--white)', 
              color: 'var(--brand--color)', 
              fontWeight: 700, 
              fontSize: '1.125rem', 
              fontFamily: 'inherit',
              cursor: 'pointer', 
              outline: 'none', 
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)' 
            }}
          >
            <option value="" disabled>Select target role</option>
            {roles.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
          </select>
          <div style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--brand--color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </PageHero>

      <section style={{ paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '1060px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--brand--neutral-lighter)', fontSize: '1.25rem' }}>
              <div className="spin-element" style={{ width: '2rem', height: '2rem', border: '3px solid var(--brand--blue-100)', borderTopColor: 'var(--brand--color)', borderRadius: '50%', margin: '0 auto' }}></div>
            </div>
          ) : certs.length === 0 ? (
            <div className="card_container" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', margin: '0 auto', gap: 0, justifyContent: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎓</div>
              <h3 className="text-h4" style={{ marginBottom: '1rem' }}>Coming soon</h3>
              <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>Certifications for this role are being added. Check back shortly.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {certs.map((cert, i) => {
                const scoreBadge = getScoreLabel(cert.compositeValueScore);
                const { color, bg } = getCardStyle(i);
                
                return (
                  <Link
                    to={`/certifications/${cert._id}`}
                    key={cert._id}
                    style={{ 
                      textDecoration: 'none', 
                      display: 'flex', 
                      flexDirection: 'row',
                      background: 'var(--brand--white)',
                      border: '1px solid var(--brand--blue-100)',
                      borderLeft: `4px solid ${color}`,
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      overflow: 'hidden'
                    }}
                    className="anim-fade-up"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    {/* Left: Content */}
                    <div style={{ flex: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', marginLeft: '6rem' }}>
                        <span style={{ color: color, fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cert.issuerName}</span>
                        <span style={{ background: scoreBadge.bg, color: scoreBadge.color, padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>{scoreBadge.label}</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                        {/* Number Circle */}
                        <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 800, flexShrink: 0 }}>
                          {(i + 1).toString().padStart(2, '0')}
                        </div>
                        
                        {/* Title & Description */}
                        <div>
                          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--brand--black)', marginBottom: '0.75rem', lineHeight: 1.3 }}>{cert.title}</h3>
                          
                          <p style={{ color: 'var(--brand--neutral-lighter)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6, maxWidth: '600px' }}>
                            {cert.title.includes('Responsive') ? 'Learn HTML, CSS, Flexbox, Grid and responsive design by building real-world projects.' : 
                             cert.title.includes('JavaScript') ? 'Master fundamental JavaScript concepts by solving algorithms and building projects.' :
                             cert.title.includes('Front End') ? 'Learn React, Redux, React Router and build powerful front-end applications.' :
                             'Gain the essential skills and knowledge required to master this domain.'}
                          </p>
                          
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {cert.roleTags.map(tag => (
                              <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', border: '1px solid var(--brand--blue-100)', padding: '0.375rem 0.875rem', borderRadius: '100px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand--color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                <span style={{ color: 'var(--brand--color)', fontSize: '0.875rem', fontWeight: 600 }}>{tag}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right: Rating */}
                    <div style={{ width: '220px', flexShrink: 0, padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>Value Score</span>
                      <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--brand--black)', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--brand--color)', fontSize: '1.5rem', alignSelf: 'center' }}>★</span> 
                        {cert.compositeValueScore.toFixed(1)}
                        <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '1.25rem' }}>/10</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Certifications;
