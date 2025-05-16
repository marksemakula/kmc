import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Referral from './pages/Referral';
import Careers from './pages/Careers';
import AdminPanel from './pages/AdminPanel';
import Telemedicine from './pages/Telemedicine';
import PartnerForm from './components/PartnerForm';
import FloatingChat from './components/FloatingChat';

// ScrollToTop component definition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: adds smooth scrolling
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 relative">
        <ScrollToTop />
        <Navbar />
        <main className="container mx-auto px-4 pt-16 pb-8"> {/* Added pt-16 for navbar spacing */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/telemedicine" element={<Telemedicine />} />
            <Route path="/become-a-partner" element={<PartnerForm />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Floating Chat Component - Added here to appear on all pages */}
        <FloatingChat apiKey={import.meta.env.VITE_DEEPSEEK_API_KEY} />
      </div>
    </Router>
  );
}