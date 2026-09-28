export function getJobShareTitle(job) {
  const title = job?.title || 'Career Opportunity';
  return `${title} — Keyawell Medical Center`;
}

export function getJobShareDescription(job) {
  const title = job?.title || 'Career Opportunity';
  return `View the ${title} role at Keyawell Medical Center and apply today.`;
}

export function buildJobShareUrl(baseUrl, job) {
  const resolvedBaseUrl = /^https?:\/\//.test(baseUrl)
    ? baseUrl
    : `${typeof window !== 'undefined' ? window.location.origin : 'https://www.keyawell.or.ug'}${baseUrl}`;

  const url = new URL(resolvedBaseUrl);

  if (job?.id) {
    url.searchParams.set('job', String(job.id));
  }

  if (job?.title) {
    url.searchParams.set('title', job.title);
  }

  return url.toString();
}
