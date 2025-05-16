import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addApplication } from '../../store/slices/hrSlice';

export default function ApplicationForm({ job }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    coverLetter: '',
    resume: null
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const application = {
      ...formData,
      jobId: job.id,
      jobTitle: job.title,
      department: job.department
    };
    
    dispatch(addApplication(application));
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        education: '',
        coverLetter: '',
        resume: null
      });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">
        Apply for {job.title}
      </h2>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
        >
          Application submitted successfully! We'll be in touch soon.
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Experience</label>
          <textarea
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            rows="3"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Education</label>
          <textarea
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            rows="3"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
          <textarea
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            rows="4"
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </motion.div>
  );
}