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

export async function sendMail({ to, subject, html, attachments }) {
  const transporter = getTransporter()
  const fromName = process.env.COMPANY_NAME || 'Malakesa Transfers and Tours'
  const fromAddress = process.env.EMAIL_USER
  // Client replies always go to this address (override with REPLY_TO_EMAIL in Vercel if needed)
  const replyTo = process.env.REPLY_TO_EMAIL || 'res@malakesa.vu'

  return transporter.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    replyTo,
    to,
    subject,
    html,
    attachments,
  })
}
