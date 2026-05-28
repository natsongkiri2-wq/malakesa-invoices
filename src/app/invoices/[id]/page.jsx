'use client'
import { useEffect, useState, Suspense } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { fmt, fmtDate, getStatus, getBalance, today } from '@/lib/utils'

function InvoiceDetail() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [inv, setInv] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPayModal, setShowPayModal] = useState(searchParams.get('pay') === '1')
  const [payForm, setPayForm] = useState({ amount: '', method: 'Cash', date: today(), note: '' })
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [emailSending, setEmailSending] = useState(false)

  const load = () => {
    fetch(`/api/invoices/${id}`).then(r => r.json()).then(data => {
      setInv(data)
      setPayForm(f => ({ ...f, amount: getBalance(data) }))
      setLoading(false)
    })
  }

  useEffect(() => { load() }, [id])

  const recordPayment = async () => {
    if (!payForm.amount || payForm.amount <= 0) return
    setSaving(true)
    await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoice_id: id, ...payForm, amount: parseFloat(payForm.amount) })
    })
    setSaving(false)
    setShowPayModal(false)
    setNotice('Payment recorded successfully!')
    setTimeout(() => setNotice(''), 3000)
    load()
  }

  const sendEmail = async (type) => {
    setEmailSending(true)
    await fetch(`/api/${type === 'reminder' ? 'send-reminder' : 'send-invoice'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId: id })
    })
    setEmailSending(false)
    setNotice(type === 'reminder' ? 'Reminder sent!' : 'Invoice emailed!')
    setTimeout(() => setNotice(''), 3000)
  }

  const printInvoice = () => {
    const payments = inv.payments || []
    const balance = getBalance(inv)
    const w = window.open('', '_blank')
    w.document.write(`<!DOCTYPE html><html><head><title>${inv.number}</title>
    <style>
      body{font-family:Arial,sans-serif;margin:40px;color:#222;font-size:14px}
      .header{display:flex;justify-content:space-between;margin-bottom:32px}
      .company{font-size:22px;font-weight:bold;color:#5340B7}
      .sub{color:#888;font-size:12px;margin-top:2px}
      table{width:100%;border-collapse:collapse;margin:20px 0}
      th{background:#f5f5f5;padding:8px 12px;text-align:left;font-size:12px;color:#666;border-bottom:1px solid #eee}
      td{padding:10px 12px;border-bottom:1px solid #eee}
      .totals{margin-left:auto;width:280px;margin-top:12px}
      .tr{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #eee;font-size:13px}
      .tr.last{font-weight:bold;font-size:15px;border-bottom:none}
      .bal{color:${balance>0?'#D85A30':'#3B6D11'};font-weight:bold}
      .notes{margin-top:24px;padding:14px;background:#f9f9f9;border-radius:8px;font-size:13px;color:#555}
      .pmts{margin-top:20px;font-size:13px}
      .pmt{padding:6px 0;border-bottom:1px solid #eee;display:flex;justify-content:space-between}
    </style></head><body>
    <div class="header">
      <div><div class="company">Malakesa Transfer &amp; Tour</div><div class="sub">Port Vila, Vanuatu</div><div class="sub">info@malakesa.vu | +678 00000</div></div>
      <div style="text-align:right"><div style="font-size:26px;font-weight:bold;color:#5340B7">${inv.number}</div><div class="sub">Issue: ${fmtDate(inv.date)}</div><div class="sub">Due: ${fmtDate(inv.due_date)}</div></div>
    </div>
    <div style="margin-bottom:24px"><strong>Bill to:</strong><br>${inv.client_name}<br><span style="color:#888;font-size:13px">${inv.client_email || ''}</span></div>
    <table><thead><tr><th>Description</th><th>Qty</th><th>Rate (VT)</th><th>Total (VT)</th></tr></thead>
    <tbody>${(inv.items || []).map(it => `<tr><td>${it.description}</td><td>${it.qty}</td><td>${Number(it.rate).toLocaleString()}</td><td>${Number(it.total).toLocaleString()}</td></tr>`).join('')}</tbody></table>
    <div class="totals">
      <div class="tr"><span>Subtotal</span><span>VT ${Number(inv.subtotal).toLocaleString()}</span></div>
      <div class="tr"><span>Tax (0%)</span><span>VT 0</span></div>
      <div class="tr last"><span>Total</span><span>VT ${Number(inv.total).toLocaleString()}</span></div>
      <div class="tr bal"><span>Balance due</span><span>VT ${Number(balance).toLocaleString()}</span></div>
    </div>
    ${inv.notes ? `<div class="notes">${inv.notes}</div>` : ''}
    ${payments.length > 0 ? `<div class="pmts"><strong>Payments received:</strong>${payments.map(p => `<div class="pmt"><span>${fmtDate(p.date)} — ${p.method}</span><span style="color:#3B6D11;font-weight:bold">VT ${Number(p.amount).toLocaleString()}</span></div>`).join('')}</div>` : ''}
    <script>window.onload=()=>{window.print();}<\/script></body></html>`)
    w.document.close()
  }

  if (loading) return <><div className="topbar"><h1>Invoice</h1></div><div className="content"><div className="loading">Loading...</div></div></>
  if (!inv) return <><div className="topbar"><h1>Invoice</h1></div><div className="content"><div className="alert alert-danger">Invoice not found.</div></div></>

  const status = getStatus(inv)
  const balance = getBalance(inv)

  return (
    <>
      <div className="topbar">
        <div>
          <h1>{inv.number}</h1>
          <span className={`badge badge-${status}`} style={{ marginTop: 4 }}>{status}</span>
        </div>
        <div className="action-row">
          <button className="btn btn-sm" onClick={printInvoice}><i className="ti ti-printer"></i> Print</button>
          <button className="btn btn-sm" onClick={() => sendEmail('invoice')} disabled={emailSending}>
            <i className="ti ti-mail"></i> {emailSending ? 'Sending...' : 'Email'}
          </button>
          {balance > 0 && <button className="btn btn-sm btn-success" onClick={() => setShowPayModal(true)}><i className="ti ti-cash"></i> Record payment</button>}
          <button className="btn btn-sm" onClick={() => router.push('/invoices')}><i className="ti ti-arrow-left"></i> Back</button>
        </div>
      </div>
      <div className="content">
        {notice && <div className="alert alert-success"><i className="ti ti-check"></i>{notice}</div>}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>Bill to</div>
              <div style={{ fontWeight: 500, fontSize: 15 }}>{inv.client_name}</div>
              {inv.client_email && <div style={{ fontSize: 13, color: 'var(--muted)' }}>{inv.client_email}</div>}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Issue date</div>
              <div>{fmtDate(inv.date)}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Due date</div>
              <div style={status === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(inv.due_date)}</div>
            </div>
          </div>
          <table className="items-table">
            <thead><tr><th>Description</th><th style={{ textAlign: 'center' }}>Qty</th><th style={{ textAlign: 'right' }}>Rate</th><th style={{ textAlign: 'right' }}>Total</th></tr></thead>
            <tbody>
              {(inv.items || []).map((it, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 12px' }}>{it.description}</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>{it.qty}</td>
                  <td style={{ textAlign: 'right', padding: '10px 12px' }}>{fmt(it.rate)}</td>
                  <td style={{ textAlign: 'right', padding: '10px 12px', fontWeight: 500 }}>{fmt(it.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totals-box">
            <div className="totals-row"><span style={{ color: 'var(--muted)' }}>Subtotal</span><span>{fmt(inv.subtotal)}</span></div>
            <div className="totals-row"><span style={{ color: 'var(--muted)' }}>Tax (0%)</span><span>VT 0</span></div>
            <div className="totals-row"><span>Total</span><span>{fmt(inv.total)}</span></div>
            <div className="totals-row balance-due" style={{ color: balance > 0 ? '#D85A30' : '#3B6D11' }}>
              <span>Balance due</span><span>{fmt(balance)}</span>
            </div>
          </div>
          {inv.notes && <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--bg)', borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--muted)' }}>{inv.notes}</div>}
        </div>
        {(inv.payments || []).length > 0 && (
          <div className="card">
            <div className="section-title">Payments received</div>
            <ul className="payment-list">
              {inv.payments.map(p => (
                <li key={p.id}><span>{fmtDate(p.date)} — <span className="tag">{p.method}</span>{p.note ? ` · ${p.note}` : ''}</span><span style={{ color: '#3B6D11', fontWeight: 500 }}>{fmt(p.amount)}</span></li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {showPayModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowPayModal(false) }}>
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">Record Payment</span>
              <button className="btn btn-sm" onClick={() => setShowPayModal(false)}><i className="ti ti-x"></i></button>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>{inv.number} — {inv.client_name}</div>
            <div className="alert alert-warning"><i className="ti ti-info-circle"></i>Balance due: <strong>{fmt(balance)}</strong></div>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="form-group"><label>Amount (VT)</label><input type="number" value={payForm.amount} min="0" onChange={e => setPayForm(f => ({ ...f, amount: e.target.value }))} /></div>
              <div className="form-group"><label>Payment method</label>
                <select value={payForm.method} onChange={e => setPayForm(f => ({ ...f, method: e.target.value }))}>
                  <option>Cash</option><option>Bank transfer</option><option>Mobile money</option><option>Cheque</option><option>Other</option>
                </select>
              </div>
              <div className="form-group"><label>Date</label><input type="date" value={payForm.date} onChange={e => setPayForm(f => ({ ...f, date: e.target.value }))} /></div>
              <div className="form-group"><label>Reference / note (optional)</label><input type="text" value={payForm.note} onChange={e => setPayForm(f => ({ ...f, note: e.target.value }))} placeholder="Bank ref, receipt number..." /></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
              <button className="btn" onClick={() => setShowPayModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={recordPayment} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Confirm Payment'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function InvoiceDetailPage() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <InvoiceDetail />
    </Suspense>
  )
}
