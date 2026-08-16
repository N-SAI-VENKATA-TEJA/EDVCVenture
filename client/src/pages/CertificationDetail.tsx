import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, Link } from 'react-router-dom';

interface CertificationDetail {
  _id: string;
  title: string;
  issuerName: string;
  issuerCredibilityScore: number;
  skillRelevanceScore: number;
  compositeValueScore: number;
  roleTags: string[];
  skillsCovered: string[];
  durationText?: string;
  url: string;
  syllabusSummary?: string;
}

// Removed getBgIllustration as images are no longer used

const CertificationDetail = () => {
  const { id } = useParams();
  const [cert, setCert] = useState<CertificationDetail | null>(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCert = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/certifications/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        setCert(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token && id) fetchCert();
  }, [id, user]);

  if (loading) return (
    <div style={{ flex: '1', padding: '5rem 0', display: 'flex', justifyContent: 'center', backgroundColor: '#fcfcfd' }}>
      <div className="spin-element" style={{ width: '2rem', height: '2rem', border: '3px solid var(--brand--blue-100)', borderTopColor: 'var(--brand--color)', borderRadius: '50%' }}></div>
    </div>
  );
  
  if (!cert) return (
    <div style={{ flex: '1', padding: '5rem 0', backgroundColor: '#fcfcfd' }}>
      <div className="container" style={{ textAlign: 'center', color: '#ff4d4f', fontSize: '1.25rem' }}>
        Certification not found.
      </div>
    </div>
  );

  // bgImage removed
  return (
    <div style={{ flex: '1', padding: '4rem 0', backgroundColor: '#f9fafb' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <Link to="/certifications" className="nav_links" style={{ display: 'inline-flex', marginBottom: '2.5rem', fontWeight: 500, textDecoration: 'none', fontSize: '1.125rem' }}>
           &larr; Back to Directory
        </Link>
        
        <div style={{ 
          background: 'var(--brand--white)', 
          borderRadius: '1.5rem', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          border: '1px solid var(--brand--blue-100)',
          overflow: 'hidden'
        }}>
          {/* TOP SECTION */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--brand--blue-100)' }}>
            
            {/* LEFT CONTENT */}
            <div style={{ flex: 1, padding: '4rem', position: 'relative', overflow: 'hidden' }}>
              {/* Top tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                <div style={{ background: 'var(--brand--color)', color: 'white', padding: '8px', borderRadius: '8px', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <span style={{ color: 'var(--brand--color)', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cert.issuerName}</span>
              </div>
              
              <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
                {cert.title}
              </h1>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
                {cert.roleTags.map(tag => (
                  <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--brand--blue-100)', background: 'var(--brand--white)', padding: '0.5rem 1.25rem', borderRadius: '100px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand--color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    <span style={{ color: 'var(--brand--color)', fontSize: '1rem', fontWeight: 600 }}>{tag}</span>
                  </div>
                ))}
              </div>
              
              <p style={{ color: '#475569', fontSize: '1.125rem', lineHeight: 1.6, maxWidth: '500px', marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
                {cert.title.includes('Responsive') ? 'Learn HTML, CSS, Flexbox, Grid and responsive design by building real-world projects.' : 
                 cert.title.includes('JavaScript') ? 'Master fundamental JavaScript concepts by solving algorithms and building projects.' :
                 cert.title.includes('Front End') ? 'Learn React, Redux, React Router and build powerful front-end applications.' :
                 'Gain the essential skills and knowledge required to master this domain.'}
              </p>
              
              <a href={cert.url} target="_blank" rel="noreferrer" className="button" style={{ display: 'inline-flex', width: 'fit-content', textDecoration: 'none', position: 'relative', zIndex: 2, padding: '0 2rem', minHeight: '4rem', fontSize: '1.125rem' }}>
                View Course <span style={{ marginLeft: '0.5rem' }}>&gt;</span>
              </a>

              {/* Removed faded background image illustration as images are now unused */}
            </div>
            
            {/* RIGHT SCORE CARD */}
            <div style={{ width: '440px', flexShrink: 0, padding: '4rem', borderLeft: '1px solid var(--brand--blue-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', border: '1px solid var(--brand--blue-100)', borderRadius: '1.25rem', padding: '2.5rem', background: 'var(--brand--white)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Value Score</span>
                  <div style={{ background: '#eff6ff', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #dbeafe' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--brand--color)" stroke="var(--brand--color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                </div>
                
                {/* Big Score */}
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '5.5rem', fontWeight: 800, color: 'var(--brand--color)', lineHeight: 1, letterSpacing: '-0.04em' }}>{cert.compositeValueScore.toFixed(1)}</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#64748b', marginLeft: '0.25rem' }}>/10</span>
                </div>
                
                <hr style={{ border: 'none', borderTop: '1px solid var(--brand--blue-100)', margin: '2rem 0' }} />
                
                {/* Issuer Credibility */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ background: '#eff6ff', width: '2rem', height: '2rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--brand--color)" stroke="var(--brand--color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4" stroke="white"></path></svg>
                      </div>
                      <span style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 500 }}>Issuer Credibility</span>
                    </div>
                    <span style={{ fontSize: '1rem', color: 'var(--brand--color)', fontWeight: 700 }}>{cert.issuerCredibilityScore.toFixed(1)}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '100px' }}>
                    <div style={{ height: '100%', background: 'var(--brand--color)', borderRadius: '100px', width: `${(cert.issuerCredibilityScore/10)*100}%` }}></div>
                  </div>
                </div>
                
                <hr style={{ border: 'none', borderTop: '1px dotted var(--brand--blue-100)', margin: '1.5rem 0' }} />
                
                {/* Skill Relevance */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ background: '#dcfce7', width: '2rem', height: '2rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                      </div>
                      <span style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 500 }}>Skill Relevance</span>
                    </div>
                    <span style={{ fontSize: '1rem', color: '#16a34a', fontWeight: 700 }}>{cert.skillRelevanceScore.toFixed(1)}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '100px' }}>
                    <div style={{ height: '100%', background: '#16a34a', borderRadius: '100px', width: `${(cert.skillRelevanceScore/10)*100}%` }}></div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
          {/* BOTTOM SECTION */}
          <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Row 1: Syllabus and Duration */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>
              {/* Syllabus Summary */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#eff6ff', width: '3.5rem', height: '3.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--brand--color)" stroke="var(--brand--color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8" stroke="white"></polyline><line x1="16" y1="13" x2="8" y2="13" stroke="white"></line><line x1="16" y1="17" x2="8" y2="17" stroke="white"></line><polyline points="10 9 9 9 8 9" stroke="white"></polyline></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>Syllabus Summary</h3>
                  <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6 }}>{cert.syllabusSummary || 'Comprehensive overview of core topics and practical applications.'}</p>
                </div>
              </div>
              
              {/* Duration */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', borderLeft: '1px solid var(--brand--blue-100)', paddingLeft: '4rem', height: '100%' }}>
                <div style={{ background: '#f3e8ff', width: '3.5rem', height: '3.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7e22ce" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.25rem' }}>Duration</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#7e22ce', marginBottom: '0.25rem' }}>{cert.durationText || '~300 hours'}</p>
                  <p style={{ fontSize: '1rem', color: '#64748b' }}>(self-paced)</p>
                </div>
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--brand--blue-100)', margin: '0' }} />
            
            {/* Row 2: Skills Covered */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ background: '#dcfce7', width: '3.5rem', height: '3.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#16a34a" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="white"></polyline><line x1="12" y1="22.08" x2="12" y2="12" stroke="white"></line></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginRight: '1rem' }}>Skills Covered</h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {cert.skillsCovered.length > 0 ? cert.skillsCovered.map(skill => (
                  <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #e2e8f0', background: 'var(--brand--white)', padding: '0.5rem 1.25rem', borderRadius: '100px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 500 }}>{skill}</span>
                  </div>
                )) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #e2e8f0', background: 'var(--brand--white)', padding: '0.5rem 1.25rem', borderRadius: '100px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 500 }}>HTML</span>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationDetail;
