import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: JSON.parse(localStorage.getItem('jobApplications')) || [],
  positions: JSON.parse(localStorage.getItem('jobPositions')) || [
    {
      id: 1,
      title: 'Anaesthetic Officer',
      department: 'Medical',
      status: 'open',
      description: {
        sections: [
          {
            heading: 'Key Duties and Responsibilities',
            type: 'list',
            items: [
              'Day to day performing of safe anaesthesia covering the Hospital theatre, local, regional and general anaesthesia including pre- and post-operative assessment.',
              'At least working/coverage of five days a week and constant monitoring, intra-operatively, of patients.',
              'Carrying out resuscitation of patients whenever necessary.',
              'Following instructions and protocols given by the supervisor during surgical operations.',
              'Actively participating in handling emergencies especially respiratory and cardiovascular system cases.',
              'Identifying and correctly administering appropriate Anaesthetic.',
              'Teaching and guiding Nursing staff and students on Anaesthetic drugs and procedures.',
              'Performing duties and assignments allocated on the duty allocation plan.',
              'Taking the duty of care for theatre assets and equipment including cleaning, maintaining, safety and security thereof.',
              'Developing and maintaining harmonious interpersonal and working relationships with fellow staff in anaesthesia, theatres and the surgery department, as well as management and entire hospital staff.',
              'Participating in departmental meetings, activities and programs including CMEs, research and promotional activities.',
              'Preparing and submitting reports as may be required by the Theatres Manager, Senior Anaesthetic Officer or Head of Surgery Department.',
              'Performing other duties incidental to the above.'
            ]
          },
          {
            heading: 'Experience',
            type: 'paragraph',
            content: "At least 2 (two) years' experience in managing anaesthesia in a reputable theatre."
          },
          {
            heading: 'Knowledge, Skills & Competencies',
            type: 'paragraph',
            content: 'A higher Diploma in Anaesthesia from a recognized institution with background training as Clinical Officer or Registered Nurse or related field.'
          },
          {
            heading: 'Professional Degree / Certification',
            type: 'paragraph',
            content: "Member and registered with the Allied Health Professionals' Council."
          }
        ]
      }
    },
    {
      id: 2,
      title: 'Registered Nurse',
      department: 'Nursing',
      status: 'open',
      description: {
        sections: [
          {
            heading: 'Key Duties and Responsibilities',
            type: 'list',
            items: [
              { label: 'Patient Care', text: 'Assess physical needs, formulate nursing care plans, monitor vital signs, and execute medical orders.' },
              { label: 'Treatment Administration', text: 'Dispense prescribed drugs, manage intravenous lines, and dress wounds safely.' },
              { label: 'Emergency Response', text: 'Triage urgent cases, deliver first aid, and stabilize critical patients during medical crises.' },
              { label: 'Infection Control', text: 'Enforce sanitation protocols, sterilize tools, and manage safe medical waste disposal.' },
              { label: 'Record Keeping', text: 'Document accurate patient data, chart progress notes, and report shifts clearly.' },
              { label: 'Patient Education', text: 'Instruct individuals and families on home care, nutrition, and disease prevention.' }
            ]
          },
          {
            heading: 'Qualifications and Requirements',
            type: 'list',
            items: [
              { label: 'Education', text: 'Diploma in Nursing from a recognized, accredited institution.' },
              { label: 'Licensure', text: 'Valid registration and current practicing license from the Uganda Nurses and Midwives Council.' },
              { label: 'Experience', text: 'Clinical experience in a hospital or health-center setting (often 1 to 3 years required depending on the employer).' },
              { label: 'Skills', text: 'Strong communication, teamwork, critical thinking, and basic computer literacy.' }
            ]
          }
        ]
      }
    },
    {
      id: 3,
      title: 'Laboratory Technician',
      department: 'Laboratory',
      status: 'open',
      description: {
        sections: [
          {
            heading: 'Key Duties and Responsibilities',
            type: 'list',
            items: [
              'Collect, receive, label, and process biological or physical test specimens accurately following Standard Operating Procedures (SOPs).',
              'Perform diagnostic laboratory investigations, tests, and analyses (such as parasitology, hematology, microbiology, or biochemistry).',
              'Maintain comprehensive registers and logs of all requested tests, sample results, and monthly inventory reports.',
              'Clean, sterilize, calibrate, and properly maintain laboratory work areas, glassware, and diagnostic equipment.',
              'Ensure strict adherence to safety, bio-security protocols, and proper laboratory waste disposal regulations.',
              'Coordinate results and resolve queries promptly with clinical, research, or academic teams.'
            ]
          },
          {
            heading: 'Minimum Qualifications & Requirements',
            type: 'list',
            items: [
              { label: 'Education', text: 'Diploma in Medical Laboratory Sciences, Science Laboratory Technology, Chemistry, or Biology from a recognized university or training institute.' },
              { label: 'Registration', text: 'Registration with the Allied Health Professionals Council (AHPC) in Uganda (mandatory for clinical/medical laboratory roles).' },
              { label: 'Experience', text: '0 to 2+ years of active working experience in a reputable hospital, research institution, or governmental laboratory setting.' },
              { label: 'Competencies', text: 'High attention to detail, strong integrity, good record-keeping skills, and computer literacy.' }
            ]
          }
        ]
      }
    },
    {
      id: 4,
      title: 'Assistant Hospital Administrator',
      department: 'Administration',
      status: 'open',
      description: {
        sections: [
          {
            heading: 'Core Duties and Responsibilities',
            type: 'list',
            items: [
              { label: 'Planning and Budgeting', text: 'Help draft annual facility work plans, financial estimates, and operational budgets.' },
              { label: 'Logistics and Procurement', text: 'Track inventory, manage central medical and general stores, and ensure regular stock availability.' },
              { label: 'Human Resource Support', text: 'Supervise support staff (such as records, transport, billing, and custodial teams), track attendance, and process performance appraisals.' },
              { label: 'Facility Maintenance', text: 'Oversee the upkeep of hospital buildings, grounds, utility systems, and medical equipment functionality.' },
              { label: 'Transport Management', text: 'Coordinate institutional vehicles, ambulances, and routine maintenance logs.' },
              { label: 'Record Keeping and Reporting', text: 'Prepare monthly and quarterly administrative, logistical, and attendance reports for the medical superintendent.' }
            ]
          },
          {
            heading: 'Requirements and Competencies',
            type: 'list',
            items: [
              { label: 'Education', text: 'Diploma in Health Services Management, Business Administration, Public Administration, or a related administrative field from a recognized institution.' },
              { label: 'Skills', text: 'Basic financial literacy, inventory control, basic computer literacy (MS Office), and staff supervision.' },
              { label: 'Experience', text: 'Practical background in office management, registry, or lower-level health facility operations.' }
            ]
          }
        ]
      }
    },
    {
      id: 5,
      title: 'Medical Officer',
      department: 'Medical',
      reportsTo: 'Associate Consultant - Internal Medicine / Obs Gyn',
      status: 'open',
      description: {
        sections: [
          {
            heading: 'Job Purpose',
            type: 'paragraph',
            content: 'To provide and maintain curative and preventive health care services in accordance with National Health Service standards.'
          },
          {
            heading: 'Key Outputs',
            type: 'list',
            items: [
              'Patients diagnosed, treated, reviewed & evaluated',
              'Public health practices promoted',
              'Research activities & Health data collected',
              'Outreach Health Service Programmes implemented',
              'Continued professional development done',
              'Professional and Service codes of conduct and ethics enforced',
              'Periodic reports prepared',
              'Accountability for financial and other resources carried out'
            ]
          },
          {
            heading: 'Key Functions',
            type: 'list',
            items: [
              'Diagnosing, treating and managing patients',
              'Promoting public health practices in the community',
              'Participating in research activities and health data collection',
              'Participating in continued professional development'
            ]
          },
          {
            heading: 'Person Specifications — Qualifications',
            type: 'list',
            items: [
              'Must have an MB.Ch.B or its equivalent from a recognized Institution',
              'Must be registered and licensed with Uganda Medical and Dental Practitioners Council'
            ]
          },
          {
            heading: 'Person Specifications — Competences',
            type: 'list',
            items: [
              'Planning, organizing and coordinating',
              'Concern for quality and standards',
              'Communication',
              'Ethics and integrity',
              'Time management',
              'Team building',
              'Information management'
            ]
          }
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