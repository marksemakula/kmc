import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Referral from './pages/Referral';
import Careers from './pages/Careers';
import AdminPanel from './pages/AdminPanel';
import Telemedicine from './pages/Telemedicine';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/telemedicine" element={<Telemedicine />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}