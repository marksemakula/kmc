import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: JSON.parse(localStorage.getItem('jobApplications')) || [],
  positions: JSON.parse(localStorage.getItem('jobPositions')) || [
    { id: 1, title: 'Senior Doctor', department: 'Medical', status: 'open' },
    { id: 2, title: 'Registered Nurse', department: 'Nursing', status: 'open' },
    { id: 3, title: 'Laboratory Technician', department: 'Laboratory', status: 'open' },
    { id: 4, title: 'Medical Administrator', department: 'Administration', status: 'open' }
  ],
  loading: false,
  error: null
};

export const hrSlice = createSlice({
  name: 'hr',
  initialState,
  reducers: {
    addApplication: (state, action) => {
      const newApplication = {
        ...action.payload,
        id: Date.now(),
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      state.applications.push(newApplication);
      localStorage.setItem('jobApplications', JSON.stringify(state.applications));
    },
    updateApplicationStatus: (state, action) => {
      const { id, status } = action.payload;
      const application = state.applications.find(app => app.id === id);
      if (application) {
        application.status = status;
        application.updatedAt = new Date().toISOString();
        localStorage.setItem('jobApplications', JSON.stringify(state.applications));
      }
    },
    addPosition: (state, action) => {
      const newPosition = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      state.positions.push(newPosition);
      localStorage.setItem('jobPositions', JSON.stringify(state.positions));
    },
    updatePosition: (state, action) => {
      const index = state.positions.findIndex(pos => pos.id === action.payload.id);
      if (index !== -1) {
        state.positions[index] = {
          ...state.positions[index],
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem('jobPositions', JSON.stringify(state.positions));
      }
    }
  }
});

export const {
  addApplication,
  updateApplicationStatus,
  addPosition,
  updatePosition
} = hrSlice.actions;

export default hrSlice.reducer;