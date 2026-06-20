import nodemailer from 'nodemailer'

const MALAKESA_LOGO_PLACEHOLDER = '' // logo omitted from email body to keep email size small

function buildScheduleEmailHtml({ monthLabel, rows, totals }) {
  const rowsHtml = rows.map(r => `
    <tr>
      <td style="padding:8px 10px;border-bottom:1px solid #f0ebe0;">${r.name}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #f0ebe0;">${r.vnpf_number || '—'}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #f0ebe0;text-align:right;">VT ${Number(r.salary || 0).toLocaleString()}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #f0ebe0;text-align:right;">VT ${Number(r.employee || 0).toLocaleString()}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #f0ebe0;text-align:right;">VT ${Number(r.employer || 0).toLocaleString()}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #f0ebe0;text-align:right;font-weight:600;color:#2E7D2E;">VT ${Number(r.total || 0).toLocaleString()}</td>
    </tr>`).join('')

  return `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#222;">
    <div style="background:linear-gradient(135deg,#1A0D06,#3D2214,#5C3D0A);padding:24px 32px;">
      <div style="color:#FFD700;font-size:20px;font-weight:700;font-family:Georgia,serif;letter-spacing:1px;">MALAKESA TRANSFER &amp; TOUR</div>
      <div style="color:rgba(255,255,255,0.75);font-size:11px;margin-top:6px;">Port Vila, Shefa Province, Vanuatu &nbsp;|&nbsp; TIN: 445579</div>
    </div>
    <div style="padding:28px 32px;">
      <h2 style="color:#3D2214;font-size:18px;margin-bottom:4px;">VNPF Contribution Schedule</h2>
      <div style="color:#888;font-size:13px;margin-bottom:20px;">Period: <strong>${monthLabel}</strong> &nbsp;|&nbsp; Employee rate: 6% &nbsp;|&nbsp; Employer rate: 6%</div>

      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px;">
        <div style="background:#f5f5f5;border-radius:8px;padding:10px 16px;">
          <div style="font-size:10px;color:#666;text-transform:uppercase;">Total Gross Salaries</div>
          <div style="font-size:16px;font-weight:700;">VT ${Number(totals.totalSalary).toLocaleString()}</div>
        </div>
        <div style="background:#f5f5f5;border-radius:8px;padding:10px 16px;">
          <div style="font-size:10px;color:#666;text-transform:uppercase;">Employee Contributions</div>
          <div style="font-size:16px;font-weight:700;">VT ${Number(totals.totalEmployee).toLocaleString()}</div>
        </div>
        <div style="background:#f5f5f5;border-radius:8px;padding:10px 16px;">
          <div style="font-size:10px;color:#666;text-transform:uppercase;">Employer Contributions</div>
          <div style="font-size:16px;font-weight:700;">VT ${Number(totals.totalEmployer).toLocaleString()}</div>
        </div>
        <div style="background:#EAF3DE;border-radius:8px;padding:10px 16px;">
          <div style="font-size:10px;color:#27500A;text-transform:uppercase;">Total Payable</div>
          <div style="font-size:16px;font-weight:700;color:#27500A;">VT ${Number(totals.totalContribution).toLocaleString()}</div>
        </div>
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#E8D5A3;">
            <th style="padding:8px 10px;text-align:left;font-size:10px;text-transform:uppercase;color:#3D2214;">Employee</th>
            <th style="padding:8px 10px;text-align:left;font-size:10px;text-transform:uppercase;color:#3D2214;">VNPF No.</th>
            <th style="padding:8px 10px;text-align:right;font-size:10px;text-transform:uppercase;color:#3D2214;">Gross Salary</th>
            <th style="padding:8px 10px;text-align:right;font-size:10px;text-transform:uppercase;color:#3D2214;">Employee 6%</th>
            <th style="padding:8px 10px;text-align:right;font-size:10px;text-transform:uppercase;color:#3D2214;">Employer 6%</th>
            <th style="padding:8px 10px;text-align:right;font-size:10px;text-transform:uppercase;color:#3D2214;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
          <tr style="background:#E8D5A3;font-weight:700;">
            <td colspan="2" style="padding:9px 10px;">TOTAL (${rows.length} employees)</td>
            <td style="padding:9px 10px;text-align:right;">VT ${Number(totals.totalSalary).toLocaleString()}</td>
            <td style="padding:9px 10px;text-align:right;">VT ${Number(totals.totalEmployee).toLocaleString()}</td>
            <td style="padding:9px 10px;text-align:right;">VT ${Number(totals.totalEmployer).toLocaleString()}</td>
            <td style="padding:9px 10px;text-align:right;">VT ${Number(totals.totalContribution).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <p style="font-size:11px;color:#999;margin-top:20px;">This schedule was generated automatically by Malakesa Transfer and Tour's invoice management system. Please verify all figures before processing.</p>
    </div>
    <div style="background:linear-gradient(135deg,#1A0D06,#5C3D0A);padding:14px 32px;color:rgba(255,255,255,0.7);font-size:11px;">
      Malakesa Transfer and Tour &nbsp;|&nbsp; Port Vila, Vanuatu &nbsp;|&nbsp; +678 22712 &nbsp;|&nbsp; accounts@malakesa.vu
    </div>
  </div>`
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { month, monthLabel, rows, totals } = body

    if (!rows || !rows.length) {
      return Response.json({ error: 'No employee data provided' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const html = buildScheduleEmailHtml({ monthLabel, rows, totals })

    const recipient = process.env.VNPF_EMAIL || process.env.COMPANY_EMAIL || process.env.EMAIL_USER

    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME || 'Malakesa Transfer and Tour'}" <${process.env.EMAIL_USER}>`,
      to: recipient,
      cc: process.env.COMPANY_EMAIL,
      subject: `VNPF Contribution Schedule — ${monthLabel}`,
      html,
    })

    return Response.json({ success: true, sentTo: [recipient].filter(Boolean) })
  } catch (error) {
    console.error('send-vnpf error:', error)
    return Response.json({ error: error.message || 'Failed to send email' }, { status: 500 })
  }
}
