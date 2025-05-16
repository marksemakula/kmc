import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, startOfWeek } from 'date-fns';

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  const generateWeekDays = () => {
    const days = [];
    const start = startOfWeek(new Date());
    
    for (let i = 0; i < 7; i++) {
      const date = addDays(start, i);
      days.push({
        date,
        formatted: format(date, 'EEE dd/MM')
      });
    }
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {generateWeekDays().map((day, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-2 text-center rounded ${
              selectedDate === day.date.toISOString()
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedDate(day.date.toISOString())}
          >
            {day.formatted}
          </motion.button>
        ))}
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-4 gap-2"
        >
          {generateTimeSlots().map((time, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`p-2 text-center rounded ${
                selectedTime === time
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}