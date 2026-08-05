import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, ChevronRight, RefreshCw } from 'lucide-react';

const ResumeAnalyzer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleAnalyze = () => {
    if (!file) return;
    if (user?.subscriptionStatus !== 'premium') {
      if (window.confirm('The full Resume Analyzer is a Premium feature. Upgrade now?')) navigate('/pricing');
      return;
    }
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        score: 68,
        targetRole: user.targetRole || 'Frontend Engineer',
        matchedSkills: ['React', 'TypeScript', 'Vanilla CSS', 'REST APIs'],
        missingSkills: ['System Design', 'GraphQL', 'AWS / Cloud'],
        recommendations: [
          'Earn the AWS Cloud Practitioner certification to close the cloud gap.',
          'Add a side project demonstrating GraphQL — even a simple notes app counts.',
          'Study Grokking the System Design Interview to build depth quickly.',
        ],
      });
      setAnalyzing(false);
    }, 2600);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') setFile(f);
  };

  return (
    <div style={{ background: 'var(--brand--white)', minHeight: '100vh' }}>
      <PageHero
        overline="AI Tools"
        title="Resume Analyzer"
        description="Upload your resume and get your ATS score, keyword match, and a prioritised action plan in seconds."
      />

      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: 700 }}>

          {!result ? (
            /* Upload card */
            <div
              className="card_container anim-fade-up"
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                background: dragOver ? 'var(--brand--blue-50)' : 'var(--brand--white)',
                border: `2px dashed ${dragOver ? 'var(--brand--color)' : 'var(--brand--blue-100)'}`,
                borderRadius: '1.5rem',
                padding: '4rem 2rem',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: dragOver ? '0 10px 30px rgba(2, 78, 212, 0.1)' : '0 4px 15px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'var(--brand--blue-50)', color: 'var(--brand--color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(2, 78, 212, 0.15)' }}>
                <UploadCloud size={40} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-h4" style={{ marginBottom: '0.5rem', color: 'var(--brand--black)' }}>Upload your resume</h2>
                <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>PDF format · max 5 MB · drag & drop or click to browse</p>
              </div>

              <label style={{ display: 'inline-block', cursor: 'pointer', marginTop: '1rem' }}>
                <input
                  type="file"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={e => setFile(e.target.files?.[0] || null)}
                />
                <span className="button is-outline">Browse Files</span>
              </label>

              {file && (
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: 'var(--brand--blue-50)', padding: '0.5rem 1rem', borderRadius: '100px' }}>
                  <FileText size={18} color="var(--brand--color)" />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand--black)' }}>{file.name}</span>
                  <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand--neutral-lighter)', display: 'flex', alignItems: 'center' }}>×</button>
                </div>
              )}

              <div style={{ marginTop: '2rem', width: '100%', maxWidth: '300px' }}>
                <button
                  onClick={handleAnalyze}
                  disabled={!file || analyzing}
                  className="button"
                  style={{ 
                    width: '100%',
                    opacity: !file || analyzing ? 0.6 : 1, 
                    pointerEvents: !file || analyzing ? 'none' : 'auto'
                  }}
                >
                  {analyzing ? (
                    <><span className="spin-element" style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', marginRight: 8 }} />Analyzing...</>
                  ) : 'Analyze Now'}
                </button>
              </div>

              {user?.subscriptionStatus !== 'premium' && (
                <p className="text-body mt-4" style={{ fontSize: '0.875rem', color: '#F59E0B' }}>
                  ⚡ Full analysis is a <strong>Premium</strong> feature.{' '}
                  <button onClick={() => navigate('/pricing')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand--color)', fontWeight: 600, fontSize: '0.875rem', padding: 0 }}>
                    Upgrade now →
                  </button>
                </p>
              )}
            </div>
          ) : (
            /* Results */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Score card */}
              <div
                className="card_container anim-fade-up"
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTop: `4px solid var(--brand--dark-blue)` }}
              >
                <div>
                  <h2 className="text-h4" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 color="#10B981" /> Analysis complete
                  </h2>
                  <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>Target role: <strong style={{ color: 'var(--brand--black)' }}>{result.targetRole}</strong></p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--brand--black)', lineHeight: 1 }}>{result.score}%</div>
                  <div style={{ background: 'var(--brand--blue-100)', color: 'var(--brand--dark-blue)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginTop: '0.5rem' }}>Match Score</div>
                </div>
              </div>

              {/* Skill split */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div className="card_container anim-fade-up" style={{ animationDelay: '0.1s' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#10B981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={20} /> Matched skills
                  </h4>
                  <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
                    {result.matchedSkills.map((s: string) => (
                      <li key={s} style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '6px 14px', borderRadius: '50px', fontSize: '0.875rem', fontWeight: 600 }}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="card_container anim-fade-up" style={{ animationDelay: '0.2s' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#EF4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={20} /> Missing skills
                  </h4>
                  <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
                    {result.missingSkills.map((s: string) => (
                      <li key={s} style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', padding: '6px 14px', borderRadius: '50px', fontSize: '0.875rem', fontWeight: 600 }}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="card_container anim-fade-up" style={{ animationDelay: '0.3s' }}>
                <h4 className="text-h4" style={{ marginBottom: '1.5rem' }}>Recommended actions</h4>
                <ol style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.25rem', color: 'var(--brand--neutral-lighter)', margin: 0 }}>
                  {result.recommendations.map((r: string, i: number) => (
                    <li key={i} className="text-body">{r}</li>
                  ))}
                </ol>
                <div style={{ marginTop: '2rem' }}>
                  <button
                    onClick={() => navigate('/certifications')}
                    className="button"
                  >
                    Browse recommended certifications <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button onClick={() => { setResult(null); setFile(null); }} style={{ background: 'none', border: 'none', color: 'var(--brand--neutral-lighter)', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw size={16} /> Analyze another resume
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default ResumeAnalyzer;
