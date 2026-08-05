import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

interface Resource { _id: string; title: string; body: string; category?: string; createdAt: string; }

const ExclusiveResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/resources/exclusive`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setResources(res.data);
      } catch (err: any) {
        setError(err.response?.status === 403 ? 'premium_required' : 'error');
      } finally { setLoading(false); }
    };
    if (user?.token) fetch();
  }, [user]);

  if (loading) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px 24px' }}>
      <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gray-400)' }}>Loading premium resources…</p>
    </div>
  );

  if (error === 'premium_required') return (
    <div className="auth-bg">
      <div className="card_container" style={{ textAlign: 'center', maxWidth: '420px', padding: '3rem 2.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔒</div>
        <h2 className="text-h3" style={{ marginBottom: '1rem', color: 'var(--brand--black)' }}>Premium content</h2>
        <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)', marginBottom: '2rem' }}>This section is exclusively available for premium members. Upgrade to unlock curated guides, playbooks, and insider resources.</p>
        <Link to="/pricing" className="button" style={{ width: '100%', display: 'flex' }}>Upgrade to Premium</Link>
        <button onClick={() => navigate(-1)} className="button is-outline" style={{ marginTop: '1rem', width: '100%' }}>← Go back</button>
      </div>
    </div>
  );

  return (
    <>
      <PageHero
        overline="Premium"
        title={<>Exclusive Resources 💎</>}
        description="Premium-only playbooks, insider roadmaps, and templates that accelerate your path to senior roles."
      />

      <section style={{ paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {resources.length === 0 ? (
            <div className="card_container" style={{ textAlign: 'center', padding: '4rem 2rem', gap: 0, justifyContent: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✨</div>
              <h3 className="text-h4" style={{ marginBottom: '1rem' }}>New premium resources dropping soon</h3>
              <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>You're first in line. Check back shortly.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {resources.map((res, i) => (
                <div
                  key={res._id}
                  className="card_container anim-fade-up"
                  style={{ borderLeft: '4px solid var(--brand--dark-blue)' }}
                >
                  {res.category && <span style={{ background: 'var(--brand--blue-100)', color: 'var(--brand--dark-blue)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: '1rem' }}>{res.category}</span>}
                  <h3 className="text-h4" style={{ marginBottom: '1rem' }}>{res.title}</h3>
                  <p className="text-body" style={{ whiteSpace: 'pre-line', color: 'var(--brand--neutral-lighter)' }}>{res.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ExclusiveResources;
