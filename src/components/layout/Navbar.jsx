import { Link } from 'react-router-dom';
import { FaHospital, FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-primary text-white transition-shadow duration-300 ${
      hasScrolled ? 'shadow-xl' : 'shadow-lg'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaHospital className="text-2xl" />
            <span className="font-display text-xl font-bold">Keyawell Medical Center</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-accent transition-colors duration-200">Home</Link>
            <Link to="/services" className="hover:text-accent transition-colors duration-200">Services</Link>
            <Link to="/blog" className="hover:text-accent transition-colors duration-200">Blog</Link>
            <Link to="/referral" className="hover:text-accent transition-colors duration-200">Referral</Link>
            <Link to="/careers" className="hover:text-accent transition-colors duration-200">Careers</Link>
          </div>

          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link 
              to="/" 
              className="block py-2 px-4 hover:bg-primary-dark rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="block py-2 px-4 hover:bg-primary-dark rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className="block py-2 px-4 hover:bg-primary-dark rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/referral" 
              className="block py-2 px-4 hover:bg-primary-dark rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Referral
            </Link>
            <Link 
              to="/careers" 
              className="block py-2 px-4 hover:bg-primary-dark rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Careers
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}