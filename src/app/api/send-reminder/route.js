import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    const { data: payments } = await supabase
      .from('payments').select('*').eq('invoice_id', invoiceId)

    const totalPaid = (payments || []).reduce((s, p) => s + Number(p.amount), 0)
    const balance = Math.max(0, Number(inv.total) - totalPaid)

    const today = new Date().toISOString().split('T')[0]
    const isOverdue = inv.due_date < today
    const subjectLine = isOverdue
      ? `Overdue: Invoice ${inv.number} — Action Required`
      : `Friendly Reminder: Invoice ${inv.number} Due ${fmtDate(inv.due_date)}`

    const html = `
      <!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#222;max-width:580px;margin:0 auto;padding:20px">
      <div style="background:${isOverdue ? '#A32D2D' : '#5340B7'};padding:20px 28px;border-radius:8px 8px 0 0">
        <div style="color:#fff;font-size:18px;font-weight:bold">Malakesa Transfer &amp; Tour</div>
        <div style="color:rgba(255,255,255,0.8);font-size:12px;margin-top:3px">Payment ${isOverdue ? 'Overdue Notice' : 'Reminder'}</div>
      </div>
      <div style="background:#fff;border:1px solid #eee;padding:28px;border-radius:0 0 8px 8px">
        <p>Dear <strong>${inv.client_name}</strong>,</p>
        ${isOverdue
          ? `<div style="background:#FCEBEB;border:1px solid #F7C1C1;border-radius:6px;padding:12px 16px;margin:16px 0;font-size:14px;color:#791F1F"><strong>⚠️ Your invoice is overdue.</strong> Invoice ${inv.number} was due on ${fmtDate(inv.due_date)} and has not been paid.</div>`
          : `<p style="color:#555;font-size:14px">This is a friendly reminder that the following invoice is due soon.</p>`
        }
        <div style="background:#f9f9f9;border-radius:8px;padding:16px 20px;margin:20px 0">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="color:#888;font-size:13px">Invoice number</span><span style="font-weight:bold">${inv.number}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="color:#888;font-size:13px">Invoice total</span><span>${fmt(inv.total)}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="color:#888;font-size:13px">Already paid</span><span style="color:#3B6D11">${fmt(totalPaid)}</span></div>
          <div style="display:flex;justify-content:space-between;border-top:1px solid #ddd;padding-top:8px;margin-top:4px"><span style="font-weight:bold">Balance due</span><span style="font-weight:bold;font-size:18px;color:#D85A30">${fmt(balance)}</span></div>
          <div style="display:flex;justify-content:space-between;margin-top:6px"><span style="color:#888;font-size:12px">Due date</span><span style="font-size:12px;color:${isOverdue ? '#A32D2D' : '#333'};font-weight:${isOverdue ? 'bold' : 'normal'}">${fmtDate(inv.due_date)}${isOverdue ? ' (OVERDUE)' : ''}</span></div>
        </div>
        <p style="font-size:14px;color:#555">Please arrange payment at your earliest convenience. If you have already made payment, please disregard this notice.</p>
        <p style="font-size:14px;color:#555">If you have any questions, please don't hesitate to contact us.</p>
        <div style="margin-top:28px;padding-top:16px;border-top:1px solid #eee;font-size:12px;color:#999">
          Malakesa Transfer and Tour | Port Vila, Vanuatu | info@malakesa.vu
        </div>
      </div></body></html>`

    await resend.emails.send({
      from: `${process.env.COMPANY_NAME} <${process.env.COMPANY_EMAIL}>`,
      to: [inv.client_email],
      subject: subjectLine,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
