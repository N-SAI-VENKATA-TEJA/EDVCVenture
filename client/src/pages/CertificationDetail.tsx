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

  if (loading) return <div className="section-warm" style={{ flex: '1', padding: '48px 0' }}><div className="container body-text text-center">Loading details...</div></div>;
  if (!cert) return <div className="section-warm" style={{ flex: '1', padding: '48px 0' }}><div className="container body-text text-center" style={{ color: 'var(--color-error)' }}>Certification not found.</div></div>;

  return (
    <div className="section-warm" style={{ flex: '1', padding: '48px 0' }}>
      <div className="container" style={{ maxWidth: 'var(--container-narrow)' }}>
        <Link to="/certifications" className="btn-ghost mb-6" style={{ display: 'inline-flex' }}>
           &larr; Back to Directory
        </Link>
        
        <div className="feature-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '48px', borderBottom: 'var(--border-light)' }}>
            <div className="grid-2" style={{ gap: '32px', alignItems: 'flex-start' }}>
              <div>
                <p className="overline mb-2" style={{ color: 'var(--color-gray-500)' }}>{cert.issuerName}</p>
                <h1 className="heading-section" style={{ textAlign: 'left', fontSize: '32px', marginBottom: '16px' }}>{cert.title}</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                  {cert.roleTags.map(tag => (
                    <span key={tag} className="badge badge--dark" style={{ background: 'var(--color-gray-100)', color: 'var(--color-gray-700)' }}>{tag}</span>
                  ))}
                </div>
                <a href={cert.url} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-flex' }}>
                  View Course
                </a>
              </div>
              
              <div className="feature-card" style={{ background: 'var(--color-off-white)', padding: '32px', textAlign: 'center', boxShadow: 'none' }}>
                <p className="overline mb-2">Value Score</p>
                <p className="heading-hero mb-6" style={{ fontSize: '48px' }}>{cert.compositeValueScore.toFixed(1)}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="body-text" style={{ fontSize: '14px' }}>Issuer Credibility</span>
                      <span className="badge badge--dark" style={{ background: 'var(--color-white)', color: 'var(--color-gray-700)', border: 'var(--border-light)' }}>{cert.issuerCredibilityScore.toFixed(1)}</span>
                    </div>
                    <div style={{ width: '100%', background: 'var(--color-gray-300)', borderRadius: '50px', height: '6px' }}>
                      <div style={{ background: 'var(--color-primary-dark)', height: '6px', borderRadius: '50px', width: `${(cert.issuerCredibilityScore/10)*100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="body-text" style={{ fontSize: '14px' }}>Skill Relevance</span>
                      <span className="badge badge--dark" style={{ background: 'var(--color-white)', color: 'var(--color-gray-700)', border: 'var(--border-light)' }}>{cert.skillRelevanceScore.toFixed(1)}</span>
                    </div>
                    <div style={{ width: '100%', background: 'var(--color-gray-300)', borderRadius: '50px', height: '6px' }}>
                      <div style={{ background: 'var(--color-accent-purple)', height: '6px', borderRadius: '50px', width: `${(cert.skillRelevanceScore/10)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ padding: '48px' }}>
            <div className="grid-2" style={{ gap: '48px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {cert.syllabusSummary && (
                  <div>
                    <h3 className="heading-card mb-4" style={{ fontSize: '20px', borderBottom: 'var(--border-light)', paddingBottom: '12px' }}>Syllabus Summary</h3>
                    <p className="body-text">{cert.syllabusSummary}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="heading-card mb-4" style={{ fontSize: '20px', borderBottom: 'var(--border-light)', paddingBottom: '12px' }}>Skills Covered</h3>
                  {cert.skillsCovered.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {cert.skillsCovered.map(skill => (
                        <span key={skill} className="badge badge--purple" style={{ padding: '8px 16px', fontSize: '14px', borderRadius: '8px' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="body-text" style={{ fontStyle: 'italic' }}>No specific core skills tagged.</p>
                  )}
                </div>
              </div>
              
              <div>
                <div>
                  <h3 className="overline mb-2">Duration</h3>
                  <p className="body-text" style={{ fontWeight: '500', color: 'var(--color-primary-dark)' }}>{cert.durationText || 'Self-paced'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationDetail;
