import { motion } from 'framer-motion';
import PartnersCarousel from '../components/PartnersCarousel';

export default function Home() {
  return (
    <div>
      {/* Hero Section - Combined with Navbar */}
      <section className="text-center py-20 bg-gradient-to-r from-primary to-primary-dark text-white w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <img 
            src="/images/Keyawell-Logo-1-preview.png"
            alt="Keyawell Medical Center Logo"
            className="h-64 w-auto object-contain"
          />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-display font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to Keyawell Medical Center
        </motion.h1>
        <motion.p 
          className="text-xl max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Providing exceptional healthcare services with a focus on patient well-being
        </motion.p>
      </section>

      {/* Partners Carousel Section */}
      <motion.section
        className="container mx-auto px-4 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <PartnersCarousel />
      </motion.section>
    </div>
  );
}