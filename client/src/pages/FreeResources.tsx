import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PageHero } from '../components/PageHero';
interface Resource { _id: string; title: string; body: string; category?: string; createdAt: string; }

const FreeResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/resources/free`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setResources(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    if (user?.token) fetch();
  }, [user]);

  return (
    <>
      <PageHero
        overline="Resources"
        title="Free Resources Library"
        description="Templates, guides, roadmaps and playbooks — handpicked and free forever."
      />

      <section style={{ paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--brand--neutral-lighter)', fontSize: '1.25rem' }}>Loading…</div>
          ) : resources.length === 0 ? (
            <div className="card_container" style={{ textAlign: 'center', padding: '4rem 2rem', gap: 0, justifyContent: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📂</div>
              <h3 className="text-h4" style={{ marginBottom: '1rem' }}>No resources yet</h3>
              <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>Check back soon — we're always adding new guides.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {resources.map((res, i) => (
                <div key={res._id} className="card_container anim-fade-up">
                  {res.category && (
                    <span style={{ background: 'var(--brand--blue-50)', color: 'var(--brand--black)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>{res.category}</span>
                  )}
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

export default FreeResources;
