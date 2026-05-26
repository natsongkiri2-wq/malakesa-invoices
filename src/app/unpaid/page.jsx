'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fmt, fmtDate, getStatus, getBalance } from '@/lib/utils'

export default function UnpaidPage() {
  const [invoices, setInvoices] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/invoices').then(r => r.json()),
      fetch('/api/payments').then(r => r.json()),
    ]).then(([invs, pmts]) => {
      setInvoices(invs.map(inv => ({ ...inv, payments: pmts.filter(p => p.invoice_id === inv.id) })))
      setPayments(pmts)
      setLoading(false)
    })
  }, [])

  const unpaid = invoices.filter(i => ['unpaid', 'overdue', 'partial'].includes(getStatus(i)))
    .sort((a, b) => (a.due_date > b.due_date ? 1 : -1))

  const overdue = unpaid.filter(i => getStatus(i) === 'overdue')
  const totalOutstanding = unpaid.reduce((s, i) => s + getBalance(i), 0)

  const sendReminder = async (inv) => {
    setSending(inv.id)
    const res = await fetch('/api/send-reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId: inv.id })
    })
    setSending(null)
    if (res.ok) {
      setNotice(`Reminder sent to ${inv.client_email || inv.client_name}`)
    } else {
      // Fallback to mailto
      const balance = getBalance(inv)
      const subject = encodeURIComponent(`Payment Reminder — ${inv.number}`)
      const body = encodeURIComponent(
        `Dear ${inv.client_name},\n\nThis is a friendly reminder that invoice ${inv.number} has an outstanding balance of VT ${Number(balance).toLocaleString()} due on ${fmtDate(inv.due_date)}.\n\nPlease arrange payment at your earliest convenience.\n\nThank you,\nMalakesa Transfer and Tour`
      )
      window.open(`mailto:${inv.client_email || ''}?subject=${subject}&body=${body}`, '_blank')
      setNotice('Email app opened with reminder')
    }
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <>
      <div className="topbar"><h1>Unpaid Invoices</h1></div>
      <div className="content">
        {notice && <div className="alert alert-success"><i className="ti ti-check" aria-hidden="true"></i>{notice}</div>}
        {!loading && overdue.length > 0 && (
          <div className="alert alert-danger">
            <i className="ti ti-alert-triangle" aria-hidden="true"></i>
            <strong>{overdue.length}</strong> invoice{overdue.length > 1 ? 's are' : ' is'} overdue — send reminders to collect payment.
          </div>
        )}
        {loading ? <div className="loading">Loading...</div> : (
          <>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="stat-card">
                <div className="stat-label">Total outstanding</div>
                <div className="stat-value warning">{fmt(totalOutstanding)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Unpaid invoices</div>
                <div className="stat-value">{unpaid.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Overdue</div>
                <div className="stat-value danger">{overdue.length}</div>
              </div>
            </div>
            <div className="card card-flush">
              {unpaid.length === 0 ? (
                <div className="empty">
                  <i className="ti ti-circle-check" aria-hidden="true"></i>
                  <p style={{ color: '#3B6D11', fontWeight: 500 }}>All invoices are paid!</p>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr><th>Invoice #</th><th>Client</th><th>Email</th><th>Due Date</th><th>Balance</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {unpaid.map(inv => {
                      const st = getStatus(inv)
                      const bal = getBalance(inv)
                      return (
                        <tr key={inv.id}>
                          <td><strong>{inv.number}</strong></td>
                          <td>{inv.client_name}</td>
                          <td style={{ color: 'var(--muted)', fontSize: 12 }}>{inv.client_email || '—'}</td>
                          <td style={st === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(inv.due_date)}</td>
                          <td style={{ fontWeight: 500 }}>{fmt(bal)}</td>
                          <td><span className={`badge badge-${st}`}>{st}</span></td>
                          <td>
                            <div className="action-row">
                              <Link href={`/invoices/${inv.id}?pay=1`} className="btn btn-sm btn-success">
                                <i className="ti ti-cash" aria-hidden="true"></i> Pay
                              </Link>
                              <button
                                className="btn btn-sm"
                                onClick={() => sendReminder(inv)}
                                disabled={sending === inv.id}
                              >
                                <i className="ti ti-mail" aria-hidden="true"></i>
                                {sending === inv.id ? 'Sending...' : 'Remind'}
                              </button>
                              <Link href={`/invoices/${inv.id}`} className="btn btn-sm">
                                <i className="ti ti-eye" aria-hidden="true"></i>
                              </Link>
                            </div>
                          </td>
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
