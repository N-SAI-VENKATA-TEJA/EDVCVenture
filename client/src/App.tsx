import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Pricing from './pages/Pricing';
import Digest from './pages/Digest';
import AdminDigest from './pages/AdminDigest';
import FreeResources from './pages/FreeResources';
import ExclusiveResources from './pages/ExclusiveResources';
import Certifications from './pages/Certifications';
import CertificationDetail from './pages/CertificationDetail';
import Resumes from './pages/Resumes';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* All public + user routes share the main Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Student protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/resources/free" element={<FreeResources />} />
            <Route path="/resources/exclusive" element={<ExclusiveResources />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/certifications/:id" element={<CertificationDetail />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/analyzer" element={<ResumeAnalyzer />} />
          </Route>
        </Route>

        {/* Admin routes — separate, no main Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/digest" element={<AdminDigest />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
