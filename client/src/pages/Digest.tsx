import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PageHero } from '../components/PageHero';
interface DigestItem {
  _id: string;
  title: string;
  type: string;
  description: string;
  place: string;
  eventDateTime: string;
  deadline?: string;
  link: string;
}

const TYPE_COLORS: Record<string, string> = {
  job:    'var(--brand--blue-50)',
  event:  'rgba(245,158,11,0.1)',
  course: 'rgba(46,204,113,0.1)',
};

const Digest = () => {
  const [items, setItems] = useState<DigestItem[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/digest`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetch();
  }, [user]);

  return (
    <>
      <PageHero
        overline="Daily Digest"
        title="Your career signals, curated daily"
        description="Jobs, events, and courses handpicked for your target role — fresh every morning."
      />

      <section style={{ paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--brand--neutral-lighter)', fontSize: '1.25rem' }}>
              Loading digest…
            </div>
          ) : items.length === 0 ? (
            <div className="card_container" style={{ textAlign: 'center', padding: '4rem 2rem', gap: 0, justifyContent: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📭</div>
              <h3 className="text-h4" style={{ marginBottom: '1rem' }}>Nothing yet today</h3>
              <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>Check back in the morning — your curated digest will be ready.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map((item, i) => (
                <div
                  key={item._id}
                  className="card_container anim-fade-up"
                  style={{ borderLeft: `4px solid var(--brand--color)` }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <span
                          style={{ background: TYPE_COLORS[item.type.toLowerCase()] || 'var(--brand--blue-50)', color: 'var(--brand--black)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize' }}
                        >
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-h4" style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                      <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)', marginBottom: '1rem' }}>{item.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'var(--brand--black)', fontWeight: 500 }}>
                        <span>📍 {item.place}</span>
                        <span>📅 {new Date(item.eventDateTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        {item.deadline && (
                          <span style={{ color: '#e74c3c', fontWeight: 700 }}>
                            ⏳ Deadline: {new Date(item.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        )}
                      </div>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="button"
                      style={{ flexShrink: 0, minHeight: '2.5rem', height: '2.5rem', padding: '0 1rem', fontSize: '0.875rem' }}
                    >
                      View →
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

export default Digest;
