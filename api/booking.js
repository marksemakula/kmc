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

  if (!fields['Full Name'] || !fields['Email'] || !fields['Service Requested']) {
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
    'APPOINTMENT BOOKING REQUEST',
    '----------------------------',
    `Full Name: ${fields['Full Name'] || ''}`,
    `Contact Number: ${fields['Contact Number'] || ''}`,
    `Email: ${fields['Email'] || ''}`,
    `Service Requested: ${fields['Service Requested'] || ''}`,
    `Preferred Date: ${fields['Preferred Date'] || ''}`,
    `Preferred Time: ${fields['Preferred Time'] || ''}`,
    `Additional Notes: ${fields['Additional Notes'] || ''}`
  ];

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT,
      replyTo: fields['Email'],
      subject: `New Appointment Booking: ${fields['Service Requested']} — ${fields['Full Name']}`,
      text: bodyLines.join('\n')
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to send booking email:', err);
    res.status(502).json({ success: false, message: 'Failed to send email.' });
  }
}
