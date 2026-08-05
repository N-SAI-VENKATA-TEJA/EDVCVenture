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
              padding: '1rem 3rem 1rem 1.5rem', 
              borderRadius: '100px', 
              border: 'none', 
              background: 'var(--brand--white)', 
              color: 'var(--brand--color)', 
              fontWeight: 700, 
              fontSize: '1rem', 
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </PageHero>

      <section style={{ paddingBottom: '6rem' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--brand--neutral-lighter)', fontSize: '1.25rem' }}>
              Loading certifications…
            </div>
          ) : certs.length === 0 ? (
            <div className="card_container" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', margin: '0 auto', gap: 0, justifyContent: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎓</div>
              <h3 className="text-h4" style={{ marginBottom: '1rem' }}>Coming soon</h3>
              <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>Certifications for this role are being added. Check back shortly.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3.5rem 2.5rem' }}>
              {certs.map((cert, i) => {
                const { color, bg, label } = getScoreLabel(cert.compositeValueScore);
                return (
                  <Link
                    to={`/certifications/${cert._id}`}
                    key={cert._id}
                    style={{ 
                      textDecoration: 'none', 
                      display: 'flex', 
                      flexDirection: 'column',
                      border: '1px solid var(--brand--blue-100)',
                      boxShadow: '0 4px 20px rgba(0, 76, 211, 0.05)'
                    }}
                    className="card_container anim-fade-up"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <span style={{ color: 'var(--brand--color)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'var(--brand--blue-50)', padding: '6px 12px', borderRadius: '6px' }}>{cert.issuerName}</span>
                      <span style={{ background: bg, color: color, padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>{label}</span>
                    </div>
                    
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand--black)', marginBottom: '1.5rem', lineHeight: 1.4 }}>{cert.title}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--brand--blue-100)' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {cert.roleTags.map(tag => (
                          <span
                            key={tag}
                            style={{ background: 'var(--brand--white)', border: '1px solid var(--brand--blue-100)', color: 'var(--brand--dark-blue)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--brand--black)' }}>
                        <span style={{ color: 'var(--brand--color)' }}>★</span> {cert.compositeValueScore.toFixed(1)}<span style={{ color: 'var(--brand--neutral-lighter)', fontWeight: 600, fontSize: '0.75rem' }}>/10</span>
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
