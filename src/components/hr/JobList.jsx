import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaClock } from 'react-icons/fa';

export default function JobList({ positions, onJobSelect }) {
  return (
    <div className="space-y-6">
      {positions.map((position, index) => (
        <motion.div
          key={position.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-primary mb-2">{position.title}</h2>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600">
                  <FaBriefcase className="mr-2" />
                  {position.department}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaBuilding className="mr-2" />
                  Keyawell Medical Center
                </p>
                <p className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  Full Time
                </p>
              </div>
            </div>
            <button
              onClick={() => onJobSelect(position)}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Apply Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}