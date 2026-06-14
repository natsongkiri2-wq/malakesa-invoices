import { supabase } from '@/lib/supabase'
import { sendMail } from '@/lib/mailer'
import { NextResponse } from 'next/server'

function fmtDate(d) {
  if (!d) return ''
  try { return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch(e) { return d }
}
function fmt(n) { return 'VT ' + Number(n || 0).toLocaleString() }

export async function POST(req) {
  try {
    const { invoiceId, paymentId } = await req.json()

    const { data: inv, error } = await supabase
      .from('invoices').select('*').eq('id', invoiceId).single()
    if (error || !inv) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

    const { data: payment } = await supabase
      .from('payments').select('*').eq('id', paymentId).single()
    if (!payment) return NextResponse.json({ error: 'Payment not found' }, { status: 404 })

    const { data: client } = await supabase
      .from('clients').select('*').eq('id', inv.client_id).single()

    // Collect ALL valid email addresses
    const allEmails = [inv.client_email, client?.email, client?.email2, client?.email3]
      .filter(Boolean).filter(e => e.trim() !== '')
    const uniqueEmails = [...new Set(allEmails)]

    if (uniqueEmails.length === 0)
      return NextResponse.json({ error: 'No email address found for this client' }, { status: 400 })

    const receiptNum = `REC-${inv.number}-${paymentId.slice(-4).toUpperCase()}`

    const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#222;max-width:520px;margin:0 auto;padding:20px;background:#f0ebe0">
    <div style="background:linear-gradient(135deg,#1A0D06,#3D2214,#5C3D0A);padding:24px 32px;border-radius:8px 8px 0 0;text-align:center">
      <div style="font-size:22px;font-weight:900;color:#FFD700;letter-spacing:3px;font-family:Georgia,serif">MALAKESA</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin:5px 0;font-size:8px;font-weight:800;color:rgba(255,215,0,0.85);letter-spacing:4px">
        <div style="flex:1;height:1px;background:rgba(255,215,0,0.4);max-width:50px"></div>
        <span style="color:#FFD700">★</span>
        <div style="flex:1;height:1px;background:rgba(255,215,0,0.4);max-width:50px"></div>
      </div>
      <div style="font-size:8px;font-weight:800;color:rgba(255,215,0,0.85);letter-spacing:4px">TRANSFERS &nbsp; TOURS</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.6);letter-spacing:3px;margin-top:10px">PAYMENT RECEIPT</div>
      <div style="font-size:20px;font-weight:700;color:#FFD700;margin-top:2px">${receiptNum}</div>
    </div>
    <div style="background:#fff;padding:24px 32px;border-radius:0 0 8px 8px;border:1px solid #e0d5c0;border-top:none">
      <div style="text-align:center;margin:16px 0">
        <div style="display:inline-block;border:3px solid #3B6D11;color:#3B6D11;font-size:22px;font-weight:900;letter-spacing:6px;padding:6px 24px;border-radius:4px;transform:rotate(-3deg)">PAID</div>
      </div>
      <div style="background:#faf6ee;border-radius:6px;padding:14px 16px;margin:16px 0">
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0ebe0;font-size:13px"><span style="color:#888">Receipt No.</span><span style="font-weight:600">${receiptNum}</span></div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0ebe0;font-size:13px"><span style="color:#888">Invoice No.</span><span style="font-weight:600">${inv.number}</span></div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0ebe0;font-size:13px"><span style="color:#888">Date paid</span><span style="font-weight:600">${fmtDate(payment.date)}</span></div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px"><span style="color:#888">Payment method</span><span style="font-weight:600">${payment.method}</span></div>
      </div>
      <div style="background:#faf6ee;border-radius:6px;padding:14px 16px;margin:16px 0">
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0ebe0;font-size:13px"><span style="color:#888">Client</span><span style="font-weight:600">${inv.client_name}</span></div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px"><span style="color:#888">Invoice total</span><span style="font-weight:600">${fmt(inv.total)}</span></div>
      </div>
      <div style="background:linear-gradient(135deg,#3D2214,#8B6914);border-radius:6px;padding:14px 20px;display:flex;justify-content:space-between;align-items:center;margin:16px 0">
        <span style="color:#fff;font-weight:700;font-size:15px">AMOUNT RECEIVED</span>
        <span style="color:#FFD700;font-weight:700;font-size:22px">${fmt(payment.amount)}</span>
      </div>
      <p style="text-align:center;font-size:13px;font-style:italic;color:#8B6914;margin:16px 0">Thank you for your payment — Malakesa Transfer &amp; Tour!</p>
      <div style="padding-top:16px;border-top:1px solid #f0ebe0;font-size:11px;color:#999;text-align:center;line-height:1.9">
        Malakesa Transfer and Tour &nbsp;|&nbsp; Port Vila, Vanuatu<br>
        📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
      </div>
    </div></body></html>`

    await sendMail({
      to: uniqueEmails,
      subject: `Payment Receipt ${receiptNum} — Malakesa Transfer and Tour`,
      html,
    })

    return NextResponse.json({ success: true, sentTo: uniqueEmails })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
