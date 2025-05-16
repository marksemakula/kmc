import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: JSON.parse(localStorage.getItem('doctors')) || [
    { id: 1, name: 'Dr. Sarah Wilson', specialty: 'General Medicine', status: 'online', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&h=150&auto=format&fit=crop' },
    { id: 2, name: 'Dr. James Chen', specialty: 'Pediatrics', status: 'online', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&h=150&auto=format&fit=crop' },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'Cardiology', status: 'offline', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=150&h=150&auto=format&fit=crop' }
  ],
  activeChats: JSON.parse(localStorage.getItem('activeChats')) || {},
  currentChat: null,
  loading: false,
  error: null
};

export const telemedicineSlice = createSlice({
  name: 'telemedicine',
  initialState,
  reducers: {
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
      localStorage.setItem('doctors', JSON.stringify(state.doctors));
    },
    updateDoctor: (state, action) => {
      const index = state.doctors.findIndex(doc => doc.id === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = action.payload;
        localStorage.setItem('doctors', JSON.stringify(state.doctors));
      }
    },
    removeDoctor: (state, action) => {
      state.doctors = state.doctors.filter(doc => doc.id !== action.payload);
      localStorage.setItem('doctors', JSON.stringify(state.doctors));
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    // ... previous chat-related reducers remain the same
  }
});

export const {
  addDoctor,
  updateDoctor,
  removeDoctor,
  setCurrentChat,
  sendMessage,
  simulateDoctorResponse
} = telemedicineSlice.actions;

export default telemedicineSlice.reducer;