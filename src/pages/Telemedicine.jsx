import { useState } from 'react';
import { motion } from 'framer-motion';
import DoctorList from '../components/telemedicine/DoctorList';
import ChatInterface from '../components/telemedicine/ChatInterface';

export default function Telemedicine() {
  const [isConnecting, setIsConnecting] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Telemedicine Consultation
        </h1>

        {isConnecting ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg">Connecting to doctor...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
            </div>
          </motion.div>
        ) : null}

        <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          <DoctorList setIsConnecting={setIsConnecting} />
          <div className="md:col-span-2">
            <ChatInterface />
          </div>
        </div>
      </motion.div>
    </div>
  );
}