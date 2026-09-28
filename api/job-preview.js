const JOBS = [
  { id: 1, title: 'Anaesthetic Officer', slug: 'anaesthetic-officer' },
  { id: 2, title: 'Registered Nurse', slug: 'registered-nurse' },
  { id: 3, title: 'Laboratory Technician', slug: 'laboratory-technician' },
  { id: 4, title: 'Assistant Hospital Administrator', slug: 'assistant-hospital-administrator' },
  { id: 5, title: 'Medical Officer', slug: 'medical-officer' },
  { id: 6, title: 'Registered Midwife', slug: 'registered-midwife' }
];

function findJobFromRequest(url) {
  const jobId = url.searchParams.get('job');
  const slug = url.searchParams.get('slug') || url.pathname.replace(/^\/job\/?/, '').replace(/\/$/, '');

  if (jobId) {
    const job = JOBS.find((item) => String(item.id) === jobId);
    if (job) return job;
  }

  if (slug) {
    const job = JOBS.find((item) => item.slug === slug);
    if (job) return job;
  }

  return JOBS[0];
}

export default function handler(req, res) {
  const url = new URL(req.url, 'https://www.keyawell.or.ug');
  const job = findJobFromRequest(url);
  const title = `${job.title} — Keyawell Medical Center`;
  const description = `Apply for the ${job.title} role at Keyawell Medical Center.`;
  const canonicalUrl = `https://www.keyawell.or.ug/job/${job.slug}?job=${job.id}`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');

  res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="https://www.keyawell.or.ug/Keyawell.ico" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="https://www.keyawell.or.ug/Keyawell.ico" />
    <link rel="canonical" href="${canonicalUrl}" />
    <script>window.location.replace('/careers?job=${job.id}&title=${encodeURIComponent(job.title)}');</script>
  </head>
  <body>
    <h1>${title}</h1>
    <p>${description}</p>
  </body>
</html>`);
}
