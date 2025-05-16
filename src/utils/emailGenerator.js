export const generateEmailFile = (data) => {
  const emailContent = `
To: service@keyawell.or.ug
Subject: New Patient Referral - ${data.patientName}
Content-Type: text/plain

PATIENT REFERRAL DETAILS

Patient Information:
------------------
Name: ${data.patientName}
Date of Birth: ${data.dateOfBirth}
Contact: ${data.contactNumber}
Email: ${data.email}

Referring Doctor:
---------------
Name: ${data.referringDoctor}
Institution: ${data.referringInstitution}
Contact: ${data.doctorContact}

Clinical Information:
------------------
Primary Diagnosis: ${data.diagnosis}
Reason for Referral: ${data.referralReason}
Urgency Level: ${data.urgency}

Required Service:
---------------
Service Type: ${data.serviceType}
Preferred Date: ${data.preferredDate}
Additional Notes: ${data.notes}
`;

  const blob = new Blob([emailContent], { type: 'message/rfc822' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `referral-${data.patientName}-${new Date().toISOString().slice(0, 10)}.eml`;
  return link;
};