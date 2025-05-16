import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaDownload } from 'react-icons/fa';
import { updateApplicationStatus } from '../../store/slices/hrSlice';
import { exportToExcel } from '../../utils/excelExport';

export default function HRManagement() {
  const dispatch = useDispatch();
  const applications = useSelector(state => state.hr.applications);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleStatusChange = (applicationId, newStatus) => {
    dispatch(updateApplicationStatus({ id: applicationId, status: newStatus }));
  };

  const handleExport = () => {
    const exportData = applications.map(app => ({
      Name: app.fullName,
      Email: app.email,
      Phone: app.phone,
      Position: app.jobTitle,
      Department: app.department,
      Status: app.status,
      'Submission Date': new Date(app.submittedAt).toLocaleDateString()
    }));
    exportToExcel(exportData, 'job-applications');
  };

  const filteredApplications = selectedStatus === 'all'
    ? applications
    : applications.filter(app => app.status === selectedStatus);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">HR Management</h2>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
        >
          <FaDownload />
          <span>Export</span>
        </button>
      </div>

      <div className="mb-6">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="interviewing">Interviewing</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredApplications.map((application, index) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{application.fullName}</h3>
                <p className="text-gray-600">{application.jobTitle}</p>
                <p className="text-sm text-gray-500">{application.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={application.status}
                  onChange={(e) => handleStatusChange(application.id, e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Applied on: {new Date(application.submittedAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}