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
    const { invoiceId, pdfBase64 } = await req.json()

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

    const itemCount = (inv.items || []).length

    const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#222;max-width:600px;margin:0 auto;padding:20px;background:#FBF3E4">
    <div style="background:linear-gradient(135deg,#6B4423,#8B5E34,#A67C42);padding:14px 28px;border-radius:8px 8px 0 0">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <img src="https://malakesa-invoices.vercel.app/malakesa-logo.png" alt="Malakesa Transfers and Tours" style="width:120px;display:block;border-radius:4px" />
          <div style="font-size:9px;color:rgba(255,255,255,0.75);margin-top:3px">
            📍 Port Vila, Vanuatu &nbsp;|&nbsp; 📞 +678 22712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:10px;color:rgba(255,255,255,0.75);letter-spacing:1px">TAX INVOICE &nbsp;·&nbsp; TIN #445579</div>
          <div style="font-size:19px;font-weight:700;color:#F5D98A">${inv.number}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.8)">
            Issue: ${fmtDate(inv.date)} &nbsp;·&nbsp; Due: <strong style="color:#F5D98A">${fmtDate(inv.due_date)}</strong>
          </div>
        </div>
      </div>
    </div>
    <div style="background:#fff;padding:28px 32px;border-radius:0 0 8px 8px;border:1px solid #e0d5c0;border-top:none">
      <p style="font-size:14px;line-height:1.6">Dear ${inv.client_name},</p>
      <p style="font-size:14px;line-height:1.6">Please find attached your invoice <strong>${inv.number}</strong> (PDF), covering ${itemCount} item${itemCount === 1 ? '' : 's'}.</p>
      <div style="margin:20px 0;padding:16px 20px;background:linear-gradient(135deg,#8B5E34,#8B6914);border-radius:6px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-weight:700;color:#fff;font-size:15px">TOTAL DUE</span>
        <span style="font-weight:700;color:#F5D98A;font-size:20px">${fmt(inv.total)}</span>
      </div>
      ${totalPaid > 0 ? `
      <div style="display:flex;justify-content:space-between;padding:7px 0;font-size:13px;color:#3B6D11;font-weight:600"><span>Amount paid</span><span>- ${fmt(totalPaid)}</span></div>
      <div style="display:flex;justify-content:space-between;padding:8px 12px;background:${balance > 0 ? '#FAEEDA' : '#EAF3DE'};border-radius:6px;font-size:14px;font-weight:700;color:${balance > 0 ? '#8B6914' : '#27500A'};margin-bottom:14px"><span>Balance due</span><span>${fmt(balance)}</span></div>
      ` : ''}
      <div style="font-size:13px;color:#888;margin-bottom:16px">
        Invoice date: ${fmtDate(inv.date)}<br>
        Due date: ${fmtDate(inv.due_date)}
      </div>
      ${inv.notes ? `<div style="margin-bottom:16px;padding:12px 16px;background:#faf6ee;border-left:4px solid #8B6914;border-radius:0 6px 6px 0;font-size:12px;color:#555"><strong>Notes:</strong> ${inv.notes}</div>` : ''}
      ${balance > 0 ? `<div style="margin-bottom:16px;padding:14px 18px;border:1px solid #e0d5c0;border-radius:6px;font-size:12px;line-height:1.9;color:#444">
        <div style="font-weight:700;color:#3D2214;margin-bottom:4px">Invoice Payment by Electronic Transfer to the following Account:</div>
        <div>ANZ Vanuatu Ltd, Port Vila, Vanuatu</div>
        <div><strong>ACCOUNT NAME:</strong> Malakesa Transfers &amp; Tours</div>
        <div><strong>BRANCH BSB NO:</strong> 010982</div>
        <div><strong>ACCOUNT NO:</strong> 1406817</div>
        <div><strong>SWIFT CODE:</strong> ANZBVUVX</div>
      </div>` : ''}
      <p style="font-size:13px;color:#888;line-height:1.6">The full breakdown of items and rates is in the attached PDF.</p>
      <p style="text-align:center;font-size:13px;font-style:italic;color:#8B6914;margin:28px 0 16px">Thank you for choosing Malakesa Transfers &amp; Tours!</p>
      <div style="padding-top:16px;border-top:1px solid #FBF3E4;font-size:11px;color:#999;text-align:center;line-height:1.9">
        Malakesa Transfers and Tours &nbsp;|&nbsp; Port Vila, Vanuatu<br>
        📞 +678 22712 &nbsp;|&nbsp; 📱 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
      </div>
    </div></body></html>`

    const attachments = pdfBase64
      ? [{ filename: `${inv.number}.pdf`, content: Buffer.from(pdfBase64, 'base64'), contentType: 'application/pdf' }]
      : undefined

    await sendMail({
      to: uniqueEmails,
      subject: `Invoice ${inv.number} from Malakesa Transfers and Tours`,
      html,
      attachments,
    })

    const lastEmailedAt = new Date().toISOString()
    await supabase.from('invoices').update({ last_emailed_at: lastEmailedAt }).eq('id', invoiceId)

    return NextResponse.json({ success: true, sentTo: uniqueEmails, lastEmailedAt })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
