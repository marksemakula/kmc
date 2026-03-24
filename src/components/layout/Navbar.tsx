import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  path: string;
  label: string;
}

const navLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/blog', label: 'Blog' },
  { path: '/referral', label: 'Referral' },
  { path: '/careers', label: 'Careers' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navbarVariants = {
    top: { 
      backgroundColor: 'rgba(0, 85, 164, 1)',
      backdropFilter: 'blur(8px)',
      boxShadow: isHomePage ? '0 0 0 0 rgba(0, 0, 0, 0)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    scrolled: { 
      backgroundColor: 'rgba(0, 85, 164, 1)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      x: -20,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const isActiveLink = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 text-white transition-all duration-300"
      animate={hasScrolled ? 'scrolled' : 'top'}
      variants={navbarVariants}
      initial="top"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.img
              src="/images/Keyawell.png"
              alt="Keyawell Logo"
              className="h-6 w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/Keyawell.png';
              }}
            />
            <motion.span
              className="font-display text-xl font-bold group-hover:text-accent transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            >
              Keyawell Medical Center
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-1 list-none m-0 p-0" role="list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="relative px-4 py-2 rounded-lg transition-colors duration-300 block"
                  aria-current={isActiveLink(link.path) ? 'page' : undefined}
                >
                  <motion.span
                    className={`relative z-10 ${
                      isActiveLink(link.path)
                        ? 'text-accent font-semibold'
                        : 'text-white hover:text-accent'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                  </motion.span>
                  {isActiveLink(link.path) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      layoutId="activeLink"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-primary-dark transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes className="text-2xl" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars className="text-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <ul className="pb-4 space-y-1 list-none m-0 p-0" role="list">
                {navLinks.map((link) => (
                  <motion.li key={link.path} variants={menuItemVariants}>
                    <Link
                      to={link.path}
                      className={`block py-3 px-4 rounded-lg transition-all duration-200 ${
                        isActiveLink(link.path)
                          ? 'bg-accent text-primary font-semibold'
                          : 'hover:bg-primary-dark hover:pl-6'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActiveLink(link.path) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
