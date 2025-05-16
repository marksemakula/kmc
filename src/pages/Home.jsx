import { motion } from 'framer-motion';
import { FaStethoscope, FaUserMd, FaHospital } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg">
        <motion.h1 
          className="text-4xl md:text-5xl font-display font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Keyawell Medical Center
        </motion.h1>
        <p className="text-xl max-w-2xl mx-auto">
          Providing exceptional healthcare services with a focus on patient well-being
        </p>
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
            className="p-6 bg-white rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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