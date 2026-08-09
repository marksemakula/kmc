import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { addReferral } from '../../store/slices/referralSlice';

const initialPatientData = {
  patientName: '',
  dateOfBirth: '',
  patientContact: '',
  diagnosis: '',
  referralReason: '',
  serviceNeeded: '',
  urgency: 'normal',
  preferredDate: '',
  notes: ''
};

const initialReferrerData = {
  referringFacilityOrWorker: '',
  referrerContact: '',
  referrerEmail: ''
};

export default function ReferralForm() {
  const dispatch = useDispatch();
  const [patientData, setPatientData] = useState(initialPatientData);
  const [referrerData, setReferrerData] = useState(initialReferrerData);
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [errorMsg, setErrorMsg] = useState('');

  const handlePatientChange = (field, value) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  const handleReferrerChange = (field, value) => {
    setReferrerData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('submitting');

    const payload = {
      'Patient Name': patientData.patientName,
      'Date of Birth': patientData.dateOfBirth,
      'Patient Contact Number': patientData.patientContact,
      'Diagnosis': patientData.diagnosis,
      'Reason for Referral': patientData.referralReason,
      'Service Needed': patientData.serviceNeeded,
      'Urgency Level': patientData.urgency,
      'Preferred Date': patientData.preferredDate,
      'Additional Notes': patientData.notes,
      'Referring Health Facility / Health Worker': referrerData.referringFacilityOrWorker,
      'Referring Person Contact Number': referrerData.referrerContact,
      'Referring Person Email': referrerData.referrerEmail
    };

    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (result.success) {
        dispatch(addReferral({
          ...patientData,
          ...referrerData,
          status: 'pending',
          createdAt: new Date().toISOString()
        }));
        setStatus('success');
        setPatientData(initialPatientData);
        setReferrerData(initialReferrerData);
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setStatus('idle');
      setErrorMsg('Something went wrong sending this referral. Please try again, or contact us directly at service@keyawell.or.ug.');
    }
  };

  const isBusy = status === 'submitting';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Patient Referral Form</h2>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
        >
          Referral submitted successfully! Our team has been notified by email.
        </motion.div>
      )}

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Patient Details</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={patientData.patientName}
                  onChange={(e) => handlePatientChange('patientName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={patientData.dateOfBirth}
                  onChange={(e) => handlePatientChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Contact Number</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                value={patientData.patientContact}
                onChange={(e) => handlePatientChange('patientContact', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
              <textarea
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                rows="3"
                value={patientData.diagnosis}
                onChange={(e) => handlePatientChange('diagnosis', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reason for Referral</label>
              <textarea
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                rows="3"
                value={patientData.referralReason}
                onChange={(e) => handlePatientChange('referralReason', e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Service Needed</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CT Scan, Dialysis, Specialist Consultation"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={patientData.serviceNeeded}
                  onChange={(e) => handlePatientChange('serviceNeeded', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={patientData.urgency}
                  onChange={(e) => handlePatientChange('urgency', e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                value={patientData.preferredDate}
                onChange={(e) => handlePatientChange('preferredDate', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                rows="2"
                value={patientData.notes}
                onChange={(e) => handlePatientChange('notes', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
            Referring Health Facility / Health Worker Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Referring Health Facility / Health Worker</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                value={referrerData.referringFacilityOrWorker}
                onChange={(e) => handleReferrerChange('referringFacilityOrWorker', e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Referring Person's Contact Number</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={referrerData.referrerContact}
                  onChange={(e) => handleReferrerChange('referrerContact', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Referring Person's Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={referrerData.referrerEmail}
                  onChange={(e) => handleReferrerChange('referrerEmail', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isBusy}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isBusy && <FaSpinner className="animate-spin" />}
          {isBusy ? 'Submitting…' : 'Submit Referral'}
        </button>
      </form>
    </motion.div>
  );
}
