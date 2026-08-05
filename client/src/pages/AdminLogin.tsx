import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, formData);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid admin credentials.');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card anim-fade-up">
        {/* Logo lockup */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#F87171', fontSize: 24 }}>
            🔒
          </div>
          <h1 className="heading-card" style={{ marginBottom: '8px' }}>
            Admin Portal
          </h1>
          <p className="body-text" style={{ fontSize: 14 }}>
            Restricted access — administrators only.
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '12px 16px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#F87171', margin: 0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Admin email</label>
            <input
              type="email"
              className="form-input"
              placeholder="admin@automatepro.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 8, background: '#EF4444' }}>
            Access Admin Panel
          </button>
        </form>

        <p className="body-text" style={{ textAlign: 'center', marginTop: 28, fontSize: 14 }}>
          <Link to="/login" style={{ color: 'var(--text-color--tertiary)', fontWeight: 500, textDecoration: 'none' }}>← Back to regular login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
