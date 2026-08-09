import nodemailer from 'nodemailer';

const RECIPIENT = 'service@keyawell.or.ug';

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  let fields;
  try {
    fields = await readJsonBody(req);
  } catch {
    res.status(400).json({ success: false, message: 'Could not parse submission.' });
    return;
  }

  if (!fields['Patient Name'] || !fields['Referring Health Facility / Health Worker'] || !fields['Referring Person Email']) {
    res.status(400).json({ success: false, message: 'Missing required fields.' });
    return;
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    res.status(500).json({ success: false, message: 'Email sending is not configured on the server.' });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const bodyLines = [
    'PATIENT DETAILS',
    '----------------',
    `Patient Name: ${fields['Patient Name'] || ''}`,
    `Date of Birth: ${fields['Date of Birth'] || ''}`,
    `Patient Contact Number: ${fields['Patient Contact Number'] || ''}`,
    `Diagnosis: ${fields['Diagnosis'] || ''}`,
    `Reason for Referral: ${fields['Reason for Referral'] || ''}`,
    `Service Needed: ${fields['Service Needed'] || ''}`,
    `Urgency Level: ${fields['Urgency Level'] || ''}`,
    `Preferred Date: ${fields['Preferred Date'] || ''}`,
    `Additional Notes: ${fields['Additional Notes'] || ''}`,
    '',
    'REFERRING HEALTH FACILITY / HEALTH WORKER DETAILS',
    '--------------------------------------------------',
    `Referring Health Facility / Health Worker: ${fields['Referring Health Facility / Health Worker'] || ''}`,
    `Referring Person Contact Number: ${fields['Referring Person Contact Number'] || ''}`,
    `Referring Person Email: ${fields['Referring Person Email'] || ''}`
  ];

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT,
      replyTo: fields['Referring Person Email'],
      subject: `New Patient Referral: ${fields['Patient Name']}`,
      text: bodyLines.join('\n')
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to send referral email:', err);
    res.status(502).json({ success: false, message: 'Failed to send email.' });
  }
}
