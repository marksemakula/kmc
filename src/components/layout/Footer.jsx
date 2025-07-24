import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Logo Only */}
          <div className="space-y-4">
            <div className="flex justify-start">
              <img
                src="/images/navbar-logo.png" 
                alt="Keyawell Logo"
                className="h-[140px] w-auto brightness-0 invert"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/fallback-logo.png';
                }}
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Providing comprehensive healthcare services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/referral" className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm">
                  Referral
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-accent" size={16} />
                <span className="text-gray-300 text-sm">+256 700 251 453</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-accent" size={16} />
                <span className="text-gray-300 text-sm">service@keyawell.or.ug</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-accent mt-1" size={16} />
                <span className="text-gray-300 text-sm">
                  Uganda
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Emergency</h3>
            <p className="text-2xl font-bold text-accent">+256 784 628 883</p>
            <p className="text-gray-300 text-sm mt-2">Available 24/7 for emergencies</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Keyawell Medical Center | All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm">
              Terms of Service
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300 text-sm">Powered by</span>
              <a href="https://www.inzozi.co" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/images/inzozi-logo.png" 
                  alt="Inzozi Logo" 
                  className="h-9 w-auto brightness-0 invert" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentNode.innerHTML = '<span className="text-accent font-medium">Inzozi</span>';
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}