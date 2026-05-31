'use client'
import { useEffect, useState } from 'react'

// ── Helpers ──────────────────────────────────────────────
const fmt = (n) => 'VT ' + Number(n || 0).toLocaleString()
const fmtDate = (d) => { if (!d) return ''; try { return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch(e) { return d } }
const todayStr = () => new Date().toISOString().split('T')[0]
const addDays = (d, n) => { const dt = new Date(d); dt.setDate(dt.getDate() + n); return dt.toISOString().split('T')[0] }
const uid = () => Math.random().toString(36).slice(2)

const getBalance = (inv, payments) => {
  const paid = (payments || []).filter(p => p.invoice_id === inv.id).reduce((s, p) => s + Number(p.amount), 0)
  return Math.max(0, Number(inv.total) - paid)
}

const getStatus = (inv, payments) => {
  const paid = (payments || []).filter(p => p.invoice_id === inv.id).reduce((s, p) => s + Number(p.amount), 0)
  if (paid >= Number(inv.total) && Number(inv.total) > 0) return 'paid'
  if (paid > 0) return 'partial'
  if (inv.due_date && inv.due_date < todayStr()) return 'overdue'
  return 'unpaid'
}

const Badge = ({ status }) => {
  const colors = { paid: '#EAF3DE:#27500A', unpaid: '#FAECE7:#712B13', overdue: '#FCEBEB:#791F1F', partial: '#FAEEDA:#633806', draft: '#F1EFE8:#444441' }
  const [bg, color] = (colors[status] || colors.unpaid).split(':')
  return <span style={{ background: bg, color, padding: '2px 9px', borderRadius: 99, fontSize: 11, fontWeight: 500 }}>{status}</span>
}

// ── Main App ──────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('dashboard')
  const [invoices, setInvoices] = useState([])
  const [payments, setPayments] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // 'newInvoice' | 'payment' | 'newClient' | 'viewInvoice'
  const [selected, setSelected] = useState(null)

  const reload = async () => {
    try {
      setLoading(true)
      const [invRes, pmtRes, clRes] = await Promise.all([
        fetch('/api/invoices'), fetch('/api/payments'), fetch('/api/clients')
      ])
      const [invs, pmts, cls] = await Promise.all([invRes.json(), pmtRes.json(), clRes.json()])
      setInvoices(Array.isArray(invs) ? invs : [])
      setPayments(Array.isArray(pmts) ? pmts : [])
      setClients(Array.isArray(cls) ? cls : [])
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard' },
    { id: 'invoices', label: 'Invoices', icon: 'ti-file-invoice' },
    { id: 'payments', label: 'Payments Received', icon: 'ti-cash' },
    { id: 'unpaid', label: 'Unpaid Invoices', icon: 'ti-alert-circle' },
    { id: 'reports', label: 'Reports', icon: 'ti-chart-bar' },
    { id: 'clients', label: 'Clients', icon: 'ti-users' },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 14, color: '#1a1a1a', background: '#f4f3f0' }}>
      {/* Sidebar */}
      <div style={{ width: 210, minWidth: 210, background: '#fff', borderRight: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
          <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>Malakesa Transfer<br />&amp; Tour</div>
          <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Invoice Manager</div>
        </div>
        <nav style={{ flex: 1, padding: '8px 0' }}>
          {nav.map(item => (
            <div key={item.id} onClick={() => setPage(item.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', fontSize: 13, color: page === item.id ? '#1a1a1a' : '#666', cursor: 'pointer', borderLeft: page === item.id ? '2px solid #5340B7' : '2px solid transparent', background: page === item.id ? '#f4f3f0' : 'transparent', fontWeight: page === item.id ? 500 : 400 }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 16 }}></i>
              {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '0.5px solid rgba(0,0,0,0.09)', fontSize: 11, color: '#999' }}>Port Vila, Vanuatu</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {loading && page !== 'dashboard' ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>Loading...</div>
        ) : (
          <>
            {page === 'dashboard' && <Dashboard invoices={invoices} payments={payments} loading={loading} setPage={setPage} setModal={setModal} />}
            {page === 'invoices' && <Invoices invoices={invoices} payments={payments} reload={reload} setModal={setModal} setSelected={setSelected} />}
            {page === 'payments' && <Payments payments={payments} invoices={invoices} reload={reload} setModal={setModal} setSelected={setSelected} />}
            {page === 'unpaid' && <Unpaid invoices={invoices} payments={payments} reload={reload} setModal={setModal} setSelected={setSelected} />}
            {page === 'reports' && <Reports invoices={invoices} payments={payments} />}
            {page === 'clients' && <Clients clients={clients} invoices={invoices} reload={reload} setModal={setModal} />}
          </>
        )}
      </div>

      {/* Modals */}
      {modal === 'newInvoice' && <NewInvoiceModal clients={clients} onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'payment' && selected && <PaymentModal invoice={selected} payments={payments} onClose={() => { setModal(null); setSelected(null) }} onSave={() => { setModal(null); setSelected(null); reload() }} />}
      {modal === 'newClient' && <NewClientModal onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'viewInvoice' && selected && <ViewInvoiceModal invoice={selected} payments={payments} onClose={() => { setModal(null); setSelected(null) }} onPay={() => { setModal('payment') }} />}
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────
function Dashboard({ invoices, payments, loading, setPage, setModal }) {
  const totalInvoiced = invoices.reduce((s, i) => s + Number(i.total), 0)
  const totalCollected = payments.reduce((s, p) => s + Number(p.amount), 0)
  const outstanding = invoices.reduce((s, i) => s + getBalance(i, payments), 0)
  const overdueCount = invoices.filter(i => getStatus(i, payments) === 'overdue').length
  const recent = [...invoices].reverse().slice(0, 6)

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const m = d.getMonth(); const y = d.getFullYear()
    const amt = invoices.filter(inv => { const id = new Date(inv.date + 'T00:00:00'); return id.getMonth() === m && id.getFullYear() === y }).reduce((s, inv) => s + Number(inv.total), 0)
    return { label: MONTHS[m], amt }
  })
  const maxAmt = Math.max(...monthData.map(m => m.amt), 1)

  return (
    <>
      <Topbar title="Dashboard"><button className="btn btn-primary" onClick={() => setModal('newInvoice')}><i className="ti ti-plus"></i> New Invoice</button></Topbar>
      <div style={{ padding: 20 }}>
        {loading ? <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>Loading...</div> : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
              <StatCard label="Total Invoiced" value={fmt(totalInvoiced)} sub={`${invoices.length} invoices`} />
              <StatCard label="Collected" value={fmt(totalCollected)} color="#3B6D11" />
              <StatCard label="Outstanding" value={fmt(outstanding)} color="#D85A30" />
              <StatCard label="Overdue" value={overdueCount} color="#A32D2D" sub="need follow-up" />
            </div>
            <Card>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>Revenue — last 6 months</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
                {monthData.map(m => (
                  <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontSize: 10, color: '#666' }}>{m.amt > 0 ? 'VT ' + Math.round(m.amt / 1000) + 'k' : ''}</div>
                    <div style={{ width: '100%', background: '#5340B7', borderRadius: '4px 4px 0 0', height: Math.max(4, Math.round((m.amt / maxAmt) * 90)) + 'px' }}></div>
                    <div style={{ fontSize: 10, color: '#666' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 14 }}>Recent invoices</strong>
                <button className="btn btn-sm" onClick={() => setPage('invoices')}>View all</button>
              </div>
              {recent.length === 0 ? <Empty icon="ti-file-off" msg="No invoices yet" /> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: '#f4f3f0' }}><Th>Invoice #</Th><Th>Client</Th><Th>Date</Th><Th>Amount</Th><Th>Status</Th><Th></Th></tr></thead>
                  <tbody>{recent.map(inv => (
                    <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td><strong>{inv.number}</strong></Td><Td>{inv.client_name}</Td><Td>{fmtDate(inv.date)}</Td><Td>{fmt(inv.total)}</Td>
                      <Td><Badge status={getStatus(inv, payments)} /></Td>
                      <Td><button className="btn btn-sm" onClick={() => { setPage('invoices') }}>View</button></Td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </Card>
          </>
        )}
      </div>
    </>
  )
}

// ── Invoices ──────────────────────────────────────────────
function Invoices({ invoices, payments, reload, setModal, setSelected }) {
  const handleDelete = async (id) => {
    if (!confirm('Delete this invoice?')) return
    await fetch(`/api/invoices/${id}`, { method: 'DELETE' })
    reload()
  }
  return (
    <>
      <Topbar title="Invoices"><button className="btn btn-primary" onClick={() => setModal('newInvoice')}><i className="ti ti-plus"></i> New Invoice</button></Topbar>
      <div style={{ padding: 20 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {invoices.length === 0 ? <Empty icon="ti-file-invoice" msg="No invoices yet" /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#f4f3f0' }}><Th>Invoice #</Th><Th>Client</Th><Th>Issue Date</Th><Th>Due Date</Th><Th>Amount</Th><Th>Balance</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
              <tbody>{[...invoices].reverse().map(inv => {
                const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
                return (
                  <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td><strong>{inv.number}</strong></Td><Td>{inv.client_name}</Td>
                    <Td>{fmtDate(inv.date)}</Td>
                    <Td style={st === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(inv.due_date)}</Td>
                    <Td>{fmt(inv.total)}</Td>
                    <Td style={{ color: bal > 0 ? '#D85A30' : '#3B6D11' }}>{fmt(bal)}</Td>
                    <Td><Badge status={st} /></Td>
                    <Td><div style={{ display: 'flex', gap: 5 }}>
                      <button className="btn btn-sm" onClick={() => { setSelected(inv); setModal('viewInvoice') }}><i className="ti ti-eye"></i></button>
                      {bal > 0 && <button className="btn btn-sm" style={{ borderColor: '#3B6D11', color: '#3B6D11' }} onClick={() => { setSelected(inv); setModal('payment') }}><i className="ti ti-cash"></i></button>}
                      <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(inv.id)}><i className="ti ti-trash"></i></button>
                    </div></Td>
                  </tr>
                )
              })}</tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}

// ── Payments ──────────────────────────────────────────────
function Payments({ payments, invoices, reload, setModal, setSelected }) {
  const total = payments.reduce((s, p) => s + Number(p.amount), 0)
  const thisMonth = payments.filter(p => p.date?.startsWith(new Date().toISOString().slice(0, 7))).reduce((s, p) => s + Number(p.amount), 0)
  const getInv = (id) => invoices.find(i => i.id === id) || {}
  const unpaidInvoices = invoices.filter(i => ['unpaid','overdue','partial'].includes(getStatus(i, payments)))
  return (
    <>
      <Topbar title="Payments Received">
        <button className="btn btn-primary" onClick={() => {
          if (unpaidInvoices.length === 0) { alert('No unpaid invoices found. Create an invoice first.'); return }
          setSelected(unpaidInvoices[0])
          setModal('payment')
        }}><i className="ti ti-plus"></i> Record Payment</button>
      </Topbar>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Total collected" value={fmt(total)} color="#3B6D11" />
          <StatCard label="Payments recorded" value={payments.length} />
          <StatCard label="This month" value={fmt(thisMonth)} color="#3B6D11" />
        </div>
        {unpaidInvoices.length > 0 && (
          <div style={{ background: '#FAEEDA', border: '0.5px solid #FAC775', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#633806', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span><strong>{unpaidInvoices.length}</strong> unpaid invoice{unpaidInvoices.length > 1 ? 's' : ''} outstanding — select an invoice to record payment against:</span>
          </div>
        )}
        {unpaidInvoices.length > 0 && (
          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontWeight: 500, fontSize: 13 }}>Unpaid invoices — click to record payment</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#f4f3f0' }}><Th>Invoice #</Th><Th>Client</Th><Th>Due Date</Th><Th>Balance</Th><Th>Status</Th><Th></Th></tr></thead>
              <tbody>{unpaidInvoices.map(inv => (
                <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                  <Td><strong>{inv.number}</strong></Td>
                  <Td>{inv.client_name}</Td>
                  <Td>{fmtDate(inv.due_date)}</Td>
                  <Td style={{ fontWeight: 500 }}>{fmt(getBalance(inv, payments))}</Td>
                  <Td><Badge status={getStatus(inv, payments)} /></Td>
                  <Td><button className="btn btn-sm btn-primary" onClick={() => { setSelected(inv); setModal('payment') }}><i className="ti ti-cash"></i> Record Payment</button></Td>
                </tr>
              ))}</tbody>
            </table>
          </Card>
        )}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontWeight: 500, fontSize: 13 }}>Payment history</div>
          {payments.length === 0 ? <Empty icon="ti-cash-off" msg="No payments recorded yet" /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#f4f3f0' }}><Th>Date</Th><Th>Invoice #</Th><Th>Client</Th><Th>Method</Th><Th>Amount</Th><Th>Note</Th></tr></thead>
              <tbody>{[...payments].reverse().map(p => {
                const inv = getInv(p.invoice_id)
                return (
                  <tr key={p.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td>{fmtDate(p.date)}</Td><Td><strong>{inv.number || '—'}</strong></Td><Td>{inv.client_name || '—'}</Td>
                    <Td><span style={{ background: '#f4f3f0', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{p.method || 'Cash'}</span></Td>
                    <Td style={{ color: '#3B6D11', fontWeight: 500 }}>{fmt(p.amount)}</Td>
                    <Td style={{ color: '#666' }}>{p.note || ''}</Td>
                  </tr>
                )
              })}</tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}

// ── Unpaid ────────────────────────────────────────────────
function Unpaid({ invoices, payments, reload, setModal, setSelected }) {
  const [filterClient, setFilterClient] = useState('')
  const [filterMonth, setFilterMonth] = useState('')
  const [sending, setSending] = useState(null)
  const [notice, setNotice] = useState('')

  const allUnpaid = invoices.filter(i => ['unpaid','overdue','partial'].includes(getStatus(i, payments)))
  const clients = [...new Set(allUnpaid.map(i => i.client_name))].sort()

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthOptions = Array.from({length: 6}, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    return { value: d.toISOString().slice(0,7), label: MONTHS[d.getMonth()] + ' ' + d.getFullYear() }
  }).reverse()

  let filtered = allUnpaid
  if (filterClient) filtered = filtered.filter(i => i.client_name === filterClient)
  if (filterMonth) filtered = filtered.filter(i => i.due_date?.startsWith(filterMonth))
  filtered = filtered.sort((a,b) => a.due_date > b.due_date ? 1 : -1)

  const overdue = filtered.filter(i => getStatus(i, payments) === 'overdue')
  const totalOut = filtered.reduce((s,i) => s + getBalance(i, payments), 0)

  const sendReminder = async (inv) => {
    setSending(inv.id)
    try {
      const res = await fetch('/api/send-reminder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: inv.id }) })
      if (res.ok) { setNotice('Reminder sent to ' + inv.client_name); setTimeout(() => setNotice(''), 4000); setSending(null); return }
    } catch(e) {}
    const bal = getBalance(inv, payments)
    const subject = encodeURIComponent('Payment Reminder — ' + inv.number)
    const body = encodeURIComponent('Dear ' + inv.client_name + ',\n\nThis is a friendly reminder that invoice ' + inv.number + ' has an outstanding balance of VT ' + Number(bal).toLocaleString() + ' due on ' + fmtDate(inv.due_date) + '.\n\nPlease arrange payment at your earliest convenience.\n\nThank you,\nMalakesa Transfer and Tour')
    window.open('mailto:' + (inv.client_email || '') + '?subject=' + subject + '&body=' + body, '_blank')
    setNotice('Email app opened for ' + inv.client_name)
    setTimeout(() => setNotice(''), 4000)
    setSending(null)
  }

  const sendAllReminders = async () => {
    const withEmail = filtered.filter(i => i.client_email)
    if (withEmail.length === 0) { alert('No email addresses found on these invoices.'); return }
    if (!confirm('Send reminders to ' + withEmail.length + ' client(s)?')) return
    for (const inv of withEmail) { await sendReminder(inv) }
  }

  const printReport = () => {
    const w = window.open('', '_blank')
    const title = 'Unpaid Invoices Report' + (filterClient ? ' — ' + filterClient : '') + (filterMonth ? ' — ' + filterMonth : '')
    w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>body{font-family:Arial,sans-serif;margin:40px;color:#222;font-size:13px}
    h1{font-size:20px;font-weight:bold;color:#5340B7;margin-bottom:4px}
    .sub{color:#888;font-size:12px;margin-bottom:24px}
    table{width:100%;border-collapse:collapse;margin-top:16px}
    th{background:#f5f5f5;padding:8px 12px;text-align:left;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:0.4px}
    td{padding:9px 12px;border-bottom:1px solid #eee;font-size:13px}
    .overdue{color:#A32D2D;font-weight:500}
    .total{margin-top:20px;text-align:right;font-size:15px;font-weight:bold}
    .badge{display:inline-block;padding:2px 8px;border-radius:99px;font-size:11px;font-weight:500}
    .unpaid{background:#FAECE7;color:#712B13}.overdue-b{background:#FCEBEB;color:#791F1F}.partial{background:#FAEEDA;color:#633806}
    </style></head><body>
    <div style="display:flex;justify-content:space-between">
      <div><h1>Malakesa Transfer &amp; Tour</h1><div class="sub">Unpaid Invoices Report — Generated ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})}</div></div>
      <div style="text-align:right;font-size:12px;color:#888">${filterClient ? 'Client: ' + filterClient + '<br>' : ''}${filterMonth ? 'Month: ' + filterMonth : ''}</div>
    </div>
    <table><thead><tr><th>Invoice #</th><th>Client</th><th>Due Date</th><th>Amount</th><th>Balance</th><th>Status</th></tr></thead>
    <tbody>${filtered.map(inv => {
      const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
      return '<tr><td><strong>' + inv.number + '</strong></td><td>' + inv.client_name + '</td><td class="' + (st==='overdue'?'overdue':'') + '">' + fmtDate(inv.due_date) + '</td><td>VT ' + Number(inv.total).toLocaleString() + '</td><td style="font-weight:500">VT ' + Number(bal).toLocaleString() + '</td><td><span class="badge ' + (st==='overdue'?'overdue-b':st) + '">' + st + '</span></td></tr>'
    }).join('')}</tbody></table>
    <div class="total">Total outstanding: VT ${Number(totalOut).toLocaleString()}</div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  return (
    <>
      <Topbar title="Unpaid Invoices">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select value={filterClient} onChange={e => setFilterClient(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.15)', fontSize: 13, fontFamily: 'inherit', background: '#fff' }}>
            <option value="">All clients</option>
            {clients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.15)', fontSize: 13, fontFamily: 'inherit', background: '#fff' }}>
            <option value="">All months</option>
            {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          <button className="btn btn-sm" onClick={printReport}><i className="ti ti-printer"></i> Print</button>
          <button className="btn btn-sm" onClick={sendAllReminders}><i className="ti ti-mail"></i> Email All</button>
        </div>
      </Topbar>
      <div style={{ padding: 20 }}>
        {notice && <div style={{ background: '#EAF3DE', color: '#27500A', border: '0.5px solid #C0DD97', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}><i className="ti ti-check"></i>{notice}</div>}
        {overdue.length > 0 && <div style={{ background: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F7C1C1', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}><i className="ti ti-alert-triangle"></i><strong>{overdue.length}</strong> invoice{overdue.length > 1 ? 's are' : ' is'} overdue.</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Total outstanding" value={fmt(totalOut)} color="#D85A30" />
          <StatCard label="Unpaid invoices" value={filtered.length} />
          <StatCard label="Overdue" value={overdue.length} color="#A32D2D" />
        </div>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {filtered.length === 0 ? <Empty icon="ti-circle-check" msg="All invoices are paid!" msgColor="#3B6D11" /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#f4f3f0' }}><Th>Invoice #</Th><Th>Client</Th><Th>Due Date</Th><Th>Balance</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
              <tbody>{filtered.map(inv => {
                const st = getStatus(inv, payments)
                return (
                  <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td><strong>{inv.number}</strong></Td>
                    <Td>{inv.client_name}</Td>
                    <Td style={st === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(inv.due_date)}</Td>
                    <Td style={{ fontWeight: 500 }}>{fmt(getBalance(inv, payments))}</Td>
                    <Td><Badge status={st} /></Td>
                    <Td><div style={{ display: 'flex', gap: 5 }}>
                      <button className="btn btn-sm" style={{ borderColor: '#3B6D11', color: '#3B6D11' }} onClick={() => { setSelected(inv); setModal('payment') }}><i className="ti ti-cash"></i> Pay</button>
                      <button className="btn btn-sm" onClick={() => sendReminder(inv)} disabled={sending === inv.id}><i className="ti ti-mail"></i> {sending === inv.id ? '...' : 'Remind'}</button>
                      <button className="btn btn-sm" onClick={() => { setSelected(inv); setModal('viewInvoice') }}><i className="ti ti-eye"></i></button>
                    </div></Td>
                  </tr>
                )
              })}</tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}

// ── Reports ───────────────────────────────────────────────
function Reports({ invoices, payments }) {
  const [period, setPeriod] = useState('all')
  const [filterClient, setFilterClient] = useState('')

  const allClients = [...new Set(invoices.map(i => i.client_name))].sort()

  const filterDate = (list, field) => {
    if (period === 'all') return list
    const now = new Date(); const start = new Date()
    if (period === 'month') start.setDate(1)
    if (period === 'quarter') start.setMonth(now.getMonth() - 2, 1)
    if (period === 'year') start.setMonth(0, 1)
    return list.filter(i => i[field] && new Date(i[field] + 'T00:00:00') >= start)
  }

  let fi = filterDate(invoices, 'date')
  let fp = filterDate(payments, 'date')
  if (filterClient) {
    fi = fi.filter(i => i.client_name === filterClient)
    const clientInvIds = new Set(fi.map(i => i.id))
    fp = fp.filter(p => clientInvIds.has(p.invoice_id))
  }

  const totalInv = fi.reduce((s, i) => s + Number(i.total), 0)
  const totalCol = fp.reduce((s, p) => s + Number(p.amount), 0)
  const outstanding = fi.reduce((s, i) => s + getBalance(i, payments), 0)
  const overdueAmt = fi.filter(i => getStatus(i, payments) === 'overdue').reduce((s, i) => s + getBalance(i, payments), 0)
  const totalVat = fi.reduce((s, i) => s + Number(i.tax || 0), 0)
  const totalSubtotal = fi.reduce((s, i) => s + Number(i.subtotal || 0), 0)

  const byClient = {}
  fi.forEach(inv => {
    if (!byClient[inv.client_name]) byClient[inv.client_name] = { name: inv.client_name, total: 0, collected: 0, outstanding: 0, count: 0 }
    byClient[inv.client_name].total += Number(inv.total)
    byClient[inv.client_name].collected += Number(inv.total) - getBalance(inv, payments)
    byClient[inv.client_name].outstanding += getBalance(inv, payments)
    byClient[inv.client_name].count++
  })
  const clientRows = Object.values(byClient).sort((a, b) => b.total - a.total)

  const byService = {}
  fi.forEach(inv => { (inv.items || []).forEach(it => {
    const svc = it.description || 'Other'
    if (!byService[svc]) byService[svc] = { desc: svc, qty: 0, revenue: 0 }
    byService[svc].qty += Number(it.qty) || 0
    byService[svc].revenue += (Number(it.qty) || 0) * (Number(it.rate) || 0)
  })})
  const serviceRows = Object.values(byService).sort((a, b) => b.revenue - a.revenue).slice(0, 10)

  const byMethod = {}
  fp.forEach(p => { const m = p.method || 'Cash'; byMethod[m] = (byMethod[m] || 0) + Number(p.amount) })

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthData = Array.from({length: 6}, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const m = d.getMonth(); const y = d.getFullYear()
    const invs = fi.filter(inv => { const id = new Date(inv.date + 'T00:00:00'); return id.getMonth() === m && id.getFullYear() === y })
    const invoiced = invs.reduce((s, inv) => s + Number(inv.total), 0)
    const pmts = fp.filter(p => { const pd = new Date(p.date + 'T00:00:00'); return pd.getMonth() === m && pd.getFullYear() === y })
    const collected = pmts.reduce((s, p) => s + Number(p.amount), 0)
    return { label: MONTHS[m], invoiced, collected }
  })
  const maxAmt = Math.max(...monthData.map(m => Math.max(m.invoiced, m.collected)), 1)

  const periodLabel = { all: 'All time', month: 'This month', quarter: 'This quarter', year: 'This year' }[period]

  const printReport = () => {
    const w = window.open('', '_blank')
    const title = 'Revenue Report' + (filterClient ? ' — ' + filterClient : '') + ' — ' + periodLabel
    w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>
      body{font-family:Arial,sans-serif;margin:40px;color:#222;font-size:13px}
      h1{font-size:22px;font-weight:bold;color:#5340B7;margin-bottom:2px}
      .sub{color:#888;font-size:12px;margin-bottom:28px}
      .stats{display:flex;gap:20px;margin-bottom:28px;flex-wrap:wrap}
      .stat{background:#f5f5f5;border-radius:8px;padding:12px 18px;min-width:140px}
      .stat-label{font-size:11px;color:#666;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.4px}
      .stat-value{font-size:18px;font-weight:bold}
      h2{font-size:14px;font-weight:bold;margin:24px 0 8px;color:#333;border-bottom:1px solid #eee;padding-bottom:4px}
      table{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13px}
      th{background:#f5f5f5;padding:8px 12px;text-align:left;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:0.3px}
      td{padding:9px 12px;border-bottom:1px solid #eee}
      .right{text-align:right}
      .green{color:#3B6D11;font-weight:500}
      .red{color:#A32D2D}
      .footer{margin-top:30px;padding-top:16px;border-top:1px solid #eee;font-size:11px;color:#999}
    </style></head><body>
    <h1>Malakesa Transfer &amp; Tour</h1>
    <div class="sub">Revenue Report &nbsp;|&nbsp; ${periodLabel}${filterClient ? ' &nbsp;|&nbsp; Client: ' + filterClient : ''} &nbsp;|&nbsp; Generated ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'})}</div>

    <div class="stats">
      <div class="stat"><div class="stat-label">Total Invoiced</div><div class="stat-value">VT ${Number(totalInv).toLocaleString()}</div></div>
      <div class="stat"><div class="stat-label">Subtotal (ex-VAT)</div><div class="stat-value">VT ${Number(totalSubtotal).toLocaleString()}</div></div>
      <div class="stat"><div class="stat-label">VAT Collected</div><div class="stat-value">VT ${Number(totalVat).toLocaleString()}</div></div>
      <div class="stat"><div class="stat-label">Collected</div><div class="stat-value" style="color:#3B6D11">VT ${Number(totalCol).toLocaleString()}</div></div>
      <div class="stat"><div class="stat-label">Outstanding</div><div class="stat-value" style="color:#D85A30">VT ${Number(outstanding).toLocaleString()}</div></div>
    </div>

    <h2>Revenue by Client</h2>
    <table><thead><tr><th>Client</th><th>Invoices</th><th class="right">Total</th><th class="right">Collected</th><th class="right">Outstanding</th></tr></thead>
    <tbody>${clientRows.map(c => '<tr><td><strong>' + c.name + '</strong></td><td>' + c.count + '</td><td class="right">VT ' + Number(c.total).toLocaleString() + '</td><td class="right green">VT ' + Number(c.collected).toLocaleString() + '</td><td class="right ' + (c.outstanding > 0 ? 'red' : '') + '">VT ' + Number(c.outstanding).toLocaleString() + '</td></tr>').join('')}
    <tr style="font-weight:bold;background:#f9f9f9"><td>TOTAL</td><td>${fi.length}</td><td class="right">VT ${Number(totalInv).toLocaleString()}</td><td class="right green">VT ${Number(totalCol).toLocaleString()}</td><td class="right red">VT ${Number(outstanding).toLocaleString()}</td></tr>
    </tbody></table>

    <h2>Top Services</h2>
    <table><thead><tr><th>Service / Description</th><th class="right">Qty</th><th class="right">Revenue (ex-VAT)</th></tr></thead>
    <tbody>${serviceRows.map(s => '<tr><td>' + s.desc + '</td><td class="right">' + s.qty + '</td><td class="right green">VT ' + Number(s.revenue).toLocaleString() + '</td></tr>').join('')}</tbody></table>

    <h2>Payment Methods</h2>
    <table><thead><tr><th>Method</th><th class="right">Amount</th><th class="right">% of collected</th></tr></thead>
    <tbody>${Object.entries(byMethod).map(([m, a]) => '<tr><td>' + m + '</td><td class="right green">VT ' + Number(a).toLocaleString() + '</td><td class="right">' + (totalCol > 0 ? Math.round((a/totalCol)*100) : 0) + '%</td></tr>').join('')}</tbody></table>

    <div class="footer">Malakesa Transfer and Tour &nbsp;|&nbsp; Port Vila, Vanuatu &nbsp;|&nbsp; This report is confidential</div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  return (
    <>
      <Topbar title="Reports">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select value={filterClient} onChange={e => setFilterClient(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.15)', fontSize: 13, fontFamily: 'inherit', background: '#fff' }}>
            <option value="">All clients</option>
            {allClients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={period} onChange={e => setPeriod(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.15)', fontSize: 13, fontFamily: 'inherit', background: '#fff' }}>
            <option value="all">All time</option>
            <option value="month">This month</option>
            <option value="quarter">This quarter</option>
            <option value="year">This year</option>
          </select>
          <button className="btn btn-sm" onClick={printReport}><i className="ti ti-printer"></i> Print Report</button>
        </div>
      </Topbar>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Total invoiced" value={fmt(totalInv)} />
          <StatCard label="Collected" value={fmt(totalCol)} color="#3B6D11" />
          <StatCard label="Outstanding" value={fmt(outstanding)} color="#D85A30" />
          <StatCard label="VAT collected" value={fmt(totalVat)} color="#5340B7" />
        </div>

        <Card>
          <div style={{ fontWeight: 500, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Monthly trend</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#666' }}><span style={{ width: 12, height: 12, background: '#5340B7', borderRadius: 2, display: 'inline-block' }}></span>Invoiced</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#666' }}><span style={{ width: 12, height: 12, background: '#3B6D11', borderRadius: 2, display: 'inline-block' }}></span>Collected</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 130, marginBottom: 4 }}>
            {monthData.map(m => (
              <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: '100%', display: 'flex', gap: 3, alignItems: 'flex-end', height: 110 }}>
                  <div style={{ flex: 1, background: '#5340B7', borderRadius: '3px 3px 0 0', height: Math.max(2, Math.round((m.invoiced / maxAmt) * 110)) + 'px' }}></div>
                  <div style={{ flex: 1, background: '#3B6D11', borderRadius: '3px 3px 0 0', height: Math.max(2, Math.round((m.collected / maxAmt) * 110)) + 'px' }}></div>
                </div>
                <div style={{ fontSize: 10, color: '#666' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card>
            <div style={{ fontWeight: 500, marginBottom: 12 }}>Revenue by client</div>
            {clientRows.length === 0 ? <div style={{ color: '#666', fontSize: 13 }}>No data yet</div> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr><Th>Client</Th><Th style={{ textAlign: 'right' }}>Total</Th><Th style={{ textAlign: 'right' }}>Collected</Th><Th style={{ textAlign: 'right' }}>Outstanding</Th></tr></thead>
                <tbody>{clientRows.map(c => (
                  <tr key={c.name} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td>{c.name}<div style={{ fontSize: 11, color: '#999' }}>{c.count} invoice{c.count > 1 ? 's' : ''}</div></Td>
                    <Td style={{ textAlign: 'right' }}>{fmt(c.total)}</Td>
                    <Td style={{ textAlign: 'right', color: '#3B6D11' }}>{fmt(c.collected)}</Td>
                    <Td style={{ textAlign: 'right', color: c.outstanding > 0 ? '#D85A30' : '#3B6D11' }}>{fmt(c.outstanding)}</Td>
                  </tr>
                ))}</tbody>
              </table>
            )}
          </Card>
          <Card>
            <div style={{ fontWeight: 500, marginBottom: 12 }}>Top services</div>
            {serviceRows.length === 0 ? <div style={{ color: '#666', fontSize: 13 }}>No data yet</div> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr><Th>Service</Th><Th style={{ textAlign: 'right' }}>Qty</Th><Th style={{ textAlign: 'right' }}>Revenue</Th></tr></thead>
                <tbody>{serviceRows.map(s => (
                  <tr key={s.desc} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td>{s.desc}</Td>
                    <Td style={{ textAlign: 'right' }}>{s.qty}</Td>
                    <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(s.revenue)}</Td>
                  </tr>
                ))}</tbody>
              </table>
            )}
          </Card>
        </div>

        <Card style={{ marginTop: 0 }}>
          <div style={{ fontWeight: 500, marginBottom: 12 }}>Payment methods breakdown</div>
          {Object.keys(byMethod).length === 0 ? <div style={{ color: '#666', fontSize: 13 }}>No payments yet</div> : (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {Object.entries(byMethod).map(([m, a]) => (
                <div key={m} style={{ background: '#f4f3f0', borderRadius: 8, padding: '14px 18px', minWidth: 150 }}>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{m}</div>
                  <div style={{ fontSize: 18, fontWeight: 500, color: '#3B6D11' }}>{fmt(a)}</div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{totalCol > 0 ? Math.round((a / totalCol) * 100) : 0}% of collected</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </>
  )
}

// ── Clients ───────────────────────────────────────────────
function Clients({ clients, invoices, reload, setModal }) {
  const handleDelete = async (id) => {
    if (!confirm('Delete this client?')) return
    await fetch(`/api/clients/${id}`, { method: 'DELETE' }); reload()
  }
  return (
    <>
      <Topbar title="Clients"><button className="btn btn-primary" onClick={() => setModal('newClient')}><i className="ti ti-plus"></i> Add Client</button></Topbar>
      <div style={{ padding: 20 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {clients.length === 0 ? <Empty icon="ti-users" msg="No clients yet" /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#f4f3f0' }}><Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>Address</Th><Th>Invoices</Th><Th></Th></tr></thead>
              <tbody>{clients.map(c => (
                <tr key={c.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                  <Td><strong>{c.name}</strong></Td>
                  <Td style={{ color: '#666' }}>{c.email || '—'}</Td>
                  <Td style={{ color: '#666' }}>{c.phone || '—'}</Td>
                  <Td style={{ color: '#666' }}>{c.address || '—'}</Td>
                  <Td style={{ textAlign: 'center' }}>{invoices.filter(i => i.client_id === c.id).length}</Td>
                  <Td><button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(c.id)}><i className="ti ti-trash"></i></button></Td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}

// ── Modals ────────────────────────────────────────────────
function NewInvoiceModal({ clients, onClose, onSave }) {
  const [form, setForm] = useState({ client_id: '', client_name: '', client_email: '', date: todayStr(), due_date: addDays(todayStr(), 14), notes: '' })
  const [items, setItems] = useState([{ id: uid(), description: '', qty: 1, rate: '', total: 0 }, { id: uid(), description: '', qty: 1, rate: '', total: 0 }])
  const [applyVat, setApplyVat] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateItem = (id, field, value) => setItems(items => items.map(item => {
    if (item.id !== id) return item
    const u = { ...item, [field]: value }
    u.total = (parseFloat(u.qty) || 0) * (parseFloat(u.rate) || 0)
    return u
  }))
  const subtotal = items.reduce((s, i) => s + (i.total || 0), 0)
  const tax = applyVat ? Math.round(subtotal * 0.15) : 0
  const total = subtotal + tax

  const handleSave = async () => {
    setError('')
    if (!form.client_id) { setError('Please select a client'); return }
    const validItems = items.filter(i => i.description.trim())
    if (!validItems.length) { setError('Add at least one line item'); return }
    setSaving(true)
    const res = await fetch('/api/invoices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, items: validItems.map(({ id, ...r }) => r), subtotal, tax, total, vat_applied: applyVat }) })
    if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save'); setSaving(false); return }
    onSave()
  }

  return (
    <Modal title="New Invoice" onClose={onClose} wide>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <Field label="Client *">
          <select value={form.client_id} onChange={e => { const c = clients.find(x => x.id === e.target.value); setForm(f => ({ ...f, client_id: e.target.value, client_name: c?.name || '', client_email: c?.email || '' })) }} style={inputStyle}>
            <option value="">— Select client —</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Client email"><input type="email" value={form.client_email} onChange={e => setForm(f => ({ ...f, client_email: e.target.value }))} style={inputStyle} placeholder="client@email.com" /></Field>
        <Field label="Invoice date"><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Due date"><input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Notes / trip details" style={{ gridColumn: '1/-1' }}><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} placeholder="Route, pickup time, special instructions..." /></Field>
        <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: applyVat ? '#EAF3DE' : '#f4f3f0', borderRadius: 8, border: '0.5px solid ' + (applyVat ? '#C0DD97' : 'rgba(0,0,0,0.1)') }}>
          <input type="checkbox" id="vatcheck" checked={applyVat} onChange={e => setApplyVat(e.target.checked)} style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#5340B7' }} />
          <label htmlFor="vatcheck" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, color: applyVat ? '#27500A' : '#666', userSelect: 'none' }}>
            {applyVat ? '✓ Apply 15% VAT to this invoice' : 'No VAT — zero rated invoice'}
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontWeight: 500 }}>Line items</div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', fontWeight: 400 }}>
          <input type="checkbox" checked={applyVat} onChange={e => setApplyVat(e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
        </label>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
        <thead><tr style={{ background: '#f4f3f0' }}><Th style={{ width: '42%' }}>Description</Th><Th style={{ width: '12%' }}>Qty</Th><Th style={{ width: '20%' }}>Rate (VT)</Th><Th style={{ width: '18%' }}>Total</Th><Th style={{ width: '8%' }}></Th></tr></thead>
        <tbody>{items.map(item => (
          <tr key={item.id}>
            <td style={{ padding: '4px 4px' }}><input type="text" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} style={inputStyle} placeholder="e.g. Airport transfer..." /></td>
            <td style={{ padding: '4px 4px' }}><input type="number" value={item.qty} min="0" step="0.5" onChange={e => updateItem(item.id, 'qty', e.target.value)} style={inputStyle} /></td>
            <td style={{ padding: '4px 4px' }}><input type="number" value={item.rate} min="0" onChange={e => updateItem(item.id, 'rate', e.target.value)} style={inputStyle} placeholder="0" /></td>
            <td style={{ padding: '4px 10px', fontWeight: 500 }}>{fmt(item.total)}</td>
            <td style={{ padding: '4px 4px' }}><button className="btn btn-sm" onClick={() => setItems(i => i.filter(x => x.id !== item.id))}><i className="ti ti-x"></i></button></td>
          </tr>
        ))}</tbody>
      </table>
      <button className="btn btn-sm" onClick={() => setItems(i => [...i, { id: uid(), description: '', qty: 1, rate: '', total: 0 }])}><i className="ti ti-plus"></i> Add item</button>
      <div style={{ marginLeft: 'auto', width: 260, marginTop: 12 }}>
        {[['Subtotal', fmt(subtotal)], [applyVat ? 'VAT (15%)' : 'VAT', applyVat ? fmt(tax) : 'Not applicable'], ['Total', fmt(total)]].map(([l, v], i) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.09)' : 'none', fontWeight: i === 2 ? 500 : 400, fontSize: i === 2 ? 15 : 13 }}><span style={{ color: i < 2 ? '#666' : 'inherit' }}>{l}</span><span>{v}</span></div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Save Invoice'}</button>
      </div>
    </Modal>
  )
}

function PaymentModal({ invoice, payments, onClose, onSave }) {
  const balance = getBalance(invoice, payments)
  const [form, setForm] = useState({ amount: balance, method: 'Cash', date: todayStr(), note: '' })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.amount || form.amount <= 0) return
    setSaving(true)
    await fetch('/api/payments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoice_id: invoice.id, ...form, amount: parseFloat(form.amount) }) })
    onSave()
  }

  return (
    <Modal title="Record Payment" onClose={onClose}>
      <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>{invoice.number} — {invoice.client_name}</div>
      <Alert type="warning">Balance due: <strong>{fmt(balance)}</strong></Alert>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
        <Field label="Amount (VT)"><input type="number" value={form.amount} min="0" onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Payment method">
          <select value={form.method} onChange={e => setForm(f => ({ ...f, method: e.target.value }))} style={inputStyle}>
            <option>Cash</option><option>Bank transfer</option><option>Mobile money</option><option>Cheque</option><option>Other</option>
          </select>
        </Field>
        <Field label="Date"><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Reference / note (optional)"><input type="text" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} style={inputStyle} placeholder="Bank ref, receipt number..." /></Field>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Confirm Payment'}</button>
      </div>
    </Modal>
  )
}

function ViewInvoiceModal({ invoice, payments, onClose, onPay }) {
  const invPayments = payments.filter(p => p.invoice_id === invoice.id)
  const balance = getBalance(invoice, payments)
  const status = getStatus(invoice, payments)

  const printInvoice = () => {
    const w = window.open('', '_blank')
    w.document.write(`<!DOCTYPE html><html><head><title>${invoice.number}</title><style>body{font-family:Arial,sans-serif;margin:40px;color:#222;font-size:14px}.header{display:flex;justify-content:space-between;margin-bottom:32px}.company{font-size:22px;font-weight:bold;color:#5340B7}table{width:100%;border-collapse:collapse;margin:20px 0}th{background:#f5f5f5;padding:8px 12px;text-align:left;font-size:12px;color:#666}td{padding:10px 12px;border-bottom:1px solid #eee}.totals{margin-left:auto;width:280px}.tr{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #eee;font-size:13px}.last{font-weight:bold;font-size:15px;border-bottom:none!important}</style></head><body>
    <div class="header"><div><div class="company">Malakesa Transfer &amp; Tour</div><div style="color:#888;font-size:12px">Port Vila, Vanuatu | info@malakesa.vu</div></div><div style="text-align:right"><div style="font-size:26px;font-weight:bold;color:#5340B7">${invoice.number}</div><div style="color:#888;font-size:12px">Issue: ${fmtDate(invoice.date)}</div><div style="color:#888;font-size:12px">Due: ${fmtDate(invoice.due_date)}</div></div></div>
    <div style="margin-bottom:24px"><strong>Bill to:</strong><br>${invoice.client_name}<br><span style="color:#888;font-size:13px">${invoice.client_email || ''}</span></div>
    <table><thead><tr><th>Description</th><th>Qty</th><th>Rate (VT)</th><th>Total (VT)</th></tr></thead><tbody>${(invoice.items || []).map(it => `<tr><td>${it.description}</td><td>${it.qty}</td><td>${Number(it.rate).toLocaleString()}</td><td>${Number(it.total).toLocaleString()}</td></tr>`).join('')}</tbody></table>
    <div class="totals"><div class="tr"><span>Subtotal</span><span>VT ${Number(invoice.subtotal).toLocaleString()}</span></div><div class="tr"><span>VAT (15%)</span><span>VT ${Number(invoice.subtotal * 0.15).toLocaleString()}</span></div><div class="tr last"><span>Total</span><span>VT ${Number(invoice.total).toLocaleString()}</span></div><div class="tr" style="color:${balance>0?'#D85A30':'#3B6D11'};font-weight:bold"><span>Balance due</span><span>VT ${Number(balance).toLocaleString()}</span></div></div>
    ${invoice.notes ? `<div style="margin-top:20px;padding:12px;background:#f9f9f9;border-radius:6px;font-size:13px;color:#555">${invoice.notes}</div>` : ''}
    ${invPayments.length > 0 ? `<div style="margin-top:20px"><strong>Payments received:</strong>${invPayments.map(p => `<div style="padding:6px 0;border-bottom:1px solid #eee;display:flex;justify-content:space-between;font-size:13px"><span>${fmtDate(p.date)} — ${p.method}</span><span style="color:#3B6D11;font-weight:bold">VT ${Number(p.amount).toLocaleString()}</span></div>`).join('')}</div>` : ''}
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const emailInvoice = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.number} from Malakesa Transfer and Tour`)
    const body = encodeURIComponent(`Dear ${invoice.client_name},\n\nPlease find your invoice ${invoice.number} for ${fmt(invoice.total)}, due ${fmtDate(invoice.due_date)}.\n\nServices:\n${(invoice.items || []).map(it => `- ${it.description}: ${fmt(it.total)}`).join('\n')}\n\nTotal: ${fmt(invoice.total)}\nBalance due: ${fmt(balance)}\n\nThank you,\nMalakesa Transfer and Tour`)
    window.open(`mailto:${invoice.client_email || ''}?subject=${subject}&body=${body}`, '_blank')
  }

  return (
    <Modal title={invoice.number} onClose={onClose} wide>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Badge status={status} />
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-sm" onClick={printInvoice}><i className="ti ti-printer"></i> Print</button>
          <button className="btn btn-sm" onClick={emailInvoice}><i className="ti ti-mail"></i> Email</button>
          {balance > 0 && <button className="btn btn-sm" style={{ borderColor: '#3B6D11', color: '#3B6D11' }} onClick={onPay}><i className="ti ti-cash"></i> Record payment</button>}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div><div style={{ fontSize: 12, color: '#666' }}>Bill to</div><div style={{ fontWeight: 500 }}>{invoice.client_name}</div><div style={{ fontSize: 12, color: '#666' }}>{invoice.client_email}</div></div>
        <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, color: '#666' }}>Issue date</div><div>{fmtDate(invoice.date)}</div><div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Due date</div><div style={status === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(invoice.due_date)}</div></div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 12 }}>
        <thead><tr style={{ background: '#f4f3f0' }}><Th>Description</Th><Th style={{ textAlign: 'center' }}>Qty</Th><Th style={{ textAlign: 'right' }}>Rate</Th><Th style={{ textAlign: 'right' }}>Total</Th></tr></thead>
        <tbody>{(invoice.items || []).map((it, i) => <tr key={i} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}><Td>{it.description}</Td><Td style={{ textAlign: 'center' }}>{it.qty}</Td><Td style={{ textAlign: 'right' }}>{fmt(it.rate)}</Td><Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(it.total)}</Td></tr>)}</tbody>
      </table>
      <div style={{ marginLeft: 'auto', width: 260 }}>
        {[['Subtotal', fmt(invoice.subtotal)], ['VAT (15%)', fmt(Math.round(Number(invoice.subtotal)*0.15))], ['Total', fmt(invoice.total)]].map(([l, v], i) => <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.09)' : 'none', fontWeight: i === 2 ? 500 : 400 }}><span style={{ color: i < 2 ? '#666' : 'inherit' }}>{l}</span><span>{v}</span></div>)}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontWeight: 500, color: balance > 0 ? '#D85A30' : '#3B6D11' }}><span>Balance due</span><span>{fmt(balance)}</span></div>
      </div>
      {invoice.notes && <div style={{ marginTop: 12, padding: '10px 14px', background: '#f4f3f0', borderRadius: 8, fontSize: 13, color: '#666' }}>{invoice.notes}</div>}
      {invPayments.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>Payments received</div>
          {invPayments.map(p => <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}><span>{fmtDate(p.date)} — <span style={{ background: '#f4f3f0', padding: '1px 8px', borderRadius: 99, fontSize: 11 }}>{p.method}</span>{p.note ? ` · ${p.note}` : ''}</span><span style={{ color: '#3B6D11', fontWeight: 500 }}>{fmt(p.amount)}</span></div>)}
        </div>
      )}
    </Modal>
  )
}

function NewClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to save client'); setSaving(false); return }
      onSave()
    } catch(e) { setError('Network error — please try again'); setSaving(false) }
  }

  return (
    <Modal title="Add Client" onClose={onClose}>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Business / client name *"><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="e.g. Blue Lagoon Resorts" /></Field>
        <Field label="Email"><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} placeholder="contact@client.vu" /></Field>
        <Field label="Phone"><input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} placeholder="+678 ..." /></Field>
        <Field label="Address"><input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} style={inputStyle} placeholder="Port Vila, Vanuatu" /></Field>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Save Client'}</button>
      </div>
    </Modal>
  )
}

// ── Reusable components ───────────────────────────────────
const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.15)', background: '#fff', color: '#1a1a1a', fontSize: 13, fontFamily: 'inherit', width: '100%' }

function Topbar({ title, children }) {
  return (
    <div style={{ background: '#fff', borderBottom: '0.5px solid rgba(0,0,0,0.09)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
      <h1 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>{title}</h1>
      <div>{children}</div>
    </div>
  )
}

function Card({ children, style }) {
  return <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.09)', borderRadius: 12, padding: '16px 20px', marginBottom: 16, ...style }}>{children}</div>
}

function StatCard({ label, value, sub, color, style }) {
  return (
    <div style={{ background: '#f4f3f0', borderRadius: 8, padding: '14px 16px', ...style }}>
      <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 500, color: color || '#1a1a1a' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, width: '95%', maxWidth: wide ? 680 : 480, maxHeight: '90vh', overflowY: 'auto', border: '0.5px solid rgba(0,0,0,0.09)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 500 }}>{title}</span>
          <button className="btn btn-sm" onClick={onClose}><i className="ti ti-x"></i></button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Alert({ type, children }) {
  const styles = { success: { background: '#EAF3DE', color: '#27500A', border: '0.5px solid #C0DD97' }, danger: { background: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F7C1C1' }, warning: { background: '#FAEEDA', color: '#633806', border: '0.5px solid #FAC775' } }
  return <div style={{ padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, ...styles[type] }}>{children}</div>
}

function Field({ label, children, style }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}><label style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>{label}</label>{children}</div>
}

function Empty({ icon, msg, msgColor }) {
  return <div style={{ textAlign: 'center', padding: '48px 20px', color: msgColor || '#666' }}><i className={`ti ${icon}`} style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i><p>{msg}</p></div>
}

function Th({ children, style }) { return <th style={{ textAlign: 'left', padding: '9px 14px', fontSize: 11, fontWeight: 500, color: '#666', textTransform: 'uppercase', letterSpacing: '0.4px', ...style }}>{children}</th> }
function Td({ children, style }) { return <td style={{ padding: '11px 14px', ...style }}>{children}</td> }
