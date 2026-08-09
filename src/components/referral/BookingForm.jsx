import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { addAppointment } from '../../store/slices/referralSlice';
import { services } from '../../data/services';

const SERVICE_OPTIONS = [...services.map(s => s.title), 'General Consultation', 'Business Meeting'];

const initialFormData = {
  fullName: '',
  contactNumber: '',
  email: '',
  serviceRequested: '',
  preferredDate: '',
  preferredTime: '',
  notes: ''
};

export default function BookingForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('submitting');

    const payload = {
      'Full Name': formData.fullName,
      'Contact Number': formData.contactNumber,
      'Email': formData.email,
      'Service Requested': formData.serviceRequested,
      'Preferred Date': formData.preferredDate,
      'Preferred Time': formData.preferredTime,
      'Additional Notes': formData.notes
    };

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (result.success) {
        dispatch(addAppointment({
          ...formData,
          status: 'pending',
          createdAt: new Date().toISOString()
        }));
        setStatus('success');
        setFormData(initialFormData);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setStatus('idle');
      setErrorMsg('Something went wrong sending this booking request. Please try again, or contact us directly at service@keyawell.or.ug.');
    }
  };

  const isBusy = status === 'submitting';

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg text-center py-12"
      >
        <FaCheckCircle className="mx-auto text-secondary text-5xl mb-4" />
        <h2 className="text-2xl font-bold text-primary mb-2">Booking Request Sent</h2>
        <p className="text-gray-600 mb-6">
          Thank you! Someone from our team will reach out to confirm availability of the requested service.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded transition duration-300"
        >
          Book Another Appointment
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Book an Appointment</h2>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={formData.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Service Requested</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={formData.serviceRequested}
            onChange={(e) => handleChange('serviceRequested', e.target.value)}
          >
            <option value="" disabled>Select a service</option>
            {SERVICE_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={formData.preferredDate}
              onChange={(e) => handleChange('preferredDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
            <input
              type="time"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={formData.preferredTime}
              onChange={(e) => handleChange('preferredTime', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            rows="3"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
          />
        </div>

        <p className="text-xs text-gray-500">
          After submitting, someone from our team will reach out to confirm availability of the requested service.
        </p>

        <button
          type="submit"
          disabled={isBusy}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isBusy && <FaSpinner className="animate-spin" />}
          {isBusy ? 'Submitting…' : 'Book Appointment'}
        </button>
      </form>
    </motion.div>
  );
}
