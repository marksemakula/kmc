import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: JSON.parse(localStorage.getItem('schedule_appointments')) || [],
  slots: JSON.parse(localStorage.getItem('schedule_slots')) || generateDefaultSlots(),
  loading: false,
  error: null
};

function generateDefaultSlots() {
  const slots = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  days.forEach(day => {
    times.forEach(time => {
      slots.push({
        id: `${day}-${time}`,
        day,
        time,
        available: true,
        doctorId: null
      });
    });
  });

  return slots;
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      const newAppointment = {
        ...action.payload,
        id: Date.now(),
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };
      state.appointments.push(newAppointment);
      localStorage.setItem('schedule_appointments', JSON.stringify(state.appointments));
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(apt => apt.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = {
          ...state.appointments[index],
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem('schedule_appointments', JSON.stringify(state.appointments));
      }
    },
    updateSlot: (state, action) => {
      const index = state.slots.findIndex(slot => slot.id === action.payload.id);
      if (index !== -1) {
        state.slots[index] = {
          ...state.slots[index],
          ...action.payload
        };
        localStorage.setItem('schedule_slots', JSON.stringify(state.slots));
      }
    },
    resetSlots: (state) => {
      state.slots = generateDefaultSlots();
      localStorage.setItem('schedule_slots', JSON.stringify(state.slots));
    }
  }
});

export const {
  addAppointment,
  updateAppointment,
  updateSlot,
  resetSlots
} = scheduleSlice.actions;

export default scheduleSlice.reducer;