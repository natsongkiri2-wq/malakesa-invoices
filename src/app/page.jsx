'use client'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { fmt, fmtDate, getStatus, getBalance } from '@/lib/utils'

function DashboardContent() {
  const [invoices, setInvoices] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/invoices').then(r => r.json()),
      fetch('/api/payments').then(r => r.json()),
    ]).then(([invs, pmts]) => {
      setInvoices(invs.map(inv => ({ ...inv, payments: pmts.filter(p => p.invoice_id === inv.id) })))
      setPayments(pmts); setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <><div className="topbar"><h1>Dashboard</h1></div><div className="content"><div className="loading">Loading...</div></div></>

  const totalInvoiced = invoices.reduce((s,i) => s+Number(i.total), 0)
  const totalCollected = payments.reduce((s,p) => s+Number(p.amount), 0)
  const outstanding = invoices.filter(i => getStatus(i)!=='paid').reduce((s,i) => s+getBalance(i), 0)
  const overdueCount = invoices.filter(i => getStatus(i)==='overdue').length
  const paidCount = invoices.filter(i => getStatus(i)==='paid').length
  const unpaidCount = invoices.filter(i => getStatus(i)!=='paid').length

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthData = Array.from({length:6},(_,i) => {
    const d = new Date(now.getFullYear(), now.getMonth()-5+i, 1)
    const m = d.getMonth(); const y = d.getFullYear()
    const amt = invoices.filter(inv => { const id=new Date(inv.date); return id.getMonth()===m&&id.getFullYear()===y }).reduce((s,inv)=>s+Number(inv.total),0)
    return { label: MONTHS[m], amt }
  })
  const maxAmt = Math.max(...monthData.map(m=>m.amt), 1)
  const recent = [...invoices].sort((a,b) => b.created_at>a.created_at?1:-1).slice(0,6)

  return (
    <>
      <div className="topbar"><h1>Dashboard</h1><Link href="/invoices/new" className="btn btn-primary"><i className="ti ti-plus"></i> New Invoice</Link></div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Total Invoiced</div><div className="stat-value">{fmt(totalInvoiced)}</div><div className="stat-sub">{invoices.length} invoices</div></div>
          <div className="stat-card"><div className="stat-label">Collected</div><div className="stat-value success">{fmt(totalCollected)}</div><div className="stat-sub">{paidCount} paid</div></div>
          <div className="stat-card"><div className="stat-label">Outstanding</div><div className="stat-value warning">{fmt(outstanding)}</div><div className="stat-sub">{unpaidCount} unpaid</div></div>
          <div className="stat-card"><div className="stat-label">Overdue</div><div className="stat-value danger">{overdueCount}</div><div className="stat-sub">need follow-up</div></div>
        </div>
        <div className="card">
          <div className="section-title">Revenue — last 6 months</div>
          <div className="chart-wrap">
            {monthData.map(m => (
              <div key={m.label} className="chart-col">
                <div className="chart-val">{m.amt>0?'VT '+Math.round(m.amt/1000)+'k':''}</div>
                <div className="chart-bar" style={{ height: Math.max(4,Math.round((m.amt/maxAmt)*100))+'px' }}></div>
                <div className="chart-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-flush">
          <div style={{ padding:'14px 20px 12px', borderBottom:'0.5px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div className="section-title" style={{ margin:0 }}>Recent invoices</div>
            <Link href="/invoices" className="btn btn-sm">View all</Link>
          </div>
          {recent.length === 0 ? (
            <div className="empty"><i className="ti ti-file-off"></i><p>No invoices yet</p><Link href="/invoices/new" className="btn btn-primary">Create first invoice</Link></div>
          ) : (
            <table>
              <thead><tr><th>Invoice #</th><th>Client</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {recent.map(inv => (
                  <tr key={inv.id}>
                    <td><strong>{inv.number}</strong></td>
                    <td>{inv.client_name}</td>
                    <td>{fmtDate(inv.date)}</td>
                    <td>{fmt(inv.total)}</td>
                    <td><span className={`badge badge-${getStatus(inv)}`}>{getStatus(inv)}</span></td>
                    <td><Link href={`/invoices/${inv.id}`} className="btn btn-sm">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default function Dashboard() {
  return <Suspense fallback={<div className="loading">Loading...</div>}><DashboardContent /></Suspense>
}
