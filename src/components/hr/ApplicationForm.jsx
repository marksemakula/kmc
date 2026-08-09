import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaTrash, FaSpinner, FaCheckCircle, FaPaperclip } from 'react-icons/fa';
import { mergeFilesToPdf, isSupportedFile } from '../../utils/mergePdf';
import { addApplication } from '../../store/slices/hrSlice';

const MAX_SIZE_BYTES = 4 * 1024 * 1024;
const ACCEPTED_TYPES = '.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png';

const EDUCATION_LEVELS = [
  'Certificate',
  'Diploma',
  "Bachelor's Degree",
  'Postgraduate Diploma',
  "Master's Degree",
  'Doctorate / PhD',
  'Professional Qualification (e.g. MB.ChB)',
  'Other'
];

function formatSize(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

export default function ApplicationForm({ job, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    nationality: '',
    district: '',
    expectedPay: '',
    education: '',
    availableFrom: ''
  });
  const [workHistory, setWorkHistory] = useState([{ employer: '', period: '', duties: '' }]);
  const [qualifications, setQualifications] = useState([{ institution: '', fieldOfStudy: '' }]);
  const [applicationLetter, setApplicationLetter] = useState(null);
  const [cv, setCv] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | merging | submitting | success
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateWorkHistory = (index, field, value) => {
    setWorkHistory(prev => prev.map((w, i) => (i === index ? { ...w, [field]: value } : w)));
  };

  const addWorkHistory = () => {
    setWorkHistory(prev => [...prev, { employer: '', period: '', duties: '' }]);
  };

  const removeWorkHistory = (index) => {
    setWorkHistory(prev => prev.filter((_, i) => i !== index));
  };

  const updateQualification = (index, field, value) => {
    setQualifications(prev => prev.map((q, i) => (i === index ? { ...q, [field]: value } : q)));
  };

  const addQualification = () => {
    setQualifications(prev => [...prev, { institution: '', fieldOfStudy: '' }]);
  };

  const removeQualification = (index) => {
    setQualifications(prev => prev.filter((_, i) => i !== index));
  };

  const handleSingleFile = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!isSupportedFile(file)) {
      setErrorMsg(`"${file.name}" is not a supported file type. Please upload a PDF, JPG or PNG.`);
      e.target.value = '';
      return;
    }
    setErrorMsg('');
    setter(file);
  };

  const handleCertificateFiles = (e) => {
    const files = Array.from(e.target.files);
    const invalid = files.find(f => !isSupportedFile(f));
    if (invalid) {
      setErrorMsg(`"${invalid.name}" is not a supported file type. Please upload PDF, JPG or PNG files.`);
      e.target.value = '';
      return;
    }
    setErrorMsg('');
    setCertificates(prev => [...prev, ...files]);
    e.target.value = '';
  };

  const removeCertificate = (index) => {
    setCertificates(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!cv) {
      setErrorMsg('Please attach your CV.');
      return;
    }

    const filesToMerge = [applicationLetter, cv, ...certificates].filter(Boolean);

    setStatus('merging');
    let mergedBlob;
    try {
      mergedBlob = await mergeFilesToPdf(filesToMerge);
    } catch (err) {
      setStatus('idle');
      setErrorMsg(err.message || 'Could not process the attached documents.');
      return;
    }

    if (mergedBlob.size > MAX_SIZE_BYTES) {
      setStatus('idle');
      setErrorMsg(
        `Your combined application document is ${formatSize(mergedBlob.size)}, which exceeds the 4MB limit. Please remove or compress some files and try again.`
      );
      return;
    }

    setStatus('submitting');

    const qualificationsSummary = qualifications
      .filter(q => q.institution || q.fieldOfStudy)
      .map(q => `${q.fieldOfStudy || '—'} at ${q.institution || '—'}`)
      .join('; ');

    const workHistorySummary = workHistory
      .filter(w => w.employer || w.period || w.duties)
      .map(w => `${w.employer || '—'} (${w.period || '—'}): ${w.duties || '—'}`)
      .join('\n');

    const fileName = `${(formData.fullName.trim() || 'Applicant').replace(/\s+/g, '_')}_Application_${job.title.replace(/\s+/g, '_')}.pdf`;

    const payload = new FormData();
    payload.append('Position Applied For', job.title);
    payload.append('Full Name', formData.fullName);
    payload.append('Phone Number', formData.phone);
    payload.append('Email', formData.email);
    payload.append('Nationality', formData.nationality);
    payload.append('District of Residence', formData.district);
    payload.append('Expected Pay', formData.expectedPay);
    payload.append('Highest Level of Education', formData.education);
    payload.append('Available to Start', formData.availableFrom);
    payload.append('Work History', workHistorySummary);
    payload.append('Skills & Qualifications', qualificationsSummary);
    payload.append('attachment', mergedBlob, fileName);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: payload
      });
      const result = await res.json();
      if (result.success) {
        dispatch(addApplication({
          jobId: job.id,
          jobTitle: job.title,
          department: job.department,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          nationality: formData.nationality,
          district: formData.district,
          expectedPay: formData.expectedPay,
          education: formData.education,
          availableFrom: formData.availableFrom,
          workHistory: workHistorySummary,
          qualifications: qualificationsSummary
        }));
        setStatus('success');
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setStatus('idle');
      setErrorMsg('Something went wrong sending your application. Please try again, or email us directly at admin@kayewell.or.ug.');
    }
  };

  const isBusy = status === 'merging' || status === 'submitting';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative"
      >
        <button
          onClick={onClose}
          disabled={status === 'submitting' || status === 'merging'}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-40"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-10">
            <FaCheckCircle className="mx-auto text-secondary text-5xl mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Application Sent</h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying for {job.title}. Your application has been sent to our HR team and we'll be in touch soon.
            </p>
            <button
              onClick={onClose}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-primary mb-6">Apply for {job.title}</h2>

            {errorMsg && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.nationality}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">District of Residence</label>
                    <input
                      type="text"
                      name="district"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.district}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expected Pay</label>
                    <input
                      type="text"
                      name="expectedPay"
                      placeholder="e.g. UGX 2,500,000 / month"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.expectedPay}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Education & Experience</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Highest Level of Education</label>
                    <select
                      name="education"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.education}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select an option</option>
                      {EDUCATION_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Available to Start</label>
                    <input
                      type="date"
                      name="availableFrom"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.availableFrom}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Work History</label>
                    <button
                      type="button"
                      onClick={addWorkHistory}
                      className="text-primary hover:text-primary-dark text-sm flex items-center gap-1"
                    >
                      <FaPlus size={12} /> Add another
                    </button>
                  </div>
                  <div className="space-y-3">
                    {workHistory.map((w, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1">
                            <input
                              type="text"
                              placeholder="Employer"
                              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                              value={w.employer}
                              onChange={(e) => updateWorkHistory(index, 'employer', e.target.value)}
                            />
                            <input
                              type="text"
                              placeholder="Period (e.g. Jan 2020 - Dec 2023)"
                              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                              value={w.period}
                              onChange={(e) => updateWorkHistory(index, 'period', e.target.value)}
                            />
                          </div>
                          {workHistory.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeWorkHistory(index)}
                              className="text-red-500 hover:text-red-700 p-2"
                              aria-label="Remove"
                            >
                              <FaTrash size={14} />
                            </button>
                          )}
                        </div>
                        <textarea
                          placeholder="Duties / responsibilities"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                          rows="2"
                          value={w.duties}
                          onChange={(e) => updateWorkHistory(index, 'duties', e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Skills & Qualifications</label>
                    <button
                      type="button"
                      onClick={addQualification}
                      className="text-primary hover:text-primary-dark text-sm flex items-center gap-1"
                    >
                      <FaPlus size={12} /> Add another
                    </button>
                  </div>
                  <div className="space-y-2">
                    {qualifications.map((q, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-2 items-start">
                        <input
                          type="text"
                          placeholder="Where studied (institution)"
                          className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                          value={q.institution}
                          onChange={(e) => updateQualification(index, 'institution', e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="What studied / qualification"
                          className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                          value={q.fieldOfStudy}
                          onChange={(e) => updateQualification(index, 'fieldOfStudy', e.target.value)}
                        />
                        {qualifications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeQualification(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                            aria-label="Remove"
                          >
                            <FaTrash size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Documents</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Attach your application letter, CV and certificates below (PDF, JPG or PNG). They will be merged into a single document — combined size must not exceed 4MB.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Application / Cover Letter</label>
                    <input
                      type="file"
                      accept={ACCEPTED_TYPES}
                      onChange={(e) => handleSingleFile(e, setApplicationLetter)}
                      className="mt-1 block w-full text-sm text-gray-600"
                    />
                    {applicationLetter && (
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <FaPaperclip size={10} /> {applicationLetter.name} ({formatSize(applicationLetter.size)})
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">CV / Resume *</label>
                    <input
                      type="file"
                      accept={ACCEPTED_TYPES}
                      required={!cv}
                      onChange={(e) => handleSingleFile(e, setCv)}
                      className="mt-1 block w-full text-sm text-gray-600"
                    />
                    {cv && (
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <FaPaperclip size={10} /> {cv.name} ({formatSize(cv.size)})
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Certificates & Academic Documents</label>
                    <input
                      type="file"
                      accept={ACCEPTED_TYPES}
                      multiple
                      onChange={handleCertificateFiles}
                      className="mt-1 block w-full text-sm text-gray-600"
                    />
                    {certificates.length > 0 && (
                      <ul className="mt-1 space-y-1">
                        {certificates.map((f, i) => (
                          <li key={i} className="text-xs text-gray-500 flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <FaPaperclip size={10} /> {f.name} ({formatSize(f.size)})
                            </span>
                            <button
                              type="button"
                              onClick={() => removeCertificate(i)}
                              className="text-red-500 hover:text-red-700 ml-2"
                              aria-label="Remove"
                            >
                              <FaTrash size={12} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isBusy}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isBusy && <FaSpinner className="animate-spin" />}
                {status === 'merging' && 'Preparing documents…'}
                {status === 'submitting' && 'Submitting…'}
                {!isBusy && 'Submit Application'}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
