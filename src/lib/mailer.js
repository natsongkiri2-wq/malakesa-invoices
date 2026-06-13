import nodemailer from 'nodemailer'

export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.vanuatu.com.vu',
    port: Number(process.env.EMAIL_PORT || 25),
    secure: process.env.EMAIL_SECURE === 'true', // false for port 25/587 without SSL
    ignoreTLS: process.env.EMAIL_IGNORE_TLS !== 'false', // server uses "None" encryption
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
}

export async function sendMail({ to, subject, html }) {
  const transporter = getTransporter()
  const fromName = process.env.COMPANY_NAME || 'Malakesa Transfer and Tour'
  const fromAddress = process.env.EMAIL_USER

  return transporter.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    subject,
    html,
  })
}
