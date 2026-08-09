import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaUserTie } from 'react-icons/fa';
import ShareButton from './ShareButton';

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-gray-700">
      {items.map((item, i) => (
        <li key={i}>
          {typeof item === 'string' ? item : (
            <>
              <span className="font-semibold">{item.label}:</span> {item.text}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function JobDetail({ job, onApply }) {
  const { description } = job;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">{job.title}</h2>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <span className="flex items-center">
            <FaBriefcase className="mr-2" />
            {job.department}
          </span>
          <span className="flex items-center">
            <FaBuilding className="mr-2" />
            Keyawell Medical Center
          </span>
          {job.reportsTo && (
            <span className="flex items-center">
              <FaUserTie className="mr-2" />
              Reports To: {job.reportsTo}
            </span>
          )}
        </div>
      </div>

      {description?.sections ? (
        <div>
          {description.sections.map((section, i) => (
            <Section key={i} title={section.heading}>
              {section.type === 'paragraph' ? (
                <p className="text-gray-700">{section.content}</p>
              ) : (
                <BulletList items={section.items} />
              )}
            </Section>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mb-6">
          Full job description not yet available. Please contact HR for details.
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={onApply}
          className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded transition duration-300"
        >
          Apply Now
        </button>
        <ShareButton
          url={`${window.location.origin}${window.location.pathname}?job=${job.id}`}
          title={`${job.title} — Keyawell Medical Center`}
        />
      </div>
    </motion.div>
  );
}
