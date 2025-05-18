import { configureStore } from '@reduxjs/toolkit';
import referralReducer from './slices/referralSlice';
import hrReducer from './slices/hrSlice';
import scheduleReducer from './slices/scheduleSlice';
import telemedicineReducer from './slices/telemedicineSlice';
import blogReducer from './slices/blogSlice';

export const store = configureStore({
  reducer: {
    referrals: referralReducer,
    hr: hrReducer,
    schedule: scheduleReducer,
    telemedicine: telemedicineReducer,
    blog: blogReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['blog.currentPost.timestamp']
      }
    })
});