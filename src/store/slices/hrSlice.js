import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: JSON.parse(localStorage.getItem('jobApplications')) || [],
  positions: JSON.parse(localStorage.getItem('jobPositions')) || [
    { id: 1, title: 'Anaesthesiologist', department: 'Medical', status: 'open' },
    { id: 2, title: 'Registered Nurse', department: 'Nursing', status: 'open' },
    { id: 3, title: 'Laboratory Technician', department: 'Laboratory', status: 'open' },
    { id: 4, title: 'Medical Administrator', department: 'Administration', status: 'open' },
    {
      id: 5,
      title: 'Medical Officer',
      department: 'Medical',
      reportsTo: 'Associate Consultant - Internal Medicine / Obs Gyn',
      status: 'open',
      description: {
        purpose: 'To provide and maintain curative and preventive health care services in accordance with National Health Service standards.',
        keyOutputs: [
          'Patients diagnosed, treated, reviewed & evaluated',
          'Public health practices promoted',
          'Research activities & Health data collected',
          'Outreach Health Service Programmes implemented',
          'Continued professional development done',
          'Professional and Service codes of conduct and ethics enforced',
          'Periodic reports prepared',
          'Accountability for financial and other resources carried out'
        ],
        keyFunctions: [
          'Diagnosing, treating and managing patients',
          'Promoting public health practices in the community',
          'Participating in research activities and health data collection',
          'Participating in continued professional development'
        ],
        qualifications: [
          'Must have an MB.Ch.B or its equivalent from a recognized Institution',
          'Must be registered and licensed with Uganda Medical and Dental Practitioners Council'
        ],
        competences: [
          'Planning, organizing and coordinating',
          'Concern for quality and standards',
          'Communication',
          'Ethics and integrity',
          'Time management',
          'Team building',
          'Information management'
        ]
      }
    }
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