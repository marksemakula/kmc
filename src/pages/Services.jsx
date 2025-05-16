import { motion } from 'framer-motion';
import { FaStethoscope, FaHeartbeat, FaUserMd, FaHospital, FaAmbulance, FaFlask } from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      icon: <FaHeartbeat />,
      title: "Cardiology",
      description: "Comprehensive heart care and cardiovascular treatments"
    },
    {
      icon: <FaStethoscope />,
      title: "General Medicine",
      description: "Primary healthcare services and general medical consultations"
    },
    {
      icon: <FaUserMd />,
      title: "Specialized Care",
      description: "Expert specialists providing focused medical attention"
    },
    {
      icon: <FaHospital />,
      title: "Emergency Services",
      description: "24/7 emergency medical care and critical support"
    },
    {
      icon: <FaAmbulance />,
      title: "Ambulance",
      description: "Quick response emergency medical transportation"
    },
    {
      icon: <FaFlask />,
      title: "Laboratory",
      description: "Advanced diagnostic and testing facilities"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Providing comprehensive healthcare solutions with state-of-the-art facilities
          and experienced medical professionals.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-primary text-4xl mb-4">
              {service.icon}
            </div>
            <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 text-primary hover:text-primary-dark font-semibold"
            >
              Learn More →
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 bg-primary text-white rounded-lg p-8 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Need Emergency Care?</h2>
        <p className="text-xl mb-6">Our emergency department is available 24/7</p>
        <div className="text-4xl font-bold text-accent">+256 789 123 456</div>
      </motion.div>
    </div>
  );
}