import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ContactInfo {
  icon: JSX.Element;
  text: string;
  type: 'phone' | 'email' | 'address';
}

interface QuickLink {
  path: string;
  label: string;
}

interface SocialLink {
  icon: JSX.Element;
  url: string;
  label: string;
}

const quickLinks: QuickLink[] = [
  { path: '/services', label: 'Services' },
  { path: '/blog', label: 'Blog' },
  { path: '/referral', label: 'Referral' },
  { path: '/careers', label: 'Careers' },
];

const contactInfo: ContactInfo[] = [
  { icon: <FaPhone className="text-accent" size={16} />, text: '+256 700 251 453', type: 'phone' },
  { icon: <FaEnvelope className="text-accent" size={16} />, text: 'service@keyawell.or.ug', type: 'email' },
  { icon: <FaMapMarkerAlt className="text-accent mt-1" size={16} />, text: 'Uganda', type: 'address' },
];

const socialLinks: SocialLink[] = [
  { icon: <FaFacebook size={20} />, url: '#', label: 'Facebook' },
  { icon: <FaTwitter size={20} />, url: '#', label: 'Twitter' },
  { icon: <FaInstagram size={20} />, url: '#', label: 'Instagram' },
  { icon: <FaLinkedin size={20} />, url: '#', label: 'LinkedIn' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              className="space-y-4 flex flex-col items-center text-center md:items-start md:text-left"
              variants={itemVariants}
            >
              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="/images/navbar-logo.png"
                  alt="Keyawell Logo"
                  className="h-[140px] w-auto brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/fallback-logo.png';
                  }}
                />
              </motion.div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Providing comprehensive healthcare services.
              </p>
              <div className="flex justify-center space-x-4 md:justify-start">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    className="text-gray-300 hover:text-accent transition-colors duration-300"
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="space-y-4 text-center md:text-left"
              variants={itemVariants}
            >
              <h3 className="font-semibold text-lg">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-accent transition-all duration-300 text-sm inline-block hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-4 text-center md:text-left"
              variants={itemVariants}
            >
              <h3 className="font-semibold text-lg">Contact Info</h3>
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.text}
                    className={`flex ${
                      contact.type === 'address' ? 'items-start' : 'items-center'
                    } justify-center space-x-3 md:justify-start`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    {contact.icon}
                    <span className="text-gray-300 text-sm">{contact.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Emergency Section */}
            <motion.div
              className="space-y-4 text-center md:text-left"
              variants={itemVariants}
            >
              <h3 className="font-semibold text-lg">Emergency</h3>
              <motion.p
                className="text-2xl font-bold text-accent"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                +256 784 628 883
              </motion.p>
              <p className="text-gray-300 text-sm mt-2">Available 24/7 for emergencies</p>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
            variants={itemVariants}
          >
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Keyawell Medical Center | All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0 flex-wrap justify-center">
              <Link
                to="#"
                className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm">Powered by</span>
                <a href="https://www.inzozi.co" target="_blank" rel="noopener noreferrer">
                  <motion.img
                    src="/images/inzozi-logo.png"
                    alt="Inzozi Logo"
                    className="h-11 w-auto brightness-0 invert"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML =
                          '<span class="text-accent font-medium">Inzozi</span>';
                      }
                    }}
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
