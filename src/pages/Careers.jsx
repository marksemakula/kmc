import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import JobList from '../components/hr/JobList';
import JobDetail from '../components/hr/JobDetail';
import ApplicationForm from '../components/hr/ApplicationForm';
import Breadcrumb from '../components/layout/Breadcrumb';
import { getJobShareDescription, getJobShareTitle } from '../utils/jobShare';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const positions = useSelector(state => state.hr.positions);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const jobId = searchParams.get('job');
    const jobTitle = searchParams.get('title');

    if (jobId) {
      const match = positions.find(p => String(p.id) === jobId);
      if (match) {
        setSelectedJob(match);
        return;
      }
    }

    if (jobTitle && !selectedJob) {
      const match = positions.find(p => p.title === decodeURIComponent(jobTitle));
      if (match) setSelectedJob(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions, searchParams]);

  useEffect(() => {
    if (!selectedJob) {
      document.title = 'Career Opportunities at Keyawell Medical';
      return undefined;
    }

    const previousTitle = document.title;
    const title = getJobShareTitle(selectedJob);
    const description = getJobShareDescription(selectedJob);

    document.title = title;

    const upsertMeta = (id, attribute, key, content) => {
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('meta');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.setAttribute(attribute, key);
      tag.setAttribute('content', content);
    };

    upsertMeta('seo-job-title', 'property', 'og:title', title);
    upsertMeta('seo-job-description', 'property', 'og:description', description);
    upsertMeta('seo-job-type', 'property', 'og:type', 'website');
    upsertMeta('seo-job-url', 'property', 'og:url', `${window.location.origin}${window.location.pathname}${window.location.search}`);
    upsertMeta('seo-job-twitter-title', 'name', 'twitter:title', title);
    upsertMeta('seo-job-twitter-description', 'name', 'twitter:description', description);
    upsertMeta('seo-job-twitter-card', 'name', 'twitter:card', 'summary_large_image');

    return () => {
      document.title = previousTitle;
      const ids = [
        'seo-job-title',
        'seo-job-description',
        'seo-job-type',
        'seo-job-url',
        'seo-job-twitter-title',
        'seo-job-twitter-description',
        'seo-job-twitter-card'
      ];

      ids.forEach((id) => {
        const tag = document.getElementById(id);
        if (tag) tag.remove();
      });
    };
  }, [selectedJob]);

  const selectJob = (job) => {
    setSelectedJob(job);
    setSearchParams({ job: job.id, title: job.title });
  };

  const clearJob = () => {
    setSelectedJob(null);
    setSearchParams({});
  };

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
              onClick={clearJob}
              className="mb-4 text-primary hover:text-primary-dark flex items-center"
            >
              ← Back to Jobs
            </button>
            <JobDetail job={selectedJob} onApply={() => setShowApplicationForm(true)} />
          </motion.div>
        ) : (
          <JobList positions={positions} onJobSelect={selectJob} />
        )}
      </motion.div>

      {showApplicationForm && selectedJob && (
        <ApplicationForm job={selectedJob} onClose={() => setShowApplicationForm(false)} />
      )}
    </div>
  );
}
