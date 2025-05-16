import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updateSlot, resetSlots } from '../../store/slices/scheduleSlice';
import { FaSync } from 'react-icons/fa';

export default function ScheduleManagement() {
  const dispatch = useDispatch();
  const slots = useSelector(state => state.schedule.slots);
  const doctors = useSelector(state => state.telemedicine.doctors);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleSlotUpdate = (slotId, doctorId) => {
    dispatch(updateSlot({
      id: slotId,
      doctorId,
      available: !!doctorId
    }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all slots to default?')) {
      dispatch(resetSlots());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Schedule Management</h2>
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
        >
          <FaSync />
          <span>Reset Schedule</span>
        </button>
      </div>

      <div className="flex space-x-2 mb-6">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg ${
              selectedDay === day
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {slots
          .filter(slot => slot.day === selectedDay)
          .map(slot => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{slot.time}</span>
                <select
                  value={slot.doctorId || ''}
                  onChange={(e) => handleSlotUpdate(slot.id, e.target.value || null)}
                  className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Available</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}