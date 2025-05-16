import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave } from 'react-icons/fa';

export default function Settings() {
  const [settings, setSettings] = useState({
    consultationDuration: 30,
    workingHours: {
      start: '09:00',
      end: '17:00'
    },
    autoResponderEnabled: true,
    notificationsEnabled: true,
    theme: 'light'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to localStorage
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    // Show success message
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Consultation Duration (minutes)
            </label>
            <input
              type="number"
              value={settings.consultationDuration}
              onChange={(e) => setSettings({
                ...settings,
                consultationDuration: parseInt(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Working Hours</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="time"
                value={settings.workingHours.start}
                onChange={(e) => setSettings({
                  ...settings,
                  workingHours: { ...settings.workingHours, start: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              <input
                type="time"
                value={settings.workingHours.end}
                onChange={(e) => setSettings({
                  ...settings,
                  workingHours: { ...settings.workingHours, end: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="autoResponder"
              checked={settings.autoResponderEnabled}
              onChange={(e) => setSettings({
                ...settings,
                autoResponderEnabled: e.target.checked
              })}
              className="rounded text-primary focus:ring-primary"
            />
            <label htmlFor="autoResponder" className="text-sm font-medium text-gray-700">
              Enable Auto Responder
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="notifications"
              checked={settings.notificationsEnabled}
              onChange={(e) => setSettings({
                ...settings,
                notificationsEnabled: e.target.checked
              })}
              className="rounded text-primary focus:ring-primary"
            />
            <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
              Enable Notifications
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <FaSave />
          <span>Save Settings</span>
        </motion.button>
      </form>
    </div>
  );
}