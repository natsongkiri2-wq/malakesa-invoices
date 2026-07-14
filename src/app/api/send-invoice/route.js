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

    const itemsHtml = (inv.items || []).map(it => `
      <tr>
        <td style="padding:9px 12px;border-bottom:1px solid #f0ebe0;color:#555">${it.date || '-'}</td>
        <td style="padding:9px 12px;border-bottom:1px solid #f0ebe0;color:#555">${it.name || '-'}</td>
        <td style="padding:9px 12px;border-bottom:1px solid #f0ebe0">${it.description}</td>
        <td style="padding:9px 12px;border-bottom:1px solid #f0ebe0;color:#555">${it.voucher || '-'}</td>
        <td style="padding:9px 12px;border-bottom:1px solid #f0ebe0;text-align:center">${it.qty}</td>
        <td style="padding:9px 12px;border-bottom:1px solid #f0ebe0;text-align:right">${fmt(it.rate)}</td>
        <td style="padding:9px 12px;border-bottom:1px solid #f0ebe0;text-align:right;font-weight:600">${fmt(it.total)}</td>
      </tr>`).join('')

    const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#222;max-width:640px;margin:0 auto;padding:20px;background:#f0ebe0">
    <div style="background:linear-gradient(135deg,#1A0D06,#3D2214,#5C3D0A);padding:28px 32px;border-radius:8px 8px 0 0">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <img src="https://malakesa-invoices.vercel.app/malakesa-logo.png" alt="Malakesa Transfer and Tour" style="width:220px;display:block;border-radius:4px" />
          <div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:10px;line-height:1.9">
            📍 Port Vila, Shefa Province, Vanuatu<br>
            📞 +678 22712 &nbsp;|&nbsp; 📱 7798712<br>
            ✉️ accounts@malakesa.vu
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:16px;font-weight:700;color:rgba(255,255,255,0.85);letter-spacing:1.5px;margin-bottom:3px">TAX INVOICE</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.75);margin-bottom:4px">TIN # 445579</div>
          <div style="font-size:28px;font-weight:700;color:#FFD700">${inv.number}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.8);margin-top:6px;line-height:1.9">
            Issue: ${fmtDate(inv.date)}<br>
            Due: <strong style="color:#FFD700">${fmtDate(inv.due_date)}</strong>
          </div>
        </div>
      </div>
    </div>
    <div style="background:#fff;padding:28px 32px;border-radius:0 0 8px 8px;border:1px solid #e0d5c0;border-top:none">
      <div style="display:flex;justify-content:space-between;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid #f0ebe0">
        <div>
          <div style="font-size:9px;font-weight:800;color:#8B6914;text-transform:uppercase;letter-spacing:2px;margin-bottom:6px;border-bottom:2px solid #8B6914;padding-bottom:3px;display:inline-block">Bill To</div>
          <div style="font-size:15px;font-weight:700">${inv.client_name}</div>
          ${uniqueEmails.length > 1
            ? `<div style="font-size:11px;color:#888;margin-top:3px">${uniqueEmails.join(' &nbsp;|&nbsp; ')}</div>`
            : `<div style="font-size:12px;color:#888;margin-top:3px">${uniqueEmails[0]}</div>`}
        </div>
      </div>
      ${inv.notes ? `<div style="margin-top:0;margin-bottom:20px;padding:12px 16px;background:#faf6ee;border-left:4px solid #8B6914;border-radius:0 6px 6px 0;font-size:12px;color:#555"><strong>Notes:</strong> ${inv.notes}</div>` : ''}
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:linear-gradient(135deg,#3D2214,#8B6914)">
          <th style="padding:10px 12px;text-align:left;color:#FFD700;font-size:10px;letter-spacing:1px;font-weight:700">DATE</th>
          <th style="padding:10px 12px;text-align:left;color:#FFD700;font-size:10px;letter-spacing:1px;font-weight:700">NAME</th>
          <th style="padding:10px 12px;text-align:left;color:#FFD700;font-size:10px;letter-spacing:1px;font-weight:700">DESCRIPTION</th>
          <th style="padding:10px 12px;text-align:left;color:#FFD700;font-size:10px;letter-spacing:1px;font-weight:700">VOUCHER #</th>
          <th style="padding:10px 12px;text-align:center;color:#FFD700;font-size:10px;letter-spacing:1px;font-weight:700">QTY</th>
          <th style="padding:10px 12px;text-align:right;color:#FFD700;font-size:10px;letter-spacing:1px;font-weight:700">RATE (VT)</th>
          <th style="padding:10px 12px;text-align:right;color:#FFD700;font-size:10px;letter-spacing:1px;font-weight:700">TOTAL (VT)</th>
        </tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <div style="margin-left:auto;width:270px;margin-top:16px">
        <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #f0ebe0;font-size:13px"><span style="color:#888">Subtotal</span><span>${fmt(inv.subtotal)}</span></div>
        <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #f0ebe0;font-size:13px"><span style="color:#888">${Number(inv.tax) > 0 ? 'VAT (15%)' : 'VAT'}</span><span>${Number(inv.tax) > 0 ? fmt(inv.tax) : 'Not applicable'}</span></div>
        <div style="display:flex;justify-content:space-between;padding:12px 16px;background:linear-gradient(135deg,#3D2214,#8B6914);border-radius:6px;margin-top:10px">
          <span style="font-weight:700;color:#fff;font-size:15px">TOTAL DUE</span>
          <span style="font-weight:700;color:#FFD700;font-size:15px">${fmt(inv.total)}</span>
        </div>
        ${balance < inv.total && totalPaid > 0 ? `
        <div style="display:flex;justify-content:space-between;padding:7px 0;font-size:13px;color:#3B6D11;font-weight:600"><span>Amount paid</span><span>- ${fmt(totalPaid)}</span></div>
        <div style="display:flex;justify-content:space-between;padding:8px 12px;background:${balance > 0 ? '#FAEEDA' : '#EAF3DE'};border-radius:6px;font-size:14px;font-weight:700;color:${balance > 0 ? '#8B6914' : '#27500A'}"><span>Balance due</span><span>${fmt(balance)}</span></div>
        ` : ''}
      </div>
      <p style="text-align:center;font-size:13px;font-style:italic;color:#8B6914;margin:28px 0 16px">Thank you for choosing Malakesa Transfer &amp; Tour!</p>
      <div style="padding-top:16px;border-top:1px solid #f0ebe0;font-size:11px;color:#999;text-align:center;line-height:1.9">
        Malakesa Transfer and Tour &nbsp;|&nbsp; Port Vila, Vanuatu<br>
        📞 +678 22712 &nbsp;|&nbsp; 📱 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
      </div>
    </div></body></html>`

    await sendMail({
      to: uniqueEmails,
      subject: `Invoice ${inv.number} from Malakesa Transfer and Tour`,
      html,
    })

    return NextResponse.json({ success: true, sentTo: uniqueEmails })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
