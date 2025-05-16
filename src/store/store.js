import { configureStore } from '@reduxjs/toolkit';
import referralReducer from './slices/referralSlice';
import hrReducer from './slices/hrSlice';
import scheduleReducer from './slices/scheduleSlice';
import telemedicineReducer from './slices/telemedicineSlice';

export const store = configureStore({
  reducer: {
    referrals: referralReducer,
    hr: hrReducer,
    schedule: scheduleReducer,
    telemedicine: telemedicineReducer
  }
});