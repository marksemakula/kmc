import { motion } from 'framer-motion';
import Breadcrumb from '../components/layout/Breadcrumb';
import { services } from '../data/services';

function ServiceCard({ service, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className="flex flex-col sm:flex-row rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white sm:h-52"
    >
      {/* Info half — order switches on desktop for alternating layout */}
      <div
        className={`flex flex-col justify-center p-6 sm:w-1/2 bg-primary text-white ${
          isEven ? 'sm:order-1' : 'sm:order-2'
        }`}
      >
        <div className="text-accent text-4xl mb-3">{service.icon}</div>
        <h2 className="text-xl font-bold mb-2 leading-snug">{service.title}</h2>
        <p className="text-blue-100 text-sm leading-relaxed">{service.description}</p>
      </div>

      {/* Image half */}
      <div
        className={`sm:w-1/2 h-48 sm:h-full overflow-hidden ${
          isEven ? 'sm:order-2' : 'sm:order-1'
        }`}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.style.background =
              'linear-gradient(135deg, #0055A4 0%, #28A745 100%)';
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Services', path: '/services' }]} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Providing comprehensive healthcare solutions with state-of-the-art facilities
          and experienced medical professionals.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-primary text-white rounded-2xl p-8 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Need Emergency Care?</h2>
        <p className="text-xl mb-6">Our emergency department is available 24/7</p>
        <div className="text-4xl font-bold text-accent">+256 784 628 883</div>
      </motion.div>
    </div>
  );
}