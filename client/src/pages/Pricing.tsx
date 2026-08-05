import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const PLANS = {
  monthly: { 
     starter: { price: '$0', period: '/month', title: 'Starter', desc: 'Everything you need to get started on your career journey.' }, 
     pro: { price: '$49', period: '/month', title: 'Pro', desc: 'The full platform — AI tools, exclusive resources, and everything to hit your next role faster.' },
     enterprise: { price: '$99', period: '/month', title: 'Enterprise', desc: 'Advanced features and priority support for large teams and enterprises.' }
  },
  annual:  { 
     starter: { price: '$0', period: '/month', title: 'Starter', desc: 'Everything you need to get started on your career journey.' }, 
     pro: { price: '$499', period: '/year', title: 'Pro', desc: 'The full platform — AI tools, exclusive resources, and everything to hit your next role faster.' },
     enterprise: { price: '$999', period: '/year', title: 'Enterprise', desc: 'Advanced features and priority support for large teams and enterprises.' }
  },
};

const STARTER_FEATURES   = ['Browse top certifications', 'Standard resume viewer', 'Free resources library', 'Daily digest access'];
const PRO_FEATURES = [
  'Everything in Starter',
  'Unlimited AI Resume Analysis',
  'Skill Gap Dashboard',
  'Exclusive Resources Library',
  'Premium Certifications Access',
];
const ENTERPRISE_FEATURES = [
  'Everything in Pro',
  'Dedicated Account Manager',
  'Custom AI Models',
  'SAML SSO Integration',
  '24/7 Phone Support',
];

const Pricing = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading]   = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq]   = useState<number | null>(null);

  const handleUpgrade = async () => {
    if (!user) { navigate('/login'); return; }
    if (user.subscriptionStatus === 'premium') { alert('You are already a premium member!'); return; }

    try {
      setLoading(true);
      const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/subscriptions/create-order`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const { orderId, amount, currency } = orderRes.data;
      const options = {
        key: 'test_key', amount, currency,
        name: 'AutomatePro', description: 'Premium Subscription',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            await axios.post(`${import.meta.env.VITE_API_URL}/subscriptions/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }, { headers: { Authorization: `Bearer ${user.token}` } });
            login({ ...user, subscriptionStatus: 'premium' });
            navigate('/resources/exclusive');
          } catch { alert('Payment verification failed.'); }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: '#1C78FF' }, // Appe.io primary blue
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch { alert('Error initiating payment. Please try again.'); }
    finally { setLoading(false); }
  };

  const plan = isAnnual ? PLANS.annual : PLANS.monthly;

  const faqs = [
    { q: 'Can I cancel anytime?', a: 'Yes — cancel from your account settings at any time. No questions asked.' },
    { q: 'What payment methods are accepted?', a: 'We accept all major cards, UPI, and net banking via Razorpay.' },
    { q: 'Is there a student discount?', a: 'Reach out to our team with a valid student ID and we\'ll sort you out.' },
    { q: 'How does the AI Analyzer work?', a: 'Upload your resume (PDF). Our model compares it against your target role\'s job description corpus and returns a match score plus a prioritised keyword gap list.' },
  ];

  return (
    <div style={{ background: 'var(--brand--white)', minHeight: '100vh' }}>
      <PageHero
        overline="Pricing"
        title="Simple, transparent pricing"
        description="Start free. Upgrade when you're ready. No hidden fees."
      >
        {/* Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '100px', backdropFilter: 'blur(10px)' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: !isAnnual ? 'var(--brand--white)' : 'rgba(255,255,255,0.6)', cursor: 'pointer' }} onClick={() => setIsAnnual(false)}>Monthly</span>
          <div
            onClick={() => setIsAnnual(!isAnnual)}
            style={{
              width: 48, height: 26,
              background: isAnnual ? 'var(--brand--white)' : 'rgba(255,255,255,0.3)',
              borderRadius: 50, position: 'relative', cursor: 'pointer', transition: 'background 0.3s',
            }}
          >
            <div style={{
              position: 'absolute', top: 2, left: 3, width: 22, height: 22,
              background: isAnnual ? 'var(--brand--color)' : 'var(--brand--white)', borderRadius: '50%', transition: 'transform 0.3s',
              transform: isAnnual ? 'translateX(20px)' : 'translateX(0)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
            }} />
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: isAnnual ? 'var(--brand--white)' : 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsAnnual(true)}>
            Yearly <span style={{ background: 'var(--brand--white)', color: 'var(--brand--dark-blue)', padding: '2px 8px', borderRadius: '100px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Save 20%</span>
          </span>
        </div>
      </PageHero>

      {/* Plans */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>

            {/* Starter */}
            <div className="card_container anim-fade-up" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', border: '1px solid var(--brand--blue-100)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand--black)', marginBottom: '0.5rem' }}>{plan.starter.title}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--brand--black)', lineHeight: 1 }}>{plan.starter.price}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--brand--neutral-lighter)', fontWeight: 500 }}>{plan.starter.period}</span>
              </div>
              <p className="text-body" style={{ marginBottom: '2rem', color: 'var(--brand--neutral-lighter)' }}>{plan.starter.desc}</p>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', flex: 1 }}>
                {STARTER_FEATURES.map(f => (
                  <li key={f} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.875rem', color: 'var(--brand--black)', fontWeight: 500 }}>
                    <CheckCircle2 size={18} color="var(--brand--color)" />
                    {f}
                  </li>
                ))}
              </ul>

              {user ? (
                <button className="button is-outline" style={{ width: '100%', opacity: 0.5, cursor: 'not-allowed' }} disabled>Current plan</button>
              ) : (
                <Link to="/signup" className="button is-outline" style={{ width: '100%' }}>Get started free</Link>
              )}
            </div>

            {/* Pro (Featured) */}
            <div className="card_container anim-fade-up" style={{ 
               animationDelay: '0.1s', 
               border: '2px solid var(--brand--color)', 
               boxShadow: '0 20px 40px rgba(2, 78, 212, 0.15)',
               padding: '3rem 2rem',
               position: 'relative',
               background: 'var(--brand--blue-50)',
               display: 'flex', flexDirection: 'column'
            }}>
              <span style={{ 
                 position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                 background: 'var(--brand--color)', color: 'var(--brand--white)',
                 padding: '4px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
              }}>Most Popular</span>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand--color)', marginBottom: '0.5rem' }}>{plan.pro.title}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--brand--black)', lineHeight: 1 }}>{plan.pro.price}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--brand--neutral-lighter)', fontWeight: 500 }}>{plan.pro.period}</span>
              </div>
              <p className="text-body" style={{ marginBottom: '2rem', color: 'var(--brand--neutral-lighter)' }}>{plan.pro.desc}</p>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', flex: 1 }}>
                {PRO_FEATURES.map(f => (
                  <li key={f} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.875rem', color: 'var(--brand--black)', fontWeight: 500 }}>
                    <CheckCircle2 size={18} color="var(--brand--color)" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpgrade}
                disabled={loading || user?.subscriptionStatus === 'premium'}
                className="button"
                style={{ width: '100%', opacity: (loading || user?.subscriptionStatus === 'premium') ? 0.7 : 1, border: 'none' }}
              >
                {user?.subscriptionStatus === 'premium' ? 'Already subscribed ✓' : loading ? 'Processing...' : 'Upgrade now'}
              </button>
            </div>

            {/* Enterprise */}
            <div className="card_container anim-fade-up" style={{ animationDelay: '0.2s', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', border: '1px solid var(--brand--blue-100)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand--black)', marginBottom: '0.5rem' }}>{plan.enterprise.title}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--brand--black)', lineHeight: 1 }}>{plan.enterprise.price}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--brand--neutral-lighter)', fontWeight: 500 }}>{plan.enterprise.period}</span>
              </div>
              <p className="text-body" style={{ marginBottom: '2rem', color: 'var(--brand--neutral-lighter)' }}>{plan.enterprise.desc}</p>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', flex: 1 }}>
                {ENTERPRISE_FEATURES.map(f => (
                  <li key={f} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.875rem', color: 'var(--brand--black)', fontWeight: 500 }}>
                    <CheckCircle2 size={18} color="var(--brand--color)" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="button is-outline" style={{ width: '100%' }}>Contact Sales</button>
            </div>

          </div>

          {/* FAQ */}
          <div style={{ maxWidth: 680, margin: '6rem auto 0' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--brand--black)', marginBottom: '2.5rem', textAlign: 'center', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
            <div style={{ borderTop: '1px solid var(--brand--blue-100)' }}>
               {faqs.map((faq, i) => (
                 <div key={i} style={{ borderBottom: '1px solid var(--brand--blue-100)' }}>
                   <button
                     onClick={() => setOpenFaq(openFaq === i ? null : i)}
                     style={{
                       display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                       width: '100%', background: 'none', border: 'none', padding: '1.5rem 0',
                       fontSize: '1.125rem', fontWeight: 600,
                       color: 'var(--brand--black)', textAlign: 'left', cursor: 'pointer',
                     }}
                   >
                     {faq.q}
                     {openFaq === i ? <ChevronUp color="var(--brand--color)" /> : <ChevronDown color="var(--brand--color)" />}
                   </button>
                   {openFaq === i && (
                     <div style={{ padding: '0 0 1.5rem', fontSize: '1rem', color: 'var(--brand--neutral-lighter)', lineHeight: 1.7 }}>
                       {faq.a}
                     </div>
                   )}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
