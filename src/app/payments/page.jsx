'use client'
import { useEffect, useState, Suspense } from 'react'
import { fmt, fmtDate } from '@/lib/utils'

function PaymentsContent() {
  const [payments, setPayments] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/payments').then(r => r.json()),
      fetch('/api/invoices').then(r => r.json()),
    ]).then(([pmts, invs]) => {
      setPayments(pmts)
      setInvoices(invs)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const totalCollected = payments.reduce((s, p) => s + Number(p.amount), 0)
  const getInvoice = (id) => invoices.find(i => i.id === id) || {}

  return (
    <>
      <div className="topbar"><h1>Payments</h1></div>
      <div className="content">
        {loading ? <div className="loading">Loading...</div> : (
          <>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="stat-card"><div className="stat-label">Total collected</div><div className="stat-value success">{fmt(totalCollected)}</div></div>
              <div className="stat-card"><div className="stat-label">Payments recorded</div><div className="stat-value">{payments.length}</div></div>
              <div className="stat-card"><div className="stat-label">This month</div><div className="stat-value success">{fmt(payments.filter(p => p.date?.startsWith(new Date().toISOString().slice(0,7))).reduce((s,p) => s+Number(p.amount),0))}</div></div>
            </div>
            <div className="card card-flush">
              {payments.length === 0 ? (
                <div className="empty"><i className="ti ti-cash-off"></i><p>No payments recorded yet</p></div>
              ) : (
                <table>
                  <thead><tr><th>Date</th><th>Invoice #</th><th>Client</th><th>Method</th><th>Amount</th><th>Note</th></tr></thead>
                  <tbody>
                    {[...payments].reverse().map(p => {
                      const inv = getInvoice(p.invoice_id)
                      return (
                        <tr key={p.id}>
                          <td>{fmtDate(p.date)}</td>
                          <td><strong>{inv.number || '—'}</strong></td>
                          <td>{inv.client_name || '—'}</td>
                          <td><span className="tag">{p.method || 'Cash'}</span></td>
                          <td style={{ color: '#3B6D11', fontWeight: 500 }}>{fmt(p.amount)}</td>
                          <td style={{ color: 'var(--muted)' }}>{p.note || ''}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default function PaymentsPage() {
  return <Suspense fallback={<div className="loading">Loading...</div>}><PaymentsContent /></Suspense>
}
