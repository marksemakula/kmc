import { motion } from 'framer-motion';
import { FaStethoscope, FaUserMd, FaHospital } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg">
        {/* Logo with optimized path and styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <img 
            src="/images/Keyawell-Logo-1-preview.png" // Updated to public-relative path
            alt="Keyawell Medical Center Logo"
            className="h-56 w-auto object-contain" // Adjusted size and added object-contain
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
          className="text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Providing exceptional healthcare services with a focus on patient well-being
        </motion.p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <FaStethoscope className="text-4xl" />,
            title: "Expert Care",
            description: "Experienced medical professionals dedicated to your health"
          },
          {
            icon: <FaUserMd className="text-4xl" />,
            title: "Specialized Services",
            description: "Comprehensive medical services tailored to your needs"
          },
          {
            icon: <FaHospital className="text-4xl" />,
            title: "Modern Facilities",
            description: "State-of-the-art medical equipment and comfortable environment"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          >
            <div className="text-primary mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}