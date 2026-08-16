import { Link } from 'react-router-dom';
import { useState } from 'react';

const Landing = () => {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <div style={{ position: 'relative', overflowX: 'hidden', background: 'var(--brand--white)' }}>
      
      {/* 1. Hero Section */}
      <div style={{ padding: '1rem', background: 'var(--brand--white)' }}>
        <section style={{ 
          padding: '6rem 1rem 0rem', 
          textAlign: 'center',
          background: 'linear-gradient(180deg, var(--brand--dark-blue) 0%, var(--brand--light-blue) 100%)',
          color: 'var(--brand--white)',
          borderRadius: '2rem',
          boxShadow: 'var(--shadow-glow)',
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto',
          overflow: 'hidden'
        }}>
          {/* Header Content */}
          <div className="container anim-fade-up" style={{ position: 'relative', zIndex: 2 }}>
            <span className="badge" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
              ✨ v 1.0 Is Here
            </span>
            <h1 className="text-hero" style={{ maxWidth: '900px', margin: '0 auto 1.5rem', color: 'var(--brand--white)' }}>
              Stop Guessing. Start Building with SkillShell
            </h1>
            <p className="text-large" style={{ maxWidth: '640px', margin: '0 auto 4rem', opacity: 0.9 }}>
              Upload your resume, see your skill gaps, and get role-specific certifications and projects recommended instantly.
            </p>
          </div>

          {/* Mockup Cards (Anchored to Bottom Edge) */}
          <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
             <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', alignItems: 'flex-end', margin: '0 -1rem' }}>
                
                {/* Left Card: Skill Gaps (Matching "My Balance") */}
                <div className="card_container anim-fade-up" style={{ width: '320px', height: '280px', padding: '2rem', textAlign: 'left', marginBottom: '-1rem', justifyContent: 'flex-start', gap: 0 }}>
                   <div style={{ fontSize: '0.875rem', color: 'var(--brand--neutral-lighter)', marginBottom: '0.25rem', fontWeight: 500 }}>Identified Skill Gaps</div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--brand--black)', marginBottom: '2rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>3 <span style={{ fontSize: '1rem', color: 'var(--brand--neutral-lighter)', fontWeight: 500, letterSpacing: '0' }}>Gaps</span> <span style={{ fontSize: '0.75rem', color: '#2ecc71', background: 'rgba(46,204,113,0.1)', padding: '4px 8px', borderRadius: '100px', marginLeft: 'auto' }}>+20%</span></div>
                   
                   <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1, padding: '1rem', background: 'var(--brand--blue-50)', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '100px', background: 'var(--brand--color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand--black)' }}>Redux</div>
                         </div>
                         <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--brand--black)' }}>85% <span style={{ fontSize: '0.75rem', color: 'var(--brand--neutral-lighter)', fontWeight: 500 }}>Match</span></div>
                      </div>
                      <div style={{ flex: 1, padding: '1rem', background: 'var(--brand--blue-50)', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '100px', background: 'var(--brand--color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand--black)' }}>React</div>
                         </div>
                         <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--brand--black)' }}>92% <span style={{ fontSize: '0.75rem', color: 'var(--brand--neutral-lighter)', fontWeight: 500 }}>Match</span></div>
                      </div>
                   </div>
                </div>

                {/* Center Card: Match Score (Matching "Weekly Overview") */}
                <div className="card_container large anim-fade-up" style={{ width: '380px', height: '360px', zIndex: 11, padding: '2rem 2rem 0', marginBottom: '-1rem', justifyContent: 'flex-start', gap: 0 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                      <div style={{ width: '24px', height: '24px', background: 'var(--brand--color)', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--brand--black)', fontWeight: 600 }}>Target Role Match</div>
                   </div>
                   
                   <div style={{ fontSize: '0.875rem', color: 'var(--brand--neutral-lighter)', marginBottom: '0.25rem', fontWeight: 500 }}>Overall Score</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--brand--black)', lineHeight: 1, letterSpacing: '-0.02em' }}>92%</div>
                      <div style={{ fontSize: '0.75rem', color: '#2ecc71', background: 'rgba(46,204,113,0.1)', padding: '4px 12px', borderRadius: '100px', fontWeight: 600, marginLeft: 'auto' }}>+15%</div>
                   </div>
                   
                   <div style={{ flex: 1, position: 'relative', margin: '0 -2rem', overflow: 'hidden', borderRadius: '0 0 1.5rem 1.5rem' }}>
                      <svg width="100%" height="100%" viewBox="0 0 380 180" fill="none" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
                         <path d="M0 140 C 40 140, 60 80, 100 110 C 140 140, 170 90, 200 120 C 240 160, 280 60, 320 80 C 350 95, 360 40, 380 50 L 380 180 L 0 180 Z" fill="url(#wave-gradient)" opacity="0.15" />
                         <path d="M0 140 C 40 140, 60 80, 100 110 C 140 140, 170 90, 200 120 C 240 160, 280 60, 320 80 C 350 95, 360 40, 380 50" stroke="var(--brand--light-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                         <defs>
                            <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="0%" stopColor="var(--brand--light-blue)" />
                               <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                            </linearGradient>
                         </defs>
                      </svg>
                   </div>
                </div>

                {/* Right Card: Recommendation (Matching "Bank Transfer") */}
                <div className="card_container anim-fade-up" style={{ width: '320px', height: '280px', padding: '2rem', textAlign: 'left', marginBottom: '-1rem', justifyContent: 'flex-start', gap: 0 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                      <div style={{ width: '24px', height: '24px', background: 'var(--brand--color)', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--brand--black)', fontWeight: 600 }}>Top Certificate</div>
                   </div>
                   
                   <div style={{ padding: '0.75rem', background: 'var(--brand--blue-50)', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '1rem', right: '1rem', borderTop: '2px dashed #d0d8eb', zIndex: 1 }}></div>
                      <div style={{ width: '24px', height: '24px', borderRadius: '100px', background: '#fff', border: '1px solid #e0e7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, fontSize: '8px', fontWeight: 800 }}>AWS</div>
                      <div style={{ width: '24px', height: '24px', borderRadius: '100px', background: 'var(--brand--color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 2 }}>
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                      </div>
                      <div style={{ width: '24px', height: '24px', borderRadius: '100px', background: '#fff', border: '1px solid #e0e7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, fontSize: '8px', fontWeight: 800 }}>PRO</div>
                   </div>

                   <div style={{ fontSize: '0.875rem', color: 'var(--brand--neutral-lighter)', marginBottom: '0.25rem', fontWeight: 500 }}>Salary Boost</div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--brand--black)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>$2,259 <span style={{ fontSize: '1rem', color: 'var(--brand--neutral-lighter)', fontWeight: 500, letterSpacing: '0' }}>USD</span> <span style={{ fontSize: '0.75rem', color: '#2ecc71', background: 'rgba(46,204,113,0.1)', padding: '4px 8px', borderRadius: '100px', marginLeft: 'auto' }}>+20%</span></div>
                </div>
             </div>
          </div>
        </section>
      </div>

      {/* 2. Unlock Power Section */}
      <section className="section-padding" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
             <h2 className="text-h2" style={{ maxWidth: '850px', margin: 0, fontSize: '4.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 700 }}>
               Unlock the Power of Your <span style={{ color: 'var(--brand--color)' }}>Data</span>
             </h2>
             <Link to="/signup" className="button" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>Free Trial</Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
             
             {/* Card 1 */}
             <div className="card_container" style={{ padding: '2rem', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                   <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div style={{ textAlign: 'left' }}>
                   <div style={{ fontWeight: 800, fontSize: '3rem', color: 'var(--brand--black)', lineHeight: 1, marginBottom: '0.25rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline' }}>
                     10k<span style={{ color: 'var(--brand--color)', fontSize: '2rem', marginLeft: '4px' }}>+</span>
                   </div>
                   <div style={{ color: 'var(--brand--neutral-lighter)', fontSize: '0.875rem', fontWeight: 600 }}>Resumes Analyzed</div>
                </div>
             </div>
             
             {/* Card 2 */}
             <div className="card_container" style={{ padding: '2rem', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                   <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                </div>
                <div style={{ textAlign: 'left' }}>
                   <div style={{ fontWeight: 800, fontSize: '3rem', color: 'var(--brand--black)', lineHeight: 1, marginBottom: '0.25rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline' }}>
                     50<span style={{ color: 'var(--brand--color)', fontSize: '2rem', marginLeft: '4px' }}>+</span>
                   </div>
                   <div style={{ color: 'var(--brand--neutral-lighter)', fontSize: '0.875rem', fontWeight: 600 }}>Ranked Certs</div>
                </div>
             </div>
             
             {/* Card 3 */}
             <div className="card_container" style={{ padding: '2rem', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                   <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div style={{ textAlign: 'left' }}>
                   <div style={{ fontWeight: 800, fontSize: '3rem', color: 'var(--brand--black)', lineHeight: 1, marginBottom: '0.25rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline' }}>
                     4.9<span style={{ color: 'var(--brand--color)', fontSize: '1.5rem', marginLeft: '2px' }}>/5.0</span>
                   </div>
                   <div style={{ color: 'var(--brand--neutral-lighter)', fontSize: '0.875rem', fontWeight: 600 }}>Student Reviews</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Workflow Section */}
      <section className="section-padding">
         <div className="container text-center" style={{ marginBottom: '5rem' }}>
            <h2 className="text-h2" style={{ maxWidth: '700px', margin: '0 auto' }}>
               How Our Platform Simplifies Your <span style={{ color: 'var(--brand--color)' }}>Workflow</span>
            </h2>
         </div>
         
         <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', marginBottom: '6rem' }}>
               <div className="card_container large" style={{ height: '400px', boxShadow: 'var(--shadow-elevated)' }}>
                  <div style={{ fontWeight: 600, marginBottom: '1.5rem', color: 'var(--brand--black)', fontSize: '1.125rem' }}>Upload Resume</div>
                  <div style={{ flex: 1, border: '2px dashed #cbd5e1', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#f8fafc', cursor: 'pointer' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '100px', background: 'var(--brand--blue-50)', color: 'var(--brand--color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 600, color: 'var(--brand--color)', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Click to upload or drag and drop</div>
                      <div style={{ fontSize: '0.95rem', color: 'var(--brand--neutral-lighter)' }}>PDF, DOCX up to 10MB</div>
                    </div>
                  </div>
               </div>
               <div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>1</div>
                  <h3 className="text-h3" style={{ marginBottom: '1rem' }}>Upload Your Resume</h3>
                  <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>Upload your current resume and select your target role (Frontend, Backend, ML, etc.). Our analyzer extracts your skills and detects the gaps.</p>
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
               <div style={{ order: 2 }}>
                  <div className="card_container large" style={{ height: '400px', boxShadow: 'var(--shadow-elevated)', justifyContent: 'flex-start', gap: '1rem' }}>
                     <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--brand--neutral-lighter)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Top Recommendations</div>
                     
                     <div style={{ padding: '1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '0.75rem', background: 'var(--brand--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand--color)' }}>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                        <div style={{ flex: 1 }}>
                           <div style={{ fontWeight: 700, color: 'var(--brand--black)', fontSize: '1rem', marginBottom: '0.25rem' }}>Advanced React Patterns</div>
                           <div style={{ fontSize: '0.85rem', color: 'var(--brand--neutral-lighter)' }}>Closes 15% skill gap</div>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', background: 'var(--brand--color)', padding: '0.5rem 1rem', borderRadius: '100px' }}>Start</div>
                     </div>

                     <div style={{ padding: '1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '0.75rem', background: 'var(--brand--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand--color)' }}>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        </div>
                        <div style={{ flex: 1 }}>
                           <div style={{ fontWeight: 700, color: 'var(--brand--black)', fontSize: '1rem', marginBottom: '0.25rem' }}>System Design Basics</div>
                           <div style={{ fontSize: '0.85rem', color: 'var(--brand--neutral-lighter)' }}>Highly requested by recruiters</div>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', background: 'var(--brand--color)', padding: '0.5rem 1rem', borderRadius: '100px' }}>Start</div>
                     </div>
                  </div>
               </div>
               <div style={{ order: 1 }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>2</div>
                  <h3 className="text-h3" style={{ marginBottom: '1rem' }}>Get Actionable Recommendations</h3>
                  <p className="text-body" style={{ color: 'var(--brand--neutral-lighter)' }}>Stop guessing what to learn. We recommend the highest-ranked free certifications and curated projects to cover your missing skills.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Testimonials */}
      <section className="section-padding">
         <div className="container mb-12" style={{ display: 'flex', justifyContent: 'center' }}>
            <h2 className="text-h2" style={{ textAlign: 'center', maxWidth: '600px', fontSize: '3.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
               What Students Are <span style={{ color: 'var(--brand--color)' }}>Saying</span>
            </h2>
         </div>
         <div className="container" style={{ maxWidth: '1100px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
               
               {/* Card 1 */}
               <div className="card_container" style={{ padding: '3rem 2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                     <img src="https://i.pravatar.cc/150?u=riya" alt="Profile" style={{ width: '64px', height: '64px', borderRadius: '100px', objectFit: 'cover' }} />
                     <div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--brand--black)' }}>Riya Sharma</div>
                        <div style={{ display: 'flex', gap: '4px', color: '#FFC107', fontSize: '1.125rem', marginTop: '4px' }}>
                           ★ ★ ★ ★ ★
                        </div>
                     </div>
                  </div>
                  <p style={{ fontSize: '1.05rem', color: 'var(--brand--neutral-lighter)', lineHeight: 1.7, marginBottom: '2.5rem', fontWeight: 500 }}>
                     "SkillShell completely changed how I prepare for placements. Before using it, finding my skill gaps was a constant headache. The Resume Analyzer is incredibly intuitive, and the actionable feedback helped me secure my first internship!"
                  </p>
                  <div style={{ fontWeight: 800, color: 'var(--brand--black)', fontSize: '1rem' }}>
                     August 29, 2024
                  </div>
               </div>

               {/* Card 2 */}
               <div className="card_container" style={{ padding: '3rem 2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                     <img src="https://i.pravatar.cc/150?u=arjun" alt="Profile" style={{ width: '64px', height: '64px', borderRadius: '100px', objectFit: 'cover' }} />
                     <div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--brand--black)' }}>Arjun Mehta</div>
                        <div style={{ display: 'flex', gap: '4px', color: '#FFC107', fontSize: '1.125rem', marginTop: '4px' }}>
                           ★ ★ ★ ★ ★
                        </div>
                     </div>
                  </div>
                  <p style={{ fontSize: '1.05rem', color: 'var(--brand--neutral-lighter)', lineHeight: 1.7, marginBottom: '2.5rem', fontWeight: 500 }}>
                     "I highly recommend SkillShell to any student looking to streamline their placement prep. We struggled with scattered resources and a lack of real-time visibility into what recruiters actually want. This platform solves it all."
                  </p>
                  <div style={{ fontWeight: 800, color: 'var(--brand--black)', fontSize: '1rem' }}>
                     August 29, 2024
                  </div>
               </div>

               {/* Card 3 */}
               <div className="card_container" style={{ padding: '3rem 2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                     <img src="https://i.pravatar.cc/150?u=priya" alt="Profile" style={{ width: '64px', height: '64px', borderRadius: '100px', objectFit: 'cover' }} />
                     <div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--brand--black)' }}>Priya Kapoor</div>
                        <div style={{ display: 'flex', gap: '4px', color: '#FFC107', fontSize: '1.125rem', marginTop: '4px' }}>
                           ★ ★ ★ ★ ★
                        </div>
                     </div>
                  </div>
                  <p style={{ fontSize: '1.05rem', color: 'var(--brand--neutral-lighter)', lineHeight: 1.7, marginBottom: '2.5rem', fontWeight: 500 }}>
                     "Incredible platform! The curated projects and certifications finally gave me exact recommendations on what I was missing for a Frontend Engineer role. The UI is gorgeous too."
                  </p>
                  <div style={{ fontWeight: 800, color: 'var(--brand--black)', fontSize: '1rem' }}>
                     August 29, 2024
                  </div>
               </div>
               
               {/* Card 4 (To complete the 2-column layout like Rampay) */}
               <div className="card_container" style={{ padding: '3rem 2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                     <img src="https://i.pravatar.cc/150?u=rohan" alt="Profile" style={{ width: '64px', height: '64px', borderRadius: '100px', objectFit: 'cover' }} />
                     <div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--brand--black)' }}>Rohan Desai</div>
                        <div style={{ display: 'flex', gap: '4px', color: '#FFC107', fontSize: '1.125rem', marginTop: '4px' }}>
                           ★ ★ ★ ★ ★
                        </div>
                     </div>
                  </div>
                  <p style={{ fontSize: '1.05rem', color: 'var(--brand--neutral-lighter)', lineHeight: 1.7, marginBottom: '2.5rem', fontWeight: 500 }}>
                     "The Daily Digest feature alone saves me hours from scrolling LinkedIn for hackathon deadlines. Having everything centralized and ranked by value is a total game-changer for my career."
                  </p>
                  <div style={{ fontWeight: 800, color: 'var(--brand--black)', fontSize: '1rem' }}>
                     August 29, 2024
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 5. Pricing Section */}
      <section className="section-padding">
         <div className="container text-center" style={{ marginBottom: '4rem' }}>
            <h2 className="text-h2" style={{ marginBottom: '2.5rem' }}>Simple, Transparent <span style={{ color: 'var(--brand--color)' }}>Pricing</span></h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <div style={{ display: 'inline-flex', background: 'var(--brand--blue-50)', borderRadius: '100px', padding: '0.35rem', gap: '0.25rem', border: '1px solid #e0e7f5' }}>
                  <button onClick={() => setIsYearly(false)} style={{ padding: '0.65rem 1.75rem', borderRadius: '100px', background: isYearly ? 'transparent' : 'var(--brand--color)', color: isYearly ? 'var(--brand--neutral-lighter)' : 'white', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', boxShadow: isYearly ? 'none' : '0 4px 10px rgba(11, 99, 248, 0.2)', transition: 'all 0.2s' }}>Monthly</button>
                  <button onClick={() => setIsYearly(true)} style={{ padding: '0.65rem 1.75rem', borderRadius: '100px', background: isYearly ? 'var(--brand--color)' : 'transparent', color: isYearly ? 'white' : 'var(--brand--neutral-lighter)', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', boxShadow: isYearly ? '0 4px 10px rgba(11, 99, 248, 0.2)' : 'none', transition: 'all 0.2s' }}>Yearly</button>
               </div>
            </div>
         </div>
         <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
               
               {/* Basic Plan */}
               <div className="card_container" style={{ padding: '3rem 2.5rem' }}>
                  <div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--brand--black)' }}>Basic Plan</div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--brand--black)', letterSpacing: '-0.02em', lineHeight: 1 }}>$0.00</div>
                        <div style={{ fontSize: '1rem', color: 'var(--brand--neutral-lighter)', fontStyle: 'italic', fontWeight: 500 }}>USD</div>
                     </div>
                     <p style={{ color: 'var(--brand--neutral-lighter)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                        Perfect for students or early-career professionals, our Basic Plan gives you the essential tools to manage your career with ease.
                     </p>
                     
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Basic Resume Analysis
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Free Resources
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Ranked Certifications
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Email Support
                        </li>
                     </ul>
                  </div>
                  <button style={{ width: '100%', padding: '1rem', borderRadius: '100px', background: 'var(--brand--white)', border: '1px solid var(--brand--color)', color: 'var(--brand--color)', fontWeight: 600, fontSize: '1rem' }}>Get Started</button>
               </div>
               
               {/* Premium Plan */}
               <div className="card_container" style={{ padding: '3rem 2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
                  <div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--brand--black)' }}>Premium Plan</div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--brand--black)', letterSpacing: '-0.02em', lineHeight: 1 }}>${isYearly ? '90.00' : '9.00'}</div>
                        <div style={{ fontSize: '1rem', color: 'var(--brand--neutral-lighter)', fontStyle: 'italic', fontWeight: 500 }}>USD</div>
                     </div>
                     <p style={{ color: 'var(--brand--neutral-lighter)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                        Perfect for serious students or active job seekers, our Premium Plan gives you advanced AI tools to accelerate your placements.
                     </p>
                     
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Advanced AI Resume Analyzer
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Exclusive Templates
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Full Project Curations
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Priority Support
                        </li>
                     </ul>
                  </div>
                  <button style={{ width: '100%', padding: '1rem', borderRadius: '100px', background: 'var(--brand--color)', border: '1px solid var(--brand--color)', color: 'white', fontWeight: 600, fontSize: '1rem' }}>Get Started</button>
               </div>

               {/* Institution Plan */}
               <div className="card_container" style={{ padding: '3rem 2.5rem' }}>
                  <div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--brand--black)' }}>Institution Plan</div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--brand--black)', letterSpacing: '-0.02em', lineHeight: 1 }}>${isYearly ? '990.00' : '99.00'}</div>
                        <div style={{ fontSize: '1rem', color: 'var(--brand--neutral-lighter)', fontStyle: 'italic', fontWeight: 500 }}>USD</div>
                     </div>
                     <p style={{ color: 'var(--brand--neutral-lighter)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                        Tailored for universities and large bootcamps, this plan offers bulk analysis, dashboards, and advanced scaleability.
                     </p>
                     
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Everything in Premium
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           College Placements Dashboard
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Bulk Resume Analysis
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--brand--black)', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
                           <div style={{ width: '22px', height: '22px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </div>
                           Dedicated Success Manager
                        </li>
                     </ul>
                  </div>
                  <button style={{ width: '100%', padding: '1rem', borderRadius: '100px', background: 'var(--brand--white)', border: '1px solid var(--brand--color)', color: 'var(--brand--color)', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s' }}>Contact Sales</button>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Value Section */}
      <section className="section-padding">
         <div className="container text-center mb-12">
            <h2 className="text-h2">Maximizing the Value of Your <span style={{ color: 'var(--brand--color)' }}>Time</span></h2>
         </div>
         <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
               <div className="card_container" style={{ padding: '1rem' }}>
                  <div style={{ height: '160px', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
                    <div style={{ position: 'absolute', width: '110px', height: '110px', borderRadius: '100px', border: '6px solid var(--brand--blue-50)', borderTopColor: 'var(--brand--color)', borderRightColor: 'var(--brand--color)', transform: 'rotate(45deg)' }}></div>
                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                       <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand--black)' }}>85%</div>
                       <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand--color)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Match</div>
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Resume Gap Analysis</h4>
                  <p className="text-small" style={{ color: 'var(--brand--neutral-lighter)' }}>Find exactly what skills your resume is missing for your dream role.</p>
               </div>
               <div className="card_container" style={{ padding: '1rem' }}>
                  <div style={{ height: '160px', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', padding: '1rem', gap: '0.5rem', border: '1px solid #e2e8f0', overflow: 'hidden', boxSizing: 'border-box' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                       <div style={{ width: '20px', height: '20px', background: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100px', fontSize: '0.6rem', fontWeight: 800, flexShrink: 0 }}>#1</div>
                       <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand--black)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>AWS Cloud Cert</div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                       <div style={{ width: '20px', height: '20px', background: '#94a3b8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100px', fontSize: '0.6rem', fontWeight: 800, flexShrink: 0 }}>#2</div>
                       <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand--black)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Meta React Cert</div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                       <div style={{ width: '20px', height: '20px', background: '#b45309', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100px', fontSize: '0.6rem', fontWeight: 800, flexShrink: 0 }}>#3</div>
                       <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand--black)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Google UX Design</div>
                     </div>
                  </div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Ranked Certifications</h4>
                  <p className="text-small" style={{ color: 'var(--brand--neutral-lighter)' }}>Stop doing random courses. We rank the best free ones by issuer credibility.</p>
               </div>
               <div className="card_container" style={{ padding: '1rem' }}>
                  <div style={{ height: '160px', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', padding: '1rem', gap: '0.5rem', border: '1px solid #e2e8f0', overflow: 'hidden', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'white', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '0.5rem', background: 'var(--brand--blue-50)', color: 'var(--brand--color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand--black)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>HackMIT 2024</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--brand--color)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Closes Today</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'white', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '0.5rem', background: 'var(--brand--blue-50)', color: 'var(--brand--color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand--black)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Google SWE Intern</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--brand--neutral-lighter)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>New posting</div>
                      </div>
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Daily Digest</h4>
                  <p className="text-small" style={{ color: 'var(--brand--neutral-lighter)' }}>Never miss a hackathon or internship deadline again with our live feed.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="section-padding">
        <div className="container">
           <div style={{ background: 'var(--brand--blue-50)', borderRadius: '2rem', padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>
              <div style={{ flex: 1 }}>
                 <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Ready to Transform Your <span style={{ color: 'var(--brand--color)' }}>Career?</span></h2>
                 <p className="text-large" style={{ marginBottom: '2.5rem', color: 'var(--brand--neutral-lighter)' }}>Join hundreds of students preparing for placements with SkillShell.</p>
                 <Link to="/signup" className="button">Start Your Journey</Link>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                 <div className="card_container large" style={{ width: '100%', maxWidth: '400px', height: '300px', boxShadow: 'var(--shadow-elevated)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                       <div style={{ width: '56px', height: '56px', borderRadius: '100px', background: 'var(--brand--color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700 }}>JD</div>
                       <div>
                         <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--brand--black)' }}>John Doe</div>
                         <div style={{ fontSize: '0.95rem', color: 'var(--brand--neutral-lighter)' }}>Frontend Developer</div>
                       </div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', marginBottom: 'auto' }}>
                       <div style={{ fontSize: '0.85rem', color: 'var(--brand--neutral-lighter)', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Application Status</div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                         <div style={{ width: '16px', height: '16px', borderRadius: '100px', background: '#2ecc71', boxShadow: '0 0 10px rgba(46,204,113,0.5)' }}></div>
                         <div style={{ fontWeight: 800, color: 'var(--brand--black)', fontSize: '1.25rem' }}>Offer Received 🎉</div>
                       </div>
                    </div>
                    <button style={{ width: '100%', padding: '1rem', borderRadius: '100px', background: 'var(--brand--blue-50)', color: 'var(--brand--color)', fontWeight: 700, border: 'none', marginTop: '1.5rem' }}>View Offer Details</button>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
