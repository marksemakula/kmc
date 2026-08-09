import Busboy from 'busboy';
import nodemailer from 'nodemailer';

const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
const RECIPIENT = 'admin@keyawell.or.ug';

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: req.headers,
      limits: { fileSize: MAX_ATTACHMENT_BYTES }
    });

    const fields = {};
    let file = null;
    let fileTooLarge = false;

    busboy.on('field', (name, value) => {
      fields[name] = value;
    });

    busboy.on('file', (name, stream, info) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('limit', () => {
        fileTooLarge = true;
      });
      stream.on('end', () => {
        file = {
          buffer: Buffer.concat(chunks),
          filename: info.filename,
          contentType: info.mimeType
        };
      });
    });

    busboy.on('finish', () => {
      if (fileTooLarge) {
        reject(new Error('ATTACHMENT_TOO_LARGE'));
      } else {
        resolve({ fields, file });
      }
    });
    busboy.on('error', reject);

    req.pipe(busboy);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  let fields, file;
  try {
    ({ fields, file } = await parseMultipart(req));
  } catch (err) {
    if (err.message === 'ATTACHMENT_TOO_LARGE') {
      res.status(400).json({ success: false, message: 'Attachment exceeds the 4MB limit.' });
    } else {
      res.status(400).json({ success: false, message: 'Could not parse submission.' });
    }
    return;
  }

  if (!fields['Full Name'] || !fields['Email']) {
    res.status(400).json({ success: false, message: 'Missing required fields.' });
    return;
  }
  if (!file) {
    res.status(400).json({ success: false, message: 'Missing attachment.' });
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
    `Position Applied For: ${fields['Position Applied For'] || ''}`,
    `Full Name: ${fields['Full Name'] || ''}`,
    `Phone Number: ${fields['Phone Number'] || ''}`,
    `Email: ${fields['Email'] || ''}`,
    `Nationality: ${fields['Nationality'] || ''}`,
    `District of Residence: ${fields['District of Residence'] || ''}`,
    `Expected Pay: ${fields['Expected Pay'] || ''}`,
    `Highest Level of Education: ${fields['Highest Level of Education'] || ''}`,
    `Available to Start: ${fields['Available to Start'] || ''}`,
    '',
    `Work History:`,
    fields['Work History'] || '',
    '',
    `Skills & Qualifications:`,
    fields['Skills & Qualifications'] || ''
  ];

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT,
      replyTo: fields['Email'],
      subject: `Job Application: ${fields['Position Applied For']} — ${fields['Full Name']}`,
      text: bodyLines.join('\n'),
      attachments: [
        {
          filename: file.filename,
          content: file.buffer,
          contentType: file.contentType
        }
      ]
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to send application email:', err);
    res.status(502).json({ success: false, message: 'Failed to send email.' });
  }
}
