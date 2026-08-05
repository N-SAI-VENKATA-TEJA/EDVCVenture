import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface DigestItem {
  _id?: string;
  title: string;
  type: string;
  description: string;
  place: string;
  eventDateTime: string;
  deadline: string;
  link: string;
}

const AdminDigest = () => {
  const [items, setItems] = useState<DigestItem[]>([]);
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<DigestItem>({
    title: '', type: 'hackathon', description: '', place: '', eventDateTime: '', deadline: '', link: ''
  });

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/digest`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/digest`, formData, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setFormData({ title: '', type: 'hackathon', description: '', place: '', eventDateTime: '', deadline: '', link: '' });
      fetchItems();
    } catch (err) {
      alert('Error saving item');
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Are you sure?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/digest/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      fetchItems();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  return (
    <div className="section-warm" style={{ flex: '1', padding: '48px 0' }}>
      <div className="container" style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div style={{ flex: '1' }}>
          <h2 className="heading-section mb-6" style={{ textAlign: 'left', fontSize: '24px' }}>Manage Digest Items</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map(item => (
              <div key={item._id} className="feature-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 className="heading-card" style={{ fontSize: '18px', marginBottom: '4px' }}>{item.title}</h4>
                  <p className="body-text" style={{ fontSize: '14px' }}>{item.type} | {new Date(item.eventDateTime).toLocaleDateString()}</p>
                </div>
                <button onClick={() => handleDelete(item._id!)} className="btn-ghost" style={{ color: 'var(--color-error)' }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="feature-card" style={{ width: '33%', minWidth: '320px', padding: '32px' }}>
          <h3 className="heading-card mb-6" style={{ fontSize: '20px' }}>Add New Item</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="text" placeholder="Title" required className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <select className="form-input" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236B7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 18px center', backgroundSize: '16px', appearance: 'none' }}
            >
              <option value="hackathon">Hackathon</option>
              <option value="certification">Certification</option>
              <option value="internship">Internship</option>
              <option value="session">Session</option>
              <option value="deadline">Deadline</option>
            </select>
            <textarea placeholder="Description" required className="form-input" style={{ minHeight: '120px' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            <input type="text" placeholder="Place (or Online)" required className="form-input" value={formData.place} onChange={e => setFormData({...formData, place: e.target.value})} />
            <div>
              <label className="form-label" style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>Event Date/Time</label>
              <input type="datetime-local" required className="form-input" value={formData.eventDateTime} onChange={e => setFormData({...formData, eventDateTime: e.target.value})} />
            </div>
            <div>
              <label className="form-label" style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>Deadline (Optional)</label>
              <input type="datetime-local" className="form-input" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} />
            </div>
            <input type="url" placeholder="Link (URL)" required className="form-input" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            <button type="submit" className="btn-primary mt-4" style={{ width: '100%' }}>Save Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDigest;
