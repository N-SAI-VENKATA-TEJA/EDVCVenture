import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PageHero } from '../components/PageHero';
interface StandardResume {
  _id: string;
  targetRole: string;
  experienceLevel: string;
  cloudinaryUrl: string;
  notes?: string;
}

const EXP_BADGE: Record<string, string> = {
  junior:     'var(--brand--blue-50)',
  mid:        'rgba(245,158,11,0.1)',
  senior:     'rgba(46,204,113,0.1)',
  lead:       'var(--brand--blue-100)',
};

const Resumes = () => {
  const [resumes, setResumes] = useState<StandardResume[]>([]);
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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/resumes?role=${encodeURIComponent(selectedRole)}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setResumes(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [selectedRole, user]);

  return (
    <>
      <PageHero
        overline="Library"
        title="Resume Library"
        description="Real winning resumes, sorted by target role and experience level."
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
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--brand--neutral-lighter)', fontSize: '1.25rem' }}>Loading resumes…</div>
          ) : resumes.length === 0 ? (
            <div className="card_container" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', margin: '0 auto', gap: 0, justifyContent: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📂</div>
              <h3 className="text-h4" style={{ marginBottom: '1rem' }}>None yet for this role</h3>
              <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>Try selecting a different role — more are being added regularly.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3.5rem 2.5rem' }}>
              {resumes.map((resume, i) => (
                <div
                  key={resume._id}
                  className="card_container anim-fade-up"
                  style={{ 
                    padding: 0, 
                    overflow: 'hidden', 
                    gap: 0,
                    border: '1px solid var(--brand--blue-100)',
                    boxShadow: '0 4px 20px rgba(0, 76, 211, 0.05)'
                  }}
                >
                  {/* PDF preview */}
                  <div style={{
                    background: 'var(--brand--blue-50)',
                    aspectRatio: '1 / 1.3',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <iframe
                      src={`${resume.cloudinaryUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                      style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                      title={`Resume for ${resume.targetRole}`}
                    />
                    {/* Click-shield */}
                    <div style={{ position: 'absolute', inset: 0 }} />
                  </div>

                  {/* Info bar */}
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--brand--blue-100)', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 className="text-h4" style={{ margin: 0 }}>{resume.targetRole}</h3>
                      <span style={{ background: EXP_BADGE[resume.experienceLevel?.toLowerCase()] || 'var(--brand--blue-50)', color: 'var(--brand--black)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize' }}>
                        {resume.experienceLevel}
                      </span>
                    </div>
                    {resume.notes && <p className="text-small" style={{ color: 'var(--brand--neutral-lighter)', flex: 1 }}>{resume.notes}</p>}
                    <a
                      href={resume.cloudinaryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button"
                      style={{ width: '100%', marginTop: 'auto', minHeight: '2.5rem', height: '2.5rem', padding: '0 1rem', fontSize: '0.875rem', border: 'none' }}
                    >
                      View full PDF ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Resumes;
