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

    const itemsHtml = (inv.items || []).map(it => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee">${it.description}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${it.qty}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${fmt(it.rate)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:500">${fmt(it.total)}</td>
      </tr>`).join('')

    const html = `
      <!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#222;max-width:620px;margin:0 auto;padding:20px">
      <div style="background:#5340B7;padding:24px 28px;border-radius:8px 8px 0 0">
        <div style="color:#fff;font-size:20px;font-weight:bold">Malakesa Transfer &amp; Tour</div>
        <div style="color:rgba(255,255,255,0.8);font-size:13px;margin-top:4px">Port Vila, Vanuatu</div>
      </div>
      <div style="background:#fff;border:1px solid #eee;padding:28px;border-radius:0 0 8px 8px">
        <div style="display:flex;justify-content:space-between;margin-bottom:24px">
          <div>
            <div style="font-size:13px;color:#888">Invoice number</div>
            <div style="font-size:22px;font-weight:bold;color:#5340B7">${inv.number}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:12px;color:#888">Issue date: ${fmtDate(inv.date)}</div>
            <div style="font-size:12px;color:#888;margin-top:2px">Due date: <strong style="color:#D85A30">${fmtDate(inv.due_date)}</strong></div>
          </div>
        </div>
        <p>Dear <strong>${inv.client_name}</strong>,</p>
        <p style="color:#555;font-size:14px">Please find below your invoice from Malakesa Transfer and Tour.</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px">
          <thead><tr style="background:#f5f5f5">
            <th style="padding:8px 12px;text-align:left;font-size:12px;color:#666">Description</th>
            <th style="padding:8px 12px;text-align:center;font-size:12px;color:#666">Qty</th>
            <th style="padding:8px 12px;text-align:right;font-size:12px;color:#666">Rate</th>
            <th style="padding:8px 12px;text-align:right;font-size:12px;color:#666">Total</th>
          </tr></thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <div style="margin-left:auto;width:260px">
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;font-size:13px"><span style="color:#888">Subtotal</span><span>${fmt(inv.subtotal)}</span></div>
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;font-size:13px"><span style="color:#888">Tax (0%)</span><span>VT 0</span></div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;font-weight:bold;font-size:16px"><span>Total</span><span>${fmt(inv.total)}</span></div>
          <div style="display:flex;justify-content:space-between;padding:6px 0;font-weight:bold;color:${balance > 0 ? '#D85A30' : '#3B6D11'}"><span>Balance due</span><span>${fmt(balance)}</span></div>
        </div>
        ${inv.notes ? `<div style="margin-top:20px;padding:12px;background:#f9f9f9;border-radius:6px;font-size:13px;color:#555">${inv.notes}</div>` : ''}
        <div style="margin-top:28px;padding-top:20px;border-top:1px solid #eee;font-size:12px;color:#888">
          <p>Please make payment by <strong>${fmtDate(inv.due_date)}</strong>.</p>
          <p>Malakesa Transfer and Tour | Port Vila, Vanuatu | accounts@malakesa.vu</p>
        </div>
      </div></body></html>`

    await resend.emails.send({
      from: `${process.env.COMPANY_NAME} <${process.env.COMPANY_EMAIL}>`,
      to: [inv.client_email],
      subject: `Invoice ${inv.number} from Malakesa Transfer and Tour`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
