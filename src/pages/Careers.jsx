import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import JobList from '../components/hr/JobList';
import JobDetail from '../components/hr/JobDetail';
import ApplicationForm from '../components/hr/ApplicationForm';
import Breadcrumb from '../components/layout/Breadcrumb';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const positions = useSelector(state => state.hr.positions);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Careers', path: '/careers' }]} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Career Opportunities at Keyawell Medical
        </h1>

        {selectedJob ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="mb-4 text-primary hover:text-primary-dark flex items-center"
            >
              ← Back to Jobs
            </button>
            <JobDetail job={selectedJob} onApply={() => setShowApplicationForm(true)} />
          </motion.div>
        ) : (
          <JobList positions={positions} onJobSelect={setSelectedJob} />
        )}
      </motion.div>

      {showApplicationForm && selectedJob && (
        <ApplicationForm job={selectedJob} onClose={() => setShowApplicationForm(false)} />
      )}
    </div>
  );
}
