import { motion } from 'framer-motion';
import PartnersCarousel from '../components/PartnersCarousel';

export default function Home() {
  return (
    <div>
      {/* Hero Section - Combined with Navbar */}
      <section className="py-12 bg-gradient-to-r from-primary to-primary-dark text-white w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text Content - Left Side */}
            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-display font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="font-brush text-3xl md:text-4xl" style={{ color: '#FF00FF' }}>Welcome to</span>{' '}
                <span className="font-cinzel font-light">Keyawell Medical Center</span>
              </motion.h1>
              <motion.p 
                className="text-xl max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Exceptional healthcare services with a focus on patient well-being
              </motion.p>
            </motion.div>

            {/* Logo - Right Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="flex-shrink-0"
            >
              <img 
                src="/images/Keyawell-Logo-1-preview.png"
                alt="Keyawell Medical Center Logo"
                className="h-72 w-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Bottom fade gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(0, 85, 164, 0) 0%, rgba(243, 244, 246, 0.3) 40%, rgba(243, 244, 246, 0.7) 70%, rgb(243, 244, 246) 100%)'
        }} />
      </section>

      {/* Partners Carousel Section */}
      <motion.section
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <PartnersCarousel />
      </motion.section>
    </div>
  );
}