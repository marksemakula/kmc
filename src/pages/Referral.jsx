import { useState } from 'react';
import { motion } from 'framer-motion';
import ReferralForm from '../components/referral/ReferralForm';
import { FaClipboardList, FaCalendarAlt } from 'react-icons/fa';

export default function Referral() {
  const [activeTab, setActiveTab] = useState('referral');

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Patient Referral & Booking
        </h1>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200">
            <button
              className={`flex items-center px-4 py-2 rounded-l-lg ${
                activeTab === 'referral'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('referral')}
            >
              <FaClipboardList className="mr-2" />
              Make Referral
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-r-lg ${
                activeTab === 'booking'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('booking')}
            >
              <FaCalendarAlt className="mr-2" />
              Book Appointment
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'referral' ? (
            <ReferralForm />
          ) : (
            <div className="text-center py-8">
              <h2 className="text-xl text-gray-600">
                Direct appointment booking coming soon...
              </h2>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}