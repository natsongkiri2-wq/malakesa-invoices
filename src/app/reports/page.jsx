'use client'
import { useEffect, useState } from 'react'
import { fmt, fmtDate, getStatus, getBalance } from '@/lib/utils'

export default function ReportsPage() {
  const [invoices, setInvoices] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('all')

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

  const filterByPeriod = (list, dateField) => {
    if (period === 'all') return list
    const now = new Date()
    const start = new Date()
    if (period === 'month') start.setDate(1)
    if (period === 'quarter') start.setMonth(now.getMonth() - 2, 1)
    if (period === 'year') start.setMonth(0, 1)
    return list.filter(i => new Date(i[dateField]) >= start)
  }

  const filteredInvoices = filterByPeriod(invoices, 'date')
  const filteredPayments = filterByPeriod(payments, 'date')

  const totalInvoiced = filteredInvoices.reduce((s, i) => s + Number(i.total), 0)
  const totalCollected = filteredPayments.reduce((s, p) => s + Number(p.amount), 0)
  const outstanding = filteredInvoices.filter(i => getStatus(i) !== 'paid').reduce((s, i) => s + getBalance(i), 0)
  const overdueAmt = filteredInvoices.filter(i => getStatus(i) === 'overdue').reduce((s, i) => s + getBalance(i), 0)

  // Revenue by client
  const byClient = {}
  filteredInvoices.forEach(inv => {
    if (!byClient[inv.client_name]) byClient[inv.client_name] = { name: inv.client_name, total: 0, collected: 0, count: 0 }
    byClient[inv.client_name].total += Number(inv.total)
    byClient[inv.client_name].collected += Number(inv.total) - getBalance(inv)
    byClient[inv.client_name].count++
  })
  const clientRows = Object.values(byClient).sort((a, b) => b.total - a.total)

  // Revenue by service
  const byService = {}
  filteredInvoices.forEach(inv => {
    (inv.items || []).forEach(it => {
      const svc = it.description || 'Other'
      if (!byService[svc]) byService[svc] = { desc: svc, qty: 0, revenue: 0 }
      byService[svc].qty += Number(it.qty) || 0
      byService[svc].revenue += (Number(it.qty) || 0) * (Number(it.rate) || 0)
    })
  })
  const serviceRows = Object.values(byService).sort((a, b) => b.revenue - a.revenue).slice(0, 8)

  // Payment methods
  const byMethod = {}
  filteredPayments.forEach(p => {
    const m = p.method || 'Cash'
    byMethod[m] = (byMethod[m] || 0) + Number(p.amount)
  })

  // Monthly trend (last 6 months)
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const m = d.getMonth(); const y = d.getFullYear()
    const invoiced = invoices.filter(inv => { const id = new Date(inv.date); return id.getMonth() === m && id.getFullYear() === y }).reduce((s, inv) => s + Number(inv.total), 0)
    const collected = payments.filter(p => { const pd = new Date(p.date); return pd.getMonth() === m && pd.getFullYear() === y }).reduce((s, p) => s + Number(p.amount), 0)
    return { label: MONTHS[m], invoiced, collected }
  })
  const maxAmt = Math.max(...monthData.map(m => Math.max(m.invoiced, m.collected)), 1)

  const printReport = () => {
    window.print()
  }

  return (
    <>
      <div className="topbar">
        <h1>Reports</h1>
        <div className="action-row">
          <select value={period} onChange={e => setPeriod(e.target.value)} style={{ width: 'auto', fontSize: 13, padding: '6px 10px' }}>
            <option value="all">All time</option>
            <option value="month">This month</option>
            <option value="quarter">This quarter</option>
            <option value="year">This year</option>
          </select>
          <button className="btn btn-sm" onClick={printReport}><i className="ti ti-printer" aria-hidden="true"></i> Print</button>
        </div>
      </div>
      <div className="content">
        {loading ? <div className="loading">Loading...</div> : (
          <>
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-label">Total invoiced</div><div className="stat-value">{fmt(totalInvoiced)}</div></div>
              <div className="stat-card"><div className="stat-label">Collected</div><div className="stat-value success">{fmt(totalCollected)}</div></div>
              <div className="stat-card"><div className="stat-label">Outstanding</div><div className="stat-value warning">{fmt(outstanding)}</div></div>
              <div className="stat-card"><div className="stat-label">Overdue</div><div className="stat-value danger">{fmt(overdueAmt)}</div></div>
            </div>

            <div className="card">
              <div className="section-title">Monthly trend (invoiced vs collected)</div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' }}><span style={{ width: 12, height: 12, background: '#5340B7', borderRadius: 2, display: 'inline-block' }}></span>Invoiced</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' }}><span style={{ width: 12, height: 12, background: '#3B6D11', borderRadius: 2, display: 'inline-block' }}></span>Collected</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 130, marginBottom: 4 }}>
                {monthData.map(m => (
                  <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{ width: '100%', display: 'flex', gap: 3, alignItems: 'flex-end', height: 110 }}>
                      <div style={{ flex: 1, background: '#5340B7', borderRadius: '3px 3px 0 0', height: Math.max(2, Math.round((m.invoiced / maxAmt) * 110)) + 'px', minHeight: 2 }}></div>
                      <div style={{ flex: 1, background: '#3B6D11', borderRadius: '3px 3px 0 0', height: Math.max(2, Math.round((m.collected / maxAmt) * 110)) + 'px', minHeight: 2 }}></div>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="two-col">
              <div className="card">
                <div className="section-title">Revenue by client</div>
                {clientRows.length === 0 ? <div style={{ color: 'var(--muted)', fontSize: 13 }}>No data yet</div> : (
                  <table>
                    <thead><tr><th>Client</th><th style={{ textAlign: 'right' }}>Invoices</th><th style={{ textAlign: 'right' }}>Total</th><th style={{ textAlign: 'right' }}>Collected</th></tr></thead>
                    <tbody>
                      {clientRows.map(c => (
                        <tr key={c.name}>
                          <td>{c.name}</td>
                          <td style={{ textAlign: 'right' }}>{c.count}</td>
                          <td style={{ textAlign: 'right' }}>{fmt(c.total)}</td>
                          <td style={{ textAlign: 'right', color: '#3B6D11' }}>{fmt(c.collected)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="card">
                <div className="section-title">Top services</div>
                {serviceRows.length === 0 ? <div style={{ color: 'var(--muted)', fontSize: 13 }}>No data yet</div> : (
                  <table>
                    <thead><tr><th>Service</th><th style={{ textAlign: 'right' }}>Qty</th><th style={{ textAlign: 'right' }}>Revenue</th></tr></thead>
                    <tbody>
                      {serviceRows.map(s => (
                        <tr key={s.desc}>
                          <td>{s.desc}</td>
                          <td style={{ textAlign: 'right' }}>{s.qty}</td>
                          <td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(s.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="card">
              <div className="section-title">Payment methods</div>
              {Object.keys(byMethod).length === 0 ? <div style={{ color: 'var(--muted)', fontSize: 13 }}>No payments yet</div> : (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {Object.entries(byMethod).map(([m, a]) => (
                    <div key={m} className="stat-card" style={{ minWidth: 140 }}>
                      <div className="stat-label">{m}</div>
                      <div className="stat-value success" style={{ fontSize: 16 }}>{fmt(a)}</div>
                      <div className="stat-sub">{Math.round((a / totalCollected) * 100)}% of total</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
