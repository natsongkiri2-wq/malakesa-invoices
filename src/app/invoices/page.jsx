'use client'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { fmt, fmtDate, getStatus, getBalance } from '@/lib/utils'

function InvoicesContent() {
  const [invoices, setInvoices] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    Promise.all([
      fetch('/api/invoices').then(r => r.json()),
      fetch('/api/payments').then(r => r.json()),
    ]).then(([invs, pmts]) => {
      setInvoices(invs.map(inv => ({ ...inv, payments: pmts.filter(p => p.invoice_id === inv.id) })))
      setPayments(pmts); setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this invoice?')) return
    await fetch(`/api/invoices/${id}`, { method: 'DELETE' }); load()
  }

  return (
    <>
      <div className="topbar"><h1>Invoices</h1><Link href="/invoices/new" className="btn btn-primary"><i className="ti ti-plus"></i> New Invoice</Link></div>
      <div className="content">
        {loading ? <div className="loading">Loading...</div> : (
          <div className="card card-flush">
            {invoices.length === 0 ? (
              <div className="empty"><i className="ti ti-file-invoice"></i><p>No invoices yet</p><Link href="/invoices/new" className="btn btn-primary">Create first invoice</Link></div>
            ) : (
              <table>
                <thead><tr><th>Invoice #</th><th>Client</th><th>Issue Date</th><th>Due Date</th><th>Amount</th><th>Balance</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {[...invoices].reverse().map(inv => {
                    const st = getStatus(inv); const bal = getBalance(inv)
                    return (
                      <tr key={inv.id}>
                        <td><strong>{inv.number}</strong></td>
                        <td>{inv.client_name}</td>
                        <td>{fmtDate(inv.date)}</td>
                        <td style={st==='overdue'?{color:'#A32D2D',fontWeight:500}:{}}>{fmtDate(inv.due_date)}</td>
                        <td>{fmt(inv.total)}</td>
                        <td style={bal>0?{color:'#D85A30'}:{color:'#3B6D11'}}>{fmt(bal)}</td>
                        <td><span className={`badge badge-${st}`}>{st}</span></td>
                        <td>
                          <div className="action-row">
                            <Link href={`/invoices/${inv.id}`} className="btn btn-sm"><i className="ti ti-eye"></i></Link>
                            <Link href={`/invoices/${inv.id}`} className="btn btn-sm btn-success"><i className="ti ti-cash"></i></Link>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(inv.id)}><i className="ti ti-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default function InvoicesPage() {
  return <Suspense fallback={<div className="loading">Loading...</div>}><InvoicesContent /></Suspense>
}
