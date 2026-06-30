import { supabase } from '@/lib/supabase'
import { sendMail } from '@/lib/mailer'
import { NextResponse } from 'next/server'

function fmtDate(d) {
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
function fmt(n) { return 'VT ' + Number(n || 0).toLocaleString() }

export async function POST(req) {
  try {
    const { invoiceId } = await req.json()

    const { data: inv, error } = await supabase
      .from('invoices').select('*').eq('id', invoiceId).single()
    if (error || !inv) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

    // Get client to find ALL email addresses
    const { data: client } = await supabase
      .from('clients').select('*').eq('id', inv.client_id).single()

    const { data: payments } = await supabase
      .from('payments').select('*').eq('invoice_id', invoiceId)

    const totalPaid = (payments || []).reduce((s, p) => s + Number(p.amount), 0)
    const balance = Math.max(0, Number(inv.total) - totalPaid)

    if (balance <= 0) {
      return NextResponse.json({ error: 'This invoice is already fully paid' }, { status: 400 })
    }

    // Collect ALL valid email addresses
    const allEmails = [
      inv.client_email,
      client?.email,
      client?.email2,
      client?.email3
    ].filter(Boolean).filter(e => e.trim() !== '')
    const uniqueEmails = [...new Set(allEmails)]

    if (uniqueEmails.length === 0) {
      return NextResponse.json({ error: 'No email address found for this client' }, { status: 400 })
    }

    const today = new Date()
    const dueDate = new Date(inv.due_date + 'T00:00:00')
    const isOverdue = dueDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const daysOverdue = isOverdue ? Math.floor((today - dueDate) / (1000 * 60 * 60 * 24)) : 0

    const statusLabel = isOverdue
      ? `<span style="color:#D85A30;font-weight:700">OVERDUE by ${daysOverdue} day${daysOverdue === 1 ? '' : 's'}</span>`
      : `Due ${fmtDate(inv.due_date)}`

    const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#222;max-width:640px;margin:0 auto;padding:20px;background:#f0ebe0">
    <div style="background:linear-gradient(135deg,#1A0D06,#3D2214,#5C3D0A);padding:28px 32px;border-radius:8px 8px 0 0">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgdmlld0JveD0iMCAwIDY4MCAxODAiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPHRpdGxlPk1hbGFrZXNhIFRyYW5zZmVyIGFuZCBUb3VyIGxvZ288L3RpdGxlPg0KICA8ZGVmcz4NCiAgICA8c3R5bGU+QGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UGxheWZhaXIrRGlzcGxheTp3Z2h0QDkwMCZkaXNwbGF5PXN3YXAnKTs8L3N0eWxlPg0KICA8L2RlZnM+DQogIDx0ZXh0IHg9IjM0MCIgeT0iOTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSInUGxheWZhaXIgRGlzcGxheScsIEdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9Ijg4IiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSIjNkI0QTBGIiBsZXR0ZXItc3BhY2luZz0iNSIgc3R5bGU9InBhaW50LW9yZGVyOnN0cm9rZTsgc3Ryb2tlOiM1YTNkMGE7IHN0cm9rZS13aWR0aDoycHg7IHN0cm9rZS1saW5lam9pbjpyb3VuZCI+TUFMQUtFU0E8L3RleHQ+DQogIDxyZWN0IHg9IjQwIiB5PSIxMTQiIHdpZHRoPSI2MDAiIGhlaWdodD0iMi41IiBmaWxsPSIjNkI0QTBGIi8+DQogIDxlbGxpcHNlIGN4PSIzNDAiIGN5PSIxMzgiIHJ4PSI3OCIgcnk9IjM1IiBmaWxsPSIjN0E1NTE4IiBzdHJva2U9IiM0YTMwMDgiIHN0cm9rZS13aWR0aD0iMi41Ii8+DQogIDxlbGxpcHNlIGN4PSIzNDAiIGN5PSIxMzgiIHJ4PSI3MSIgcnk9IjI4IiBmaWxsPSJub25lIiBzdHJva2U9IiNjOGEwNGEiIHN0cm9rZS13aWR0aD0iMS41Ii8+DQogIDxwb2x5Z29uIHBvaW50cz0iMzQwLDExNiAzNDcsMTMyIDM2NiwxMzIgMzUyLDE0MyAzNTcsMTYwIDM0MCwxNTAgMzIzLDE2MCAzMjgsMTQzIDMxNCwxMzIgMzMzLDEzMiIgZmlsbD0iIzFhMTAwOCIgc3Ryb2tlPSIjMWExMDA4IiBzdHJva2Utd2lkdGg9IjEiLz4NCiAgPHRleHQgeD0iMTQ4IiB5PSIxNjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iMyIgZmlsbD0iIzZCNEEwRiI+VFJBTlNGRVJTPC90ZXh0Pg0KICA8dGV4dCB4PSI1MzIiIHk9IjE2MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI3MDAiIGxldHRlci1zcGFjaW5nPSIzIiBmaWxsPSIjNkI0QTBGIj5UT1VSUzwvdGV4dD4NCjwvc3ZnPg0K" alt="Malakesa Transfer and Tour" style="width:220px;display:block;border-radius:4px" />
          <div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:10px;line-height:1.9">
            📍 Port Vila, Shefa Province, Vanuatu<br>
            📞 +678 22712 &nbsp;|&nbsp; 📱 7798712<br>
            ✉️ accounts@malakesa.vu
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:10px;color:rgba(255,255,255,0.6);letter-spacing:2px;margin-bottom:4px">PAYMENT REMINDER</div>
          <div style="font-size:28px;font-weight:700;color:#FFD700">${inv.number}</div>
        </div>
      </div>
    </div>
    <div style="background:#fff;padding:28px 32px;border-radius:0 0 8px 8px;border:1px solid #e0d5c0;border-top:none">
      <p style="font-size:14px;line-height:1.6">Dear ${inv.client_name},</p>
      <p style="font-size:14px;line-height:1.6">This is a friendly reminder that invoice <strong>${inv.number}</strong> has an outstanding balance, ${statusLabel}.</p>
      <div style="margin:20px 0;padding:16px 20px;background:linear-gradient(135deg,#3D2214,#8B6914);border-radius:6px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-weight:700;color:#fff;font-size:15px">BALANCE DUE</span>
        <span style="font-weight:700;color:#FFD700;font-size:20px">${fmt(balance)}</span>
      </div>
      <div style="font-size:13px;color:#888;margin-bottom:20px">
        Invoice date: ${fmtDate(inv.date)}<br>
        Due date: ${fmtDate(inv.due_date)}<br>
        Invoice total: ${fmt(inv.total)}
        ${totalPaid > 0 ? `<br>Already paid: ${fmt(totalPaid)}` : ''}
      </div>
      <p style="font-size:14px;line-height:1.6">Please arrange payment at your earliest convenience. If you have already made this payment, please disregard this notice.</p>
      <p style="text-align:center;font-size:13px;font-style:italic;color:#8B6914;margin:28px 0 16px">Thank you for choosing Malakesa Transfer &amp; Tour!</p>
      <div style="padding-top:16px;border-top:1px solid #f0ebe0;font-size:11px;color:#999;text-align:center;line-height:1.9">
        Malakesa Transfer and Tour &nbsp;|&nbsp; Port Vila, Vanuatu<br>
        📞 +678 22712 &nbsp;|&nbsp; 📱 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
      </div>
    </div></body></html>`

    await sendMail({
      to: uniqueEmails,
      subject: `Payment Reminder — Invoice ${inv.number}${isOverdue ? ' (OVERDUE)' : ''}`,
      html,
    })

    return NextResponse.json({ success: true, sentTo: uniqueEmails })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
