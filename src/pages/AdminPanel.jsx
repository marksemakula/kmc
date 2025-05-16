import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCog, FaUserMd, FaBriefcase, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import HRManagement from '../components/admin/HRManagement';
import DoctorManagement from '../components/admin/DoctorManagement';
import ScheduleManagement from '../components/admin/ScheduleManagement';
import Analytics from '../components/admin/Analytics';
import Settings from '../components/admin/Settings';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('doctors');

  const tabContent = {
    doctors: <DoctorManagement />,
    hr: <HRManagement />,
    schedule: <ScheduleManagement />,
    analytics: <Analytics />,
    settings: <Settings />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold text-primary mb-6">Admin Dashboard</h2>
            <nav className="space-y-2">
              {[
                { id: 'doctors', label: 'Doctors', icon: FaUserMd },
                { id: 'hr', label: 'HR Management', icon: FaBriefcase },
                { id: 'schedule', label: 'Schedule', icon: FaCalendarAlt },
                { id: 'analytics', label: 'Analytics', icon: FaChartLine },
                { id: 'settings', label: 'Settings', icon: FaCog }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            {tabContent[activeTab]}
          </motion.div>
        </div>
      </div>
    </div>
  );
}