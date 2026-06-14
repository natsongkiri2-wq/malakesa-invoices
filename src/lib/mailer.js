import nodemailer from 'nodemailer'

export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,     // false = STARTTLS on port 587
    requireTLS: true,  // force STARTTLS (required by Gmail)
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
