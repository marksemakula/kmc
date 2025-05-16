import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  referrals: JSON.parse(localStorage.getItem('referrals')) || [],
  appointments: JSON.parse(localStorage.getItem('appointments')) || [],
  loading: false,
  error: null
};

export const referralSlice = createSlice({
  name: 'referrals',
  initialState,
  reducers: {
    addReferral: (state, action) => {
      state.referrals.push({ ...action.payload, id: Date.now() });
      localStorage.setItem('referrals', JSON.stringify(state.referrals));
    },
    addAppointment: (state, action) => {
      state.appointments.push({ ...action.payload, id: Date.now() });
      localStorage.setItem('appointments', JSON.stringify(state.appointments));
    },
    updateReferralStatus: (state, action) => {
      const index = state.referrals.findIndex(ref => ref.id === action.payload.id);
      if (index !== -1) {
        state.referrals[index] = { ...state.referrals[index], ...action.payload };
        localStorage.setItem('referrals', JSON.stringify(state.referrals));
      }
    }
  }
});

export const { addReferral, addAppointment, updateReferralStatus } = referralSlice.actions;
export default referralSlice.reducer;