import { motion } from 'framer-motion';
import {
  FaUserMd, FaHospital, FaBed, FaFlask, FaSearchPlus,
  FaChild, FaHeart, FaFemale, FaTooth, FaBone,
  FaSyringe, FaAmbulance, FaHeartbeat, FaMicroscope, FaPills
} from 'react-icons/fa';
import Breadcrumb from '../components/layout/Breadcrumb';

const services = [
  {
    icon: <FaUserMd />,
    title: "Plastic Surgery",
    description: "Reconstructive and cosmetic surgical procedures to restore function, correct deformities, and improve appearance.",
    image: "https://images.pexels.com/photos/18418535/pexels-photo-18418535.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaHospital />,
    title: "General Surgery",
    description: "Comprehensive abdominal, vascular, and soft-tissue surgical procedures performed by experienced surgeons.",
    image: "https://plus.unsplash.com/premium_photo-1661889752049-44bb9f857e67?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <FaBed />,
    title: "In-Patient / Admissions",
    description: "Round-the-clock inpatient care in comfortable, well-monitored wards with dedicated nursing support.",
    image: "https://images.pexels.com/photos/34185202/pexels-photo-34185202.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaFlask />,
    title: "Laboratory",
    description: "State-of-the-art diagnostics including haematology, biochemistry, urinalysis, and microbiology testing.",
    image: "https://images.pexels.com/photos/5452235/pexels-photo-5452235.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaSearchPlus />,
    title: "Ultrasound Scan",
    description: "Real-time diagnostic imaging for obstetric, abdominal, pelvic, and soft-tissue evaluation.",
    image: "https://images.pexels.com/photos/5452188/pexels-photo-5452188.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaChild />,
    title: "Paediatrics",
    description: "Dedicated child health services covering newborn care, growth monitoring, and childhood illness management.",
    image: "https://images.pexels.com/photos/7446989/pexels-photo-7446989.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaHeart />,
    title: "Maternity Care",
    description: "Comprehensive antenatal, intrapartum, and postnatal support for mother and baby by skilled birth attendants.",
    image: "https://images.pexels.com/photos/27103255/pexels-photo-27103255.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaFemale />,
    title: "Gynaecology",
    description: "Expert women's reproductive health services including family planning, cervical screening, and menstrual care.",
    image: "https://images.pexels.com/photos/5452195/pexels-photo-5452195.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaTooth />,
    title: "Dental",
    description: "General, restorative, and preventive dental care for patients of all ages, including extractions and fillings.",
    image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <FaBone />,
    title: "Orthopedics",
    description: "Diagnosis and treatment of bone, joint, and musculoskeletal conditions including fracture management.",
    image: "https://images.pexels.com/photos/6129203/pexels-photo-6129203.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaSyringe />,
    title: "Immunization",
    description: "Childhood and adult vaccination programmes following the Uganda National Immunisation Schedule.",
    image: "https://plus.unsplash.com/premium_photo-1668487826892-bf471b01e5ed?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <FaAmbulance />,
    title: "Accidents & Emergency",
    description: "24-hour emergency medical care, trauma stabilisation, and critical first response for all ages.",
    image: "https://images.pexels.com/photos/5452255/pexels-photo-5452255.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaHeartbeat />,
    title: "Antenatal Care",
    description: "Focused antenatal visits to monitor maternal and foetal wellbeing, screen for complications, and prepare for delivery.",
    image: "https://images.pexels.com/photos/6053233/pexels-photo-6053233.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaMicroscope />,
    title: "Research",
    description: "Evidence-based clinical research advancing healthcare delivery and treatment outcomes in Uganda.",
    image: "https://images.pexels.com/photos/5452284/pexels-photo-5452284.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
  {
    icon: <FaPills />,
    title: "Pharmacy",
    description: "Fully stocked in-house pharmacy dispensing genuine medicines with expert patient counselling.",
    image: "https://images.pexels.com/photos/30678215/pexels-photo-30678215.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max",
  },
];

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