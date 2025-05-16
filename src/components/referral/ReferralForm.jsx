import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addReferral } from '../../store/slices/referralSlice';
import { generateEmailFile } from '../../utils/emailGenerator';

export default function ReferralForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfBirth: '',
    contactNumber: '',
    email: '',
    referringDoctor: '',
    referringInstitution: '',
    doctorContact: '',
    diagnosis: '',
    referralReason: '',
    urgency: 'normal',
    serviceType: '',
    preferredDate: '',
    notes: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add referral to Redux store
    dispatch(addReferral({ ...formData, status: 'pending', createdAt: new Date().toISOString() }));
    
    // Generate and trigger email download
    const emailLink = generateEmailFile(formData);
    emailLink.click();
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    
    // Reset form
    setFormData({
      patientName: '',
      dateOfBirth: '',
      contactNumber: '',
      email: '',
      referringDoctor: '',
      referringInstitution: '',
      doctorContact: '',
      diagnosis: '',
      referralReason: '',
      urgency: 'normal',
      serviceType: '',
      preferredDate: '',
      notes: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Patient Referral Form</h2>
      
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
        >
          Referral submitted successfully! Email file has been generated.
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
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
          <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
          <textarea
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            rows="3"
            value={formData.diagnosis}
            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={formData.urgency}
            onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Submit Referral
        </button>
      </form>
    </motion.div>
  );
}