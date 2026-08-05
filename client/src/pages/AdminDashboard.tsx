import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="section-warm" style={{ flex: '1', padding: '48px 0' }}>
      <div className="container">
        <div className="feature-card mb-8">
          <h1 className="heading-section" style={{ textAlign: 'left', fontSize: '24px', marginBottom: '8px' }}>Admin Control Panel</h1>
          <p className="body-text">Logged in as {user?.email}</p>
        </div>
        
        <div className="grid-3">
          <div className="feature-card">
            <h3 className="heading-card mb-2" style={{ fontSize: '18px' }}>Digest Items</h3>
            <p className="heading-hero" style={{ fontSize: '36px', marginBottom: '16px' }}>0</p>
            <button className="btn-ghost" style={{ padding: 0 }}>Manage Digest &rarr;</button>
          </div>
          <div className="feature-card">
            <h3 className="heading-card mb-2" style={{ fontSize: '18px' }}>Certifications</h3>
            <p className="heading-hero" style={{ fontSize: '36px' }}>56</p>
          </div>
          <div className="feature-card">
            <h3 className="heading-card mb-2" style={{ fontSize: '18px' }}>Users</h3>
            <p className="heading-hero" style={{ fontSize: '36px' }}>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
