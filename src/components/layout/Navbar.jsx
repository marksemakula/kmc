import { Link } from 'react-router-dom';
import { FaHospital, FaBars } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaHospital className="text-2xl" />
            <span className="font-display text-xl font-bold">Keyawell Medical</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-accent">Home</Link>
            <Link to="/services" className="hover:text-accent">Services</Link>
            <Link to="/referral" className="hover:text-accent">Referral</Link>
            <Link to="/careers" className="hover:text-accent">Careers</Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 hover:text-accent">Home</Link>
            <Link to="/services" className="block py-2 hover:text-accent">Services</Link>
            <Link to="/referral" className="block py-2 hover:text-accent">Referral</Link>
            <Link to="/careers" className="block py-2 hover:text-accent">Careers</Link>
          </div>
        )}
      </div>
    </nav>
  );
}