import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const partners = [
  { id: 1, name: 'Partner 1', logo: '/images/partners/UAP.png' },
  { id: 2, name: 'Partner 2', logo: '/images/partners/Liberty.jpg' },
  { id: 3, name: 'Partner 3', logo: '/images/partners/Jubilee.png' },
  { id: 4, name: 'Partner 4', logo: '/images/partners/IAA.png' },
  { id: 5, name: 'Partner 5', logo: '/images/partners/AAR.png' },
];

export default function PartnersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const itemsPerSlide = 3; // Number of partners to show at once

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === 1) {
          return prevIndex >= partners.length - itemsPerSlide ? 0 : prevIndex + 1;
        } else {
          return prevIndex === 0 ? partners.length - itemsPerSlide : prevIndex - 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [direction, partners.length, itemsPerSlide]);

  const visiblePartners = [];
  for (let i = 0; i < itemsPerSlide; i++) {
    const index = (currentIndex + i) % partners.length;
    visiblePartners.push(partners[index]);
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary-dark">Our Partners</h2>
        
        <div className="flex justify-center space-x-8">
          {visiblePartners.map((partner) => (
            <motion.div
              key={partner.id}
              className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center h-32 w-64"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: partners.length - itemsPerSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Link 
            to="/partner-form" // Update this to your actual form route
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition font-medium"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}