import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const partners = [
  { id: 1, name: 'UAP Insurance', logo: '/images/partners/UAP.png' },
  { id: 2, name: 'Liberty Insurance', logo: '/images/partners/Liberty.jpg' },
  { id: 3, name: 'Jubilee Insurance', logo: '/images/partners/Jubilee.png' },
  { id: 4, name: 'IAA Healthcare', logo: '/images/partners/IAA.png' },
  { id: 5, name: 'AAR Healthcare', logo: '/images/partners/AAR.png' },
];

export default function PartnersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= partners.length - itemsPerSlide ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [partners.length, itemsPerSlide]);

  const visiblePartners = partners.slice(currentIndex, currentIndex + itemsPerSlide);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary-dark">Our Trusted Partners</h2>
        
        <div className="flex justify-center space-x-8">
          {visiblePartners.map((partner) => (
            <motion.div
              key={partner.id}
              className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center h-32 w-64"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link 
            to="/become-a-partner"
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300 flex items-center"
          >
            <span>Partner With Us</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}