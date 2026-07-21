'use client'
import { useEffect, useState, useRef } from 'react'

const MALAKESA_LOGO = "data:image/png;base64,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"

// ── Helpers ──────────────────────────────────────────────
const fmt = (n) => 'VT ' + Number(n || 0).toLocaleString()
const fmtDate = (d) => { if (!d) return ''; try { return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch(e) { return d } }
// Use local date components (not toISOString/UTC) so this is correct for Vanuatu (UTC+11) at any hour of the day
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
const localMonthStr = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
const addDays = (d, n) => { const dt = new Date(d); dt.setDate(dt.getDate() + n); return dt.toISOString().split('T')[0] }
const uid = () => Math.random().toString(36).slice(2)

const getBalance = (inv, payments) => {
  const paid = (payments || []).filter(p => p.invoice_id === inv.id).reduce((s, p) => s + Number(p.amount), 0)
  return Math.max(0, Number(inv.total) - paid)
}

// Shared CSV/Excel download utility
const downloadCSV = (filename, rows) => {
  const esc = v => { const s = String(v == null ? '' : v); return s.includes(',') || s.includes('"') || s.includes('\n') ? '"' + s.replace(/"/g, '""') + '"' : s }
  const csv = rows.map(r => r.map(esc).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
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
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleLogin = async () => {
    setBusy(true)
    try {
      const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) })
      if (res.ok) {
        setError('')
        onLogin()
        return
      }
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Incorrect password. Please try again.')
      setPw('')
    } catch (e) {
      setError('Could not reach the server. Check your connection and try again.')
    }
    setBusy(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#6B4423 0%,#8B5E34 40%,#A67C42 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src={MALAKESA_LOGO} alt="Malakesa" style={{ width: 240, borderRadius: 8, display: 'block', margin: '0 auto 16px' }} />
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: 2 }}>INVOICE & PURCHASES MANAGER</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,215,0,0.2)', borderRadius: 16, padding: '32px 32px 28px' }}>
          <h2 style={{ color: '#F5D98A', fontSize: 20, fontWeight: 700, margin: '0 0 6px', textAlign: 'center' }}>Welcome back</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', margin: '0 0 24px' }}>Enter your password to continue</p>
          {error && (
            <div style={{ background: 'rgba(163,45,45,0.25)', border: '0.5px solid rgba(163,45,45,0.5)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#ffaaaa', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="ti ti-alert-circle"></i> {error}
            </div>
          )}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                autoFocus
                style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: error ? '1px solid rgba(163,45,45,0.6)' : '1px solid rgba(255,215,0,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
              <button onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, fontSize: 16 }}>
                <i className={`ti ${show ? 'ti-eye-off' : 'ti-eye'}`}></i>
              </button>
            </div>
          </div>
          <button
            onClick={handleLogin}
            disabled={busy || !pw}
            style={{ width: '100%', padding: 13, background: pw && !busy ? 'linear-gradient(135deg,#8B6914,#C9A84C)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 10, color: pw && !busy ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 15, fontWeight: 700, cursor: pw && !busy ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}
          >
            {busy ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 24 }}>Malakesa Transfers and Tours — Port Vila, Vanuatu</p>
      </div>
    </div>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try { return sessionStorage.getItem('malakesa_auth') === 'yes' } catch(e) { return false }
  })
  const [page, setPage] = useState('dashboard')
  const [invoiceFilterHint, setInvoiceFilterHint] = useState('')
  const [overdueBannerDismissed, setOverdueBannerDismissed] = useState(false)
  const [backupBannerDismissed, setBackupBannerDismissed] = useState(false)
  const [lastBackupAt, setLastBackupAt] = useState(() => { try { return localStorage.getItem('malakesa_last_backup') } catch(e) { return null } })
  const [backingUpTopLevel, setBackingUpTopLevel] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [payments, setPayments] = useState([])
  const [clients, setClients] = useState([])
  const [purchases, setPurchases] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [employees, setEmployees] = useState([])
  const [customCategories, setCustomCategories] = useState([])
  const [salaryRecords, setSalaryRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)

  const reload = async () => {
    try {
      setLoading(true)
      const [invRes, pmtRes, clRes, purRes, supRes, empRes, catRes, salRes] = await Promise.all([
        fetch('/api/invoices'), fetch('/api/payments'), fetch('/api/clients'), fetch('/api/purchases'), fetch('/api/suppliers'), fetch('/api/employees'), fetch('/api/purchase-categories'), fetch('/api/salary-records')
      ])
      if ([invRes, pmtRes, clRes, purRes, supRes, empRes, catRes, salRes].some(r => r.status === 401)) {
        try { sessionStorage.removeItem('malakesa_auth') } catch(e) {}
        setIsLoggedIn(false)
        setLoading(false)
        return
      }
      const [invs, pmts, cls, purs, sups, emps, cats, sals] = await Promise.all([invRes.json(), pmtRes.json(), clRes.json(), purRes.json(), supRes.json(), empRes.json(), catRes.json(), salRes.json()])
      setInvoices(Array.isArray(invs) ? invs : [])
      setPayments(Array.isArray(pmts) ? pmts : [])
      setClients(Array.isArray(cls) ? cls : [])
      setPurchases(Array.isArray(purs) ? purs : [])
      setSuppliers(Array.isArray(sups) ? sups : [])
      setEmployees(Array.isArray(emps) ? emps : [])
      setCustomCategories(Array.isArray(cats) ? cats : [])
      setSalaryRecords(Array.isArray(sals) ? sals : [])
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard' },
    { id: 'invoices', label: 'Invoices', icon: 'ti-file-invoice' },
    { id: 'payments', label: 'Payments Received', icon: 'ti-cash-register' },
    { id: 'clients', label: 'Clients', icon: 'ti-users' },
    { id: 'purchases', label: 'Purchases', icon: 'ti-shopping-cart' },
    { id: 'suppliers', label: 'Suppliers', icon: 'ti-truck' },
    { id: 'vnpf', label: 'Salaries & VNPF', icon: 'ti-building-bank' },
    { id: 'vat', label: 'VAT Return', icon: 'ti-receipt-tax' },
    { id: 'reports', label: 'Reports', icon: 'ti-chart-bar' },
  ]

  if (!isLoggedIn) return <LoginScreen onLogin={() => { try { sessionStorage.setItem('malakesa_auth', 'yes') } catch(e) {}; setIsLoggedIn(true) }} />

  const overdueInvoices = invoices.filter(i => getStatus(i, payments) === 'overdue')
  const overdueTotal = overdueInvoices.reduce((s, i) => s + getBalance(i, payments), 0)

  const daysSinceBackup = lastBackupAt ? Math.floor((Date.now() - new Date(lastBackupAt).getTime()) / (1000 * 60 * 60 * 24)) : null
  const backupIsDue = daysSinceBackup === null || daysSinceBackup >= 7

  const downloadQuickBackup = () => {
    setBackingUpTopLevel(true)
    try {
      const backup = {
        company: 'Malakesa Transfers and Tours',
        exported_at: new Date().toISOString(),
        invoices, payments, clients, purchases, suppliers, employees,
        purchase_categories: customCategories,
        salary_records: salaryRecords,
      }
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const nowB = new Date()
      a.href = url
      a.download = `Malakesa_Full_Backup_${nowB.getFullYear()}-${String(nowB.getMonth() + 1).padStart(2, '0')}-${String(nowB.getDate()).padStart(2, '0')}.json`
      a.click()
      URL.revokeObjectURL(url)
      const nowIso = new Date().toISOString()
      try { localStorage.setItem('malakesa_last_backup', nowIso) } catch(e) {}
      setLastBackupAt(nowIso)
      setBackupBannerDismissed(false)
    } catch (e) {
      alert('Backup failed: ' + e.message)
    }
    setBackingUpTopLevel(false)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 14, color: '#1a1a1a', background: '#FBF3E4' }}>
      {/* Sidebar */}
      <div style={{ width: 220, minWidth: 220, background: 'linear-gradient(180deg, #6B4423 0%, #8B5E34 40%, #8F6D3D 70%, #A67C42 100%)', display: 'flex', flexDirection: 'column', boxShadow: '4px 0 20px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(255,215,0,0.15)', textAlign: 'center', background: 'linear-gradient(135deg, #6B4423 0%, #8B5E34 100%)' }}>
          <img
            src={MALAKESA_LOGO}
            alt="Malakesa Transfers and Tours"
            style={{ width: '100%', maxWidth: 188, borderRadius: 6, display: 'block', margin: '0 auto 4px' }}
          />
          <div style={{ marginTop: 8, background: 'rgba(255,215,0,0.1)', border: '0.5px solid rgba(255,215,0,0.3)', borderRadius: 4, padding: '3px 8px', display: 'inline-block' }}>
            <div style={{ fontSize: 8, color: '#1a1a1a', letterSpacing: '2.5px', fontWeight: 700 }}>INVOICE &amp; PURCHASES MANAGER</div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '8px 0' }}>
          {nav.map(item => (
            <div key={item.id} onClick={() => setPage(item.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', fontSize: 13, color: '#1a1a1a', cursor: 'pointer', borderLeft: page === item.id ? '2px solid #8B6914' : '2px solid transparent', background: page === item.id ? '#EDD9A3' : 'transparent', fontWeight: page === item.id ? 500 : 400 }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 16 }}></i>
              {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,215,0,0.15)' }}>
          <button onClick={async () => { try { await fetch('/api/logout', { method: 'POST' }) } catch(e) {}; try { sessionStorage.removeItem('malakesa_auth') } catch(e) {}; setIsLoggedIn(false) }} style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)', borderRadius: 8, padding: '7px 12px', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
            <i className="ti ti-logout" style={{ fontSize: 14 }}></i> Log out
          </button>
        </div>
        <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,215,0,0.2)', fontSize: 11, color: '#1a1a1a', fontWeight: 600, textAlign: 'center', letterSpacing: '1.5px' }}>📍 PORT VILA, VANUATU</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {overdueInvoices.length > 0 && !overdueBannerDismissed && (
          <div style={{ background: '#FCEBEB', borderBottom: '1px solid #E8B4B4', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#791F1F' }}>
              <i className="ti ti-alert-triangle" style={{ fontSize: 16 }}></i>
              <span><strong>{overdueInvoices.length} invoice{overdueInvoices.length === 1 ? '' : 's'}</strong> overdue, VT {overdueTotal.toLocaleString()} outstanding — needs a reminder</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-sm" style={{ borderColor: '#791F1F', color: '#791F1F', background: '#fff' }} onClick={() => { setInvoiceFilterHint('overdue'); setPage('invoices') }}>Review &amp; Send Reminders</button>
              <button className="btn btn-sm" style={{ borderColor: 'transparent', color: '#791F1F', background: 'transparent' }} onClick={() => setOverdueBannerDismissed(true)} title="Dismiss for this session"><i className="ti ti-x"></i></button>
            </div>
          </div>
        )}
        {backupIsDue && !backupBannerDismissed && (
          <div style={{ background: '#FDF0DC', borderBottom: '1px solid #EBCB8E', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#7A4E0A' }}>
              <i className="ti ti-cloud-download" style={{ fontSize: 16 }}></i>
              <span>
                {lastBackupAt
                  ? <>It's been <strong>{daysSinceBackup} days</strong> since your last data backup.</>
                  : <>You haven't downloaded a data backup yet.</>} Keep a copy safe in case anything ever goes wrong.
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-sm" style={{ borderColor: '#7A4E0A', color: '#7A4E0A', background: '#fff' }} onClick={downloadQuickBackup} disabled={backingUpTopLevel}>
                <i className="ti ti-download"></i> {backingUpTopLevel ? 'Preparing...' : 'Download Backup Now'}
              </button>
              <button className="btn btn-sm" style={{ borderColor: 'transparent', color: '#7A4E0A', background: 'transparent' }} onClick={() => setBackupBannerDismissed(true)} title="Remind me later"><i className="ti ti-x"></i></button>
            </div>
          </div>
        )}
        {loading && page !== 'dashboard' ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>Loading...</div>
        ) : (
          <>
            {page === 'dashboard' && <Dashboard invoices={invoices} payments={payments} purchases={purchases} customCategories={customCategories} loading={loading} setPage={setPage} setModal={setModal} />}
            {page === 'invoices' && <Invoices invoices={invoices} payments={payments} reload={reload} setModal={setModal} setSelected={setSelected} initialStatus={invoiceFilterHint} />}
            {page === 'payments' && <Payments payments={payments} invoices={invoices} reload={reload} setModal={setModal} setSelected={setSelected} />}
            {page === 'purchases' && <Purchases purchases={purchases} suppliers={suppliers} customCategories={customCategories} reload={reload} setModal={setModal} setSelected={setSelected} />}
            {page === 'suppliers' && <Suppliers suppliers={suppliers} purchases={purchases} reload={reload} setModal={setModal} />}
            {page === 'vnpf' && <VNPF employees={employees} salaryRecords={salaryRecords} reload={reload} setModal={setModal} setSelected={setSelected} />}
            {page === 'reports' && <Reports invoices={invoices} payments={payments} purchases={purchases} salaryRecords={salaryRecords} />}
            {page === 'vat' && <VatPage invoices={invoices} payments={payments} purchases={purchases} />}
            {page === 'clients' && <Clients clients={clients} invoices={invoices} payments={payments} reload={reload} setModal={setModal} />}
          </>
        )}
      </div>

      {/* Modals */}
      {modal === 'newInvoice' && <NewInvoiceModal clients={clients} onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'editInvoice' && selected && <NewInvoiceModal clients={clients} invoice={selected} onClose={() => { setModal(null); setSelected(null) }} onSave={() => { setModal(null); setSelected(null); reload() }} />}
      {modal === 'payment' && selected && <PaymentModal invoice={selected} payments={payments} onClose={() => { setModal(null); setSelected(null) }} onSave={() => { setModal(null); setSelected(null); reload() }} />}
      {modal === 'newClient' && <NewClientModal onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'newSupplier' && <NewSupplierModal onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'newPurchase' && <NewPurchaseModal suppliers={suppliers} customCategories={customCategories} purchases={purchases} onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'editPurchase' && selected && <NewPurchaseModal suppliers={suppliers} customCategories={customCategories} purchases={purchases} purchase={selected} onClose={() => { setModal(null); setSelected(null) }} onSave={() => { setModal(null); setSelected(null); reload() }} />}
      {modal === 'manageCategories' && <ManageCategoriesModal customCategories={customCategories} onClose={() => setModal(null)} onSave={reload} />}
      {modal === 'newEmployee' && <NewEmployeeModal onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'editEmployee' && selected && <NewEmployeeModal employee={selected} onClose={() => { setModal(null); setSelected(null) }} onSave={() => { setModal(null); setSelected(null); reload() }} />}
      {modal === 'viewInvoice' && selected && <ViewInvoiceModal invoice={selected} payments={payments} onClose={() => { setModal(null); setSelected(null) }} onPay={() => { setModal('payment') }} />}
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────
// ── Month/Year Picker (calendar popup) ────────────────────
function MonthYearPicker({ value, onChange, accentColor = '#8B6914', allowClear = false, clearLabel = 'All months' }) {
  const [open, setOpen] = useState(false)
  const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']

  const hasValue = !!value
  const [vy, vm] = hasValue ? value.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1]
  const [viewYear, setViewYear] = useState(vy)

  const wrapRef = useRef(null)
  useEffect(() => {
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { if (open) setViewYear(vy) }, [open])

  const label = hasValue ? `${MONTHS_LONG[vm - 1]} ${vy}` : clearLabel

  const selectMonth = (mIdx) => {
    const mm = String(mIdx + 1).padStart(2, '0')
    onChange(`${viewYear}-${mm}`)
    setOpen(false)
  }

  const isSelected = (mIdx) => hasValue && value === `${viewYear}-${String(mIdx + 1).padStart(2, '0')}`
  const isCurrentRealMonth = (mIdx) => {
    const now = new Date()
    return viewYear === now.getFullYear() && mIdx === now.getMonth()
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 8, border: `0.5px solid ${accentColor}`, fontSize: 13, fontFamily: 'inherit', background: accentColor, color: '#fff', fontWeight: 500, cursor: 'pointer' }}
      >
        <i className="ti ti-calendar" style={{ fontSize: 15 }}></i>
        {label}
        <i className="ti ti-chevron-down" style={{ fontSize: 13, opacity: 0.8 }}></i>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 200, background: '#fff', borderRadius: 12, boxShadow: '0 8px 28px rgba(0,0,0,0.22)', border: '0.5px solid rgba(0,0,0,0.09)', padding: 14, width: 250 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <button onClick={() => setViewYear(y => y - 1)} style={{ border: 'none', background: '#f5f0e8', borderRadius: 6, width: 26, height: 26, cursor: 'pointer', color: accentColor, fontSize: 14 }}><i className="ti ti-chevron-left"></i></button>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#3D2214' }}>{viewYear}</div>
            <button onClick={() => setViewYear(y => y + 1)} style={{ border: 'none', background: '#f5f0e8', borderRadius: 6, width: 26, height: 26, cursor: 'pointer', color: accentColor, fontSize: 14 }}><i className="ti ti-chevron-right"></i></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {MONTHS_SHORT.map((m, i) => {
              const sel = isSelected(i)
              const isNow = isCurrentRealMonth(i)
              return (
                <button
                  key={m}
                  onClick={() => selectMonth(i)}
                  style={{
                    padding: '8px 0', borderRadius: 7, fontSize: 12.5, fontWeight: sel ? 700 : 500, cursor: 'pointer',
                    border: isNow && !sel ? `1px solid ${accentColor}` : '1px solid transparent',
                    background: sel ? accentColor : '#f8f5ee',
                    color: sel ? '#fff' : '#3D2214',
                  }}
                >
                  {m}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
            {allowClear ? (
              <button
                onClick={() => { onChange(''); setOpen(false) }}
                style={{ fontSize: 11.5, color: '#A32D2D', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Clear ({clearLabel})
              </button>
            ) : (
              <button
                onClick={() => { const now = new Date(); setViewYear(now.getFullYear()); onChange(`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`); setOpen(false) }}
                style={{ fontSize: 11.5, color: accentColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Jump to current month
              </button>
            )}
            <button onClick={() => setOpen(false)} style={{ fontSize: 11.5, color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Pie Chart (reusable SVG) ──────────────────────────────
function PieChart({ data, size = 160, colors }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const palette = colors || ['#8B6914', '#3B6D11', '#A32D2D', '#5C3D0A', '#D85A30', '#2E7D2E', '#633806', '#1A4D1A']
  if (total <= 0) {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 11, textAlign: 'center', padding: 10 }}>
        No data
      </div>
    )
  }
  const r = size / 2
  let cumulative = 0
  const slices = data.filter(d => d.value > 0).map((d, i) => {
    const fraction = d.value / total
    const startAngle = cumulative * 2 * Math.PI
    cumulative += fraction
    const endAngle = cumulative * 2 * Math.PI
    const x1 = r + r * Math.sin(startAngle)
    const y1 = r - r * Math.cos(startAngle)
    const x2 = r + r * Math.sin(endAngle)
    const y2 = r - r * Math.cos(endAngle)
    const largeArc = fraction > 0.5 ? 1 : 0
    const path = `M ${r} ${r} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
    return { path, color: palette[i % palette.length], label: d.label, value: d.value, pct: Math.round(fraction * 100) }
  })
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.length === 1
          ? <circle cx={r} cy={r} r={r} fill={slices[0].color} />
          : slices.map((s, i) => <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth="1.5" />)
        }
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {slices.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: s.color, display: 'inline-block', flexShrink: 0 }}></span>
            <span style={{ color: '#444' }}>{s.label}</span>
            <span style={{ color: '#888', fontSize: 11 }}>({s.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────
function Dashboard({ invoices, payments, purchases, customCategories, loading, setPage, setModal }) {
  const totalInvoiced = invoices.reduce((s, i) => s + Number(i.total), 0)
  const totalCollected = payments.reduce((s, p) => s + Number(p.amount), 0)
  const outstanding = invoices.reduce((s, i) => s + getBalance(i, payments), 0)
  const overdueCount = invoices.filter(i => getStatus(i, payments) === 'overdue').length
  const recent = [...invoices].reverse().slice(0, 6)

  const purchasesList = purchases || []
  const totalPurchases = purchasesList.reduce((s, p) => s + Number(p.amount || 0), 0)
  const thisMonthPurchases = purchasesList.filter(p => p.date?.startsWith(localMonthStr(new Date()))).reduce((s, p) => s + Number(p.amount || 0), 0)
  const recentPurchases = [...purchasesList].sort((a,b) => b.date > a.date ? 1 : -1).slice(0, 6)

  // Trend calculations: this month vs last month
  const now2 = new Date()
  const thisMonth = localMonthStr(now2)
  const lastMonthD = new Date(now2.getFullYear(), now2.getMonth() - 1, 1)
  const lastMonth = localMonthStr(lastMonthD)
  const invThisMonth = invoices.filter(i => i.date?.startsWith(thisMonth)).reduce((s, i) => s + Number(i.total), 0)
  const invLastMonth = invoices.filter(i => i.date?.startsWith(lastMonth)).reduce((s, i) => s + Number(i.total), 0)
  const pmtThisMonth = payments.filter(p => p.date?.startsWith(thisMonth)).reduce((s, p) => s + Number(p.amount), 0)
  const pmtLastMonth = payments.filter(p => p.date?.startsWith(lastMonth)).reduce((s, p) => s + Number(p.amount), 0)
  const purThisMonth = purchasesList.filter(p => p.date?.startsWith(thisMonth)).reduce((s, p) => s + Number(p.amount || 0), 0)
  const purLastMonth = purchasesList.filter(p => p.date?.startsWith(lastMonth)).reduce((s, p) => s + Number(p.amount || 0), 0)
  const calcTrend = (cur, prev) => {
    if (prev === 0 && cur === 0) return null
    if (prev === 0) return { pct: 100, dir: 'up' }
    const pct = Math.round(((cur - prev) / prev) * 100)
    return { pct: Math.abs(pct), dir: pct >= 0 ? 'up' : 'down' }
  }
  const trendInvoiced = calcTrend(invThisMonth, invLastMonth)
  const trendCollected = calcTrend(pmtThisMonth, pmtLastMonth)
  const trendPurchases = calcTrend(purThisMonth, purLastMonth)
  const Trend = ({ t, goodDir = 'up' }) => {
    if (!t) return null
    const isGood = t.dir === goodDir
    const color = isGood ? '#3B6D11' : '#A32D2D'
    const bg = isGood ? '#EAF3DE' : '#FCEBEB'
    const arrow = t.dir === 'up' ? '▲' : '▼'
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: bg, color, borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>
        <span style={{ fontSize: 9 }}>{arrow}</span> {t.pct}% vs last month
      </span>
    )
  }

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const m = d.getMonth(); const y = d.getFullYear()
    const amt = invoices.filter(inv => { const id = new Date(inv.date + 'T00:00:00'); return id.getMonth() === m && id.getFullYear() === y }).reduce((s, inv) => s + Number(inv.total), 0)
    return { label: MONTHS[m] + ' ' + String(y).slice(2), amt }
  })
  const revenuePieData = monthData.map(m => ({ label: m.label, value: m.amt }))

  const purchaseMonthData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const m = d.getMonth(); const y = d.getFullYear()
    const amt = purchasesList.filter(p => { if (!p.date) return false; const pd = new Date(p.date + 'T00:00:00'); return pd.getMonth() === m && pd.getFullYear() === y }).reduce((s, p) => s + Number(p.amount || 0), 0)
    return { label: MONTHS[m] + ' ' + String(y).slice(2), amt }
  })
  const purchasePieData = purchaseMonthData.map(m => ({ label: m.label, value: m.amt }))

  return (
    <>
      <Topbar title="Dashboard">
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={() => setModal('newInvoice')}><i className="ti ti-plus"></i> New Invoice</button>
          <button className="btn" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 500 }} onClick={() => setModal('newPurchase')}><i className="ti ti-plus"></i> New Purchase</button>
        </div>
      </Topbar>
      <div style={{ padding: 20 }}>
        {loading ? <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>Loading...</div> : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 16 }}>

              {/* Total Invoiced */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Invoiced</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.1 }}>{fmt(totalInvoiced)}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{invoices.length} invoice{invoices.length !== 1 ? 's' : ''} total</div>
                <Trend t={trendInvoiced} goodDir="up" />
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11, background: '#3D2214', color: '#F5D98A', borderColor: '#3D2214', fontWeight: 600 }} onClick={() => setModal('newInvoice')}>
                  <i className="ti ti-plus"></i> New Invoice
                </button>
              </div>

              {/* Collected */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Collected</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#3B6D11', lineHeight: 1.1 }}>{fmt(totalCollected)}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{fmt(pmtThisMonth)} this month</div>
                <Trend t={trendCollected} goodDir="up" />
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11 }} onClick={() => setPage('payments')}>
                  <i className="ti ti-cash-register"></i> View payments
                </button>
              </div>

              {/* Outstanding */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Outstanding</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#D85A30', lineHeight: 1.1 }}>{fmt(outstanding)}</div>
                <div style={{ fontSize: 11, color: '#888' }}>unpaid balance</div>
                <div style={{ height: 22 }}></div>
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11 }} onClick={() => setPage('invoices')}>
                  <i className="ti ti-alert-triangle"></i> View unpaid
                </button>
              </div>

              {/* Overdue */}
              <div style={{ background: overdueCount > 0 ? '#FFF5F5' : '#fff', borderRadius: 10, padding: '14px 16px', border: overdueCount > 0 ? '0.5px solid #F7C1C1' : '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Overdue</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#A32D2D', lineHeight: 1.1 }}>{overdueCount}</div>
                <div style={{ fontSize: 11, color: '#888' }}>invoice{overdueCount !== 1 ? 's' : ''} need follow-up</div>
                {overdueCount > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#FCEBEB', color: '#A32D2D', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>
                  <span style={{ fontSize: 9 }}>⚠</span> Action needed
                </span>}
                {overdueCount === 0 && <div style={{ height: 22 }}></div>}
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11, ...(overdueCount > 0 ? { background: '#A32D2D', color: '#fff', borderColor: '#A32D2D', fontWeight: 600 } : {}) }} onClick={() => setPage('invoices')}>
                  <i className="ti ti-send"></i> {overdueCount > 0 ? 'Follow up now' : 'View invoices'}
                </button>
              </div>

              {/* Purchases */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Purchases</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#8B6914', lineHeight: 1.1 }}>{fmt(totalPurchases)}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{fmt(purThisMonth)} this month</div>
                <Trend t={trendPurchases} goodDir="down" />
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11 }} onClick={() => setModal('newPurchase')}>
                  <i className="ti ti-plus"></i> New Purchase
                </button>
              </div>

            </div>

            {(() => {
              const catsWithBudget = (customCategories || []).filter(c => c.budget && Number(c.budget) > 0)
              if (catsWithBudget.length === 0) return null
              const now4 = new Date()
              const thisMonthStr4 = localMonthStr(now4)
              const thisQStart4 = new Date(now4.getFullYear(), Math.floor(now4.getMonth() / 3) * 3, 1)
              const thisYearStr4 = String(now4.getFullYear())
              const getSpend4 = (catName, period) => purchasesList.filter(p => {
                if ((p.category || 'Other') !== catName || !p.date) return false
                if (period === 'monthly') return p.date.startsWith(thisMonthStr4)
                if (period === 'quarterly') return new Date(p.date + 'T00:00:00') >= thisQStart4
                if (period === 'yearly') return p.date.startsWith(thisYearStr4)
                return false
              }).reduce((s, p) => s + Number(p.amount || 0), 0)
              const statuses = catsWithBudget.map(cat => {
                const period = cat.budget_period || 'monthly'
                const budget = Number(cat.budget)
                const spent = getSpend4(cat.name, period)
                return { name: cat.name, over: spent > budget, warn: budget > 0 && spent / budget >= 0.8 && spent <= budget }
              })
              const overCats = statuses.filter(s => s.over)
              const warnCats = statuses.filter(s => s.warn)
              const totalBudget = catsWithBudget.reduce((s, c) => s + Number(c.budget), 0)
              const totalSpent = catsWithBudget.reduce((s, c) => s + getSpend4(c.name, c.budget_period || 'monthly'), 0)
              if (overCats.length === 0 && warnCats.length === 0) return null
              return (
                <div style={{ background: overCats.length > 0 ? '#FCEBEB' : '#FDF0DC', border: `0.5px solid ${overCats.length > 0 ? '#E8B4B4' : '#EBCB8E'}`, borderRadius: 10, padding: '12px 16px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: overCats.length > 0 ? '#791F1F' : '#7A4E0A' }}>
                    <i className="ti ti-chart-bar" style={{ fontSize: 16 }}></i>
                    <span>
                      {overCats.length > 0 && <><strong>{overCats.map(c => c.name).join(', ')}</strong> over budget. </>}
                      {warnCats.length > 0 && <><strong>{warnCats.map(c => c.name).join(', ')}</strong> nearing budget. </>}
                      Total spend {fmt(totalSpent)} of {fmt(totalBudget)} budgeted.
                    </span>
                  </div>
                  <button className="btn btn-sm" style={{ borderColor: overCats.length > 0 ? '#791F1F' : '#7A4E0A', color: overCats.length > 0 ? '#791F1F' : '#7A4E0A', background: '#fff' }} onClick={() => setPage('purchases')}>View Budget Tracker</button>
                </div>
              )
            })()}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card>
                <div style={{ fontWeight: 500, marginBottom: 14 }}>Revenue — last 6 months</div>
                <PieChart data={revenuePieData} size={150} colors={['#8B6914','#A8841A','#C9A24A','#5C3D0A','#3B6D11','#2E7D2E']} />
              </Card>
              <Card>
                <div style={{ fontWeight: 500, marginBottom: 14 }}>Purchases — last 6 months</div>
                <PieChart data={purchasePieData} size={150} colors={['#A32D2D','#D85A30','#C9744A','#633806','#8B6914','#5C3D0A']} />
              </Card>
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 14 }}>Recent invoices</strong>
                <button className="btn btn-sm" onClick={() => setPage('invoices')}>View all</button>
              </div>
              {recent.length === 0 ? <Empty icon="ti-file-off" msg="No invoices yet" /> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: '#FBF3E4' }}><Th>Invoice #</Th><Th>Client</Th><Th>Date</Th><Th>Amount</Th><Th>Status</Th><Th></Th></tr></thead>
                  <tbody>{recent.map(inv => (
                    <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td><strong>{inv.number}</strong></Td><Td>{inv.client_name}</Td><Td>{fmtDate(inv.date)}</Td><Td>{fmt(inv.total)}</Td>
                      <Td><Badge status={getStatus(inv, payments)} /></Td>
                      <Td><button className="btn btn-sm" onClick={() => setPage('invoices')}>View</button></Td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </Card>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 14 }}>Recent purchases</strong>
                <button className="btn btn-sm" onClick={() => setPage('purchases')}>View all</button>
              </div>
              {recentPurchases.length === 0 ? <Empty icon="ti-shopping-cart-off" msg="No purchases yet" /> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: '#FBF3E4' }}><Th>Date</Th><Th>Supplier</Th><Th>Category</Th><Th>Amount</Th><Th></Th></tr></thead>
                  <tbody>{recentPurchases.map(p => (
                    <tr key={p.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td>{fmtDate(p.date)}</Td>
                      <Td><strong>{p.supplier}</strong></Td>
                      <Td><span style={{ background: '#FBF3E4', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{p.category || 'Other'}</span></Td>
                      <Td style={{ fontWeight: 500 }}>{fmt(p.amount)}</Td>
                      <Td><button className="btn btn-sm" onClick={() => setPage('purchases')}>View</button></Td>
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
// ═══════════════════════════════════════════════════════════
// ExportModal - reusable export dialog with column selection
// ═══════════════════════════════════════════════════════════
function ExportModal({ title, columns, onExport, onClose }) {
  const [selected, setSelected] = useState(new Set(columns.map(c => c.key)))
  const [format, setFormat] = useState('excel')
  const toggle = (key) => setSelected(s => { const n = new Set(s); n.has(key) ? n.delete(key) : n.add(key); return n })
  const toggleAll = () => setSelected(selected.size === columns.length ? new Set() : new Set(columns.map(c => c.key)))

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 480, boxShadow: '0 8px 40px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#6B4423,#8B5E34,#A67C42)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' }}>Export</div>
            <div style={{ color: '#F5D98A', fontSize: 16, fontWeight: 700, marginTop: 2 }}>{title}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', opacity: 0.7 }}>&times;</button>
        </div>

        <div style={{ padding: 20 }}>
          {/* Format selector */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Export format</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { key: 'excel', label: 'Excel / CSV', icon: 'ti-file-spreadsheet', color: '#1D6F42' },
                { key: 'pdf', label: 'PDF', icon: 'ti-file-type-pdf', color: '#A32D2D' },
              ].map(f => (
                <button key={f.key} onClick={() => setFormat(f.key)} style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: format === f.key ? `2px solid ${f.color}` : '1.5px solid #e0e0e0', background: format === f.key ? f.color + '10' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <i className={`ti ${f.icon}`} style={{ fontSize: 22, color: format === f.key ? f.color : '#aaa' }}></i>
                  <span style={{ fontSize: 12, fontWeight: 600, color: format === f.key ? f.color : '#888' }}>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column selector — only for Excel */}
          {format === 'excel' && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select columns</div>
                <button onClick={toggleAll} style={{ fontSize: 11, color: '#8B6914', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  {selected.size === columns.length ? 'Deselect all' : 'Select all'}
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {columns.map(col => (
                  <label key={col.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 7, border: selected.has(col.key) ? '1.5px solid #8B6914' : '1.5px solid #e0e0e0', background: selected.has(col.key) ? '#faf6ee' : '#fafafa', cursor: 'pointer', fontSize: 12 }}>
                    <input type="checkbox" checked={selected.has(col.key)} onChange={() => toggle(col.key)} style={{ accentColor: '#8B6914' }} />
                    <span style={{ fontWeight: selected.has(col.key) ? 600 : 400, color: selected.has(col.key) ? '#3D2214' : '#777' }}>{col.label}</span>
                  </label>
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 8 }}>{selected.size} of {columns.length} columns selected</div>
            </div>
          )}

          {format === 'pdf' && (
            <div style={{ background: '#faf6ee', border: '0.5px solid #FBF3E4', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#666', marginBottom: 18 }}>
              <i className="ti ti-info-circle" style={{ color: '#8B6914', marginRight: 6 }}></i>
              Opens a print-ready PDF preview. In the print dialog, choose <strong>"Save as PDF"</strong> as the printer destination.
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'flex-end', gap: 8, background: '#fafaf8' }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={format === 'excel' && selected.size === 0} onClick={() => { onExport(format, selected); onClose() }}>
            <i className={`ti ${format === 'excel' ? 'ti-download' : 'ti-printer'}`}></i>
            {format === 'excel' ? ' Download Excel' : ' Open PDF'}
          </button>
        </div>
      </div>
    </div>
  )
}


function Invoices({ invoices, payments, reload, setModal, setSelected, initialStatus }) {
  const [filterClient, setFilterClient] = useState('')
  const [filterStatus, setFilterStatus] = useState(initialStatus || '')
  const [filterMonth, setFilterMonth] = useState('')
  const [search, setSearch] = useState('')
  const [sending, setSending] = useState(null)
  const [notice, setNotice] = useState('')
  const [reminderPreview, setReminderPreview] = useState(null) // { inv, subject, body }
  const searchRef = useRef(null)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') searchRef.current?.blur()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const allClients = [...new Set(invoices.map(i => i.client_name))].sort()
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthOptions = Array.from({length: 12}, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
    return { value: localMonthStr(d), label: MONTHS[d.getMonth()] + ' ' + d.getFullYear() }
  }).reverse()

  let filtered = [...invoices].reverse()
  const q = search.toLowerCase().trim()
  if (q) filtered = filtered.filter(i =>
    i.number?.toLowerCase().includes(q) ||
    i.client_name?.toLowerCase().includes(q) ||
    String(i.total || '').includes(q) ||
    (i.date || '').includes(q) ||
    (i.due_date || '').includes(q) ||
    (i.notes || '').toLowerCase().includes(q) ||
    getStatus(i, payments).includes(q)
  )
  if (filterClient) filtered = filtered.filter(i => i.client_name === filterClient)
  if (filterStatus) filtered = filtered.filter(i => getStatus(i, payments) === filterStatus)
  if (filterMonth) filtered = filtered.filter(i => i.date?.startsWith(filterMonth))

  const totalFiltered = filtered.reduce((s, i) => s + Number(i.total), 0)
  const totalBalance = filtered.reduce((s, i) => s + getBalance(i, payments), 0)

  const clearFilters = () => { setFilterClient(''); setFilterStatus(''); setFilterMonth(''); setSearch('') }
  const hasFilters = filterClient || filterStatus || filterMonth || search

  const buildReminderEmail = (inv) => {
    const bal = getBalance(inv, payments)
    const subject = 'Payment Reminder — Invoice ' + inv.number
    const body = 'Dear ' + (inv.client_name || 'Client') + ',\n\n' +
      'This is a friendly reminder that the following invoice is outstanding and requires your attention:\n\n' +
      'Invoice Number: ' + inv.number + '\n' +
      'Invoice Date:   ' + fmtDate(inv.date) + '\n' +
      'Due Date:       ' + fmtDate(inv.due_date) + '\n' +
      'Invoice Total:  VT ' + Number(inv.total).toLocaleString() + '\n' +
      'Balance Due:    VT ' + Number(bal).toLocaleString() + '\n\n' +
      'Please arrange payment at your earliest convenience. If you have already made payment, please disregard this notice.\n\n' +
      'For payment enquiries please contact us:\n' +
      'Tel: +678 22712 | Mob: +678 7798712\n' +
      'Email: accounts@malakesa.vu\n\n' +
      'Thank you for your business.\n\n' +
      'Malakesa Transfers and Tours\n' +
      'Port Vila, Shefa Province, Vanuatu'
    return { subject, body, bal }
  }

  const sendReminder = (inv) => {
    const { subject, body, bal } = buildReminderEmail(inv)
    setReminderPreview({ inv, subject, body, bal })
  }

  const confirmSendReminder = async (inv, subject, body) => {
    setReminderPreview(null)
    setSending(inv.id)
    try {
      const res = await fetch('/api/send-reminder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: inv.id }) })
      if (res.ok) { setNotice('Reminder sent to ' + inv.client_name); setTimeout(() => setNotice(''), 5000); setSending(null); return }
    } catch(e) {}
    // mailto: must use location.href not window.open to trigger email app correctly
    const mailtoUrl = 'mailto:' + (inv.client_email || '') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
    window.location.href = mailtoUrl
    setNotice('Email app opened for ' + inv.client_name)
    setTimeout(() => setNotice(''), 5000)
    setSending(null)
  }

  const sendAllOverdueReminders = async () => {
    const overdue = filtered.filter(i => getStatus(i, payments) === 'overdue')
    if (overdue.length === 0) { alert('No overdue invoices found.'); return }

    // Group by client - one email per client listing ALL their overdue invoices
    const byClient = {}
    overdue.forEach(inv => {
      const key = inv.client_name || 'Unknown'
      if (!byClient[key]) byClient[key] = { email: inv.client_email || '', invoices: [] }
      byClient[key].invoices.push(inv)
    })

    const clients = Object.entries(byClient)
    const withEmail = clients.filter(([,c]) => c.email)
    const noEmail = clients.filter(([,c]) => !c.email).map(([name]) => name)

    if (withEmail.length === 0) {
      alert('No email addresses found.\nMissing: ' + noEmail.join(', ') + '\nAdd client emails in the Clients page.')
      return
    }

    let msg = 'Send ONE grouped reminder email per client?\n\n'
    withEmail.forEach(([name, c]) => {
      const total = c.invoices.reduce((s, i) => s + getBalance(i, payments), 0)
      msg += '- ' + name + ': ' + c.invoices.length + ' invoice(s), VT ' + Number(total).toLocaleString() + ' outstanding\n'
    })
    if (noEmail.length > 0) msg += '\nSkipped (no email): ' + noEmail.join(', ')
    if (!confirm(msg)) return

    for (const [clientName, c] of withEmail) {
      setSending(clientName)
      const totalOwed = c.invoices.reduce((s, i) => s + getBalance(i, payments), 0)
      const invoiceLines = c.invoices.map(inv => {
        const bal = getBalance(inv, payments)
        return '  - Invoice ' + inv.number + ': VT ' + Number(bal).toLocaleString() + ' (due ' + fmtDate(inv.due_date) + ')'
      }).join('\n')

      let sent = false
      try {
        const res = await fetch('/api/send-reminder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ invoiceIds: c.invoices.map(i => i.id), grouped: true })
        })
        if (res.ok) sent = true
      } catch(e) {}

      if (!sent) {
        const subject = encodeURIComponent('Payment Reminder — Outstanding Invoices')
        const bodyText = 'Dear ' + clientName + ',\n\n' +
          'This is a friendly reminder that the following invoices are overdue:\n\n' +
          invoiceLines + '\n\n' +
          'Total outstanding: VT ' + Number(totalOwed).toLocaleString() + '\n\n' +
          'Please arrange payment at your earliest convenience.\n\n' +
          'Thank you,\nMalakesa Transfers and Tours\nTel: +678 22712 | accounts@malakesa.vu'
        window.location.href = 'mailto:' + c.email + '?subject=' + subject + '&body=' + encodeURIComponent(bodyText)
      }

      setNotice('Reminder sent to ' + clientName + ' (' + c.invoices.length + ' invoice' + (c.invoices.length !== 1 ? 's' : '') + ')')
      setTimeout(() => setNotice(''), 5000)
    }
    setSending(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this invoice?')) return
    const res = await fetch('/api/invoices/' + id, { method: 'DELETE' })
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || 'Could not delete this invoice'); return }
    reload()
  }

  const selectStyle = { padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }

  // Export
  const [showExport, setShowExport] = useState(false)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const toggleSelect = (id) => setSelectedIds(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleAll = () => setSelectedIds(s => s.size === filtered.length ? new Set() : new Set(filtered.map(i => i.id)))
  const selectedInvoices = filtered.filter(i => selectedIds.has(i.id))
  const allSelected = filtered.length > 0 && selectedIds.size === filtered.length
  const someSelected = selectedIds.size > 0

  const bulkPrint = () => {
    const invs = selectedInvoices
    if (!invs.length) return
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups.'); return }
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    const rows = invs.map(inv => {
      const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
      const stColor = st === 'paid' ? '#3B6D11' : st === 'overdue' ? '#A32D2D' : '#D85A30'
      return `<tr><td>${inv.number}</td><td>${fmtDate(inv.date)}</td><td>${fmtDate(inv.due_date)}</td><td>${inv.client_name}</td><td style='text-align:right'>${fmt(inv.total)}</td><td style='text-align:right;color:${bal>0?'#D85A30':'#3B6D11'}'>${fmt(bal)}</td><td><span style='background:${stColor}20;color:${stColor};padding:2px 8px;border-radius:99px;font-size:11px;font-weight:600'>${st}</span></td></tr>`
    }).join('')
    const totalSel = invs.reduce((s,i)=>s+Number(i.total),0)
    const totalBal = invs.reduce((s,i)=>s+getBalance(i,payments),0)
    w.document.write(`<!DOCTYPE html><html><head><title>Bulk Invoice Print</title><style>
      body{font-family:Arial,sans-serif;color:#222;font-size:13px;margin:0}
      .rpt-hdr{display:none} @page{margin:18mm 14mm 20mm 14mm;size:A4}
      table{width:100%;border-collapse:collapse;font-size:12px}
      thead{display:table-header-group} th{background:#FBF3E4;padding:8px 10px;text-align:left;font-size:11px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      td{padding:8px 10px;border-bottom:0.5px solid #eee} h1{color:#8B6914;font-size:18px;margin:0 0 4px} .sub{color:#888;font-size:12px;margin-bottom:20px}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      @media print{.noprint{display:none}.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999} body{padding-top:42px}}
    </style></head><body>
    <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfers &amp; Tours — Selected Invoices (${invs.length})</span><span style='font-size:10px;color:#888'>${now}</span></div>
    <div class='noprint'><span>Bulk Print — ${invs.length} selected invoice(s)</span><button class='printbtn' onclick='window.print()'>🖨️ Print / Save PDF</button></div>
    <div style='padding:20px 40px'>
      <h1>Malakesa Transfers &amp; Tours</h1>
      <div class='sub'>Selected Invoices &nbsp;|&nbsp; ${invs.length} invoice(s) &nbsp;|&nbsp; ${now}<br>Total: VT ${Number(totalSel).toLocaleString()} &nbsp;|&nbsp; Outstanding: VT ${Number(totalBal).toLocaleString()}</div>
      <table><thead><tr><th>Invoice #</th><th>Issue Date</th><th>Due Date</th><th>Client</th><th style='text-align:right'>Total</th><th style='text-align:right'>Balance</th><th>Status</th></tr></thead>
      <tbody>${rows}</tbody>
      <tr style='background:#FBF3E4;font-weight:700'><td colspan='4' style='padding:9px 10px'>TOTAL (${invs.length} invoices)</td><td style='padding:9px 10px;text-align:right'>VT ${Number(totalSel).toLocaleString()}</td><td style='padding:9px 10px;text-align:right'>VT ${Number(totalBal).toLocaleString()}</td><td></td></tr>
      </table></div><script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const bulkEmailReminders = async () => {
    const invs = selectedInvoices.filter(i => getStatus(i, payments) !== 'paid')
    if (!invs.length) { alert('No unpaid invoices selected.'); return }
    // Group by client
    const byClient = {}
    invs.forEach(inv => {
      const key = inv.client_name
      if (!byClient[key]) byClient[key] = { email: inv.client_email || '', invoices: [] }
      byClient[key].invoices.push(inv)
    })
    const withEmail = Object.entries(byClient).filter(([,c]) => c.email)
    const noEmail = Object.entries(byClient).filter(([,c]) => !c.email).map(([n]) => n)
    if (!withEmail.length) { alert('No email addresses found for selected clients.\n\nMissing: ' + noEmail.join(', ')); return }
    let msg = `Send one reminder email per client for ${invs.length} selected invoice(s)?\n\n`
    withEmail.forEach(([name, c]) => {
      const total = c.invoices.reduce((s, i) => s + getBalance(i, payments), 0)
      msg += '- ' + name + ': ' + c.invoices.length + ' invoice(s), VT ' + Number(total).toLocaleString() + ' outstanding\n'
    })
    if (noEmail.length) msg += '\nSkipped (no email): ' + noEmail.join(', ')
    if (!confirm(msg)) return
    for (const [clientName, c] of withEmail) {
      const totalOwed = c.invoices.reduce((s, i) => s + getBalance(i, payments), 0)
      const invoiceLines = c.invoices.map(inv => {
        const bal = getBalance(inv, payments)
        return '  - Invoice ' + inv.number + ': VT ' + Number(bal).toLocaleString() + ' (due ' + fmtDate(inv.due_date) + ')'
      }).join('\n')
      let sent = false
      try {
        if (c.invoices.length === 1) {
          const res = await fetch('/api/send-reminder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: c.invoices[0].id }) })
          if (res.ok) sent = true
        }
      } catch(e) {}
      if (!sent) {
        const subject = encodeURIComponent('Payment Reminder — Outstanding Invoices')
        const bodyText = 'Dear ' + clientName + ',\n\nThis is a friendly reminder that the following invoice' + (c.invoices.length > 1 ? 's are' : ' is') + ' outstanding:\n\n' + invoiceLines + '\n\nTotal outstanding: VT ' + Number(totalOwed).toLocaleString() + '\n\nPlease arrange payment at your earliest convenience.\n\nThank you,\nMalakesa Transfers and Tours\nTel: +678 22712 | accounts@malakesa.vu'
        window.location.href = 'mailto:' + c.email + '?subject=' + subject + '&body=' + encodeURIComponent(bodyText)
      }
    }
    setNotice('Reminders sent to ' + withEmail.length + ' client(s)')
    setTimeout(() => setNotice(''), 5000)
  }

  const bulkExport = () => {
    const invs = selectedInvoices
    if (!invs.length) return
    const rows = [
      ['Malakesa Transfers and Tours - Selected Invoices'],
      ['Selected:', invs.length + ' invoices'],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      ['Invoice #', 'Issue Date', 'Due Date', 'Client', 'Subtotal (VT)', 'VAT (VT)', 'Total (VT)', 'Balance (VT)', 'Status'],
      ...invs.map(inv => [
        inv.number, inv.date, inv.due_date, inv.client_name,
        inv.subtotal || 0, inv.tax || 0, inv.total,
        getBalance(inv, payments), getStatus(inv, payments)
      ])
    ]
    downloadCSV('Malakesa_Selected_Invoices.csv', rows)
  }

  const bulkEmail = async () => {
    const invs = selectedInvoices
    if (!invs.length) return
    // Group by client so each client gets ONE email listing all their selected invoices
    const byClient = {}
    invs.forEach(inv => {
      const key = inv.client_name || 'Unknown'
      if (!byClient[key]) byClient[key] = { email: inv.client_email || '', invoices: [] }
      byClient[key].invoices.push(inv)
    })
    const clients = Object.entries(byClient)
    const withEmail = clients.filter(([,c]) => c.email)
    const noEmail = clients.filter(([,c]) => !c.email).map(([name]) => name)
    if (withEmail.length === 0) {
      alert('No email addresses found for selected clients.\nMissing: ' + noEmail.join(', ') + '\nAdd emails in the Clients page.')
      return
    }
    let msg = 'Send invoice email to ' + withEmail.length + ' client(s)?\n\n'
    withEmail.forEach(([name, c]) => { msg += '- ' + name + ': ' + c.invoices.length + ' invoice(s)\n' })
    if (noEmail.length > 0) msg += '\nSkipped (no email): ' + noEmail.join(', ')
    if (!confirm(msg)) return
    let sent = 0, failed = 0
    for (const [clientName, c] of withEmail) {
      for (const inv of c.invoices) {
        try {
          const res = await fetch('/api/send-invoice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: inv.id }) })
          if (res.ok) sent++
          else {
            // Fallback to mailto
            const bal = getBalance(inv, payments)
            const subject = encodeURIComponent('Invoice ' + inv.number + ' from Malakesa Transfers and Tours')
            const body = encodeURIComponent('Dear ' + clientName + ',\n\nPlease find attached invoice ' + inv.number + ' for VT ' + Number(inv.total).toLocaleString() + ', due ' + fmtDate(inv.due_date) + '.\n\nPlease arrange payment at your earliest convenience.\n\nThank you,\nMalakesa Transfers and Tours\nTel: +678 22712 | accounts@malakesa.vu')
            window.location.href = 'mailto:' + inv.client_email + '?subject=' + subject + '&body=' + body
            sent++
          }
        } catch(e) { failed++ }
      }
    }
    setNotice(sent + ' invoice email' + (sent !== 1 ? 's' : '') + ' sent' + (failed > 0 ? ', ' + failed + ' failed' : ''))
    setTimeout(() => setNotice(''), 6000)
  }

  const invoiceColumns = [
    { key: 'number', label: 'Invoice #' },
    { key: 'date', label: 'Issue Date' },
    { key: 'due_date', label: 'Due Date' },
    { key: 'client_name', label: 'Client' },
    { key: 'subtotal', label: 'Subtotal (VT)' },
    { key: 'tax', label: 'VAT (VT)' },
    { key: 'total', label: 'Total (VT)' },
    { key: 'balance', label: 'Balance (VT)' },
    { key: 'status', label: 'Status' },
    { key: 'notes', label: 'Notes' },
  ]
  const handleInvoiceExport = (format, selected) => {
    if (format === 'pdf') {
      const w = window.open('', '_blank')
      if (!w) { alert('Please allow popups.'); return }
      const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      const filterDesc = [filterClient && `Client: ${filterClient}`, filterStatus && `Status: ${filterStatus}`, filterMonth && `Month: ${filterMonth}`, search && `Search: ${search}`].filter(Boolean).join(' | ') || 'All invoices'
      const rows = filtered.map(inv => {
        const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
        const stColor = st === 'paid' ? '#3B6D11' : st === 'overdue' ? '#A32D2D' : '#D85A30'
        return `<tr><td>${inv.number}</td><td>${fmtDate(inv.date)}</td><td>${inv.client_name}</td><td style='text-align:right'>${fmt(inv.subtotal||0)}</td><td style='text-align:right'>${fmt(inv.tax||0)}</td><td style='text-align:right;font-weight:600'>${fmt(inv.total)}</td><td style='text-align:right;color:${bal>0?'#D85A30':'#3B6D11'}'>${fmt(bal)}</td><td><span style='background:${stColor}20;color:${stColor};padding:2px 8px;border-radius:99px;font-size:11px;font-weight:600'>${st}</span></td></tr>`
      }).join('')
      w.document.write(`<!DOCTYPE html><html><head><title>Invoices Export</title><style>
        body{font-family:Arial,sans-serif;color:#222;font-size:13px;margin:0}
        .rpt-hdr{display:none} @page{margin:18mm 14mm 20mm 14mm;size:A4}
        table{width:100%;border-collapse:collapse;font-size:12px}
        thead{display:table-header-group} th{background:#FBF3E4;padding:8px 10px;text-align:left;font-size:11px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
        td{padding:8px 10px;border-bottom:0.5px solid #eee} h1{color:#8B6914;font-size:18px;margin:0 0 4px} .sub{color:#888;font-size:12px;margin-bottom:20px}
        .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
        .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
        @media print{.noprint{display:none}.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999} body{padding-top:42px}}
      </style></head><body>
      <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfers &amp; Tours — Invoices Export — ${filterDesc}</span><span style='font-size:10px;color:#888'>${now}</span></div>
      <div class='noprint'><span>Invoices Export — ${filterDesc}</span><button class='printbtn' onclick='window.print()'>🖨️ Print / Save PDF</button></div>
      <div style='padding:20px 40px'><h1>Malakesa Transfers &amp; Tours</h1><div class='sub'>Invoices Export &nbsp;|&nbsp; ${filterDesc} &nbsp;|&nbsp; ${now}<br>${filtered.length} invoice(s) &nbsp;|&nbsp; Total: VT ${Number(totalFiltered).toLocaleString()} &nbsp;|&nbsp; Outstanding: VT ${Number(totalBalance).toLocaleString()}</div>
      <table><thead><tr><th>Invoice #</th><th>Issue Date</th><th>Client</th><th style='text-align:right'>Subtotal</th><th style='text-align:right'>VAT</th><th style='text-align:right'>Total</th><th style='text-align:right'>Balance</th><th>Status</th></tr></thead><tbody>${rows}</tbody>
      <tr style='background:#FBF3E4;font-weight:700'><td colspan='5' style='padding:9px 10px'>TOTAL (${filtered.length} invoices)</td><td style='padding:9px 10px;text-align:right'>VT ${Number(totalFiltered).toLocaleString()}</td><td style='padding:9px 10px;text-align:right'>VT ${Number(totalBalance).toLocaleString()} owing</td><td></td></tr>
      </table></div><script>window.onload=()=>window.print()<\/script></body></html>`)
      w.document.close()
      return
    }
    // Excel/CSV export
    const cols = invoiceColumns.filter(c => selected.has(c.key))
    const header = ['Malakesa Transfers and Tours - Invoice Export']
    const filterDesc = [filterClient && `Client: ${filterClient}`, filterStatus && `Status: ${filterStatus}`, filterMonth && `Month: ${filterMonth}`].filter(Boolean).join(' | ') || 'All'
    const rows = [
      header,
      ['Filters:', filterDesc],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      ['Total invoices:', filtered.length],
      [],
      cols.map(c => c.label),
      ...filtered.map(inv => cols.map(c => {
        if (c.key === 'balance') return getBalance(inv, payments)
        if (c.key === 'status') return getStatus(inv, payments)
        if (c.key === 'date' || c.key === 'due_date') return inv[c.key] || ''
        return inv[c.key] ?? ''
      }))
    ]
    const filterTag = filterDesc.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)
    downloadCSV(`Malakesa_Invoices_${filterTag}.csv`, rows)
  }

  return (
    <>
      <Topbar title="Invoices">
        <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={() => setShowExport(true)}><i className="ti ti-download"></i> Export</button>
        <button className="btn btn-primary" onClick={() => setModal('newInvoice')}><i className="ti ti-plus"></i> New Invoice</button>
      </Topbar>

      {/* Status tab bar */}
      <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.1)', display: 'flex', paddingLeft: 20, background: '#fff', overflowX: 'auto' }}>
        {[
          { key: '', label: 'All Invoices', count: invoices.length },
          { key: 'unpaid', label: 'Unpaid', count: invoices.filter(i => getStatus(i,payments)==='unpaid').length },
          { key: 'overdue', label: 'Overdue', count: invoices.filter(i => getStatus(i,payments)==='overdue').length },
          { key: 'partial', label: 'Partial', count: invoices.filter(i => getStatus(i,payments)==='partial').length },
          { key: 'paid', label: 'Paid', count: invoices.filter(i => getStatus(i,payments)==='paid').length },
        ].map(tab => {
          const isActive = filterStatus === tab.key
          const badgeColor = tab.key === 'overdue' ? '#A32D2D' : tab.key === 'unpaid' ? '#D85A30' : tab.key === 'partial' ? '#8B6914' : tab.key === 'paid' ? '#3B6D11' : '#666'
          return (
            <button key={tab.key} onClick={() => setFilterStatus(tab.key)} style={{ padding: '10px 16px', border: 'none', borderBottom: isActive ? '2.5px solid #8B6914' : '2.5px solid transparent', background: 'none', fontWeight: isActive ? 700 : 400, color: isActive ? '#8B6914' : '#555', cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
              {tab.label}
              {tab.count > 0 && <span style={{ background: isActive ? '#8B6914' : (tab.key === 'overdue' ? '#FCEBEB' : tab.key === 'unpaid' ? '#FEF3EB' : '#f0f0f0'), color: isActive ? '#fff' : badgeColor, borderRadius: 99, padding: '1px 7px', fontSize: 11, fontWeight: 600 }}>{tab.count}</span>}
            </button>
          )
        })}
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ background: '#fff', border: '0.5px solid rgba(139,105,20,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <i className="ti ti-search" style={{ position: 'absolute', left: 10, color: '#8B6914', fontSize: 15, pointerEvents: 'none' }}></i>
            <input
              type="text"
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search invoice #, client, amount, date, status... (press / to focus)"
              style={{ ...selectStyle, background: '#fff', color: '#1a1a1a', minWidth: 260, paddingLeft: 32, paddingRight: search ? 32 : 10 }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 16, lineHeight: 1, padding: 0 }}>&times;</button>
            )}
          </div>
          <select value={filterClient} onChange={e => setFilterClient(e.target.value)} style={selectStyle}>
            <option value="">All clients</option>
            {allClients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <MonthYearPicker value={filterMonth} onChange={setFilterMonth} accentColor="#8B6914" allowClear clearLabel="All months" />
          {hasFilters && <button className="btn btn-sm" onClick={clearFilters} style={{ color: '#A32D2D', borderColor: '#A32D2D' }}><i className="ti ti-x"></i> Clear</button>}
          <div style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>
            {filtered.length} invoice{filtered.length !== 1 ? 's' : ''} &nbsp;|&nbsp; {fmt(totalFiltered)} invoiced &nbsp;|&nbsp; <span style={{ color: totalBalance > 0 ? '#D85A30' : '#3B6D11' }}>{fmt(totalBalance)} outstanding</span>
          </div>
        </div>
        {/* Notice bar */}
        {notice && (
          <div style={{ background: '#EAF3DE', border: '0.5px solid #C0DD97', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#27500A', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="ti ti-check"></i> {notice}
          </div>
        )}

        {/* Overdue reminder bar */}
        {filterStatus === 'overdue' && filtered.length > 0 && (
          <div style={{ background: '#FCEBEB', border: '0.5px solid #F7C1C1', borderRadius: 8, padding: '10px 16px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 13, color: '#791F1F' }}>
              <i className="ti ti-alert-circle" style={{ marginRight: 6 }}></i>
              <strong>{filtered.length}</strong> overdue invoice{filtered.length !== 1 ? 's' : ''} &nbsp;|&nbsp; <strong style={{ color: '#A32D2D' }}>{fmt(filtered.reduce((s,i) => s+getBalance(i,payments), 0))}</strong> total outstanding
            </div>
            <button className="btn btn-sm" style={{ background: '#A32D2D', borderColor: '#7A1A1A', color: '#fff', fontWeight: 600 }} onClick={sendAllOverdueReminders}>
              <i className="ti ti-mail"></i> Email All Overdue Clients
            </button>
          </div>
        )}

        {/* Bulk action bar */}
        {someSelected && (
          <div style={{ background: 'linear-gradient(135deg,#6B4423,#8B5E34)', borderRadius: 10, padding: '12px 18px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#F5D98A', fontWeight: 700, fontSize: 15 }}>{selectedIds.size}</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>invoice{selectedIds.size !== 1 ? 's' : ''} selected</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>|</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Total: <strong style={{ color: '#F5D98A' }}>{fmt(selectedInvoices.reduce((s,i)=>s+Number(i.total),0))}</strong></span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="btn btn-sm" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 600 }} onClick={bulkPrint}><i className="ti ti-printer"></i> Print Selected</button>
              <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 600 }} onClick={bulkExport}><i className="ti ti-download"></i> Export Selected</button>
              <button className="btn btn-sm" style={{ background: '#2563A8', borderColor: '#1a4a8a', color: '#fff', fontWeight: 600 }} onClick={bulkEmail}><i className="ti ti-mail"></i> Email Selected</button>
              <button className="btn btn-sm" style={{ background: '#8B5E34', borderColor: '#6B4423', color: '#F5D98A', fontWeight: 600 }} onClick={bulkEmailReminders}><i className="ti ti-mail"></i> Email Reminders</button>
              <button className="btn btn-sm" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)', background: 'none', fontSize: 11 }} onClick={() => setSelectedIds(new Set())}>Clear selection</button>
            </div>
          </div>
        )}

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
              <i className="ti ti-file-search" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
              <p>{search ? `No invoices found for "${search}"` : hasFilters ? 'No invoices match your filters.' : 'No invoices yet.'}</p>
              {hasFilters && <button className="btn btn-sm" onClick={clearFilters} style={{ marginTop: 10 }}>Clear filters</button>}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#FBF3E4' }}>
                <th style={{ padding: '9px 14px', width: 36 }}><input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ cursor: 'pointer', width: 15, height: 15, accentColor: '#8B6914' }} /></th>
                <Th>Invoice #</Th><Th>Client</Th><Th>Issue Date</Th><Th>Due Date</Th><Th>Amount</Th><Th>Balance</Th><Th>Status</Th><Th>Actions</Th>
              </tr></thead>
              <tbody>{filtered.map(inv => {
                const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
                return (
                  <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: selectedIds.has(inv.id) ? '#fdf8ec' : st === 'overdue' ? '#FFF8F8' : '#fff' }}>
                    <td style={{ padding: '9px 14px', width: 36 }}><input type="checkbox" checked={selectedIds.has(inv.id)} onChange={() => toggleSelect(inv.id)} onClick={e => e.stopPropagation()} style={{ cursor: 'pointer', width: 15, height: 15, accentColor: '#8B6914' }} /></td>
                    <Td><strong>{inv.number}</strong> {inv.last_emailed_at && <i className="ti ti-mail-check" style={{ color: '#3B6D11', marginLeft: 4 }} title={`Emailed ${new Date(inv.last_emailed_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`}></i>}</Td>
                    <Td>{inv.client_name}</Td>
                    <Td>{fmtDate(inv.date)}</Td>
                    <Td style={st === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(inv.due_date)}</Td>
                    <Td>{fmt(inv.total)}</Td>
                    <Td style={{ color: bal > 0 ? '#D85A30' : '#3B6D11', fontWeight: 500 }}>{fmt(bal)}</Td>
                    <Td><Badge status={st} /></Td>
                    <Td><div style={{ display: 'flex', gap: 5 }}>
                      <button className="btn btn-sm" onClick={() => { setSelected(inv); setModal('viewInvoice') }} title="View"><i className="ti ti-eye"></i></button>
                      {st !== 'paid' && <button className="btn btn-sm" style={{ borderColor: '#2563A8', color: '#2563A8' }} onClick={() => { setSelected(inv); setModal('editInvoice') }} title="Edit"><i className="ti ti-edit"></i></button>}
                      {bal > 0 && <button className="btn btn-sm" style={{ borderColor: '#3B6D11', color: '#3B6D11' }} onClick={() => { setSelected(inv); setModal('payment') }} title="Record payment"><i className="ti ti-cash"></i></button>}
                      {(st === 'overdue' || st === 'unpaid') && <button className="btn btn-sm" style={{ borderColor: '#8B6914', color: '#8B6914' }} onClick={() => sendReminder(inv)} disabled={sending === inv.id} title="Send reminder email"><i className="ti ti-mail"></i> {sending === inv.id ? '...' : 'Remind'}</button>}
                      {st !== 'paid' && <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(inv.id)} title="Delete"><i className="ti ti-trash"></i></button>}
                    </div></Td>
                  </tr>
                )
              })}</tbody>
            </table>
          )}
        </Card>
      </div>
      {showExport && <ExportModal title="Invoices" columns={invoiceColumns} onExport={handleInvoiceExport} onClose={() => setShowExport(false)} />}
      {reminderPreview && (
        <ReminderPreviewModal
          inv={reminderPreview.inv}
          subject={reminderPreview.subject}
          body={reminderPreview.body}
          bal={reminderPreview.bal}
          onSend={(inv, subject, body) => confirmSendReminder(inv, subject, body)}
          onClose={() => setReminderPreview(null)}
          fmt={fmt}
          fmtDate={fmtDate}
        />
      )}
    </>
  )
}

function Payments({ payments, invoices, reload, setModal, setSelected }) {
  const total = payments.reduce((s, p) => s + Number(p.amount), 0)
  const thisMonth = payments.filter(p => p.date?.startsWith(localMonthStr(new Date()))).reduce((s, p) => s + Number(p.amount), 0)
  const getInv = (id) => invoices.find(i => i.id === id) || {}
  const [receiptStatus, setReceiptStatus] = useState({})
  const [reversing, setReversing] = useState(null)

  const handleReversePayment = async (payment) => {
    const inv = getInv(payment.invoice_id)
    const label = inv?.number ? `invoice ${inv.number}` : 'this invoice'
    if (!confirm(`Reverse this payment of ${fmt(payment.amount)} against ${label}?\n\nThis will permanently delete the payment record and the invoice will go back to unpaid/partial status. This cannot be undone.`)) return
    setReversing(payment.id)
    try {
      await fetch('/api/payments/' + payment.id, { method: 'DELETE' })
      reload()
    } catch (e) {
      alert('Failed to reverse payment — please check your connection and try again.')
    }
    setReversing(null)
  }


  const printReceipt = (payment) => {
    const inv = getInv(payment.invoice_id)
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups to print receipts.'); return }
    const receiptNum = payment.receipt_number || `RCT-${(payment.id||'').slice(-4).toUpperCase()}`
    w.document.write(`<!DOCTYPE html><html><head><title>${receiptNum}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #FBF3E4; }
    .page { max-width: 520px; margin: 20px auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #6B4423 0%, #8B5E34 50%, #A67C42 100%); padding: 24px 32px; text-align: center; }
    .rec-label { font-size: 10px; color: rgba(255,255,255,0.6); letter-spacing: 3px; margin-top: 10px; }
    .rec-num { font-size: 20px; font-weight: 700; color: #F5D98A; margin-top: 2px; }
    .body { padding: 24px 32px; }
    .paid-stamp { text-align: center; margin: 16px 0; }
    .paid-box { display: inline-block; border: 3px solid #3B6D11; color: #3B6D11; font-size: 22px; font-weight: 900; letter-spacing: 6px; padding: 6px 24px; border-radius: 4px; transform: rotate(-3deg); }
    .section { margin: 16px 0; padding: 14px 16px; background: #faf6ee; border-radius: 6px; }
    .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #FBF3E4; font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .label { color: #888; }
    .val { font-weight: 600; color: #222; }
    .amount-box { background: linear-gradient(135deg, #8B5E34, #8B6914); border-radius: 6px; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; margin: 16px 0; }
    .thankyou { text-align: center; font-size: 13px; font-style: italic; color: #8B6914; margin: 16px 0 8px; }
    .footer { background: linear-gradient(135deg, #6B4423, #A67C42); padding: 14px 32px; text-align: center; color: rgba(255,255,255,0.7); font-size: 10px; line-height: 1.9; }
    .noprint { background: #333; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
    .printbtn { background: #8B6914; color: #fff; border: none; padding: 7px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .rpt-hdr { display: none; }
    @page { margin: 12mm 10mm 16mm 10mm; size: A4; }
    @media print {
      .noprint { display: none; }
      body { background: #fff; }
      .page { box-shadow: none; margin: 0; max-width: 100%; border-radius: 0; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .rpt-hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #8B6914; padding-bottom: 5px; }
      .rpt-hdr { position: fixed; top: 0; left: 0; right: 0; background: #fff; z-index: 999; padding: 5px 32px; }
      .page { padding-top: 36px; }
    }
  </style></head><body>
  <div class="rpt-hdr">
    <span style="font-size:11px;font-weight:700;color:#3D2214">Malakesa Transfers &amp; Tours &nbsp;—&nbsp; Payment Receipt &nbsp;—&nbsp; ${receiptNum}</span>
    <span style="font-size:10px;color:#888">Page <span class="pgnum"></span></span>
  </div>
  <div class="noprint"><span>${receiptNum}</span><button class="printbtn" onclick="window.print()">Print / Save PDF</button></div>
  <div class="page">
    <div class="header">
      <img src="${MALAKESA_LOGO}" alt="Malakesa Transfers and Tours" style="width:200px;border-radius:6px;display:block;margin:0 auto" />
      <div class="rec-label">PAYMENT RECEIPT</div>
      <div class="rec-num">${receiptNum}</div>
    </div>
    <div class="body">
      <div class="paid-stamp"><div class="paid-box">PAID</div></div>
      <div class="section">
        <div class="row"><span class="label">Receipt No.</span><span class="val">${receiptNum}</span></div>
        <div class="row"><span class="label">Invoice No.</span><span class="val">${inv.number || '\u2014'}</span></div>
        <div class="row"><span class="label">Date paid</span><span class="val">${fmtDate(payment.date)}</span></div>
        <div class="row"><span class="label">Payment method</span><span class="val">${payment.method}</span></div>
        ${payment.note ? '<div class="row"><span class="label">Notes</span><span class="val">' + payment.note + '</span></div>' : ''}
      </div>
      <div class="section">
        <div class="row"><span class="label">Client</span><span class="val">${inv.client_name || '\u2014'}</span></div>
        <div class="row"><span class="label">Invoice total</span><span class="val">VT ${Number(inv.total||0).toLocaleString()}</span></div>
      </div>
      <div class="amount-box">
        <span style="color:#fff;font-weight:700;font-size:15px">AMOUNT RECEIVED</span>
        <span style="color:#F5D98A;font-weight:700;font-size:22px">VT ${Number(payment.amount).toLocaleString()}</span>
      </div>
      <div class="thankyou">Tankiu Tumas \u2014 Thank you for your payment!</div>
    </div>
    <div class="footer">
      Malakesa Transfers and Tours | Port Vila, Shefa Province, Vanuatu<br>
      +678 22712 | +678 7798712 | accounts@malakesa.vu
    </div>
  </div>
  <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const emailReceipt = async (payment) => {
    const pid = payment.id || 'x'
    setReceiptStatus(s => ({ ...s, [pid]: 'sending' }))
    try {
      const res = await fetch('/api/send-receipt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: payment.invoice_id, paymentId: pid }) })
      const data = await res.json()
      if (res.ok) {
        setReceiptStatus(s => ({ ...s, [pid]: 'sent' }))
        setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 5000)
      } else {
        setReceiptStatus(s => ({ ...s, [pid]: 'error' }))
        setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 6000)
      }
    } catch (e) {
      setReceiptStatus(s => ({ ...s, [pid]: 'error' }))
      setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 6000)
    }
  }

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
              <thead><tr style={{ background: '#FBF3E4' }}><Th>Invoice #</Th><Th>Client</Th><Th>Due Date</Th><Th>Balance</Th><Th>Status</Th><Th></Th></tr></thead>
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
          <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500, fontSize: 13 }}>Payment history</span>
            <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
              <span style={{ color: '#666' }}>Total collected: <strong style={{ color: '#3B6D11' }}>{fmt(payments.reduce((s, p) => s + Number(p.amount), 0))}</strong></span>
              <span style={{ color: '#666' }}>Payments: <strong>{payments.length}</strong></span>
              <span style={{ color: '#666' }}>Fully paid invoices: <strong style={{ color: '#3B6D11' }}>{invoices.filter(i => getBalance(i, payments) <= 0 && payments.some(p => p.invoice_id === i.id)).length}</strong></span>
              <span style={{ color: '#666' }}>Still owing: <strong style={{ color: '#D85A30' }}>{invoices.filter(i => getBalance(i, payments) > 0 && payments.some(p => p.invoice_id === i.id)).length} invoice{invoices.filter(i => getBalance(i, payments) > 0 && payments.some(p => p.invoice_id === i.id)).length !== 1 ? 's' : ''}</strong></span>
            </div>
          </div>
          {payments.length === 0 ? <Empty icon="ti-cash-off" msg="No payments recorded yet" /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#FBF3E4' }}><Th>Receipt #</Th><Th>Date</Th><Th>Invoice #</Th><Th>Client</Th><Th>Method</Th><Th>Amount</Th><Th>Inv. Total</Th><Th>Balance After</Th><Th>Note</Th><Th>Actions</Th></tr></thead>
              <tbody>{[...payments].reverse().map(p => {
                const inv = getInv(p.invoice_id)
                // Calculate balance remaining after this payment
                const invTotal = Number(inv?.total || 0)
                const allPaymentsForInv = payments.filter(x => x.invoice_id === p.invoice_id)
                const totalPaidForInv = allPaymentsForInv.reduce((s, x) => s + Number(x.amount || 0), 0)
                const balanceAfterAll = invTotal - totalPaidForInv
                const isPaidOff = balanceAfterAll <= 0
                return (
                  <tr key={p.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td style={{ color: '#8B6914', fontWeight: 500 }}>{p.receipt_number || '—'}</Td><Td>{fmtDate(p.date)}</Td><Td><strong>{inv?.number || '—'}</strong></Td><Td>{inv?.client_name || '—'}</Td>
                    <Td><span style={{ background: '#FBF3E4', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{p.method || 'Cash'}</span></Td>
                    <Td style={{ color: '#3B6D11', fontWeight: 500 }}>{fmt(p.amount)}</Td>
                    <Td style={{ color: '#666', fontSize: 12 }}>{inv?.total ? fmt(inv.total) : '—'}</Td>
                    <Td>
                      {!inv?.total ? <span style={{ color: '#ccc' }}>—</span> : isPaidOff ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#EAF3DE', color: '#3B6D11', borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
                          \u2713 Fully paid
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FEF3EB', color: '#D85A30', borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
                          {fmt(balanceAfterAll)} owing
                        </span>
                      )}
                    </Td>
                    <Td style={{ color: '#666' }}>{p.note || ''}</Td>
                    <Td>
                      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        <button className="btn btn-sm" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => printReceipt(p)}><i className="ti ti-printer"></i> Print</button>
                        <button className="btn btn-sm" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => emailReceipt(p)} disabled={receiptStatus[p.id] === 'sending'}><i className="ti ti-mail"></i> {receiptStatus[p.id] === 'sending' ? '...' : 'Email'}</button>
                        {receiptStatus[p.id] === 'sent' && <span style={{ fontSize: 11, color: '#3B6D11' }}>✓ Sent</span>}
                        {receiptStatus[p.id] === 'error' && <span style={{ fontSize: 11, color: '#D85A30' }}>Failed</span>}
                        <button className="btn btn-sm" style={{ fontSize: 11, padding: '2px 8px', borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleReversePayment(p)} disabled={reversing === p.id} title="Reverse this payment"><i className="ti ti-arrow-back-up"></i> {reversing === p.id ? 'Reversing...' : 'Reverse'}</button>
                      </div>
                    </Td>
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
    return { value: localMonthStr(d), label: MONTHS[d.getMonth()] + ' ' + d.getFullYear() }
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
    const body = encodeURIComponent('Dear ' + inv.client_name + ',\n\nThis is a friendly reminder that invoice ' + inv.number + ' has an outstanding balance of VT ' + Number(bal).toLocaleString() + ' due on ' + fmtDate(inv.due_date) + '.\n\nPlease arrange payment at your earliest convenience.\n\nThank you,\nMalakesa Transfers and Tours')
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
    <style>body{font-family:Arial,sans-serif;color:#222;font-size:13px}
    h1{font-size:20px;font-weight:bold;color:#8B6914;margin-bottom:4px}
    .sub{color:#888;font-size:12px;margin-bottom:24px}
    table{width:100%;border-collapse:collapse;margin-top:16px}
    thead{display:table-header-group}
    th{background:#f5f5f5;padding:8px 12px;text-align:left;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:0.4px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    td{padding:9px 12px;border-bottom:1px solid #eee;font-size:13px}
    .overdue{color:#A32D2D;font-weight:500}
    .total{margin-top:20px;text-align:right;font-size:15px;font-weight:bold}
    .badge{display:inline-block;padding:2px 8px;border-radius:99px;font-size:11px;font-weight:500}
    .unpaid{background:#FAECE7;color:#712B13}.overdue-b{background:#FCEBEB;color:#791F1F}.partial{background:#FAEEDA;color:#633806}
    .rpt-hdr{display:none}
    @page{margin:20mm 15mm 22mm 15mm;size:A4}
    @media print{
      .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 0 6px 0}
      .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999;padding:6px 40px}
      body{margin:0;padding-top:44px}
      .report-body{padding:0 40px 40px}
    }
    </style></head><body>
    <div class="rpt-hdr">
      <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfers &amp; Tours &nbsp;—&nbsp; Unpaid Invoices Report</span>
      <span style="font-size:10px;color:#888">Generated ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})}</span>
    </div>
    <div class="report-body">
    <div style="display:flex;justify-content:space-between;margin-top:20px">
      <div><h1>Malakesa Transfers &amp; Tours</h1><div class="sub">Unpaid Invoices Report — Generated ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})}</div></div>
      <div style="text-align:right;font-size:12px;color:#888">${filterClient ? 'Client: ' + filterClient + '<br>' : ''}${filterMonth ? 'Month: ' + filterMonth : ''}</div>
    </div>
    <table><thead><tr><th>Invoice #</th><th>Client</th><th>Due Date</th><th>Amount</th><th>Balance</th><th>Status</th></tr></thead>
    <tbody>${filtered.map(inv => {
      const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
      return '<tr><td><strong>' + inv.number + '</strong></td><td>' + inv.client_name + '</td><td class="' + (st==='overdue'?'overdue':'') + '">' + fmtDate(inv.due_date) + '</td><td>VT ' + Number(inv.total).toLocaleString() + '</td><td style="font-weight:500">VT ' + Number(bal).toLocaleString() + '</td><td><span class="badge ' + (st==='overdue'?'overdue-b':st) + '">' + st + '</span></td></tr>'
    }).join('')}</tbody></table>
    <div class="total">Total outstanding: VT ${Number(totalOut).toLocaleString()}</div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  return (
    <>
      <Topbar title="Unpaid Invoices">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select value={filterClient} onChange={e => setFilterClient(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
            <option value="">All clients</option>
            {clients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <MonthYearPicker value={filterMonth} onChange={setFilterMonth} accentColor="#8B6914" allowClear clearLabel="All months" />
          <button className="btn btn-sm" style={{ background: "#8B6914", borderColor: "#6B5010", color: "#fff", fontWeight: 500 }} onClick={printReport}><i className="ti ti-printer"></i> Print</button>
          <button className="btn btn-sm" style={{ background: "#8B6914", borderColor: "#6B5010", color: "#fff", fontWeight: 500 }} onClick={sendAllReminders}><i className="ti ti-mail"></i> Email All</button>
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
              <thead><tr style={{ background: '#FBF3E4' }}><Th>Invoice #</Th><Th>Client</Th><Th>Due Date</Th><Th>Balance</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
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
function Reports({ invoices, payments, purchases, salaryRecords }) {
  const [tab, setTab] = useState('revenue') // 'revenue' | 'suppliers' | 'cashflow'
  const [showExport, setShowExport] = useState(false)
  const [period, setPeriod] = useState('all')
  const [revenueMonth, setRevenueMonth] = useState(localMonthStr(new Date()))
  const [filterClient, setFilterClient] = useState('')

  // VAT tab state — default to current month
  const nowD = new Date()
  const defaultVatMonth = localMonthStr(nowD)
  const [vatMonth, setVatMonth] = useState(defaultVatMonth)

  // Supplier report tab state
  const [supplierPeriod, setSupplierPeriod] = useState('all') // 'all' | 'month' | 'quarter' | 'year' | 'specific'
  const [supplierMonth, setSupplierMonth] = useState(localMonthStr(nowD))
  const [supplierSort, setSupplierSort] = useState('spend') // 'spend' | 'count' | 'name'

  // Cash flow tab date range
  const [cashflowRange, setCashflowRange] = useState('12months') // '12months' | 'quarter' | 'year' | 'custom'
  const [cashflowStart, setCashflowStart] = useState('')
  const [cashflowEnd, setCashflowEnd] = useState('')

  const allClients = [...new Set(invoices.map(i => i.client_name))].sort()

  // Build month options for VAT selector (last 24 months)
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const vatMonthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1)
    return { value: localMonthStr(d), label: MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear() }
  })

  // ── Revenue tab logic ──
  const filterDate = (list, field) => {
    if (period === 'all') return list
    if (period === 'specific') return list.filter(i => i[field] && i[field].startsWith(revenueMonth))
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

  const periodLabel = period === 'specific'
    ? (vatMonthOptions.find(m => m.value === revenueMonth)?.label || revenueMonth)
    : { all: 'All time', month: 'This month', quarter: 'This quarter', year: 'This year' }[period]

  // ── VAT tab logic ──
  const vatInvoices = invoices.filter(i => i.date && i.date.startsWith(vatMonth)).sort((a, b) => a.date > b.date ? 1 : -1)
  const vatTotalInv = vatInvoices.reduce((s, i) => s + Number(i.total), 0)
  const vatTotalSubtotal = vatInvoices.reduce((s, i) => s + Number(i.subtotal || 0), 0)
  const vatTotalTax = vatInvoices.reduce((s, i) => s + Number(i.tax || 0), 0)
  const vatZeroRated = vatInvoices.filter(i => !i.tax || Number(i.tax) === 0)
  const vatStandard = vatInvoices.filter(i => Number(i.tax) > 0)
  const vatMonthLabel = vatMonthOptions.find(m => m.value === vatMonth)?.label || vatMonth

  // Purchases for VAT month
  const vatPurchases = (purchases || []).filter(p => p.date && p.date.startsWith(vatMonth)).sort((a, b) => a.date > b.date ? 1 : -1)
  const vatInputTax = vatPurchases.reduce((s, p) => s + Number(p.vat || 0), 0)
  const vatPurchasesTotal = vatPurchases.reduce((s, p) => s + Number(p.amount || 0), 0)
  const vatPurchasesExVat = vatPurchases.reduce((s, p) => s + Number(p.amount_ex_vat || 0), 0)
  const vatNetPayable = Math.max(0, vatTotalTax - vatInputTax)

  const printVatReturn = () => {
    const w = window.open('', '_blank')
    w.document.write(`<!DOCTYPE html><html><head><title>VAT Return — ${vatMonthLabel}</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:Arial,sans-serif;margin:0;color:#222;font-size:13px;background:#FBF3E4}
      .page{max-width:800px;margin:20px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.15)}
      .header{background:linear-gradient(135deg,#6B4423 0%,#8B5E34 50%,#A67C42 100%);padding:24px 40px;display:flex;justify-content:space-between;align-items:flex-start}
      .logo-contact{font-size:10px;color:rgba(255,255,255,0.7);margin-top:8px;line-height:1.8}
      .report-title{text-align:right;color:#fff}
      .report-name{font-size:20px;font-weight:700;color:#F5D98A}
      .report-sub{font-size:11px;color:rgba(255,255,255,0.75);margin-top:4px;line-height:1.7}
      .body{padding:28px 40px}
      .vat-box{background:linear-gradient(135deg,#1A4D1A,#2E7D2E);border-radius:8px;padding:20px 28px;margin-bottom:24px;display:flex;gap:32px;flex-wrap:wrap}
      .vat-item{color:#fff}
      .vat-label{font-size:10px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
      .vat-value{font-size:22px;font-weight:700;color:#90EE90}
      .vat-sub{font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px}
      .tin-box{background:#FAEEDA;border:1px solid #FAC775;border-radius:6px;padding:10px 16px;margin-bottom:20px;font-size:12px;color:#633806}
      h2{font-size:13px;font-weight:700;margin:20px 0 8px;color:#3D2214;border-bottom:2px solid #8B6914;padding-bottom:4px;text-transform:uppercase;letter-spacing:0.5px}
      table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:12px}
      th{background:#FBF3E4;padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#3D2214;text-transform:uppercase;letter-spacing:0.5px}
      td{padding:8px 10px;border-bottom:1px solid #FBF3E4;vertical-align:top}
      tr:nth-child(even) td{background:#faf6ee}
      .right{text-align:right}
      .amt{font-weight:500}
      .vat-amt{color:#2E7D2E;font-weight:600}
      .zero{color:#888;font-style:italic}
      .summary-row{background:#FBF3E4!important;font-weight:700}
      .footer{background:linear-gradient(135deg,#6B4423,#A67C42);padding:14px 40px;display:flex;justify-content:space-between;align-items:center;margin-top:0}
      .footer-l{color:rgba(255,255,255,0.8);font-size:10px;line-height:1.9}
      .footer-r{text-align:right;color:#F5D98A;font-size:10px;line-height:1.9}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      thead{display:table-header-group}
      .rpt-hdr{display:none}
      .summary-row{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .header{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .footer{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .vat-box{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      @page{margin:18mm 14mm 22mm 14mm;size:A4}
      @media print{
        .noprint{display:none}
        body{background:#fff}
        .page{box-shadow:none;margin:0;border-radius:0}
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px}
        .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999}
        .page{padding-top:42px}
        .rpt-footer-bar{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #FBF3E4;padding:4px 40px;display:flex;justify-content:space-between;font-size:10px;color:#888;z-index:999}
      }
    </style></head><body>
    <div class="rpt-hdr">
      <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfers &amp; Tours &nbsp;—&nbsp; VAT Return &nbsp;—&nbsp; ${vatMonthLabel}</span>
      <span style="font-size:10px;color:#888">TIN: 445579 &nbsp;|&nbsp; Generated ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span>
    </div>
    <div class="rpt-footer-bar">
      <span>VAT Return — ${vatMonthLabel} &nbsp;|&nbsp; Malakesa Transfers &amp; Tours &nbsp;|&nbsp; TIN: 445579</span>
      <span>Computer generated — verify before filing</span>
    </div>
    <div class="noprint"><span>VAT Return — ${vatMonthLabel}</span><button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button></div>
    <div class="page">
      <div class="header">
        <div>
          <img src="${MALAKESA_LOGO}" alt="Malakesa Transfers and Tours" style="width:200px;border-radius:6px;display:block" />
          <div class="logo-contact">
            📍 Port Vila, Shefa Province, Vanuatu<br>
            📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
          </div>
        </div>
        <div class="report-title">
          <div class="report-name">VAT RETURN</div>
          <div class="report-sub">
            Period: <strong>${vatMonthLabel}</strong><br>
            TIN: <strong>445579</strong><br>
            Generated: ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'})}
          </div>
        </div>
      </div>
      <div class="body">
        <div class="tin-box">
          ⚠️ <strong>VAT Registration:</strong> TIN 445579 &nbsp;|&nbsp; Vanuatu Value Added Tax &nbsp;|&nbsp; Rate: 15% &nbsp;|&nbsp; Period: ${vatMonthLabel}
        </div>
        <div class="vat-box">
          <div class="vat-item">
            <div class="vat-label">VAT Output Tax</div>
            <div class="vat-value">VT ${Number(vatTotalTax).toLocaleString()}</div>
            <div class="vat-sub">Total VAT charged to clients</div>
          </div>
          <div class="vat-item">
            <div class="vat-label">Taxable Sales (ex-VAT)</div>
            <div class="vat-value" style="color:#F5D98A">VT ${Number(vatTotalSubtotal).toLocaleString()}</div>
            <div class="vat-sub">${vatStandard.length} standard-rated invoice${vatStandard.length !== 1 ? 's' : ''}</div>
          </div>
          <div class="vat-item">
            <div class="vat-label">Zero-Rated Sales</div>
            <div class="vat-value" style="color:#aaa">VT ${Number(vatZeroRated.reduce((s,i) => s + Number(i.total), 0)).toLocaleString()}</div>
            <div class="vat-sub">${vatZeroRated.length} zero-rated invoice${vatZeroRated.length !== 1 ? 's' : ''}</div>
          </div>
          <div class="vat-item">
            <div class="vat-label">Total Invoiced</div>
            <div class="vat-value" style="color:#F5D98A">VT ${Number(vatTotalInv).toLocaleString()}</div>
            <div class="vat-sub">${vatInvoices.length} invoice${vatInvoices.length !== 1 ? 's' : ''} total</div>
          </div>
        </div>

        <h2>Standard-Rated Invoices (15% VAT)</h2>
        ${vatStandard.length === 0 ? '<p style="color:#888;font-size:12px;margin-bottom:20px">No standard-rated invoices for this period.</p>' : `
        <table>
          <thead><tr><th>Invoice #</th><th>Date</th><th>Client</th><th class="right">Subtotal (ex-VAT)</th><th class="right">VAT (15%)</th><th class="right">Total</th></tr></thead>
          <tbody>
            ${vatStandard.map(inv => '<tr><td><strong>' + inv.number + '</strong></td><td>' + fmtDate(inv.date) + '</td><td>' + inv.client_name + '</td><td class="right amt">VT ' + Number(inv.subtotal||0).toLocaleString() + '</td><td class="right vat-amt">VT ' + Number(inv.tax||0).toLocaleString() + '</td><td class="right amt">VT ' + Number(inv.total).toLocaleString() + '</td></tr>').join('')}
            <tr class="summary-row"><td colspan="3">SUBTOTAL — Standard Rated</td><td class="right">VT ${Number(vatStandard.reduce((s,i)=>s+Number(i.subtotal||0),0)).toLocaleString()}</td><td class="right">VT ${Number(vatStandard.reduce((s,i)=>s+Number(i.tax||0),0)).toLocaleString()}</td><td class="right">VT ${Number(vatStandard.reduce((s,i)=>s+Number(i.total),0)).toLocaleString()}</td></tr>
          </tbody>
        </table>`}

        <h2>Zero-Rated Invoices (0% VAT)</h2>
        ${vatZeroRated.length === 0 ? '<p style="color:#888;font-size:12px;margin-bottom:20px">No zero-rated invoices for this period.</p>' : `
        <table>
          <thead><tr><th>Invoice #</th><th>Date</th><th>Client</th><th class="right">Amount</th><th class="right">VAT</th></tr></thead>
          <tbody>
            ${vatZeroRated.map(inv => '<tr><td><strong>' + inv.number + '</strong></td><td>' + fmtDate(inv.date) + '</td><td>' + inv.client_name + '</td><td class="right amt">VT ' + Number(inv.total).toLocaleString() + '</td><td class="right zero">Nil</td></tr>').join('')}
            <tr class="summary-row"><td colspan="3">SUBTOTAL — Zero Rated</td><td class="right">VT ${Number(vatZeroRated.reduce((s,i)=>s+Number(i.total),0)).toLocaleString()}</td><td class="right zero">Nil</td></tr>
          </tbody>
        </table>`}

        <h2>VAT Summary</h2>
        <table style="max-width:480px">
          <tbody>
            <tr><td>Total Sales (inc. VAT)</td><td class="right amt">VT ${Number(vatTotalInv).toLocaleString()}</td></tr>
            <tr><td>Taxable Sales (ex-VAT)</td><td class="right amt">VT ${Number(vatTotalSubtotal).toLocaleString()}</td></tr>
            <tr><td>Zero-Rated Sales</td><td class="right amt">VT ${Number(vatZeroRated.reduce((s,i)=>s+Number(i.total),0)).toLocaleString()}</td></tr>
            <tr style="background:#FBF3E4;font-weight:700"><td>VAT Output Tax (Box 1)</td><td class="right" style="color:#2E7D2E">VT ${Number(vatTotalTax).toLocaleString()}</td></tr>
            <tr style="background:#f9f9f9"><td>Total Purchases (inc. VAT)</td><td class="right amt">VT ${Number(vatPurchasesTotal).toLocaleString()}</td></tr>
            <tr style="background:#f9f9f9"><td>Purchases (ex-VAT)</td><td class="right amt">VT ${Number(vatPurchasesExVat).toLocaleString()}</td></tr>
            <tr style="background:#FBF3E4;font-weight:700"><td>VAT Input Tax (Box 2)</td><td class="right" style="color:#1A4D1A">VT ${Number(vatInputTax).toLocaleString()}</td></tr>
            <tr style="background:#FAEEDA;font-weight:700;font-size:14px"><td>NET VAT PAYABLE (Box 1 − Box 2)</td><td class="right" style="color:#D85A30">VT ${Number(vatNetPayable).toLocaleString()}</td></tr>
          </tbody>
        </table>

        ${vatPurchases.length > 0 ? `
        <h2>Purchases — Input VAT (${vatMonthLabel})</h2>
        <table>
          <thead><tr><th>Date</th><th>Supplier</th><th>Description</th><th>Category</th><th class="right">Ex-VAT</th><th class="right">Input VAT</th><th class="right">Total</th></tr></thead>
          <tbody>
            ${vatPurchases.map(p => '<tr><td>' + fmtDate(p.date) + '</td><td><strong>' + p.supplier + '</strong></td><td>' + (p.description||'—') + '</td><td>' + (p.category||'Other') + '</td><td class="right">VT ' + Number(p.amount_ex_vat||0).toLocaleString() + '</td><td class="right" style="color:#1A4D1A;font-weight:500">' + (Number(p.vat)>0 ? 'VT '+Number(p.vat).toLocaleString() : 'Nil') + '</td><td class="right">VT ' + Number(p.amount||0).toLocaleString() + '</td></tr>').join('')}
            <tr class="summary-row"><td colspan="4">SUBTOTAL</td><td class="right">VT ${Number(vatPurchasesExVat).toLocaleString()}</td><td class="right" style="color:#1A4D1A">VT ${Number(vatInputTax).toLocaleString()}</td><td class="right">VT ${Number(vatPurchasesTotal).toLocaleString()}</td></tr>
          </tbody>
        </table>` : '<p style="color:#888;font-size:12px;margin-bottom:20px">No purchases recorded for this period — add purchases in the Purchases section.</p>'}

        <p style="margin-top:16px;font-size:11px;color:#888">* Verify all figures before filing your VAT return with the Vanuatu Financial Services Commission. TIN: 445579.</p>
      </div>
      <div class="footer">
        <div class="footer-l">
          <div><strong style="color:#F5D98A">Malakesa Transfers &amp; Tours</strong></div>
          <div>TIN: 445579 &nbsp;|&nbsp; Port Vila, Vanuatu</div>
          <div>VAT Period: ${vatMonthLabel}</div>
        </div>
        <div class="footer-r">
          <div>Output Tax: VT ${Number(vatTotalTax).toLocaleString()}</div>
          <div>Input Tax: VT ${Number(vatInputTax).toLocaleString()}</div>
          <div style="font-weight:700">Net Payable: VT ${Number(vatNetPayable).toLocaleString()}</div>
          <div style="font-size:10px;opacity:0.7">Computer generated — verify before filing</div>
        </div>
      </div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  // ── Suppliers tab logic ──
  const filterPurchaseDate = (list) => {
    if (supplierPeriod === 'all') return list
    if (supplierPeriod === 'specific') return list.filter(p => p.date && p.date.startsWith(supplierMonth))
    const now = new Date(); const start = new Date()
    if (supplierPeriod === 'month') start.setDate(1)
    if (supplierPeriod === 'quarter') start.setMonth(now.getMonth() - 2, 1)
    if (supplierPeriod === 'year') start.setMonth(0, 1)
    return list.filter(p => p.date && new Date(p.date + 'T00:00:00') >= start)
  }
  const fPurchases = filterPurchaseDate(purchases || [])

  const bySupplier = {}
  fPurchases.forEach(p => {
    const name = p.supplier || 'Unknown'
    if (!bySupplier[name]) bySupplier[name] = { name, category: p.category, count: 0, total: 0, exVat: 0, vat: 0 }
    bySupplier[name].count++
    bySupplier[name].total += Number(p.amount || 0)
    bySupplier[name].exVat += Number(p.amount_ex_vat || 0)
    bySupplier[name].vat += Number(p.vat || 0)
    if (!bySupplier[name].category && p.category) bySupplier[name].category = p.category
  })
  let supplierRows = Object.values(bySupplier)
  if (supplierSort === 'spend') supplierRows.sort((a, b) => b.total - a.total)
  if (supplierSort === 'count') supplierRows.sort((a, b) => b.count - a.count)
  if (supplierSort === 'name') supplierRows.sort((a, b) => a.name.localeCompare(b.name))

  const supplierTotalSpend = fPurchases.reduce((s, p) => s + Number(p.amount || 0), 0)
  const supplierTotalExVat = fPurchases.reduce((s, p) => s + Number(p.amount_ex_vat || 0), 0)
  const supplierTotalVat = fPurchases.reduce((s, p) => s + Number(p.vat || 0), 0)

  // Category breakdown
  const byCategory = {}
  fPurchases.forEach(p => {
    const cat = p.category || 'Other'
    byCategory[cat] = (byCategory[cat] || 0) + Number(p.amount || 0)
  })

  const supplierPeriodLabel = supplierPeriod === 'specific'
    ? (vatMonthOptions.find(m => m.value === supplierMonth)?.label || supplierMonth)
    : { all: 'All time', month: 'This month', quarter: 'This quarter', year: 'This year' }[supplierPeriod]

  const printSupplierReport = () => {
    const w = window.open('', '_blank')
    const title = 'Purchases by Supplier — ' + supplierPeriodLabel
    w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:Arial,sans-serif;margin:0;color:#222;font-size:13px;background:#FBF3E4}
      .page{max-width:800px;margin:20px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.15)}
      .header{background:linear-gradient(135deg,#6B4423 0%,#8B5E34 50%,#A67C42 100%);padding:24px 40px;display:flex;justify-content:space-between;align-items:flex-start}
      .logo-contact{font-size:10px;color:rgba(255,255,255,0.7);margin-top:8px;line-height:1.8}
      .report-title{text-align:right;color:#fff}
      .report-name{font-size:20px;font-weight:700;color:#F5D98A}
      .report-sub{font-size:11px;color:rgba(255,255,255,0.75);margin-top:4px;line-height:1.7}
      .body{padding:28px 40px}
      .stats{display:flex;gap:20px;margin-bottom:24px;flex-wrap:wrap}
      .stat{background:#f5f5f5;border-radius:8px;padding:12px 18px;min-width:140px}
      .stat-label{font-size:11px;color:#666;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.4px}
      .stat-value{font-size:18px;font-weight:bold}
      h2{font-size:13px;font-weight:700;margin:20px 0 8px;color:#3D2214;border-bottom:2px solid #8B6914;padding-bottom:4px;text-transform:uppercase;letter-spacing:0.5px}
      table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:12px}
      th{background:#FBF3E4;padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#3D2214;text-transform:uppercase;letter-spacing:0.5px}
      td{padding:8px 10px;border-bottom:1px solid #FBF3E4}
      tr:nth-child(even) td{background:#faf6ee}
      .right{text-align:right}
      .green{color:#2E7D2E;font-weight:500}
      .summary-row{background:#FBF3E4!important;font-weight:700}
      .footer{background:linear-gradient(135deg,#6B4423,#A67C42);padding:14px 40px;display:flex;justify-content:space-between;align-items:center}
      .footer-l{color:rgba(255,255,255,0.8);font-size:10px;line-height:1.9}
      .footer-r{text-align:right;color:#F5D98A;font-size:10px;line-height:1.9}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      thead{display:table-header-group}
      .rpt-hdr{display:none}
      .summary-row{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .header{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .footer{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      @page{margin:18mm 14mm 22mm 14mm;size:A4}
      @media print{
        .noprint{display:none}
        body{background:#fff}
        .page{box-shadow:none;margin:0;border-radius:0}
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px}
        .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999}
        .page{padding-top:42px}
        .rpt-footer-bar{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #FBF3E4;padding:4px 40px;display:flex;justify-content:space-between;font-size:10px;color:#888;z-index:999}
      }
    </style></head><body>
    <div class="rpt-hdr">
      <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfers &amp; Tours &nbsp;—&nbsp; Purchases by Supplier &nbsp;—&nbsp; ${supplierPeriodLabel}</span>
      <span style="font-size:10px;color:#888">Generated ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span>
    </div>
    <div class="rpt-footer-bar">
      <span>Purchases by Supplier — ${supplierPeriodLabel} &nbsp;|&nbsp; Malakesa Transfers &amp; Tours</span>
      <span>Computer generated — confidential</span>
    </div>
    <div class="noprint"><span>Purchases by Supplier — ${supplierPeriodLabel}</span><button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button></div>
    <div class="page">
      <div class="header">
        <div>
          <img src="${MALAKESA_LOGO}" alt="Malakesa Transfers and Tours" style="width:200px;border-radius:6px;display:block" />
          <div class="logo-contact">
            📍 Port Vila, Shefa Province, Vanuatu<br>
            📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
          </div>
        </div>
        <div class="report-title">
          <div class="report-name">PURCHASES BY SUPPLIER</div>
          <div class="report-sub">
            Period: <strong>${supplierPeriodLabel}</strong><br>
            Generated: ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'})}
          </div>
        </div>
      </div>
      <div class="body">
        <div class="stats">
          <div class="stat"><div class="stat-label">Total Spend</div><div class="stat-value">VT ${Number(supplierTotalSpend).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Subtotal (ex-VAT)</div><div class="stat-value">VT ${Number(supplierTotalExVat).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Input VAT</div><div class="stat-value" style="color:#2E7D2E">VT ${Number(supplierTotalVat).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Suppliers</div><div class="stat-value">${supplierRows.length}</div></div>
        </div>

        <h2>Spend by Supplier</h2>
        <table>
          <thead><tr><th>Supplier</th><th>Category</th><th class="right">Purchases</th><th class="right">Ex-VAT</th><th class="right">VAT</th><th class="right">Total</th></tr></thead>
          <tbody>
            ${supplierRows.map(s => '<tr><td><strong>' + s.name + '</strong></td><td>' + (s.category||'Other') + '</td><td class="right">' + s.count + '</td><td class="right">VT ' + Number(s.exVat).toLocaleString() + '</td><td class="right green">VT ' + Number(s.vat).toLocaleString() + '</td><td class="right">VT ' + Number(s.total).toLocaleString() + '</td></tr>').join('')}
            <tr class="summary-row"><td colspan="2">TOTAL</td><td class="right">${fPurchases.length}</td><td class="right">VT ${Number(supplierTotalExVat).toLocaleString()}</td><td class="right">VT ${Number(supplierTotalVat).toLocaleString()}</td><td class="right">VT ${Number(supplierTotalSpend).toLocaleString()}</td></tr>
          </tbody>
        </table>

        <h2>Spend by Category</h2>
        <table>
          <thead><tr><th>Category</th><th class="right">Amount</th><th class="right">% of total</th></tr></thead>
          <tbody>
            ${Object.entries(byCategory).sort((a,b) => b[1]-a[1]).map(([cat, amt]) => '<tr><td>' + cat + '</td><td class="right">VT ' + Number(amt).toLocaleString() + '</td><td class="right">' + (supplierTotalSpend > 0 ? Math.round((amt/supplierTotalSpend)*100) : 0) + '%</td></tr>').join('')}
          </tbody>
        </table>
      </div>
      <div class="footer">
        <div class="footer-l">
          <div><strong style="color:#F5D98A">Malakesa Transfers &amp; Tours</strong></div>
          <div>Port Vila, Vanuatu</div>
        </div>
        <div class="footer-r">
          <div>Total Spend: VT ${Number(supplierTotalSpend).toLocaleString()}</div>
          <div style="font-size:10px;opacity:0.7">This report is confidential</div>
        </div>
      </div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const printReport = () => {
    const w = window.open('', '_blank')
    const title = 'Revenue Report' + (filterClient ? ' — ' + filterClient : '') + ' — ' + periodLabel
    w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>
      body{font-family:Arial,sans-serif;color:#222;font-size:13px}
      h1{font-size:22px;font-weight:bold;color:#8B6914;margin-bottom:2px}
      .sub{color:#888;font-size:12px;margin-bottom:28px}
      .stats{display:flex;gap:20px;margin-bottom:28px;flex-wrap:wrap}
      .stat{background:#f5f5f5;border-radius:8px;padding:12px 18px;min-width:140px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .stat-label{font-size:11px;color:#666;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.4px}
      .stat-value{font-size:18px;font-weight:bold}
      h2{font-size:14px;font-weight:bold;margin:24px 0 8px;color:#333;border-bottom:1px solid #eee;padding-bottom:4px}
      table{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13px}
      thead{display:table-header-group}
      th{background:#f5f5f5;padding:8px 12px;text-align:left;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:0.3px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      td{padding:9px 12px;border-bottom:1px solid #eee}
      .right{text-align:right}
      .green{color:#3B6D11;font-weight:500}
      .red{color:#A32D2D}
      .footer{margin-top:30px;padding-top:16px;border-top:1px solid #eee;font-size:11px;color:#999}
      .rpt-hdr{display:none}
      @page{margin:20mm 15mm 22mm 15mm;size:A4}
      @media print{
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px}
        .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999}
        body{padding-top:44px}
        .report-body{padding:0 0 40px}
        .rpt-footer-bar{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #FBF3E4;padding:4px 40px;display:flex;justify-content:space-between;font-size:10px;color:#888;z-index:999}
      }
    </style></head><body>
    <div class="rpt-hdr">
      <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfers &amp; Tours &nbsp;—&nbsp; Revenue Report &nbsp;—&nbsp; ${periodLabel}</span>
      <span style="font-size:10px;color:#888">Generated ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span>
    </div>
    <div class="rpt-footer-bar">
      <span>Revenue Report — ${periodLabel} &nbsp;|&nbsp; Malakesa Transfers &amp; Tours</span>
      <span>Computer generated — confidential</span>
    </div>
    <div class="report-body" style="padding:0 40px">
    <h1 style="margin-top:20px">Malakesa Transfers &amp; Tours</h1>
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
    <div class="footer">Malakesa Transfers and Tours &nbsp;|&nbsp; Port Vila, Vanuatu &nbsp;|&nbsp; This report is confidential</div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const tabStyle = (active) => ({
    padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none',
    background: active ? '#8B6914' : 'transparent',
    color: active ? '#fff' : '#8B6914',
    outline: active ? 'none' : '1px solid #8B6914'
  })

  // Export helpers
  const downloadCSV = (filename, rows) => {
    const esc = v => { const s = String(v == null ? '' : v); return s.includes(',') || s.includes('"') || s.includes('\n') ? '"' + s.replace(/"/g, '""') + '"' : s }
    const csv = rows.map(r => r.map(esc).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  const exportRevenueExcel = () => {
    const rows = [
      ['Malakesa Transfers and Tours - Revenue Report'],
      ['Period:', periodLabel],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      ['SUMMARY'],
      ['Total Invoiced', totalInv],
      ['Total Collected', totalCol],
      ['Outstanding', outstanding],
      ['VAT Output', totalVat],
      [],
      ['REVENUE BY CLIENT'],
      ['Client', 'Invoices', 'Total (VT)', 'Collected (VT)', 'Outstanding (VT)'],
      ...clientRows.map(r => [r.name, r.count, r.total, r.collected, r.outstanding]),
      [],
      ['REVENUE BY SERVICE'],
      ['Service / Description', 'Qty', 'Revenue (VT)'],
      ...serviceRows.map(r => [r.desc, r.qty, r.revenue]),
      [],
      ['ALL INVOICES'],
      ['Invoice #', 'Date', 'Client', 'Subtotal (VT)', 'VAT (VT)', 'Total (VT)', 'Balance (VT)', 'Status'],
      ...fi.map(i => [i.number, i.date, i.client_name, i.subtotal || 0, i.tax || 0, i.total, getBalance(i, payments), getStatus(i, payments)]),
    ]
    downloadCSV('Malakesa_Revenue_' + periodLabel.replace(/\s/g, '_') + '.csv', rows)
  }

  const exportVatExcel = () => {
    const rows = [
      ['Malakesa Transfers and Tours - VAT Return'],
      ['Period:', vatMonthLabel],
      ['TIN:', '445579'],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      ['OUTPUT TAX (Sales)'],
      ['Invoice #', 'Date', 'Client', 'Subtotal (VT)', 'VAT 15% (VT)', 'Total (VT)', 'Rate'],
      ...vatInvoices.map(i => [i.number, i.date, i.client_name, i.subtotal || 0, i.tax || 0, i.total, Number(i.tax) > 0 ? '15%' : 'Zero-rated']),
      [],
      ['OUTPUT TAX SUMMARY'],
      ['Standard rated sales', vatTotalSubtotal],
      ['Output VAT (15%)', vatTotalTax],
      ['Zero-rated sales', vatZeroRated.reduce((s, i) => s + Number(i.total), 0)],
      [],
      ['INPUT TAX (Purchases)'],
      ['Date', 'Supplier', 'Description', 'Ex-VAT (VT)', 'Input VAT (VT)', 'Total (VT)'],
      ...vatPurchases.map(p => [p.date, p.supplier, p.description || '', p.amount_ex_vat || 0, p.vat || 0, p.amount]),
      [],
      ['INPUT TAX SUMMARY'],
      ['Total purchases', vatPurchasesTotal],
      ['Input VAT (claimable)', vatInputTax],
      [],
      ['NET VAT PAYABLE'],
      ['Output VAT', vatTotalTax],
      ['Less: Input VAT', vatInputTax],
      ['Net VAT payable', Math.max(0, vatTotalTax - vatInputTax)],
    ]
    downloadCSV('Malakesa_VAT_' + vatMonthLabel.replace(/\s/g, '_') + '.csv', rows)
  }

  const exportSupplierExcel = () => {
    const rows = [
      ['Malakesa Transfers and Tours - Purchases by Supplier'],
      ['Period:', supplierPeriodLabel],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      ['SUPPLIER SUMMARY'],
      ['Supplier', 'Purchases', 'Ex-VAT (VT)', 'Input VAT (VT)', 'Total Spend (VT)'],
      ...supplierRows.map(r => [r.name, r.count, r.exvat, r.vat, r.total]),
      [],
      ['ALL PURCHASES'],
      ['Date', 'Supplier', 'Description', 'Category', 'Ex-VAT (VT)', 'VAT (VT)', 'Total (VT)', 'Ref'],
      ...fPurchases.map(p => [p.date, p.supplier, p.description || '', p.category || 'Other', p.amount_ex_vat || 0, p.vat || 0, p.amount, p.ref || '']),
    ]
    downloadCSV('Malakesa_Purchases_' + supplierPeriodLabel.replace(/\s/g, '_') + '.csv', rows)
  }


  const [backingUp, setBackingUp] = useState(false)
  const downloadFullBackup = async () => {
    setBackingUp(true)
    try {
      const [invRes, pmtRes, clRes, purRes, supRes, empRes, catRes, salRes] = await Promise.all([
        fetch('/api/invoices'), fetch('/api/payments'), fetch('/api/clients'), fetch('/api/purchases'), fetch('/api/suppliers'), fetch('/api/employees'), fetch('/api/purchase-categories'), fetch('/api/salary-records')
      ])
      if ([invRes, pmtRes, clRes, purRes, supRes, empRes, catRes, salRes].some(r => !r.ok)) {
        alert('Could not fetch all data — please make sure you are logged in and try again.')
        setBackingUp(false)
        return
      }
      const [invoicesData, paymentsData, clientsData, purchasesData, suppliersData, employeesData, purchaseCategoriesData, salaryRecordsData] =
        await Promise.all([invRes.json(), pmtRes.json(), clRes.json(), purRes.json(), supRes.json(), empRes.json(), catRes.json(), salRes.json()])
      const backup = {
        company: 'Malakesa Transfers and Tours',
        exported_at: new Date().toISOString(),
        invoices: invoicesData,
        payments: paymentsData,
        clients: clientsData,
        purchases: purchasesData,
        suppliers: suppliersData,
        employees: employeesData,
        purchase_categories: purchaseCategoriesData,
        salary_records: salaryRecordsData,
      }
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const nowBackup = new Date()
      a.download = `Malakesa_Full_Backup_${nowBackup.getFullYear()}-${String(nowBackup.getMonth() + 1).padStart(2, '0')}-${String(nowBackup.getDate()).padStart(2, '0')}.json`
      a.click()
      URL.revokeObjectURL(url)
      try { localStorage.setItem('malakesa_last_backup', new Date().toISOString()) } catch(e) {}
    } catch (e) {
      alert('Backup failed: ' + e.message)
    }
    setBackingUp(false)
  }

  return (
    <>
      <Topbar title="Reports">
        <div style={{ display: 'flex', gap: 6, background: '#f5f0e8', borderRadius: 10, padding: 4 }}>
          <button style={tabStyle(tab === 'revenue')} onClick={() => setTab('revenue')}><i className="ti ti-chart-bar" style={{ marginRight: 5 }}></i>Revenue</button>
          <button style={tabStyle(tab === 'suppliers')} onClick={() => setTab('suppliers')}><i className="ti ti-truck" style={{ marginRight: 5 }}></i>By Supplier</button>
          <button style={tabStyle(tab === 'cashflow')} onClick={() => setTab('cashflow')}><i className="ti ti-arrows-exchange" style={{ marginRight: 5 }}></i>Cash Flow</button>
          <button style={tabStyle(tab === 'aging')} onClick={() => setTab('aging')}><i className="ti ti-hourglass" style={{ marginRight: 5 }}></i>Aging</button>
        </div>
      </Topbar>
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ background: '#fff', border: '0.5px solid rgba(139,105,20,0.2)', borderRadius: 12, padding: '14px 16px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#3D2214', display: 'flex', alignItems: 'center', gap: 6 }}><i className="ti ti-database-export"></i> Full Data Backup</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Download every invoice, client, payment, purchase, supplier, employee and salary record as one file — a safety copy independent of Supabase.</div>
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>
              {(() => { try { const last = localStorage.getItem('malakesa_last_backup'); return last ? `Last backup: ${new Date(last).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} at ${new Date(last).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}` : 'No backup downloaded yet' } catch(e) { return '' } })()}
            </div>
          </div>
          <button className="btn" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500, whiteSpace: 'nowrap' }} onClick={downloadFullBackup} disabled={backingUp}>
            <i className="ti ti-download"></i> {backingUp ? 'Preparing...' : 'Download Full Backup'}
          </button>
        </div>
        <div style={{ background: '#fff', border: '0.5px solid rgba(139,105,20,0.2)', borderRadius: 12, padding: '10px 16px', marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {tab === 'revenue' && <>
            <select value={filterClient} onChange={e => setFilterClient(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
              <option value="">All clients</option>
              {allClients.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={period} onChange={e => setPeriod(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
              <option value="all">All time</option>
              <option value="month">This month</option>
              <option value="quarter">This quarter</option>
              <option value="year">This year</option>
              <option value="specific">Specific month...</option>
            </select>
            {period === 'specific' && (
              <MonthYearPicker value={revenueMonth} onChange={setRevenueMonth} accentColor="#8B6914" />
            )}
            <button className="btn btn-sm" style={{ marginLeft: 'auto', background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={() => setShowExport('revenue')}><i className="ti ti-download"></i> Export</button>
          </>}
          {tab === 'suppliers' && <>
            <select value={supplierPeriod} onChange={e => setSupplierPeriod(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
              <option value="all">All time</option>
              <option value="month">This month</option>
              <option value="quarter">This quarter</option>
              <option value="year">This year</option>
              <option value="specific">Specific month...</option>
            </select>
            {supplierPeriod === 'specific' && (
              <MonthYearPicker value={supplierMonth} onChange={setSupplierMonth} accentColor="#8B6914" />
            )}
            <select value={supplierSort} onChange={e => setSupplierSort(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
              <option value="spend">Sort: Highest spend</option>
              <option value="count">Sort: Most purchases</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
            <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500, marginLeft: 'auto' }} onClick={() => setShowExport('suppliers')}><i className="ti ti-download"></i> Export</button>
          </>}
          {tab === 'cashflow' && <>
            <select value={cashflowRange} onChange={e => setCashflowRange(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
              <option value="12months">Last 12 months</option>
              <option value="quarter">This quarter</option>
              <option value="year">This year</option>
              <option value="custom">Custom range...</option>
            </select>
            {cashflowRange === 'custom' && (
              <>
                <input type="month" value={cashflowStart} onChange={e => setCashflowStart(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit' }} />
                <span style={{ fontSize: 13, color: '#888' }}>to</span>
                <input type="month" value={cashflowEnd} onChange={e => setCashflowEnd(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit' }} />
              </>
            )}
          </>}
        </div>
      </div>

      <div style={{ padding: '0 20px 20px' }}>

        {/* ── Revenue Tab ── */}
        {tab === 'revenue' && <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
            <StatCard label="Total invoiced" value={fmt(totalInv)} />
            <StatCard label="Collected" value={fmt(totalCol)} color="#3B6D11" />
            <StatCard label="Outstanding" value={fmt(outstanding)} color="#D85A30" />
            <StatCard label="VAT collected" value={fmt(totalVat)} color="#8B6914" />
          </div>
          <Card>
            <div style={{ fontWeight: 500, marginBottom: 14 }}>Monthly trend</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#666', marginBottom: 10 }}>
                  <span style={{ width: 12, height: 12, background: '#8B6914', borderRadius: 2, display: 'inline-block' }}></span>Invoiced by month
                </div>
                <PieChart data={monthData.map(m => ({ label: m.label, value: m.invoiced }))} size={140} colors={['#8B6914','#A8841A','#C9A24A','#5C3D0A','#3B6D11','#2E7D2E']} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#666', marginBottom: 10 }}>
                  <span style={{ width: 12, height: 12, background: '#3B6D11', borderRadius: 2, display: 'inline-block' }}></span>Collected by month
                </div>
                <PieChart data={monthData.map(m => ({ label: m.label, value: m.collected }))} size={140} colors={['#3B6D11','#5A9425','#2E7D2E','#1A4D1A','#8B6914','#C9A24A']} />
              </div>
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
                  <div key={m} style={{ background: '#FBF3E4', borderRadius: 8, padding: '14px 18px', minWidth: 150 }}>
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{m}</div>
                    <div style={{ fontSize: 18, fontWeight: 500, color: '#3B6D11' }}>{fmt(a)}</div>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{totalCol > 0 ? Math.round((a / totalCol) * 100) : 0}% of collected</div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>}

      {/* ── By Supplier Tab ── */}
        {tab === 'suppliers' && <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
            <StatCard label="Total spend" value={fmt(supplierTotalSpend)} color="#A32D2D" sub={`${fPurchases.length} purchases`} />
            <StatCard label="Subtotal (ex-VAT)" value={fmt(supplierTotalExVat)} />
            <StatCard label="Input VAT" value={fmt(supplierTotalVat)} color="#2E7D2E" />
            <StatCard label="Suppliers used" value={supplierRows.length} />
          </div>

          {supplierRows.length === 0 ? (
            <Card><div style={{ textAlign: 'center', padding: '32px 20px', color: '#666' }}><i className="ti ti-truck-off" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i><p>No purchases recorded for {supplierPeriodLabel.toLowerCase()}</p></div></Card>
          ) : <>
            <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontWeight: 500, fontSize: 13 }}>
                Spend by Supplier — {supplierPeriodLabel}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr style={{ background: '#FBF3E4' }}>
                  <Th>Supplier</Th><Th>Category</Th>
                  <Th style={{ textAlign: 'center' }}>Purchases</Th>
                  <Th style={{ textAlign: 'right' }}>Ex-VAT</Th>
                  <Th style={{ textAlign: 'right' }}>VAT</Th>
                  <Th style={{ textAlign: 'right' }}>Total</Th>
                  <Th style={{ textAlign: 'right' }}>% of spend</Th>
                </tr></thead>
                <tbody>
                  {supplierRows.map(s => (
                    <tr key={s.name} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td><strong>{s.name}</strong></Td>
                      <Td><span style={{ background: '#FBF3E4', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{s.category || 'Other'}</span></Td>
                      <Td style={{ textAlign: 'center' }}>{s.count}</Td>
                      <Td style={{ textAlign: 'right' }}>{fmt(s.exVat)}</Td>
                      <Td style={{ textAlign: 'right', color: s.vat > 0 ? '#2E7D2E' : '#999', fontWeight: s.vat > 0 ? 500 : 400 }}>
                        {s.vat > 0 ? fmt(s.vat) : <span style={{ fontStyle: 'italic', fontSize: 11 }}>Nil</span>}
                      </Td>
                      <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(s.total)}</Td>
                      <Td style={{ textAlign: 'right', color: '#666' }}>{supplierTotalSpend > 0 ? Math.round((s.total / supplierTotalSpend) * 100) : 0}%</Td>
                    </tr>
                  ))}
                  <tr style={{ background: '#FBF3E4', fontWeight: 700 }}>
                    <td colSpan={2} style={{ padding: '9px 14px', fontSize: 13 }}>TOTAL</td>
                    <td style={{ padding: '9px 14px', textAlign: 'center', fontSize: 13 }}>{fPurchases.length}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(supplierTotalExVat)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#2E7D2E' }}>{fmt(supplierTotalVat)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(supplierTotalSpend)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>100%</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card>
              <div style={{ fontWeight: 500, marginBottom: 14 }}>Spend by Category</div>
              <PieChart
                data={Object.entries(byCategory).sort((a,b) => b[1]-a[1]).map(([cat, amt]) => ({ label: cat, value: amt }))}
                size={170}
                colors={['#A32D2D','#8B6914','#D85A30','#5C3D0A','#633806','#C9744A','#3B6D11','#1A4D1A']}
              />
            </Card>

            {(() => {
              // Category trends over the last 6 months, regardless of the period filter above
              const trendNow = new Date()
              const trendMonths = Array.from({ length: 6 }, (_, i) => {
                const d = new Date(trendNow.getFullYear(), trendNow.getMonth() - 5 + i, 1)
                return { key: localMonthStr(d), label: d.toLocaleDateString('en-AU', { month: 'short' }) }
              })
              const topCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([cat]) => cat)
              const trendColors = ['#A32D2D', '#8B6914', '#3B6D11', '#2563A8', '#633806']
              const trendData = topCategories.map((cat, idx) => ({
                category: cat,
                color: trendColors[idx % trendColors.length],
                points: trendMonths.map(m => (purchases || []).filter(p => p.category === cat && (p.date || '').startsWith(m.key)).reduce((s, p) => s + Number(p.amount || 0), 0))
              }))
              const maxTrendVal = Math.max(...trendData.flatMap(t => t.points), 1)

              return (
                <Card style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Purchase Trends by Category</div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Top 5 categories, last 6 months — spot creeping costs or one-off spikes</div>
                  {topCategories.length === 0 ? (
                    <div style={{ color: '#666', fontSize: 13 }}>No purchase data yet</div>
                  ) : (
                    <>
                      <svg viewBox="0 0 600 200" style={{ width: '100%', height: 200 }}>
                        {[0, 1, 2, 3, 4].map(i => (
                          <line key={i} x1="40" y1={20 + i * 36} x2="580" y2={20 + i * 36} stroke="#f0ebe0" strokeWidth="1" />
                        ))}
                        {trendData.map((t, ti) => {
                          const pts = t.points.map((v, i) => {
                            const x = 40 + (i / (trendMonths.length - 1)) * 540
                            const y = 164 - (v / maxTrendVal) * 144
                            return `${x},${y}`
                          }).join(' ')
                          return <polyline key={t.category} points={pts} fill="none" stroke={t.color} strokeWidth="2.5" />
                        })}
                        {trendData.map(t => t.points.map((v, i) => {
                          const x = 40 + (i / (trendMonths.length - 1)) * 540
                          const y = 164 - (v / maxTrendVal) * 144
                          return <circle key={t.category + i} cx={x} cy={y} r="3" fill={t.color} />
                        }))}
                        {trendMonths.map((m, i) => (
                          <text key={m.key} x={40 + (i / (trendMonths.length - 1)) * 540} y="185" fontSize="10" fill="#888" textAnchor="middle">{m.label}</text>
                        ))}
                      </svg>
                      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 10 }}>
                        {trendData.map(t => {
                          const lastVal = t.points[t.points.length - 1]
                          const prevVal = t.points[t.points.length - 2] || 0
                          const change = prevVal > 0 ? Math.round(((lastVal - prevVal) / prevVal) * 100) : null
                          return (
                            <div key={t.category} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                              <span style={{ width: 10, height: 10, borderRadius: 2, background: t.color, display: 'inline-block' }}></span>
                              <span style={{ color: '#444' }}>{t.category}</span>
                              {change !== null && change !== 0 && (
                                <span style={{ color: change > 0 ? '#A32D2D' : '#3B6D11', fontSize: 11, fontWeight: 600 }}>{change > 0 ? '▲' : '▼'} {Math.abs(change)}%</span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </Card>
              )
            })()}
          </>}
        </>}

        {tab === 'cashflow' && (() => {
          // Build the list of months to show, based on selected range
          const now = new Date()
          let months

          if (cashflowRange === 'quarter') {
            const currentQ = Math.floor(now.getMonth() / 3)
            const qStartMonth = currentQ * 3
            months = Array.from({ length: now.getMonth() - qStartMonth + 1 }, (_, i) => {
              const d = new Date(now.getFullYear(), qStartMonth + i, 1)
              return { key: localMonthStr(d), label: d.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' }) }
            })
          } else if (cashflowRange === 'year') {
            months = Array.from({ length: now.getMonth() + 1 }, (_, i) => {
              const d = new Date(now.getFullYear(), i, 1)
              return { key: localMonthStr(d), label: d.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' }) }
            })
          } else if (cashflowRange === 'custom' && cashflowStart && cashflowEnd) {
            const startD = new Date(cashflowStart + '-01T00:00:00')
            const endD = new Date(cashflowEnd + '-01T00:00:00')
            const monthCount = Math.max(1, (endD.getFullYear() - startD.getFullYear()) * 12 + (endD.getMonth() - startD.getMonth()) + 1)
            months = Array.from({ length: monthCount }, (_, i) => {
              const d = new Date(startD.getFullYear(), startD.getMonth() + i, 1)
              return { key: localMonthStr(d), label: d.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' }) }
            })
          } else {
            // default: last 12 months
            months = Array.from({ length: 12 }, (_, i) => {
              const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
              return { key: localMonthStr(d), label: d.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' }) }
            })
          }

          // Money IN: payments received per month
          const moneyIn = months.map(m => ({
            ...m,
            value: payments.filter(p => (p.date || '').startsWith(m.key)).reduce((s, p) => s + Number(p.amount || 0), 0)
          }))

          // Money OUT: purchases + salaries net paid per month
          const moneyOut = months.map(m => {
            const purTotal = (purchases || []).filter(p => (p.date || '').startsWith(m.key)).reduce((s, p) => s + Number(p.amount || 0), 0)
            const salTotal = (salaryRecords || []).filter(r => r.month === m.key).reduce((s, r) => s + Number(r.net_pay || 0), 0)
            return { ...m, purchases: purTotal, salaries: salTotal, value: purTotal + salTotal }
          })

          // Net cash flow per month
          const cashFlow = months.map((m, i) => ({
            ...m,
            in: moneyIn[i].value,
            out: moneyOut[i].value,
            purchases: moneyOut[i].purchases,
            salaries: moneyOut[i].salaries,
            net: moneyIn[i].value - moneyOut[i].value
          }))

          const totalIn = cashFlow.reduce((s, m) => s + m.in, 0)
          const totalOut = cashFlow.reduce((s, m) => s + m.out, 0)
          const totalNet = totalIn - totalOut
          const totalPurchases = cashFlow.reduce((s, m) => s + m.purchases, 0)
          const totalSalaries = cashFlow.reduce((s, m) => s + m.salaries, 0)

          // Year-to-date (calendar year, Jan 1 to today)
          const ytdKey = `${now.getFullYear()}-01`
          const ytdIn = payments.filter(p => (p.date || '') >= `${now.getFullYear()}-01-01`).reduce((s, p) => s + Number(p.amount || 0), 0)
          const ytdPurchases = (purchases || []).filter(p => (p.date || '') >= `${now.getFullYear()}-01-01`).reduce((s, p) => s + Number(p.amount || 0), 0)
          const ytdSalaries = (salaryRecords || []).filter(r => r.month >= ytdKey).reduce((s, r) => s + Number(r.net_pay || 0), 0)
          const ytdNet = ytdIn - ytdPurchases - ytdSalaries

          // This month
          const thisMonthKey = localMonthStr(now)
          const thisMonthData = cashFlow.find(m => m.key === thisMonthKey) || { in: 0, out: 0, net: 0 }
          const maxVal = Math.max(...cashFlow.map(m => Math.max(m.in, m.out)), 1)

          const printCashFlow = () => {
            const w = window.open('', '_blank')
            if (!w) return
            const dateStr = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })
            const rows = cashFlow.map(m => `
              <tr style='border-bottom:0.5px solid #eee'>
                <td style='padding:8px 12px;font-weight:500'>${m.label}</td>
                <td style='padding:8px 12px;text-align:right;color:#3B6D11'>VT ${Number(m.in).toLocaleString()}</td>
                <td style='padding:8px 12px;text-align:right;color:#666'>VT ${Number(m.purchases).toLocaleString()}</td>
                <td style='padding:8px 12px;text-align:right;color:#666'>VT ${Number(m.salaries).toLocaleString()}</td>
                <td style='padding:8px 12px;text-align:right;color:#A32D2D'>VT ${Number(m.out).toLocaleString()}</td>
                <td style='padding:8px 12px;text-align:right;font-weight:700;color:${m.net >= 0 ? '#3B6D11' : '#A32D2D'}'>VT ${Number(m.net).toLocaleString()}</td>
              </tr>`).join('')
            w.document.write(`<!DOCTYPE html><html><head><title>Cash Flow Report</title><style>
              body{font-family:Arial,sans-serif;color:#222;font-size:13px}
              h1{color:#8B6914;font-size:20px;margin:0 0 4px} .sub{color:#888;font-size:12px;margin-bottom:20px}
              table{width:100%;border-collapse:collapse} thead{display:table-header-group}
              th{background:#FBF3E4;padding:9px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.4px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
              .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
              .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
              .rpt-hdr{display:none} @page{margin:18mm 14mm 20mm 14mm;size:A4}
              @media print{.noprint{display:none}.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999} body{padding-top:42px 0 0 40px}}
            </style></head><body>
            <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfers &amp; Tours — Cash Flow Report — Last 12 Months</span><span style='font-size:10px;color:#888'>${dateStr}</span></div>
            <div class='noprint'><span>Cash Flow Report — Last 12 Months</span><button class='printbtn' onclick='window.print()'>🖨️ Print / Save PDF</button></div>
            <div style='padding:20px 40px'>
              <h1>Malakesa Transfers &amp; Tours</h1>
              <div class='sub'>Cash Flow Report — Last 12 Months &nbsp;|&nbsp; Generated ${dateStr}</div>
              <div style='display:flex;gap:24px;margin-bottom:20px;flex-wrap:wrap'>
                <div style='background:#EAF3DE;padding:12px 18px;border-radius:6px'><div style='font-size:11px;color:#555;margin-bottom:4px'>Total Money In</div><div style='font-size:18px;font-weight:700;color:#3B6D11'>VT ${Number(totalIn).toLocaleString()}</div></div>
                <div style='background:#FCEBEB;padding:12px 18px;border-radius:6px'><div style='font-size:11px;color:#555;margin-bottom:4px'>Total Money Out</div><div style='font-size:18px;font-weight:700;color:#A32D2D'>VT ${Number(totalOut).toLocaleString()}</div></div>
                <div style='background:${totalNet>=0?'#EAF3DE':'#FCEBEB'};padding:12px 18px;border-radius:6px'><div style='font-size:11px;color:#555;margin-bottom:4px'>Net Cash Flow</div><div style='font-size:18px;font-weight:700;color:${totalNet>=0?'#3B6D11':'#A32D2D'}'>VT ${Number(totalNet).toLocaleString()}</div></div>
              </div>
              <table><thead><tr>
                <th>Month</th><th style='text-align:right'>Money In (Receipts)</th><th style='text-align:right'>Purchases</th><th style='text-align:right'>Salaries</th><th style='text-align:right'>Total Out</th><th style='text-align:right'>Net Cash Flow</th>
              </tr></thead><tbody>${rows}
              <tr style='background:#FBF3E4;font-weight:700'>
                <td style='padding:9px 12px'>TOTAL (${months.length} month${months.length===1?'':'s'})</td>
                <td style='padding:9px 12px;text-align:right;color:#3B6D11'>VT ${Number(totalIn).toLocaleString()}</td>
                <td style='padding:9px 12px;text-align:right'>VT ${Number(totalPurchases).toLocaleString()}</td>
                <td style='padding:9px 12px;text-align:right'>VT ${Number(totalSalaries).toLocaleString()}</td>
                <td style='padding:9px 12px;text-align:right;color:#A32D2D'>VT ${Number(totalOut).toLocaleString()}</td>
                <td style='padding:9px 12px;text-align:right;color:${totalNet>=0?'#3B6D11':'#A32D2D'}'>VT ${Number(totalNet).toLocaleString()}</td>
              </tr></tbody></table></div>
              <script>window.onload=()=>window.print()<\/script></body></html>`)
            w.document.close()
          }

          const exportCashFlow = () => {
            const rows = [
              ['Malakesa Transfers and Tours - Cash Flow Report'],
              ['Period: Last 12 months'],
              ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
              [],
              ['Month', 'Money In (VT)', 'Purchases (VT)', 'Salaries (VT)', 'Total Out (VT)', 'Net Cash Flow (VT)'],
              ...cashFlow.map(m => [m.label, m.in, m.purchases, m.salaries, m.out, m.net]),
              [],
              ['TOTAL', totalIn, totalPurchases, totalSalaries, totalOut, totalNet]
            ]
            downloadCSV('Malakesa_CashFlow_12months.csv', rows)
          }

          return (
            <div>
              {/* Net Profit KPI banner */}
              <div style={{ background: 'linear-gradient(135deg, #6B4423 0%, #8B5E34 50%, #A67C42 100%)', borderRadius: 12, padding: '18px 24px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: 1, marginBottom: 4 }}>NET PROFIT — THIS MONTH ({now.toLocaleDateString('en-AU', { month: 'long' })})</div>
                  <div style={{ fontSize: 30, fontWeight: 700, color: thisMonthData.net >= 0 ? '#F5D98A' : '#FF9B8A' }}>{thisMonthData.net >= 0 ? '+' : ''}{fmt(thisMonthData.net)}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{fmt(thisMonthData.in)} in &nbsp;−&nbsp; {fmt(thisMonthData.out)} out</div>
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.2)' }}></div>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: 1, marginBottom: 4 }}>YEAR-TO-DATE NET PROFIT ({now.getFullYear()})</div>
                  <div style={{ fontSize: 30, fontWeight: 700, color: ytdNet >= 0 ? '#F5D98A' : '#FF9B8A' }}>{ytdNet >= 0 ? '+' : ''}{fmt(ytdNet)}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{fmt(ytdIn)} in &nbsp;−&nbsp; {fmt(ytdPurchases + ytdSalaries)} out</div>
                </div>
              </div>

              {/* Summary cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
                <StatCard label="Total money in" value={fmt(totalIn)} color="#3B6D11" sub="Payments received" />
                <StatCard label="Total purchases" value={fmt(totalPurchases)} color="#A32D2D" sub="12 months" />
                <StatCard label="Total salaries" value={fmt(totalSalaries)} color="#A32D2D" sub="Net pay" />
                <StatCard label="Net cash flow" value={fmt(totalNet)} color={totalNet >= 0 ? '#3B6D11' : '#A32D2D'} sub={totalNet >= 0 ? 'Cash positive' : 'Cash negative'} />
              </div>

              {/* Visual bar chart */}
              <Card style={{ padding: '20px 20px 16px', marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 16 }}>Monthly cash flow</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 160, borderBottom: '1px solid #FBF3E4', paddingBottom: 8 }}>
                  {cashFlow.map(m => {
                    const inH = Math.round((m.in / maxVal) * 140)
                    const outH = Math.round((m.out / maxVal) * 140)
                    const net = m.net
                    return (
                      <div key={m.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <div style={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-end', height: 140 }}>
                          <div style={{ flex: 1, background: '#3B6D11', borderRadius: '3px 3px 0 0', height: inH + 'px', minHeight: m.in > 0 ? 3 : 0, title: 'In: ' + fmt(m.in) }} title={`In: ${fmt(m.in)}`}></div>
                          <div style={{ flex: 1, background: '#A32D2D', borderRadius: '3px 3px 0 0', height: outH + 'px', minHeight: m.out > 0 ? 3 : 0 }} title={`Out: ${fmt(m.out)}`}></div>
                        </div>
                        <div style={{ fontSize: 9, color: '#888', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>{m.label.split(' ')[0]}</div>
                        <div style={{ fontSize: 9, fontWeight: 600, color: net >= 0 ? '#3B6D11' : '#A32D2D' }}>{net >= 0 ? '+' : ''}{Math.round(net/1000)}k</div>
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: '#666' }}>
                  <span><span style={{ display: 'inline-block', width: 12, height: 12, background: '#3B6D11', borderRadius: 2, marginRight: 5, verticalAlign: 'middle' }}></span>Money in (payments received)</span>
                  <span><span style={{ display: 'inline-block', width: 12, height: 12, background: '#A32D2D', borderRadius: 2, marginRight: 5, verticalAlign: 'middle' }}></span>Money out (purchases + salaries)</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: '#aaa' }}>numbers show net VT (thousands)</span>
                </div>
              </Card>

              {/* Detailed monthly table */}
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Month by month breakdown</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-sm" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 500 }} onClick={printCashFlow}><i className="ti ti-printer"></i> PDF</button>
                    <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={exportCashFlow}><i className="ti ti-download"></i> Export</button>
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: '#FBF3E4' }}>
                    <Th>Month</Th>
                    <Th style={{ textAlign: 'right', color: '#3B6D11' }}>Money In</Th>
                    <Th style={{ textAlign: 'right' }}>Purchases</Th>
                    <Th style={{ textAlign: 'right' }}>Salaries</Th>
                    <Th style={{ textAlign: 'right', color: '#A32D2D' }}>Total Out</Th>
                    <Th style={{ textAlign: 'right' }}>Net Cash Flow</Th>
                  </tr></thead>
                  <tbody>
                    {cashFlow.map(m => (
                      <tr key={m.key} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)', background: m.net < 0 ? '#FFF8F8' : '#fff' }}>
                        <Td style={{ fontWeight: 500 }}>{m.label}</Td>
                        <Td style={{ textAlign: 'right', color: '#3B6D11', fontWeight: m.in > 0 ? 500 : 400 }}>{m.in > 0 ? fmt(m.in) : <span style={{ color: '#ccc' }}>—</span>}</Td>
                        <Td style={{ textAlign: 'right', color: '#666' }}>{m.purchases > 0 ? fmt(m.purchases) : <span style={{ color: '#ccc' }}>—</span>}</Td>
                        <Td style={{ textAlign: 'right', color: '#666' }}>{m.salaries > 0 ? fmt(m.salaries) : <span style={{ color: '#ccc' }}>—</span>}</Td>
                        <Td style={{ textAlign: 'right', color: '#A32D2D', fontWeight: m.out > 0 ? 500 : 400 }}>{m.out > 0 ? fmt(m.out) : <span style={{ color: '#ccc' }}>—</span>}</Td>
                        <Td style={{ textAlign: 'right' }}>
                          <span style={{ fontWeight: 700, color: m.net >= 0 ? '#3B6D11' : '#A32D2D', background: m.net >= 0 ? '#EAF3DE' : '#FCEBEB', padding: '2px 8px', borderRadius: 99, fontSize: 12 }}>
                            {m.net >= 0 ? '+' : ''}{fmt(m.net)}
                          </span>
                        </Td>
                      </tr>
                    ))}
                    <tr style={{ background: '#FBF3E4', fontWeight: 700 }}>
                      <td style={{ padding: '9px 14px', fontSize: 13 }}>TOTAL ({months.length} month{months.length === 1 ? '' : 's'})</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#3B6D11' }}>{fmt(totalIn)}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(totalPurchases)}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(totalSalaries)}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#A32D2D' }}>{fmt(totalOut)}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>
                        <span style={{ fontWeight: 700, color: totalNet >= 0 ? '#3B6D11' : '#A32D2D', background: totalNet >= 0 ? '#EAF3DE' : '#FCEBEB', padding: '2px 8px', borderRadius: 99, fontSize: 12 }}>
                          {totalNet >= 0 ? '+' : ''}{fmt(totalNet)}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )
        })()}

        {tab === 'aging' && (() => {
          const today = new Date(todayStr() + 'T00:00:00')
          const bucketOrder = ['Current', '1-30 days', '31-60 days', '61-90 days', '90+ days']
          const bucketColors = { 'Current': '#3B6D11', '1-30 days': '#8B6914', '31-60 days': '#D85A30', '61-90 days': '#A32D2D', '90+ days': '#791F1F' }

          const agingRows = invoices
            .map(inv => {
              const bal = getBalance(inv, payments)
              if (bal <= 0) return null
              const due = new Date((inv.due_date || inv.date) + 'T00:00:00')
              const daysOverdue = Math.floor((today - due) / 86400000)
              let bucket
              if (daysOverdue <= 0) bucket = 'Current'
              else if (daysOverdue <= 30) bucket = '1-30 days'
              else if (daysOverdue <= 60) bucket = '31-60 days'
              else if (daysOverdue <= 90) bucket = '61-90 days'
              else bucket = '90+ days'
              return { ...inv, balance: bal, daysOverdue, bucket }
            })
            .filter(Boolean)
            .sort((a, b) => b.daysOverdue - a.daysOverdue)

          const bucketTotals = Object.fromEntries(bucketOrder.map(b => [b, { count: 0, total: 0 }]))
          agingRows.forEach(r => { bucketTotals[r.bucket].count++; bucketTotals[r.bucket].total += r.balance })
          const grandTotal = agingRows.reduce((s, r) => s + r.balance, 0)

          const printAging = () => {
            const w = window.open('', '_blank')
            if (!w) return
            const dateStr = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })
            const rows = agingRows.map(r => `
              <tr style='border-bottom:0.5px solid #eee'>
                <td style='padding:8px 12px'>${r.number}</td>
                <td style='padding:8px 12px'>${r.client_name}</td>
                <td style='padding:8px 12px'>${fmtDate(r.due_date)}</td>
                <td style='padding:8px 12px;text-align:center'>${r.daysOverdue > 0 ? r.daysOverdue : 0}</td>
                <td style='padding:8px 12px'>${r.bucket}</td>
                <td style='padding:8px 12px;text-align:right;font-weight:600'>VT ${Number(r.balance).toLocaleString()}</td>
              </tr>`).join('')
            const bucketRows = bucketOrder.map(b => `
              <tr>
                <td style='padding:8px 12px;font-weight:600'>${b}</td>
                <td style='padding:8px 12px' colspan='3'>${bucketTotals[b].count} invoice${bucketTotals[b].count === 1 ? '' : 's'}</td>
                <td style='padding:8px 12px;text-align:right;font-weight:600' colspan='2'>VT ${Number(bucketTotals[b].total).toLocaleString()}</td>
              </tr>`).join('')
            w.document.write(`<!DOCTYPE html><html><head><title>Aged Receivables Report</title><style>
              body{font-family:Arial,sans-serif;color:#222;font-size:13px}
              h1{color:#8B6914;font-size:20px;margin:0 0 4px} .sub{color:#888;font-size:12px;margin-bottom:20px}
              table{width:100%;border-collapse:collapse;margin-bottom:24px} thead{display:table-header-group}
              th{background:#FBF3E4;padding:9px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.4px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
              .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
              .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
              .rpt-hdr{display:none} @page{margin:18mm 14mm 20mm 14mm;size:A4}
              @media print{.noprint{display:none}.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999} body{padding-top:42px 0 0 40px}}
            </style></head><body>
            <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfers &amp; Tours — Aged Receivables Report</span><span style='font-size:10px;color:#888'>${dateStr}</span></div>
            <div class='noprint'><span>Aged Receivables Report</span><button class='printbtn' onclick='window.print()'>🖨️ Print / Save PDF</button></div>
            <div style='padding:20px 40px'>
              <h1>Malakesa Transfers &amp; Tours</h1>
              <div class='sub'>Aged Receivables Report &nbsp;|&nbsp; Generated ${dateStr}</div>
              <div style='display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap'>
                <div style='background:${grandTotal > 0 ? '#FCEBEB' : '#EAF3DE'};padding:12px 18px;border-radius:6px'><div style='font-size:11px;color:#555;margin-bottom:4px'>Total Outstanding</div><div style='font-size:18px;font-weight:700;color:${grandTotal > 0 ? '#A32D2D' : '#3B6D11'}'>VT ${Number(grandTotal).toLocaleString()}</div></div>
              </div>
              <h2 style='font-size:14px;color:#3D2214;margin-bottom:8px'>Summary by age</h2>
              <table><thead><tr><th>Bucket</th><th colspan='3'>Invoices</th><th colspan='2' style='text-align:right'>Balance</th></tr></thead><tbody>${bucketRows}</tbody></table>
              <h2 style='font-size:14px;color:#3D2214;margin-bottom:8px'>Invoice detail</h2>
              <table><thead><tr>
                <th>Invoice #</th><th>Client</th><th>Due Date</th><th style='text-align:center'>Days Overdue</th><th>Bucket</th><th style='text-align:right'>Balance</th>
              </tr></thead><tbody>${rows}
              <tr style='background:#FBF3E4;font-weight:700'>
                <td style='padding:9px 12px' colspan='5'>TOTAL OUTSTANDING</td>
                <td style='padding:9px 12px;text-align:right'>VT ${Number(grandTotal).toLocaleString()}</td>
              </tr></tbody></table>
            </div>
              <script>window.onload=()=>window.print()<\/script></body></html>`)
            w.document.close()
          }

          const exportAging = () => {
            const rows = [
              ['Malakesa Transfers and Tours - Aged Receivables Report'],
              ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
              [],
              ['Summary by age'],
              ['Bucket', 'Invoices', 'Balance (VT)'],
              ...bucketOrder.map(b => [b, bucketTotals[b].count, bucketTotals[b].total]),
              [],
              ['Invoice detail'],
              ['Invoice #', 'Client', 'Due Date', 'Days Overdue', 'Bucket', 'Balance (VT)'],
              ...agingRows.map(r => [r.number, r.client_name, r.due_date, r.daysOverdue > 0 ? r.daysOverdue : 0, r.bucket, r.balance]),
              [],
              ['TOTAL OUTSTANDING', '', '', '', '', grandTotal]
            ]
            downloadCSV('Malakesa_Aged_Receivables.csv', rows)
          }

          return (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 16 }}>
                {bucketOrder.map(b => (
                  <StatCard key={b} label={b} value={fmt(bucketTotals[b].total)} color={bucketColors[b]} sub={`${bucketTotals[b].count} invoice${bucketTotals[b].count === 1 ? '' : 's'}`} />
                ))}
              </div>

              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Outstanding invoices by age ({agingRows.length})</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-sm" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 500 }} onClick={printAging}><i className="ti ti-printer"></i> PDF</button>
                    <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={exportAging}><i className="ti ti-download"></i> Export</button>
                  </div>
                </div>
                {agingRows.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                    <i className="ti ti-circle-check" style={{ fontSize: 32, display: 'block', marginBottom: 10, color: '#3B6D11' }}></i>
                    Nothing outstanding — all invoices are paid up.
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr style={{ background: '#FBF3E4' }}>
                      <Th>Invoice #</Th><Th>Client</Th><Th>Due Date</Th><Th style={{ textAlign: 'center' }}>Days Overdue</Th><Th>Status</Th><Th style={{ textAlign: 'right' }}>Balance</Th>
                    </tr></thead>
                    <tbody>
                      {agingRows.map(r => (
                        <tr key={r.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
                          <Td style={{ fontWeight: 500 }}>{r.number}</Td>
                          <Td>{r.client_name}</Td>
                          <Td>{fmtDate(r.due_date)}</Td>
                          <Td style={{ textAlign: 'center' }}>{r.daysOverdue > 0 ? r.daysOverdue : '—'}</Td>
                          <Td><span style={{ background: bucketColors[r.bucket] + '22', color: bucketColors[r.bucket], padding: '2px 9px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{r.bucket}</span></Td>
                          <Td style={{ textAlign: 'right', fontWeight: 600 }}>{fmt(r.balance)}</Td>
                        </tr>
                      ))}
                      <tr style={{ background: '#FBF3E4', fontWeight: 700 }}>
                        <td colSpan="5" style={{ padding: '9px 14px', fontSize: 13 }}>TOTAL OUTSTANDING</td>
                        <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(grandTotal)}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </Card>
            </div>
          )
        })()}

      </div>

      {/* Reports Export Modal */}
      {showExport && (() => {
        const revenueColumns = [
          { key: 'number', label: 'Invoice #' }, { key: 'date', label: 'Issue Date' },
          { key: 'client_name', label: 'Client' }, { key: 'subtotal', label: 'Subtotal (VT)' },
          { key: 'tax', label: 'VAT (VT)' }, { key: 'total', label: 'Total (VT)' },
          { key: 'balance', label: 'Balance (VT)' }, { key: 'status', label: 'Status' },
        ]
        const vatColumns = [
          { key: 'number', label: 'Invoice #' }, { key: 'date', label: 'Date' },
          { key: 'client_name', label: 'Client' }, { key: 'subtotal', label: 'Subtotal (VT)' },
          { key: 'tax', label: 'VAT 15% (VT)' }, { key: 'total', label: 'Total (VT)' },
          { key: 'rate', label: 'VAT Rate' },
        ]
        const supplierColumns = [
          { key: 'date', label: 'Date' }, { key: 'supplier', label: 'Supplier' },
          { key: 'description', label: 'Description' }, { key: 'category', label: 'Category' },
          { key: 'amount_ex_vat', label: 'Ex-VAT (VT)' }, { key: 'vat', label: 'Input VAT (VT)' },
          { key: 'amount', label: 'Total (VT)' }, { key: 'ref', label: 'Reference' },
        ]
        const configs = {
          revenue: {
            title: `Revenue Report — ${periodLabel}`, columns: revenueColumns,
            onExport: (fmt, sel) => {
              if (fmt === 'pdf') { printReport(); return }
              const cols = revenueColumns.filter(c => sel.has(c.key))
              const dlRows = [
                ['Malakesa Transfers and Tours - Revenue Report'],
                ['Period:', periodLabel, 'Total Invoiced:', totalInv, 'Collected:', totalCol, 'Outstanding:', outstanding],
                [], cols.map(c => c.label),
                ...fi.map(inv => cols.map(c => {
                  if (c.key === 'balance') return getBalance(inv, payments)
                  if (c.key === 'status') return getStatus(inv, payments)
                  return inv[c.key] ?? ''
                }))
              ]
              downloadCSV('Malakesa_Revenue_' + periodLabel.replace(/\s/g,'_') + '.csv', dlRows)
            }
          },
          vat: {
            title: `VAT Return — ${vatMonthLabel}`, columns: vatColumns,
            onExport: (fmt, sel) => {
              if (fmt === 'pdf') { printVatReturn(); return }
              const cols = vatColumns.filter(c => sel.has(c.key))
              const dlRows = [
                ['Malakesa Transfers and Tours - VAT Return'],
                ['Period:', vatMonthLabel, 'TIN:', '445579', 'Net VAT Payable:', Math.max(0, vatTotalTax - vatInputTax)],
                [], ['OUTPUT TAX - INVOICES'], cols.map(c => c.label),
                ...vatInvoices.map(inv => cols.map(c => {
                  if (c.key === 'rate') return Number(inv.tax) > 0 ? '15%' : 'Zero-rated'
                  return inv[c.key] ?? ''
                })),
                [], ['INPUT TAX - PURCHASES'],
                ['Date','Supplier','Description','Ex-VAT','Input VAT','Total'],
                ...vatPurchases.map(p => [p.date,p.supplier,p.description||'',p.amount_ex_vat||0,p.vat||0,p.amount])
              ]
              downloadCSV('Malakesa_VAT_' + vatMonthLabel.replace(/\s/g,'_') + '.csv', dlRows)
            }
          },
          suppliers: {
            title: `Purchases by Supplier — ${supplierPeriodLabel}`, columns: supplierColumns,
            onExport: (fmt, sel) => {
              if (fmt === 'pdf') { printSupplierReport(); return }
              const cols = supplierColumns.filter(c => sel.has(c.key))
              const dlRows = [
                ['Malakesa Transfers and Tours - Purchases by Supplier'],
                ['Period:', supplierPeriodLabel, 'Suppliers:', supplierRows.length, 'Total spend:', supplierRows.reduce((s,r)=>s+r.total,0)],
                [], ['SUPPLIER SUMMARY'],
                ['Supplier','Purchases','Ex-VAT (VT)','Input VAT (VT)','Total (VT)'],
                ...supplierRows.map(r => [r.name,r.count,r.exvat,r.vat,r.total]),
                [], ['ALL PURCHASES'], cols.map(c => c.label),
                ...fPurchases.map(p => cols.map(c => p[c.key] ?? ''))
              ]
              downloadCSV('Malakesa_Purchases_' + supplierPeriodLabel.replace(/\s/g,'_') + '.csv', dlRows)
            }
          },
        }
        const cfg = configs[showExport]
        if (!cfg) return null
        return <ExportModal title={cfg.title} columns={cfg.columns} onExport={cfg.onExport} onClose={() => setShowExport(false)} />
      })()}
    </>
  )
}

// ── Purchases ─────────────────────────────────────────────
const PURCHASE_CATEGORIES = ['Fuel', 'Vehicle Maintenance', 'Insurance', 'Office Supplies', 'Utilities', 'Staff Costs', 'Marketing', 'Equipment', 'Accommodation', 'Food & Beverages', 'Professional Services', 'Bank Charges', 'Other']
const PAYMENT_METHODS = ['Cheque', 'Cash', 'Bank Transfer', 'Other']



// ── VAT Return Page (standalone) ──
function VatPage({ invoices, payments, purchases }) {
  const nowD = new Date()
  const defaultVatMonth = localMonthStr(nowD)
  const [vatMonth, setVatMonth] = useState(defaultVatMonth)
  const [showExport, setShowExport] = useState(false)

  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const vatParts = vatMonth.split('-')
  const vatMonthLabel = (MONTHS_LONG[parseInt(vatParts[1])-1] || '') + ' ' + vatParts[0]

  const vatInvoices = invoices.filter(i => i.date?.startsWith(vatMonth))
  const vatStandard = vatInvoices.filter(i => Number(i.tax) > 0)
  const vatZeroRated = vatInvoices.filter(i => !Number(i.tax))
  const vatTotalTax = vatStandard.reduce((s,i) => s + Number(i.tax||0), 0)
  const vatTotalSubtotal = vatStandard.reduce((s,i) => s + Number(i.subtotal||0), 0)
  const vatTotalInv = vatInvoices.reduce((s,i) => s + Number(i.total), 0)
  const vatPurchases = (purchases || []).filter(p => p.date?.startsWith(vatMonth) && (Number(p.vat) > 0 || p.vat_treatment === 'vat_inclusive' || p.vat_treatment === 'vat_exclusive'))
  const vatPurchasesTotal = vatPurchases.reduce((s,p) => s + Number(p.amount||0), 0)
  const vatPurchasesExVat = vatPurchases.reduce((s,p) => s + Number(p.amount_ex_vat||0), 0)
  const vatInputTax = vatPurchases.reduce((s,p) => s + Number(p.vat||0), 0)
  const vatNetPayable = Math.max(0, vatTotalTax - vatInputTax)

  const printVatReturn = () => {
    const w = window.open('', '_blank')
    if (!w) return
    const stdRows = vatStandard.map(i => `<tr><td><strong>${i.number}</strong></td><td>${fmtDate(i.date)}</td><td>${i.client_name}</td><td style='text-align:right'>${fmt(i.subtotal||0)}</td><td style='text-align:right;color:#2E7D2E'>${fmt(i.tax||0)}</td><td style='text-align:right'>${fmt(i.total)}</td></tr>`).join('')
    const purRows = vatPurchases.map(p => `<tr><td>${fmtDate(p.date)}</td><td>${p.supplier||''}</td><td>${p.description||''}</td><td style='text-align:right'>${fmt(p.amount_ex_vat||0)}</td><td style='text-align:right;color:#1A4D1A'>${fmt(p.vat||0)}</td><td style='text-align:right'>${fmt(p.amount)}</td></tr>`).join('')
    w.document.write(`<!DOCTYPE html><html><head><title>VAT Return — ${vatMonthLabel}</title>
    <style>
      body{font-family:Arial,sans-serif;color:#222;font-size:13px}
      .page{max-width:800px;margin:20px auto;background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.15)}
      .header{background:linear-gradient(135deg,#6B4423,#8B5E34,#A67C42);padding:20px 32px;display:flex;justify-content:space-between;align-items:flex-start}
      .body{padding:24px 32px}
      h2{font-size:14px;font-weight:700;color:#8B6914;border-bottom:2px solid #FBF3E4;padding-bottom:4px;margin:20px 0 10px}
      table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:16px}
      thead{display:table-header-group}
      th{background:#FBF3E4;padding:7px 10px;text-align:left;font-size:11px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      td{padding:7px 10px;border-bottom:.5px solid #eee}
      .summary{background:#f9f6f0;border-radius:8px;padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
      .sum-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:.5px solid #eee;font-size:13px}
      .net{display:flex;justify-content:space-between;padding:10px 0;font-size:16px;font-weight:700;color:#D85A30;border-top:2px solid #D85A30;margin-top:4px}
      .footer{background:linear-gradient(135deg,#6B4423,#A67C42);padding:12px 32px;color:rgba(255,255,255,.7);font-size:10px;display:flex;justify-content:space-between}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      .rpt-hdr{display:none}
      @page{margin:18mm 14mm 22mm 14mm;size:A4}
      @media print{
        .noprint{display:none}body{background:#fff}.page{box-shadow:none;margin:0;border-radius:0}
        .header{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .footer{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999}
        .page{padding-top:42px}
      }
    </style></head><body>
    <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfers &amp; Tours — VAT Return — ${vatMonthLabel}</span><span style='font-size:10px;color:#888'>TIN: 445579</span></div>
    <div class='noprint'><span>VAT Return — ${vatMonthLabel}</span><button class='printbtn' onclick='window.print()'>Print / Save PDF</button></div>
    <div class='page'>
      <div class='header'>
        <div>
          <img src='${MALAKESA_LOGO}' style='width:180px;border-radius:4px;display:block'/>
          <div style='color:rgba(255,255,255,.7);font-size:11px;margin-top:8px'>TIN: 445579 | Port Vila, Vanuatu</div>
        </div>
        <div style='text-align:right;color:#fff'>
          <div style='font-size:10px;letter-spacing:3px;color:rgba(255,255,255,.6);text-transform:uppercase'>VAT Return</div>
          <div style='font-size:20px;font-weight:700;color:#F5D98A;margin-top:2px'>${vatMonthLabel}</div>
          <div style='font-size:11px;color:rgba(255,255,255,.7);margin-top:4px'>Filed: ${new Date().toLocaleDateString('en-AU',{day:'2-digit',month:'short',year:'numeric'})}</div>
        </div>
      </div>
      <div class='body'>
        <h2>Output Tax — Standard-Rated Sales (15%)</h2>
        <table><thead><tr><th>Invoice #</th><th>Date</th><th>Client</th><th style='text-align:right'>Ex-VAT</th><th style='text-align:right'>VAT 15%</th><th style='text-align:right'>Total</th></tr></thead><tbody>${stdRows || '<tr><td colspan=6 style=text-align:center;color:#999>No standard-rated invoices</td></tr>'}</tbody></table>
        <h2>Input Tax — Purchases</h2>
        <table><thead><tr><th>Date</th><th>Supplier</th><th>Description</th><th style='text-align:right'>Ex-VAT</th><th style='text-align:right'>Input VAT</th><th style='text-align:right'>Total</th></tr></thead><tbody>${purRows || '<tr><td colspan=6 style=text-align:center;color:#999>No VAT purchases recorded</td></tr>'}</tbody></table>
        <div class='summary'>
          <div>
            <div class='sum-row'><span>Box 1 — Output VAT</span><strong style='color:#2E7D2E'>${fmt(vatTotalTax)}</strong></div>
            <div class='sum-row'><span>Box 2 — Input VAT</span><strong style='color:#1A4D1A'>${fmt(vatInputTax)}</strong></div>
            <div class='net'><span>NET VAT PAYABLE</span><span>${fmt(vatNetPayable)}</span></div>
          </div>
          <div style='font-size:12px;color:#555;line-height:1.9'>
            <div>Total invoiced: <strong>${fmt(vatTotalInv)}</strong></div>
            <div>Taxable sales (ex-VAT): <strong>${fmt(vatTotalSubtotal)}</strong></div>
            <div>Zero-rated sales: <strong>${fmt(vatZeroRated.reduce((s,i)=>s+Number(i.total),0))}</strong></div>
            <div>Total purchases: <strong>${fmt(vatPurchasesTotal)}</strong></div>
          </div>
        </div>
      </div>
      <div class='footer'><span>Malakesa Transfers &amp; Tours | TIN: 445579 | VAT Return ${vatMonthLabel}</span><span>Computer generated — verify before filing</span></div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const exportVatExcel = () => {
    const esc = v => { const s = String(v == null ? '' : v); return s.includes(',') || s.includes('"') ? '"' + s.replace(/"/g, '""') + '"' : s }
    const dlRows = [
      ['Malakesa Transfers and Tours - VAT Return'],
      ['Period:', vatMonthLabel, 'TIN:', '445579'],
      ['Output VAT:', vatTotalTax, 'Input VAT:', vatInputTax, 'Net Payable:', vatNetPayable],
      [],
      ['OUTPUT TAX - INVOICES'],
      ['Invoice #','Date','Client','Subtotal (VT)','VAT 15% (VT)','Total (VT)','Rate'],
      ...vatInvoices.map(i => [i.number, i.date, i.client_name, i.subtotal||0, i.tax||0, i.total, Number(i.tax)>0?'15%':'Zero-rated']),
      [],
      ['INPUT TAX - PURCHASES'],
      ['Date','Supplier','Description','Ex-VAT','Input VAT','Total'],
      ...vatPurchases.map(p => [p.date, p.supplier, p.description||'', p.amount_ex_vat||0, p.vat||0, p.amount])
    ]
    const csv = dlRows.map(r => r.map(esc).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'Malakesa_VAT_' + vatMonthLabel.replace(/\s/g,'_') + '.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const vatColumns = [
    { key: 'number', label: 'Invoice #' }, { key: 'date', label: 'Date' },
    { key: 'client_name', label: 'Client' }, { key: 'subtotal', label: 'Subtotal (VT)' },
    { key: 'tax', label: 'VAT 15% (VT)' }, { key: 'total', label: 'Total (VT)' },
    { key: 'rate', label: 'VAT Rate' },
  ]

  return (
    <>
      <Topbar title="VAT Return">
        <MonthYearPicker value={vatMonth} onChange={setVatMonth} accentColor="#8B6914" />
        <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={() => setShowExport(true)}><i className="ti ti-download"></i> Export</button>
        <button className="btn btn-sm" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 500 }} onClick={printVatReturn}><i className="ti ti-printer"></i> PDF</button>
      </Topbar>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Output VAT (sales)" value={fmt(vatTotalTax)} color="#2E7D2E" />
          <StatCard label="Input VAT (purchases)" value={fmt(vatInputTax)} color="#1A4D1A" />
          <StatCard label="Net VAT payable" value={fmt(vatNetPayable)} color="#D85A30" sub="output − input" />
          <StatCard label="Total invoiced" value={fmt(vatTotalInv)} sub={`${vatInvoices.length} invoice${vatInvoices.length!==1?'s':''}`} />
        </div>

        <div style={{ background: '#EAF3DE', border: '0.5px solid #C0DD97', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#27500A', display: 'flex', alignItems: 'center', gap: 10 }}>
          <i className="ti ti-receipt-tax" style={{ fontSize: 18 }}></i>
          <span><strong>VAT Period: {vatMonthLabel}</strong> &nbsp;|&nbsp; TIN: 445579 &nbsp;|&nbsp; Rate: 15% &nbsp;|&nbsp; Output VAT to declare: <strong>{fmt(vatTotalTax)}</strong></span>
        </div>

        {vatInvoices.length === 0 ? (
          <Card><div style={{ textAlign: 'center', padding: '32px 20px', color: '#666' }}><i className="ti ti-receipt-off" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i><p>No invoices for {vatMonthLabel}</p></div></Card>
        ) : <>
          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 14 }}>Standard-Rated Invoices (15% VAT)</strong>
              <span style={{ fontSize: 12, color: '#2E7D2E', fontWeight: 600 }}>{vatStandard.length} invoice{vatStandard.length!==1?'s':''} &nbsp;|&nbsp; VAT: {fmt(vatStandard.reduce((s,i)=>s+Number(i.tax||0),0))}</span>
            </div>
            {vatStandard.length === 0 ? <div style={{ padding: 20, color: '#999', fontSize: 13, textAlign: 'center' }}>No standard-rated invoices this month</div> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr style={{ background: '#FBF3E4' }}><Th>Invoice #</Th><Th>Date</Th><Th>Client</Th><Th style={{ textAlign: 'right' }}>Subtotal (ex-VAT)</Th><Th style={{ textAlign: 'right' }}>VAT 15%</Th><Th style={{ textAlign: 'right' }}>Total</Th></tr></thead>
                <tbody>
                  {vatStandard.map(inv => (
                    <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td><strong>{inv.number}</strong></Td><Td>{fmtDate(inv.date)}</Td><Td>{inv.client_name}</Td>
                      <Td style={{ textAlign: 'right' }}>{fmt(inv.subtotal||0)}</Td>
                      <Td style={{ textAlign: 'right', color: '#2E7D2E', fontWeight: 500 }}>{fmt(inv.tax||0)}</Td>
                      <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(inv.total)}</Td>
                    </tr>
                  ))}
                  <tr style={{ background: '#FBF3E4', fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: '9px 14px', fontSize: 13 }}>SUBTOTAL</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(vatStandard.reduce((s,i)=>s+Number(i.subtotal||0),0))}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#2E7D2E' }}>{fmt(vatStandard.reduce((s,i)=>s+Number(i.tax||0),0))}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(vatStandard.reduce((s,i)=>s+Number(i.total),0))}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Card>

          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 14 }}>Zero-Rated Invoices (0% VAT)</strong>
              <span style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{vatZeroRated.length} invoice{vatZeroRated.length!==1?'s':''} &nbsp;|&nbsp; VAT: Nil</span>
            </div>
            {vatZeroRated.length === 0 ? <div style={{ padding: 20, color: '#999', fontSize: 13, textAlign: 'center' }}>No zero-rated invoices this month</div> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr style={{ background: '#FBF3E4' }}><Th>Invoice #</Th><Th>Date</Th><Th>Client</Th><Th style={{ textAlign: 'right' }}>Amount</Th><Th style={{ textAlign: 'right' }}>VAT</Th></tr></thead>
                <tbody>
                  {vatZeroRated.map(inv => (
                    <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td><strong>{inv.number}</strong></Td><Td>{fmtDate(inv.date)}</Td><Td>{inv.client_name}</Td>
                      <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(inv.total)}</Td>
                      <Td style={{ textAlign: 'right', color: '#999', fontStyle: 'italic' }}>Nil</Td>
                    </tr>
                  ))}
                  <tr style={{ background: '#FBF3E4', fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: '9px 14px', fontSize: 13 }}>SUBTOTAL</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(vatZeroRated.reduce((s,i)=>s+Number(i.total),0))}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#999', fontStyle: 'italic' }}>Nil</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Card>

          <Card>
            <div style={{ fontWeight: 500, marginBottom: 14, fontSize: 14 }}>VAT Return Summary — {vatMonthLabel}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                {[['Total Sales (inc. VAT)', fmt(vatTotalInv), '#1a1a1a'],['Taxable Sales (ex-VAT)', fmt(vatTotalSubtotal), '#8B6914'],['Zero-Rated Sales', fmt(vatZeroRated.reduce((s,i)=>s+Number(i.total),0)), '#666'],['VAT Output Tax (Box 1)', fmt(vatTotalTax), '#2E7D2E']].map(([label, value, color]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}>
                    <span style={{ color: '#666' }}>{label}</span>
                    <span style={{ fontWeight: label.includes('Box') ? 700 : 500, color }}>{value}</span>
                  </div>
                ))}
                <div style={{ marginTop: 8 }}>
                  {[['Total Purchases (inc. VAT)', fmt(vatPurchasesTotal), '#1a1a1a'],['VAT Input Tax (Box 2)', fmt(vatInputTax), '#1A4D1A']].map(([label, value, color]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}>
                      <span style={{ color: '#666' }}>{label}</span>
                      <span style={{ fontWeight: label.includes('Box') ? 700 : 500, color }}>{value}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 15, fontWeight: 700, color: '#D85A30', borderTop: '2px solid #D85A30', marginTop: 4 }}>
                    <span>NET VAT PAYABLE</span><span>{fmt(vatNetPayable)}</span>
                  </div>
                </div>
              </div>
              <div style={{ background: '#f9f6f0', borderRadius: 8, padding: '14px 16px', fontSize: 12, color: '#555', lineHeight: 1.9 }}>
                <div style={{ fontWeight: 600, color: '#3D2214', marginBottom: 8 }}>📋 Filing Summary</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(0,0,0,0.09)', paddingBottom: 6, marginBottom: 6 }}><span>Box 1 — Output Tax</span><strong style={{ color: '#2E7D2E' }}>{fmt(vatTotalTax)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(0,0,0,0.09)', paddingBottom: 6, marginBottom: 6 }}><span>Box 2 — Input Tax</span><strong style={{ color: '#1A4D1A' }}>{fmt(vatInputTax)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 6, marginBottom: 10 }}><span style={{ fontWeight: 700 }}>Net Payable to Customs and Inland Revenue Department</span><strong style={{ color: '#D85A30', fontSize: 14 }}>{fmt(vatNetPayable)}</strong></div>
                {vatPurchases.length === 0 && <div style={{ background: '#FAEEDA', border: '0.5px solid #FAC775', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: '#633806' }}>⚠️ No purchases recorded. Add purchases to claim input VAT.</div>}
              </div>
            </div>
          </Card>
        </>}

        {showExport && <ExportModal title={`VAT Return — ${vatMonthLabel}`} columns={vatColumns}
          onExport={(fmt2, sel) => {
            if (fmt2 === 'pdf') { printVatReturn(); return }
            const cols = vatColumns.filter(c => sel.has(c.key))
            const dlRows = [
              ['Malakesa Transfers and Tours - VAT Return'],
              ['Period:', vatMonthLabel, 'TIN:', '445579', 'Net VAT Payable:', vatNetPayable],
              [], ['OUTPUT TAX'], cols.map(c => c.label),
              ...vatInvoices.map(inv => cols.map(c => { if (c.key==='rate') return Number(inv.tax)>0?'15%':'Zero-rated'; return inv[c.key]??'' })),
              [], ['INPUT TAX'],
              ['Date','Supplier','Description','Ex-VAT','Input VAT','Total'],
              ...vatPurchases.map(p => [p.date,p.supplier,p.description||'',p.amount_ex_vat||0,p.vat||0,p.amount])
            ]
            const esc = v => { const s = String(v??''); return s.includes(',')||s.includes('"')?'"'+s.replace(/"/g,'""')+'"':s }
            const csv = dlRows.map(r=>r.map(esc).join(',')).join('\n')
            const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'})
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a'); a.href=url; a.download='Malakesa_VAT_'+vatMonthLabel.replace(/\s/g,'_')+'.csv'; a.click()
            URL.revokeObjectURL(url)
          }}
          onClose={() => setShowExport(false)} />}
      </div>
    </>
  )
}

function Purchases({ purchases, suppliers, customCategories, reload, setModal, setSelected }) {
  const [filterMonth, setFilterMonth] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [search, setSearch] = useState('')

  const allCategories = [...PURCHASE_CATEGORIES.slice(0, -1), ...(customCategories || []).map(c => c.name), 'Other']

  const now = new Date()
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const monthOptions = Array.from({length: 12}, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
    return { value: localMonthStr(d), label: MONTHS[d.getMonth()] + ' ' + d.getFullYear() }
  }).reverse()

  let filtered = [...purchases].sort((a,b) => b.date > a.date ? 1 : -1)
  if (search) filtered = filtered.filter(p => p.supplier?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase()))
  if (filterMonth) filtered = filtered.filter(p => p.date?.startsWith(filterMonth))
  if (filterCategory) filtered = filtered.filter(p => p.category === filterCategory)

  const totalAmount = filtered.reduce((s,p) => s + Number(p.amount || 0), 0)
  const totalVat = filtered.reduce((s,p) => s + Number(p.vat || 0), 0)
  const totalExVat = filtered.reduce((s,p) => s + Number(p.amount_ex_vat || 0), 0)

  const hasFilters = search || filterMonth || filterCategory
  const clearFilters = () => { setSearch(''); setFilterMonth(''); setFilterCategory('') }

  const handleDelete = async (id) => {
    if (!confirm('Delete this purchase?')) return
    await fetch('/api/purchases/' + id, { method: 'DELETE' }); reload()
  }

  const selectStyle = { padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }

  // Export
  const [showExport, setShowExport] = useState(false)
  const purchaseColumns = [
    { key: 'date', label: 'Date' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'description', label: 'Description' },
    { key: 'category', label: 'Category' },
    { key: 'amount_ex_vat', label: 'Ex-VAT (VT)' },
    { key: 'vat', label: 'VAT (VT)' },
    { key: 'amount', label: 'Total (VT)' },
    { key: 'payment_method', label: 'Payment Method' },
    { key: 'cheque_number', label: 'Cheque Number' },
    { key: 'ref', label: 'Ref / PO #' },
  ]
  const handlePurchaseExport = (format, selected) => {
    const filterDesc = [filterCategory && `Category: ${filterCategory}`, filterMonth && `Month: ${filterMonth}`, search && `Search: ${search}`].filter(Boolean).join(' | ') || 'All purchases'
    if (format === 'pdf') {
      const w = window.open('', '_blank')
      if (!w) { alert('Please allow popups.'); return }
      const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      const rows = filtered.map(p =>
        `<tr><td>${fmtDate(p.date)}</td><td><strong>${p.supplier}</strong></td><td style='color:#555'>${p.description||'—'}</td><td><span style='background:#FBF3E420;padding:2px 7px;border-radius:99px;font-size:11px'>${p.category||'Other'}</span></td><td style='text-align:right'>${fmt(p.amount_ex_vat||0)}</td><td style='text-align:right;color:#2E7D2E'>${Number(p.vat)>0?fmt(p.vat):'Nil'}</td><td style='text-align:right;font-weight:600'>${fmt(p.amount)}</td><td>${p.payment_method||'Cheque'}${p.payment_method==='Cheque'&&p.cheque_number?' #'+p.cheque_number:''}</td><td style='color:#999;font-size:12px'>${p.ref||'—'}</td></tr>`
      ).join('')
      w.document.write(`<!DOCTYPE html><html><head><title>Purchases Export</title><style>
        body{font-family:Arial,sans-serif;color:#222;font-size:12px;margin:0}
        .rpt-hdr{display:none} @page{margin:15mm 10mm 18mm 10mm;size:A4 landscape}
        table{width:100%;border-collapse:collapse} thead{display:table-header-group}
        th{background:#FBF3E4;padding:7px 8px;text-align:left;font-size:10px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
        td{padding:7px 8px;border-bottom:0.5px solid #eee;font-size:11px}
        h1{color:#8B6914;font-size:18px;margin:0 0 4px} .sub{color:#888;font-size:12px;margin-bottom:20px}
        .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
        .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
        @media print{.noprint{display:none}.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 30px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999} body{padding-top:42px}}
      </style></head><body>
      <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfers &amp; Tours — Purchases — ${filterDesc}</span><span style='font-size:10px;color:#888'>${now}</span></div>
      <div class='noprint'><span>Purchases Export — ${filterDesc}</span><button class='printbtn' onclick='window.print()'>🖨️ Print / Save PDF</button></div>
      <div style='padding:20px 30px'><h1>Malakesa Transfers &amp; Tours</h1>
      <div class='sub'>Purchases Export &nbsp;|&nbsp; ${filterDesc} &nbsp;|&nbsp; ${now}<br>${filtered.length} purchase(s) &nbsp;|&nbsp; Total: VT ${Number(totalAmount).toLocaleString()} &nbsp;|&nbsp; Input VAT: VT ${Number(totalVat).toLocaleString()}</div>
      <table><thead><tr><th>Date</th><th>Supplier</th><th>Description</th><th>Category</th><th style='text-align:right'>Ex-VAT</th><th style='text-align:right'>VAT</th><th style='text-align:right'>Total</th><th>Payment</th><th>Ref</th></tr></thead><tbody>${rows}</tbody>
      <tr style='background:#FBF3E4;font-weight:700'><td colspan='4' style='padding:8px'>TOTAL (${filtered.length})</td><td style='padding:8px;text-align:right'>VT ${Number(totalExVat).toLocaleString()}</td><td style='padding:8px;text-align:right;color:#2E7D2E'>VT ${Number(totalVat).toLocaleString()}</td><td style='padding:8px;text-align:right'>VT ${Number(totalAmount).toLocaleString()}</td><td colspan='2'></td></tr>
      </table></div><script>window.onload=()=>window.print()<\/script></body></html>`)
      w.document.close()
      return
    }
    const cols = purchaseColumns.filter(c => selected.has(c.key))
    const rows = [
      ['Malakesa Transfers and Tours - Purchases Export'],
      ['Filters:', filterDesc],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      cols.map(c => c.label),
      ...filtered.map(p => cols.map(c => p[c.key] ?? '')),
      [],
      ['TOTALS', '', '', '', totalExVat, totalVat, totalAmount, ''],
    ]
    downloadCSV(`Malakesa_Purchases_${(filterDesc).replace(/[^a-zA-Z0-9]/g,'_').slice(0,30)}.csv`, rows)
  }

  return (
    <>
      <Topbar title="Purchases">
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={() => setShowExport(true)}><i className="ti ti-download"></i> Export</button>
          <button className="btn" style={{ background: '#fff', borderColor: 'rgba(139,105,20,0.4)', color: '#8B6914', fontWeight: 500 }} onClick={() => setModal('manageCategories')}><i className="ti ti-category-plus"></i> Manage Categories</button>
          <button className="btn btn-primary" onClick={() => setModal('newPurchase')}><i className="ti ti-plus"></i> Add Purchase</button>
        </div>
      </Topbar>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Total spent" value={fmt(totalAmount)} color="#A32D2D" sub={`${filtered.length} purchases`} />
          <StatCard label="Subtotal (ex-VAT)" value={fmt(totalExVat)} />
          <StatCard label="Input VAT (claimable)" value={fmt(totalVat)} color="#2E7D2E" />
        </div>

        {/* Budget Tracker */}
        {(() => {
          const now3 = new Date()
          const thisMonthStr = localMonthStr(now3)
          const thisQStart = new Date(now3.getFullYear(), Math.floor(now3.getMonth() / 3) * 3, 1)
          const thisYearStr = String(now3.getFullYear())
          // Previous-period boundaries, for the "vs last period" comparison
          const lastMonthD = new Date(now3.getFullYear(), now3.getMonth() - 1, 1)
          const lastMonthStr = localMonthStr(lastMonthD)
          const lastQEnd = new Date(thisQStart.getTime() - 1)
          const lastQStart = new Date(lastQEnd.getFullYear(), Math.floor(lastQEnd.getMonth() / 3) * 3, 1)
          const lastYearStr = String(now3.getFullYear() - 1)
          const catsWithBudget = (customCategories || []).filter(c => c.budget && Number(c.budget) > 0)
          if (catsWithBudget.length === 0) return null
          const getSpend = (catName, period) => purchases.filter(p => {
            if ((p.category || 'Other') !== catName || !p.date) return false
            if (period === 'monthly') return p.date.startsWith(thisMonthStr)
            if (period === 'quarterly') return new Date(p.date + 'T00:00:00') >= thisQStart
            if (period === 'yearly') return p.date.startsWith(thisYearStr)
            return false
          }).reduce((s, p) => s + Number(p.amount || 0), 0)
          const getPrevSpend = (catName, period) => purchases.filter(p => {
            if ((p.category || 'Other') !== catName || !p.date) return false
            if (period === 'monthly') return p.date.startsWith(lastMonthStr)
            if (period === 'quarterly') { const d = new Date(p.date + 'T00:00:00'); return d >= lastQStart && d <= lastQEnd }
            if (period === 'yearly') return p.date.startsWith(lastYearStr)
            return false
          }).reduce((s, p) => s + Number(p.amount || 0), 0)
          const totalBudgetAll = catsWithBudget.reduce((s, c) => s + Number(c.budget), 0)
          const totalSpentAll = catsWithBudget.reduce((s, c) => s + getSpend(c.name, c.budget_period || 'monthly'), 0)
          const totalPct = totalBudgetAll > 0 ? Math.round((totalSpentAll / totalBudgetAll) * 100) : 0
          return (
            <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="ti ti-chart-bar" style={{ color: '#8B6914' }}></i> Budget Tracker
                  <span style={{ fontWeight: 400, color: '#888', fontSize: 12 }}>
                    — {fmt(totalSpentAll)} of {fmt(totalBudgetAll)} total ({totalPct}%)
                  </span>
                </div>
                <button className="btn btn-sm" style={{ fontSize: 11 }} onClick={() => setModal('manageCategories')}>Edit budgets</button>
              </div>
              <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {catsWithBudget.map(cat => {
                  const period = cat.budget_period || 'monthly'
                  const budget = Number(cat.budget)
                  const spent = getSpend(cat.name, period)
                  const prevSpent = getPrevSpend(cat.name, period)
                  const pct = Math.min(100, budget > 0 ? Math.round((spent / budget) * 100) : 0)
                  const remaining = budget - spent
                  const isOver = spent > budget
                  const isWarn = pct >= 80 && !isOver
                  const barColor = isOver ? '#A32D2D' : isWarn ? '#D85A30' : '#3B6D11'
                  const periodLabel = { monthly: 'This month', quarterly: 'This quarter', yearly: 'This year' }[period] || 'This month'
                  const prevPeriodLabel = { monthly: 'last month', quarterly: 'last quarter', yearly: 'last year' }[period] || 'last period'
                  const prevWasOver = prevSpent > budget
                  return (
                    <div key={cat.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#3D2214' }}>{cat.name}</span>
                        <span style={{ fontSize: 11, color: '#888' }}>{periodLabel}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                        <span style={{ color: barColor, fontWeight: 600 }}>{fmt(spent)} spent</span>
                        <span style={{ color: '#999' }}>of {fmt(budget)}</span>
                      </div>
                      <div style={{ height: 10, background: '#FBF3E4', borderRadius: 99, overflow: 'hidden', marginBottom: 6 }}>
                        <div style={{ height: '100%', width: pct + '%', background: isOver ? 'linear-gradient(90deg,#A32D2D,#D85A30)' : isWarn ? '#D85A30' : 'linear-gradient(90deg,#3B6D11,#5A9A1A)', borderRadius: 99, transition: 'width 0.4s ease' }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                        <span style={{ color: barColor, fontWeight: 500 }}>
                          {isOver ? `⚠️ Over by ${fmt(Math.abs(remaining))}` : isWarn ? `⚡ ${fmt(remaining)} left` : `✓ ${fmt(remaining)} remaining`}
                        </span>
                        <span style={{ color: '#aaa', fontWeight: 500 }}>{pct}%</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#aaa' }}>
                        {prevPeriodLabel}: {fmt(prevSpent)} {prevWasOver ? <span style={{ color: '#A32D2D' }}>(over budget)</span> : <span style={{ color: '#3B6D11' }}>(within budget)</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          )
        })()}

        {/* Filter bar */}
        <div style={{ background: '#fff', border: '0.5px solid rgba(139,105,20,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search supplier or description..." style={{ ...selectStyle, background: '#fff', color: '#1a1a1a', minWidth: 220 }} />
          <MonthYearPicker value={filterMonth} onChange={setFilterMonth} accentColor="#8B6914" allowClear clearLabel="All months" />
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={selectStyle}>
            <option value="">All categories</option>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {hasFilters && <button className="btn btn-sm" onClick={clearFilters} style={{ color: '#A32D2D', borderColor: '#A32D2D' }}><i className="ti ti-x"></i> Clear</button>}
          <div style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>
            {filtered.length} purchase{filtered.length !== 1 ? 's' : ''} &nbsp;|&nbsp; {fmt(totalAmount)} total &nbsp;|&nbsp; <span style={{ color: '#2E7D2E' }}>{fmt(totalVat)} VAT</span>
          </div>
        </div>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
              <i className="ti ti-shopping-cart-off" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
              <p>{hasFilters ? 'No purchases match your filters.' : 'No purchases recorded yet.'}</p>
              {!hasFilters && <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => setModal('newPurchase')}>Add first purchase</button>}
              {hasFilters && <button className="btn btn-sm" onClick={clearFilters} style={{ marginTop: 10 }}>Clear filters</button>}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#FBF3E4' }}>
                <Th>Date</Th><Th>Supplier</Th><Th>Description</Th><Th>Category</Th>
                <Th style={{ textAlign: 'right' }}>Ex-VAT</Th>
                <Th style={{ textAlign: 'right' }}>VAT</Th>
                <Th style={{ textAlign: 'right' }}>Total</Th>
                <Th>Payment</Th>
                <Th>Ref</Th><Th></Th>
              </tr></thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td>{fmtDate(p.date)}</Td>
                    <Td><strong>{p.supplier}</strong></Td>
                    <Td style={{ color: '#555' }}>{p.description || '—'}</Td>
                    <Td><span style={{ background: '#FBF3E4', padding: '2px 8px', borderRadius: 99, fontSize: 11, whiteSpace: 'nowrap' }}>{p.category || 'Other'}</span></Td>
                    <Td style={{ textAlign: 'right' }}>{fmt(p.amount_ex_vat || 0)}</Td>
                    <Td style={{ textAlign: 'right', color: Number(p.vat) > 0 ? '#2E7D2E' : '#999', fontWeight: Number(p.vat) > 0 ? 500 : 400 }}>
                      {Number(p.vat) > 0 ? fmt(p.vat) : <span style={{ fontStyle: 'italic', fontSize: 11 }}>Nil</span>}
                    </Td>
                    <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(p.amount)}</Td>
                    <Td>
                      <span style={{ background: '#f5f0e8', padding: '2px 8px', borderRadius: 99, fontSize: 11, whiteSpace: 'nowrap', color: '#3D2214' }}>{p.payment_method || 'Cheque'}</span>
                      {p.payment_method === 'Cheque' && p.cheque_number && <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>#{p.cheque_number}</div>}
                    </Td>
                    <Td style={{ color: '#999', fontSize: 12 }}>
                      {p.ref || '—'}
                      {p.receipt_url && <a href={p.receipt_url} target="_blank" rel="noopener noreferrer" title="View attached receipt" style={{ marginLeft: 6, color: '#8B6914' }}><i className="ti ti-paperclip"></i></a>}
                    </Td>
                    <Td>
                      <button className="btn btn-sm" style={{ borderColor: '#2563A8', color: '#2563A8', marginRight: 5 }} onClick={() => { setSelected(p); setModal('editPurchase') }} title="Edit"><i className="ti ti-edit"></i></button>
                      <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(p.id)} title="Delete"><i className="ti ti-trash"></i></button>
                    </Td>
                  </tr>
                ))}
                <tr style={{ background: '#FBF3E4', fontWeight: 700 }}>
                  <td colSpan={4} style={{ padding: '9px 14px', fontSize: 13 }}>TOTAL ({filtered.length} purchases)</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(totalExVat)}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#2E7D2E' }}>{fmt(totalVat)}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(totalAmount)}</td>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            </table>
          )}
        </Card>
      </div>
      {showExport && <ExportModal title="Purchases" columns={purchaseColumns} onExport={handlePurchaseExport} onClose={() => setShowExport(false)} />}
    </>
  )
}

function NewPurchaseModal({ suppliers, customCategories, purchases, purchase, onClose, onSave }) {
  const isEdit = !!purchase
  const allCategories = [...PURCHASE_CATEGORIES.slice(0, -1), ...(customCategories || []).map(c => c.name), 'Other']
  const [form, setForm] = useState(isEdit
    ? { date: purchase.date || todayStr(), supplier_id: purchase.supplier_id || '', supplier: purchase.supplier || '', description: purchase.description || '', category: purchase.category || 'Other', amount: purchase.amount ?? '', vat: purchase.vat ?? '', ref: purchase.ref || '', payment_method: purchase.payment_method || 'Cheque', cheque_number: purchase.cheque_number || '' }
    : { date: todayStr(), supplier_id: '', supplier: '', description: '', category: 'Other', amount: '', vat: '', ref: '', payment_method: 'Cheque', cheque_number: '' })
  const [vatMode, setVatMode] = useState(isEdit ? (Number(purchase.vat) > 0 ? 'manual' : 'none') : 'calc15')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [receiptUrl, setReceiptUrl] = useState(isEdit ? (purchase.receipt_url || '') : '')
  const [uploadingReceipt, setUploadingReceipt] = useState(false)
  const [receiptError, setReceiptError] = useState('')

  const handleReceiptUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadingReceipt(true)
    setReceiptError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload-receipt', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setReceiptError(data.error || 'Upload failed'); setUploadingReceipt(false); return }
      setReceiptUrl(data.url)
    } catch (err) {
      setReceiptError('Upload failed — please check your connection and try again')
    }
    setUploadingReceipt(false)
  }

  // Inline add-supplier state
  const [showAddSupplier, setShowAddSupplier] = useState(false)
  const [newSupplier, setNewSupplier] = useState({ name: '', category: 'Other', phone: '', email: '' })
  const [savingSupplier, setSavingSupplier] = useState(false)
  const [supplierList, setSupplierList] = useState(suppliers)

  const amount = parseFloat(form.amount) || 0
  const vat = vatMode === 'calc15' ? Math.round(amount * 15 / 115 * 100) / 100
             : vatMode === 'none' ? 0
             : parseFloat(form.vat) || 0
  const amountExVat = vatMode === 'calc15' ? Math.round((amount - vat) * 100) / 100
                    : vatMode === 'none' ? amount
                    : Math.round((amount - vat) * 100) / 100

  // Budget warning for the selected category
  const budgetInfo = (() => {
    const cat = (customCategories || []).find(c => c.name === form.category)
    if (!cat || !cat.budget || Number(cat.budget) <= 0) return null
    const period = cat.budget_period || 'monthly'
    const now = new Date()
    const thisMonthStr = localMonthStr(now)
    const thisQStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
    const thisYearStr = String(now.getFullYear())
    const alreadySpent = (purchases || []).filter(p => {
      if (isEdit && p.id === purchase.id) return false // exclude the purchase being edited from its own total
      if ((p.category || 'Other') !== form.category || !p.date) return false
      if (period === 'monthly') return p.date.startsWith(thisMonthStr)
      if (period === 'quarterly') return new Date(p.date + 'T00:00:00') >= thisQStart
      if (period === 'yearly') return p.date.startsWith(thisYearStr)
      return false
    }).reduce((s, p) => s + Number(p.amount || 0), 0)
    const budget = Number(cat.budget)
    const projected = alreadySpent + amount
    const pct = budget > 0 ? Math.round((projected / budget) * 100) : 0
    const periodLabel = { monthly: 'this month', quarterly: 'this quarter', yearly: 'this year' }[period] || 'this period'
    return { budget, alreadySpent, projected, pct, periodLabel, isOver: projected > budget, isWarn: pct >= 80 && projected <= budget }
  })()

  const handleSupplierSelect = (e) => {
    const sup = supplierList.find(s => s.id === e.target.value)
    setForm(f => ({ ...f, supplier_id: e.target.value, supplier: sup?.name || '', category: sup?.category || f.category }))
  }

  const handleQuickAddSupplier = async () => {
    if (!newSupplier.name.trim()) return
    setSavingSupplier(true)
    try {
      const res = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplier)
      })
      if (res.ok) {
        const saved = await res.json()
        const updated = [...supplierList, saved]
        setSupplierList(updated)
        setForm(f => ({ ...f, supplier_id: saved.id, supplier: saved.name, category: saved.category || f.category }))
        setShowAddSupplier(false)
        setNewSupplier({ name: '', category: 'Other', phone: '', email: '' })
      }
    } catch(e) {}
    setSavingSupplier(false)
  }

  const handleSave = async () => {
    setError('')
    if (!form.supplier.trim()) { setError('Please select or enter a supplier'); return }
    if (!form.amount || amount <= 0) { setError('Amount is required'); return }
    if (!form.date) { setError('Date is required'); return }
    setSaving(true)
    try {
      const url = isEdit ? `/api/purchases/${purchase.id}` : '/api/purchases'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount, vat, amount_ex_vat: amountExVat, receipt_url: receiptUrl || null })
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save'); setSaving(false); return }
      onSave()
    } catch(e) { setError('Network error — please try again'); setSaving(false) }
  }

  return (
    <Modal title={isEdit ? 'Edit Purchase' : 'Add Purchase'} onClose={onClose} wide>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <Field label="Date *"><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Category">
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        {/* Supplier field + quick-add button */}
        <div style={{ gridColumn: '1/-1' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <Field label="Supplier *" style={{ flex: 1 }}>
              {supplierList.length > 0 ? (
                <select value={form.supplier_id} onChange={handleSupplierSelect} style={inputStyle}>
                  <option value="">— Select supplier —</option>
                  {supplierList.map(s => <option key={s.id} value={s.id}>{s.name}{s.category ? ` (${s.category})` : ''}</option>)}
                  <option value="__manual__">✏️ Type manually...</option>
                </select>
              ) : (
                <input type="text" value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} style={inputStyle} placeholder="e.g. Shell Vanuatu" />
              )}
            </Field>
            <button
              className="btn btn-sm"
              onClick={() => setShowAddSupplier(v => !v)}
              style={{ background: showAddSupplier ? '#A32D2D' : '#8B6914', borderColor: showAddSupplier ? '#7a1f1f' : '#6B5010', color: '#fff', whiteSpace: 'nowrap', marginBottom: 1 }}
            >
              <i className={`ti ${showAddSupplier ? 'ti-x' : 'ti-plus'}`}></i> {showAddSupplier ? 'Cancel' : 'New Supplier'}
            </button>
          </div>

          {/* Inline quick-add supplier form */}
          {showAddSupplier && (
            <div style={{ marginTop: 10, background: '#f5f0e8', border: '1px solid rgba(139,105,20,0.25)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#3D2214', marginBottom: 10 }}>
                <i className="ti ti-truck"></i> Add New Supplier
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="Supplier name *">
                  <input type="text" value={newSupplier.name} onChange={e => setNewSupplier(s => ({ ...s, name: e.target.value }))} style={inputStyle} placeholder="e.g. Shell Vanuatu" autoFocus />
                </Field>
                <Field label="Category">
                  <select value={newSupplier.category} onChange={e => setNewSupplier(s => ({ ...s, category: e.target.value }))} style={inputStyle}>
                    {SUPPLIER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Phone (optional)">
                  <input type="tel" value={newSupplier.phone} onChange={e => setNewSupplier(s => ({ ...s, phone: e.target.value }))} style={inputStyle} placeholder="+678 ..." />
                </Field>
                <Field label="Email (optional)">
                  <input type="email" value={newSupplier.email} onChange={e => setNewSupplier(s => ({ ...s, email: e.target.value }))} style={inputStyle} placeholder="supplier@email.com" />
                </Field>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button className="btn btn-primary" onClick={handleQuickAddSupplier} disabled={savingSupplier || !newSupplier.name.trim()}>
                  <i className="ti ti-check"></i> {savingSupplier ? 'Saving...' : 'Save & Select Supplier'}
                </button>
              </div>
            </div>
          )}

          {form.supplier_id === '__manual__' && (
            <div style={{ marginTop: 8 }}>
              <input type="text" value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} style={inputStyle} placeholder="Enter supplier name..." autoFocus />
            </div>
          )}
        </div>

        <Field label="Receipt / Reference"><input type="text" value={form.ref} onChange={e => setForm(f => ({ ...f, ref: e.target.value }))} style={inputStyle} placeholder="Receipt #, invoice ref..." /></Field>
        <Field label="Attach Receipt (photo or PDF)" style={{ gridColumn: '1/-1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <label className="btn btn-sm" style={{ cursor: 'pointer' }}>
              <i className="ti ti-paperclip"></i> {uploadingReceipt ? 'Uploading...' : (receiptUrl ? 'Replace file' : 'Choose file')}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/heic,application/pdf" onChange={handleReceiptUpload} disabled={uploadingReceipt} style={{ display: 'none' }} />
            </label>
            {receiptUrl && (
              <>
                <a href={receiptUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#2563A8', display: 'flex', alignItems: 'center', gap: 4 }}><i className="ti ti-file-check"></i> View attached receipt</a>
                <button type="button" className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => setReceiptUrl('')}><i className="ti ti-x"></i> Remove</button>
              </>
            )}
          </div>
          {receiptError && <div style={{ color: '#A32D2D', fontSize: 12, marginTop: 4 }}>{receiptError}</div>}
        </Field>
        <Field label="Description" style={{ gridColumn: '1/-1' }}><input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={inputStyle} placeholder="What was purchased..." /></Field>
        <Field label="Total Amount (VT inc. VAT) *"><input type="number" value={form.amount} min="0" onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} style={inputStyle} placeholder="0" /></Field>
        <Field label="Payment Method">
          <select value={form.payment_method} onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))} style={inputStyle}>
            {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>
        {form.payment_method === 'Cheque' && (
          <Field label="Cheque Number">
            <input type="text" value={form.cheque_number} onChange={e => setForm(f => ({ ...f, cheque_number: e.target.value }))} style={inputStyle} placeholder="e.g. 001234" />
          </Field>
        )}
        <Field label="VAT Treatment">
          <select value={vatMode} onChange={e => setVatMode(e.target.value)} style={inputStyle}>
            <option value="calc15">Calculate VAT at 15% (from inc. price)</option>
            <option value="manual">Enter VAT amount manually</option>
            <option value="none">No VAT / exempt</option>
          </select>
        </Field>
        {vatMode === 'manual' && (
          <Field label="VAT Amount (VT)" style={{ gridColumn: '1/-1' }}>
            <input type="number" value={form.vat} min="0" onChange={e => setForm(f => ({ ...f, vat: e.target.value }))} style={inputStyle} placeholder="0" />
          </Field>
        )}
      </div>

      {/* Live totals preview */}
      {amount > 0 && (
        <div style={{ background: '#f5f0e8', borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
          <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 8, color: '#3D2214' }}>Summary</div>
          {[
            ['Amount (ex-VAT)', fmt(amountExVat)],
            [vatMode === 'none' ? 'VAT' : 'Input VAT (claimable)', vatMode === 'none' ? 'Nil' : fmt(vat)],
            ['Total paid', fmt(amount)],
          ].map(([l, v], i) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.09)' : 'none', fontSize: 13 }}>
              <span style={{ color: '#666' }}>{l}</span>
              <span style={{ fontWeight: i === 2 ? 600 : 400, color: l.includes('VAT') && vatMode !== 'none' ? '#2E7D2E' : '#1a1a1a' }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      {amount > 0 && budgetInfo && (budgetInfo.isOver || budgetInfo.isWarn) && (
        <div style={{ background: budgetInfo.isOver ? '#FCEBEB' : '#FDF0DC', border: `1px solid ${budgetInfo.isOver ? '#E8B4B4' : '#EBCB8E'}`, borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: budgetInfo.isOver ? '#791F1F' : '#7A4E0A', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <i className="ti ti-alert-triangle" style={{ fontSize: 15, marginTop: 1 }}></i>
          <span>
            {budgetInfo.isOver
              ? <>This purchase will put <strong>{form.category}</strong> <strong>{fmt(budgetInfo.projected - budgetInfo.budget)} over</strong> its {budgetInfo.periodLabel} budget of {fmt(budgetInfo.budget)}.</>
              : <><strong>{form.category}</strong> will reach <strong>{budgetInfo.pct}%</strong> of its {budgetInfo.periodLabel} budget ({fmt(budgetInfo.projected)} of {fmt(budgetInfo.budget)}) after this purchase.</>}
          </span>
        </div>
      )}


      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <div style={{ fontSize: 12, color: '#8B6914' }}>
          <i className="ti ti-info-circle"></i> Manage suppliers in the <strong>Suppliers</strong> menu
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving || uploadingReceipt}><i className="ti ti-check"></i> {saving ? (isEdit ? 'Updating...' : 'Saving...') : (isEdit ? 'Update Purchase' : 'Save Purchase')}</button>
        </div>
      </div>
    </Modal>
  )
}

function ManageCategoriesModal({ customCategories, onClose, onSave }) {
  const [list, setList] = useState(customCategories || [])
  const [newCat, setNewCat] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const builtIns = PURCHASE_CATEGORIES.slice(0, -1) // exclude 'Other'

  const handleAdd = async () => {
    setError('')
    const trimmed = newCat.trim()
    if (!trimmed) return
    if (builtIns.includes(trimmed) || list.some(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('That category already exists')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/purchase-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed })
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to add'); setSaving(false); return }
      const saved = await res.json()
      setList(l => [...l, saved])
      setNewCat('')
    } catch (e) { setError('Network error — please try again') }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this category? Existing purchases will keep their category label.')) return
    await fetch('/api/purchase-categories/' + id, { method: 'DELETE' })
    setList(l => l.filter(c => c.id !== id))
  }

  const [budgetSaveError, setBudgetSaveError] = useState('')
  const handleUpdateBudget = async (catNameOrId, budget, budget_period, isBuiltIn) => {
    setBudgetSaveError('')
    const budgetVal = budget === '' || budget === null ? null : Number(budget)
    try {
      let id = catNameOrId
      // Built-in categories have no row yet — create one on first budget entry
      if (isBuiltIn) {
        const existing = list.find(c => c.name === catNameOrId)
        if (existing) {
          id = existing.id
        } else {
          const createRes = await fetch('/api/purchase-categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: catNameOrId })
          })
          if (!createRes.ok) { const d = await createRes.json().catch(() => ({})); setBudgetSaveError(d.error || 'Could not save budget — please try again'); return }
          const created = await createRes.json()
          id = created.id
          setList(l => [...l, created])
        }
      }
      const res = await fetch('/api/purchase-categories/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budget: budgetVal, budget_period: budget_period || 'monthly' })
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setBudgetSaveError(d.error || 'Could not save budget — please try again')
        return
      }
      setList(l => l.map(c => c.id === id ? { ...c, budget: budgetVal, budget_period: budget_period || 'monthly' } : c))
    } catch (e) {
      setBudgetSaveError('Network error — please check your connection and try again')
    }
  }

  return (
    <Modal title="Manage Purchase Categories" onClose={() => { onSave(); onClose() }}>
      {error && <Alert type="danger">{error}</Alert>}
      {budgetSaveError && <Alert type="danger">{budgetSaveError}</Alert>}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#666', fontWeight: 500, marginBottom: 8 }}>Built-in categories</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...builtIns, 'Other'].map(name => {
            const row = list.find(c => c.name === name)
            return (
              <div key={name} style={{ background: '#FBF3E4', padding: '10px 12px', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#3D2214', fontWeight: 600 }}>{name}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <label style={{ fontSize: 11, color: '#666', whiteSpace: 'nowrap' }}>Budget (VT):</label>
                  <input type="number" placeholder="No budget" defaultValue={row?.budget || ''} onBlur={e => handleUpdateBudget(name, e.target.value, row?.budget_period || 'monthly', true)} style={{ ...inputStyle, width: 120, fontSize: 12 }} />
                  <select defaultValue={row?.budget_period || 'monthly'} onChange={e => handleUpdateBudget(name, row?.budget, e.target.value, true)} style={{ ...inputStyle, fontSize: 12, padding: '4px 8px' }}>
                    <option value="monthly">per month</option>
                    <option value="quarterly">per quarter</option>
                    <option value="yearly">per year</option>
                  </select>
                  {row?.budget && <span style={{ fontSize: 11, color: '#8B6914', fontWeight: 500 }}>Budget: {fmt(row.budget)}/{(row.budget_period||'monthly').slice(0,2)}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#666', fontWeight: 500, marginBottom: 8 }}>Your custom categories</div>
        {list.filter(c => ![...builtIns, 'Other'].includes(c.name)).length === 0 ? (
          <div style={{ fontSize: 13, color: '#999', fontStyle: 'italic' }}>No custom categories yet — add one below.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {list.filter(c => ![...builtIns, 'Other'].includes(c.name)).map(c => (
              <div key={c.id} style={{ background: '#f5f0e8', padding: '10px 12px', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#3D2214', fontWeight: 600 }}>{c.name}</span>
                  <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D', padding: '2px 8px' }} onClick={() => handleDelete(c.id)}><i className="ti ti-trash"></i></button>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <label style={{ fontSize: 11, color: '#666', whiteSpace: 'nowrap' }}>Budget (VT):</label>
                  <input type="number" placeholder="No budget" defaultValue={c.budget || ''} onBlur={e => handleUpdateBudget(c.id, e.target.value, c.budget_period || 'monthly', false)} style={{ ...inputStyle, width: 120, fontSize: 12 }} />
                  <select defaultValue={c.budget_period || 'monthly'} onChange={e => handleUpdateBudget(c.id, c.budget, e.target.value, false)} style={{ ...inputStyle, fontSize: 12, padding: '4px 8px' }}>
                    <option value="monthly">per month</option>
                    <option value="quarterly">per quarter</option>
                    <option value="yearly">per year</option>
                  </select>
                  {c.budget && <span style={{ fontSize: 11, color: '#8B6914', fontWeight: 500 }}>Budget: {fmt(c.budget)}/{(c.budget_period||'monthly').slice(0,2)}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Field label="Add new category">
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd() } }}
            style={{ ...inputStyle, flex: 1 }}
            placeholder="e.g. Tour Guide Fees"
          />
          <button className="btn btn-primary" onClick={handleAdd} disabled={saving || !newCat.trim()}><i className="ti ti-plus"></i> {saving ? 'Adding...' : 'Add'}</button>
        </div>
      </Field>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <button className="btn btn-primary" onClick={() => { onSave(); onClose() }}>Done</button>
      </div>
    </Modal>
  )
}

// ── Suppliers ─────────────────────────────────────────────
const SUPPLIER_CATEGORIES = ['Fuel Supplier', 'Vehicle Maintenance', 'Insurance', 'Office & Stationery', 'Utilities', 'Bank & Finance', 'Food & Beverages', 'Equipment & Tools', 'Professional Services', 'Marketing & Advertising', 'Accommodation', 'Other']

function Suppliers({ suppliers, purchases, reload, setModal }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const handleDelete = async (id) => {
    if (!confirm('Delete this supplier? Their purchases will remain.')) return
    await fetch('/api/suppliers/' + id, { method: 'DELETE' }); reload()
  }

  const startEdit = (s) => {
    setEditingId(s.id)
    setEditForm({ name: s.name, phone: s.phone || '', email: s.email || '', address: s.address || '', category: s.category || 'Other' })
  }

  const cancelEdit = () => { setEditingId(null); setEditForm({}) }

  const saveEdit = async (id) => {
    if (!editForm.name.trim()) return
    setSaving(true)
    await fetch('/api/suppliers/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    })
    setSaving(false); setEditingId(null); reload()
  }

  const inputStyle2 = { padding: '5px 8px', borderRadius: 6, border: '0.5px solid rgba(0,0,0,0.2)', fontSize: 13, fontFamily: 'inherit', width: '100%', background: '#fffef8' }

  // Purchase count and spend per supplier
  const supStats = {}
  suppliers.forEach(s => { supStats[s.id] = { count: 0, total: 0 } })
  purchases.forEach(p => { if (p.supplier_id && supStats[p.supplier_id]) { supStats[p.supplier_id].count++; supStats[p.supplier_id].total += Number(p.amount || 0) } })

  return (
    <>
      <Topbar title="Suppliers">
        <button className="btn btn-primary" onClick={() => setModal('newSupplier')}><i className="ti ti-plus"></i> Add Supplier</button>
      </Topbar>
      <div style={{ padding: 20 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {suppliers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
              <i className="ti ti-truck" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
              <p style={{ marginBottom: 14 }}>No suppliers yet</p>
              <button className="btn btn-primary" onClick={() => setModal('newSupplier')}>Add first supplier</button>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#FBF3E4' }}>
                  <Th>Name</Th><Th>Category</Th><Th>Phone</Th><Th>Email</Th><Th>Address</Th>
                  <Th style={{ textAlign: 'center' }}>Purchases</Th>
                  <Th style={{ textAlign: 'right' }}>Total Spent</Th>
                  <Th style={{ textAlign: 'center' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(s => (
                  editingId === s.id ? (
                    <tr key={s.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: '#fffef8' }}>
                      <td style={{ padding: '8px 10px' }}>
                        <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} style={{ ...inputStyle2, fontWeight: 600 }} placeholder="Supplier name *" />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <select value={editForm.category} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))} style={inputStyle2}>
                          {SUPPLIER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="tel" value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle2} placeholder="+678 ..." />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} style={inputStyle2} placeholder="supplier@email.com" />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="text" value={editForm.address} onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))} style={inputStyle2} placeholder="Address" />
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>{supStats[s.id]?.count || 0}</td>
                      <td style={{ padding: '8px 10px', textAlign: 'right' }}>{fmt(supStats[s.id]?.total || 0)}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                          <button className="btn btn-sm btn-primary" onClick={() => saveEdit(s.id)} disabled={saving}><i className="ti ti-check"></i> {saving ? '...' : 'Save'}</button>
                          <button className="btn btn-sm" onClick={cancelEdit}><i className="ti ti-x"></i></button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={s.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <td style={{ padding: '11px 14px' }}><strong>{s.name}</strong></td>
                      <td style={{ padding: '11px 14px' }}><span style={{ background: '#FBF3E4', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{s.category || 'Other'}</span></td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{s.phone || '—'}</td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{s.email || '—'}</td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{s.address || '—'}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'center' }}>{supStats[s.id]?.count || 0}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 500 }}>{fmt(supStats[s.id]?.total || 0)}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                          <button className="btn btn-sm" onClick={() => startEdit(s)}><i className="ti ti-pencil"></i> Edit</button>
                          <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(s.id)}><i className="ti ti-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}

function NewSupplierModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', category: 'Other' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Supplier name is required'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to save'); setSaving(false); return }
      onSave()
    } catch(e) { setError('Network error — please try again'); setSaving(false) }
  }

  return (
    <Modal title="Add Supplier" onClose={onClose}>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Supplier name *">
          <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="e.g. Shell Vanuatu" />
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
            {SUPPLIER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Phone">
          <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} placeholder="+678 ..." />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} placeholder="supplier@email.com" />
        </Field>
        <Field label="Address">
          <input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} style={inputStyle} placeholder="Port Vila, Vanuatu" />
        </Field>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Save Supplier'}</button>
      </div>
    </Modal>
  )
}

// ── VNPF ──────────────────────────────────────────────────
const VNPF_EMPLOYEE_RATE = 0.06
const VNPF_EMPLOYER_RATE = 0.06

function VNPF({ employees, salaryRecords, reload, setModal, setSelected }) {
  const [vnpfTab, setVnpfTab] = useState('contributions')
  const nowD = new Date()
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1)
    return { value: localMonthStr(d), label: MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear() }
  })
  const [vnpfMonth, setVnpfMonth] = useState(localMonthStr(nowD))
  const [emailStatus, setEmailStatus] = useState('')

  const activeEmployees = employees.filter(e => e.active !== false)

  const calc = (salary) => {
    const s = Number(salary || 0)
    const employee = Math.round(s * VNPF_EMPLOYEE_RATE)
    const employer = Math.round(s * VNPF_EMPLOYER_RATE)
    return { employee, employer, total: employee + employer }
  }

  const rows = activeEmployees.map(e => ({ ...e, ...calc(e.salary) }))
  const totalSalary = rows.reduce((s, r) => s + Number(r.salary || 0), 0)
  const totalEmployee = rows.reduce((s, r) => s + r.employee, 0)
  const totalEmployer = rows.reduce((s, r) => s + r.employer, 0)
  const totalContribution = totalEmployee + totalEmployer

  const monthLabel = monthOptions.find(m => m.value === vnpfMonth)?.label || vnpfMonth

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return
    await fetch('/api/employees/' + id, { method: 'DELETE' }); reload()
  }

  const buildScheduleHtml = () => `<!DOCTYPE html><html><head><title>VNPF Contribution Schedule — ${monthLabel}</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:Arial,sans-serif;margin:0;color:#222;font-size:13px;background:#FBF3E4}
      .page{max-width:850px;margin:20px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.15)}
      .header{background:linear-gradient(135deg,#6B4423 0%,#8B5E34 50%,#A67C42 100%);padding:24px 40px;display:flex;justify-content:space-between;align-items:flex-start}
      .logo-contact{font-size:10px;color:rgba(255,255,255,0.7);margin-top:8px;line-height:1.8}
      .report-title{text-align:right;color:#fff}
      .report-name{font-size:20px;font-weight:700;color:#F5D98A}
      .report-sub{font-size:11px;color:rgba(255,255,255,0.75);margin-top:4px;line-height:1.7}
      .body{padding:28px 40px}
      .info-box{background:#FAEEDA;border:1px solid #FAC775;border-radius:6px;padding:10px 16px;margin-bottom:20px;font-size:12px;color:#633806}
      .stats{display:flex;gap:16px;margin-bottom:24px;flex-wrap:wrap}
      .stat{background:#f5f5f5;border-radius:8px;padding:12px 18px;min-width:140px}
      .stat-label{font-size:11px;color:#666;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.4px}
      .stat-value{font-size:18px;font-weight:bold}
      table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:12px}
      th{background:#FBF3E4;padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#3D2214;text-transform:uppercase;letter-spacing:0.5px}
      td{padding:9px 10px;border-bottom:1px solid #FBF3E4}
      tr:nth-child(even) td{background:#faf6ee}
      .right{text-align:right}
      .green{color:#2E7D2E;font-weight:500}
      .summary-row{background:#FBF3E4!important;font-weight:700}
      .footer{background:linear-gradient(135deg,#6B4423,#A67C42);padding:14px 40px;display:flex;justify-content:space-between;align-items:center}
      .footer-l{color:rgba(255,255,255,0.8);font-size:10px;line-height:1.9}
      .footer-r{text-align:right;color:#F5D98A;font-size:10px;line-height:1.9}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      thead{display:table-header-group}
      .rpt-hdr{display:none}
      @page{margin:18mm 14mm 22mm 14mm;size:A4}
      @page{counter-increment:page;}
      body{counter-reset:page}
      .pgnum,.pgnum2{font-size:10px;color:#888}
      .pgnum::after,.pgnum2::after{content:counter(page)}
      @media print{
        .noprint{display:none}
        body{background:#fff}
        .page{box-shadow:none;margin:0;border-radius:0}
        .header{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .footer{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .summary-row{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding-bottom:6px}
        .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999;padding:6px 40px}
        .page{padding-top:42px}
        .rpt-footer{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #FBF3E4;padding:4px 40px;display:flex;justify-content:space-between;font-size:10px;color:#888;z-index:999}
        .page-body{padding-bottom:28px}
      }
    </style></head><body>
    <div class="rpt-hdr">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfers &amp; Tours</span>
        <span style="font-size:11px;color:#8B6914;font-weight:600">VNPF Contribution Schedule — ${monthLabel}</span>
      </div>
      <span style="font-size:10px;color:#888">TIN: 445579 &nbsp;|&nbsp; Page <span class="pgnum"></span></span>
    </div>
    <div class="rpt-footer">
      <span>VNPF Schedule — ${monthLabel} &nbsp;|&nbsp; Malakesa Transfers &amp; Tours &nbsp;|&nbsp; TIN: 445579</span>
      <span>Page <span class="pgnum2"></span> &nbsp;|&nbsp; Computer generated — verify before filing</span>
    </div>
    <div class="noprint"><span>VNPF Contribution Schedule — ${monthLabel}</span><button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button></div>
    <div class="page">
      <div class="header">
        <div>
          <img src="${MALAKESA_LOGO}" alt="Malakesa Transfers and Tours" style="width:200px;border-radius:6px;display:block" />
          <div class="logo-contact">
            📍 Port Vila, Shefa Province, Vanuatu<br>
            📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
          </div>
        </div>
        <div class="report-title">
          <div class="report-name">VNPF CONTRIBUTION SCHEDULE</div>
          <div class="report-sub">
            Period: <strong>${monthLabel}</strong><br>
            TIN: <strong>445579</strong><br>
            Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>
      <div class="body">
        <div class="info-box">
          ⚠️ <strong>Employer:</strong> Malakesa Transfers and Tours &nbsp;|&nbsp; TIN 445579 &nbsp;|&nbsp; Employee rate: 6% &nbsp;|&nbsp; Employer rate: 6% &nbsp;|&nbsp; Period: ${monthLabel}
        </div>
        <div class="stats">
          <div class="stat"><div class="stat-label">Total Gross Salaries</div><div class="stat-value">VT ${Number(totalSalary).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Employee Contributions (6%)</div><div class="stat-value">VT ${Number(totalEmployee).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Employer Contributions (6%)</div><div class="stat-value">VT ${Number(totalEmployer).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Total Payable to VNPF</div><div class="stat-value" style="color:#2E7D2E">VT ${Number(totalContribution).toLocaleString()}</div></div>
        </div>
        <table>
          <thead><tr>
            <th>Employee Name</th><th>Job Title</th><th>VNPF Number</th>
            <th class="right">Gross Salary</th>
            <th class="right">Employee 6%</th>
            <th class="right">Employer 6%</th>
            <th class="right">Total Contribution</th>
          </tr></thead>
          <tbody>
            ${rows.map(r => '<tr><td><strong>' + r.name + '</strong></td><td>' + (r.job_title || '—') + '</td><td>' + (r.vnpf_number || '—') + '</td><td class="right">VT ' + Number(r.salary || 0).toLocaleString() + '</td><td class="right">VT ' + Number(r.employee).toLocaleString() + '</td><td class="right">VT ' + Number(r.employer).toLocaleString() + '</td><td class="right green">VT ' + Number(r.total).toLocaleString() + '</td></tr>').join('')}
            <tr class="summary-row"><td colspan="2">TOTAL (${rows.length} employees)</td><td class="right">VT ${Number(totalSalary).toLocaleString()}</td><td class="right">VT ${Number(totalEmployee).toLocaleString()}</td><td class="right">VT ${Number(totalEmployer).toLocaleString()}</td><td class="right">VT ${Number(totalContribution).toLocaleString()}</td></tr>
          </tbody>
        </table>
        <p style="margin-top:16px;font-size:11px;color:#888">* Please verify all figures before submitting to the Vanuatu National Provident Fund. This schedule is computer generated.</p>
      </div>
      <div class="footer">
        <div class="footer-l">
          <div><strong style="color:#F5D98A">Malakesa Transfers &amp; Tours</strong></div>
          <div>TIN: 445579 &nbsp;|&nbsp; Port Vila, Vanuatu</div>
          <div>Period: ${monthLabel}</div>
        </div>
        <div class="footer-r">
          <div>Employees: ${rows.length}</div>
          <div>Total Payable: VT ${Number(totalContribution).toLocaleString()}</div>
          <div style="font-size:10px;opacity:0.7">Computer generated — verify before filing</div>
        </div>
      </div>
    </div>
    <script>
    window.onload=()=>{
      // Show page number in fixed headers using CSS counter
      document.querySelectorAll('.pgnum,.pgnum2').forEach(el=>{
        el.style.cssText='display:inline'
      })
      window.print()
    }
    <\/script></body></html>`

  const printSchedule = () => {
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups to print the schedule.'); return }
    w.document.write(buildScheduleHtml())
    w.document.close()
  }

  const emailSchedule = async () => {
    setEmailStatus('sending')
    try {
      const res = await fetch('/api/send-vnpf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: vnpfMonth,
          monthLabel,
          rows: rows.map(r => ({ name: r.name, vnpf_number: r.vnpf_number, salary: r.salary, employee: r.employee, employer: r.employer, total: r.total })),
          totals: { totalSalary, totalEmployee, totalEmployer, totalContribution }
        })
      })
      const data = await res.json()
      if (res.ok) {
        setEmailStatus('Sent to ' + (data.sentTo || []).join(', '))
        setTimeout(() => setEmailStatus(''), 5000)
        return
      }
      setEmailStatus('error: ' + (data.error || 'Failed to send'))
      setTimeout(() => setEmailStatus(''), 6000)
    } catch (e) {
      setEmailStatus('error: ' + e.message)
      setTimeout(() => setEmailStatus(''), 6000)
    }
  }

  const tabStyle = (active) => ({ padding: '7px 18px', border: 'none', borderBottom: active ? '3px solid #8B6914' : '3px solid transparent', background: 'none', fontWeight: active ? 600 : 400, color: active ? '#8B6914' : '#666', cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap' })

  return (
    <>
      <Topbar title="Salaries & VNPF">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {vnpfTab === 'contributions' && <>
            <MonthYearPicker value={vnpfMonth} onChange={setVnpfMonth} accentColor="#8B6914" />
            <button className="btn btn-sm" style={{ background: '#2E7D2E', borderColor: '#1A4D1A', color: '#fff', fontWeight: 500 }} onClick={printSchedule}><i className="ti ti-printer"></i> Print Schedule</button>
            <button className="btn btn-sm" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 500 }} onClick={emailSchedule} disabled={emailStatus === 'sending' || rows.length === 0}>
              <i className="ti ti-mail"></i> {emailStatus === 'sending' ? 'Sending...' : 'Email VNPF Schedule'}
            </button>
          </>}
          <button className="btn btn-primary" onClick={() => setModal('newEmployee')}><i className="ti ti-plus"></i> Add Employee</button>
        </div>
      </Topbar>
      <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.1)', display: 'flex', paddingLeft: 20, background: '#fff' }}>
        <button style={tabStyle(vnpfTab === 'contributions')} onClick={() => setVnpfTab('contributions')}><i className="ti ti-building-bank" style={{ marginRight: 5 }}></i>VNPF Contributions</button>
        <button style={tabStyle(vnpfTab === 'salaries')} onClick={() => setVnpfTab('salaries')}><i className="ti ti-cash" style={{ marginRight: 5 }}></i>Salaries & Payslips</button>
      </div>
      {vnpfTab === 'contributions' && <VNPFContributions
        rows={rows} totalSalary={totalSalary} totalEmployee={totalEmployee} totalEmployer={totalEmployer}
        totalContribution={totalContribution} monthLabel={monthLabel} vnpfMonth={vnpfMonth}
        salaryRecords={salaryRecords}
        emailStatus={emailStatus} setModal={setModal} setSelected={setSelected}
        handleDelete={handleDelete} fmt={fmt}
      />}
      {vnpfTab === 'salaries' && <SalariesTab employees={employees} salaryRecords={salaryRecords} reload={reload} fmt={fmt} />}
    </>
  )
}

function VNPFContributions({ rows, totalSalary, totalEmployee, totalEmployer, totalContribution, monthLabel, vnpfMonth, salaryRecords, emailStatus, setModal, setSelected, handleDelete, fmt }) {
  // Salary records for this month - accumulate processed pay runs
  const monthRecords = (salaryRecords || []).filter(r => {
    if (!r.month || !vnpfMonth) return false
    // Normalize both to YYYY-MM format for comparison
    const rMonth = String(r.month).slice(0, 7)
    const vMonth = String(vnpfMonth).slice(0, 7)
    return rMonth === vMonth
  })
  const hasProcessed = monthRecords.length > 0

  // Build per-employee processed totals for the month
  const processedByEmp = {}
  monthRecords.forEach(r => {
    if (!processedByEmp[r.employee_id]) processedByEmp[r.employee_id] = { gross: 0, vnpf: 0, runs: 0 }
    processedByEmp[r.employee_id].gross += Number(r.gross || 0)
    processedByEmp[r.employee_id].vnpf += Number(r.vnpf_employee || 0)
    processedByEmp[r.employee_id].runs += 1
  })

  // Use processed data if available, else fall back to employee base salary
  const scheduleRows = rows.map(r => {
    const proc = processedByEmp[r.id]
    if (proc) {
      const empVnpf = proc.vnpf
      const emplVnpf = Math.round(proc.gross * 0.06)
      return { ...r, gross: proc.gross, employee: empVnpf, employer: emplVnpf, total: empVnpf + emplVnpf, runs: proc.runs, processed: true }
    }
    return { ...r, runs: 0, processed: false }
  })
  const schedTotalSalary = scheduleRows.reduce((s, r) => s + Number(r.gross || 0), 0)
  const schedTotalEmp = scheduleRows.reduce((s, r) => s + r.employee, 0)
  const schedTotalEr = scheduleRows.reduce((s, r) => s + r.employer, 0)
  const schedTotal = schedTotalEmp + schedTotalEr

  return (
    <div style={{ padding: 20 }}>
      {emailStatus && emailStatus !== 'sending' && (
        <div style={{ background: emailStatus.startsWith('error') ? '#FCEBEB' : '#EAF3DE', color: emailStatus.startsWith('error') ? '#791F1F' : '#27500A', border: '0.5px solid ' + (emailStatus.startsWith('error') ? '#F7C1C1' : '#C0DD97'), padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className={`ti ${emailStatus.startsWith('error') ? 'ti-alert-circle' : 'ti-check'}`}></i>
          {emailStatus.startsWith('error') ? emailStatus.replace('error: ', 'Failed: ') : emailStatus}
        </div>
      )}
      {(salaryRecords || []).length > 0 && (() => {
        const allMonths = [...new Set((salaryRecords||[]).map(r => r.month))].sort().reverse()
        const monthsNotCurrent = allMonths.filter(m => m !== vnpfMonth)
        return monthsNotCurrent.length > 0 ? (
          <div style={{ background: '#FFF8E1', border: '0.5px solid #F5D98A', borderRadius: 8, padding: '8px 14px', marginBottom: 12, fontSize: 12, color: '#8B6914', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="ti ti-info-circle"></i>
            <span>Pay runs also exist for: {monthsNotCurrent.join(', ')}. Use the month picker above to view those schedules.</span>
          </div>
        ) : null
      })()}
      <div style={{ background: '#EAF3DE', border: '0.5px solid #C0DD97', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#27500A', display: 'flex', alignItems: 'center', gap: 10 }}>
        <i className="ti ti-building-bank" style={{ fontSize: 18 }}></i>
        <span><strong>VNPF Period: {monthLabel}</strong> &nbsp;|&nbsp; Employee rate: 6% &nbsp;|&nbsp; Employer rate: 6% &nbsp;|&nbsp; Total payable: <strong>{fmt(hasProcessed ? schedTotal : totalContribution)}</strong> &nbsp;|&nbsp; {hasProcessed ? <span style={{color:'#27500A',fontWeight:600}}>{monthRecords.length} pay run(s) processed</span> : <span style={{color:'#8B6914'}}>No pay runs processed yet</span>}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
        <StatCard label="Total gross salaries" value={fmt(hasProcessed ? schedTotalSalary : totalSalary)} sub={hasProcessed ? `${monthRecords.length} pay run(s)` : `${rows.length} employees (estimate)`} />
        <StatCard label="Employee contributions (6%)" value={fmt(hasProcessed ? schedTotalEmp : totalEmployee)} color="#8B6914" sub={hasProcessed ? 'From processed payroll' : 'Estimate'} />
        <StatCard label="Employer contributions (6%)" value={fmt(hasProcessed ? schedTotalEr : totalEmployer)} color="#8B6914" sub={hasProcessed ? 'From processed payroll' : 'Estimate'} />
        <StatCard label="Total payable to VNPF" value={fmt(hasProcessed ? schedTotal : totalContribution)} color="#2E7D2E" sub={hasProcessed ? 'Confirmed' : 'Estimate'} />
      </div>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontWeight: 500, fontSize: 13 }}>Contribution Schedule — {monthLabel}</div>
        {rows.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
            <i className="ti ti-users-plus" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
            <p style={{ marginBottom: 14 }}>No employees added yet</p>
            <button className="btn btn-primary" onClick={() => setModal('newEmployee')}>Add first employee</button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr style={{ background: '#FBF3E4' }}>
              <Th>Name</Th><Th>Job Title</Th><Th>VNPF Number</Th>
              <Th style={{ textAlign: 'center' }}>Pay Runs</Th>
              <Th style={{ textAlign: 'right' }}>Gross Salary</Th>
              <Th style={{ textAlign: 'right' }}>Employee 6%</Th>
              <Th style={{ textAlign: 'right' }}>Employer 6%</Th>
              <Th style={{ textAlign: 'right' }}>Total</Th>
              <Th style={{ textAlign: 'center' }}>Actions</Th>
            </tr></thead>
            <tbody>
              {scheduleRows.map(r => (
                <tr key={r.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: r.processed ? '#f6fbf0' : '#fff' }}>
                  <Td><strong>{r.name}</strong></Td>
                  <Td style={{ color: '#666' }}>{r.job_title || '—'}</Td>
                  <Td style={{ color: '#666' }}>{r.vnpf_number || '—'}</Td>
                  <Td style={{ textAlign: 'center' }}>
                    {r.processed ? <span style={{ background: '#EAF3DE', color: '#27500A', borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>{r.runs} run{r.runs !== 1 ? 's' : ''}</span> : <span style={{ color: '#ccc', fontSize: 12 }}>none</span>}
                  </Td>
                  <Td style={{ textAlign: 'right' }}>{fmt(r.gross || r.salary)}</Td>
                  <Td style={{ textAlign: 'right' }}>{fmt(r.employee)}</Td>
                  <Td style={{ textAlign: 'right' }}>{fmt(r.employer)}</Td>
                  <Td style={{ textAlign: 'right', fontWeight: 500, color: '#2E7D2E' }}>{fmt(r.total)}</Td>
                  <Td>
                    <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                      <button className="btn btn-sm" onClick={() => { setSelected(r); setModal('editEmployee') }}><i className="ti ti-pencil"></i></button>
                      <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(r.id)}><i className="ti ti-trash"></i></button>
                    </div>
                  </Td>
                </tr>
              ))}
              <tr style={{ background: '#FBF3E4', fontWeight: 700 }}>
                <td colSpan={4} style={{ padding: '9px 14px', fontSize: 13 }}>TOTAL {hasProcessed ? '(from processed payroll)' : '(estimated)'}</td>
                <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(hasProcessed ? schedTotalSalary : totalSalary)}</td>
                <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(hasProcessed ? schedTotalEmp : totalEmployee)}</td>
                <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(hasProcessed ? schedTotalEr : totalEmployer)}</td>
                <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#2E7D2E' }}>{fmt(hasProcessed ? schedTotal : totalContribution)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

function SalariesTab({ employees, salaryRecords, reload, fmt }) {
  const nowD = new Date()
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1)
    return { value: localMonthStr(d), label: MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear() }
  })
  const [salaryMonth, setSalaryMonth] = useState(localMonthStr(nowD))
  const monthLabel = monthOptions.find(m => m.value === salaryMonth)?.label || salaryMonth
  const activeEmployees = employees.filter(e => e.active !== false)
  const [payRunModal, setPayRunModal] = useState(null) // emp object when open

  const deletePayRun = async (id) => {
    if (!confirm('Delete this pay run? This will also remove it from the VNPF schedule.')) return
    const res = await fetch('/api/salary-records', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) reload()
    else alert('Failed to delete pay run')
  }


  // Records for selected month
  const monthRecords = (salaryRecords || []).filter(r => r.month === salaryMonth)

  // Per-employee summary for this month
  const printPayslip = (emp, rec) => {
    // rec = specific pay run record (or null for summary of all this month)
    const monthRecs = (salaryRecords || []).filter(r => r.month === salaryMonth && r.employee_id === emp.id)
    const recs = rec ? [rec] : monthRecs
    const totalGross = recs.reduce((s, r) => s + Number(r.gross || 0), 0)
    const totalAllowances = recs.reduce((s, r) => s + (r.allowances || []).reduce((a, x) => a + Number(x.amount || 0), 0), 0)
    const totalVnpf = recs.reduce((s, r) => s + Number(r.vnpf_employee || 0), 0)
    const totalOtherDed = recs.reduce((s, r) => s + (r.deductions || []).reduce((a, d) => a + Number(d.amount || 0), 0), 0)
    const totalNet = recs.reduce((s, r) => s + Number(r.net_pay || 0), 0)
    const MONTHS_LONG2 = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const useMonth = rec ? rec.month : salaryMonth
    const mParts = useMonth.split('-')
    const mLabel = (MONTHS_LONG2[parseInt(mParts[1])-1] || '') + ' ' + mParts[0]
    const issued = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups to print payslips.'); return }

    const earningRows = [
      `<div class='row'><span class='lbl'>Basic / Gross Salary</span><span class='amt grn'>VT ${Number(totalGross).toLocaleString()}</span></div>`,
      ...recs.flatMap(r => (r.allowances||[]).filter(a=>a.label||a.amount).map(a => `<div class='row'><span class='lbl'>${a.label||'Allowance'}</span><span class='amt grn'>VT ${Number(a.amount||0).toLocaleString()}</span></div>`))
    ].join('')

    const deductionRows = [
      `<div class='row'><span class='lbl'>VNPF Employee Contribution (6%)</span><span class='amt red'>VT ${Number(totalVnpf).toLocaleString()}</span></div>`,
      ...recs.flatMap(r => (r.deductions||[]).filter(d=>d.label||d.amount).map(d => `<div class='row'><span class='lbl'>${d.label||'Deduction'}</span><span class='amt red'>VT ${Number(d.amount||0).toLocaleString()}</span></div>`))
    ].join('')

    const payRunsInfo = recs.length > 1
      ? `<div style='font-size:11px;color:rgba(255,255,255,0.6);margin-top:4px'>${recs.length} pay runs accumulated</div>`
      : rec?.pay_date ? `<div style='font-size:11px;color:rgba(255,255,255,0.6);margin-top:4px'>Pay date: ${rec.pay_date}</div>` : ''

    const notesHtml = recs.filter(r=>r.notes).map(r=>`<div class='notes'><strong>Notes:</strong> ${r.notes}</div>`).join('')

    w.document.write(`<!DOCTYPE html><html><head><title>Payslip - ${emp.name} - ${mLabel}</title><style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:#FBF3E4;color:#222;font-size:13px}
.page{max-width:680px;margin:20px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.15)}
.hdr{background:linear-gradient(135deg,#6B4423 0%,#8B5E34 50%,#A67C42 100%);padding:24px 36px;display:flex;justify-content:space-between;align-items:flex-start}
.hdr-r{text-align:right;color:#fff}
.ps-title{font-size:10px;letter-spacing:3px;color:rgba(255,255,255,.6);text-transform:uppercase;margin-top:10px}
.ps-period{font-size:18px;font-weight:700;color:#F5D98A;margin-top:3px}
.ps-date{font-size:11px;color:rgba(255,255,255,.7);margin-top:4px}
.emp-bar{background:#3D2214;padding:12px 36px;display:flex;justify-content:space-between;align-items:center}
.emp-name{color:#F5D98A;font-weight:700;font-size:16px}
.emp-det{color:rgba(255,255,255,.75);font-size:11px;margin-top:3px}
.emp-r{text-align:right;color:rgba(255,255,255,.75);font-size:11px}
.body{padding:24px 36px}
.sec{font-size:10px;font-weight:800;color:#8B6914;text-transform:uppercase;letter-spacing:2px;border-bottom:2px solid #FBF3E4;padding-bottom:4px;margin:20px 0 10px}
.row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:.5px solid #FBF3E4;font-size:13px}
.row:last-child{border-bottom:none}
.lbl{color:#555}
.amt{font-weight:500}
.grn{color:#2E7D2E}
.red{color:#A32D2D}
.bold{font-weight:700}
.net-box{background:linear-gradient(135deg,#6B4423,#8B5E34);border-radius:8px;padding:16px 24px;margin:20px 0;display:flex;justify-content:space-between;align-items:center}
.net-lbl{color:rgba(255,255,255,.8);font-size:13px;font-weight:600}
.net-amt{color:#F5D98A;font-size:26px;font-weight:900}
.notes{background:#faf6ee;border-left:4px solid #8B6914;padding:10px 14px;border-radius:0 6px 6px 0;font-size:12px;color:#555;margin-top:8px}
.sigs{display:flex;justify-content:space-between;margin-top:32px;gap:40px}
.sig{flex:1;border-top:1px solid #ccc;padding-top:6px;font-size:11px;color:#888;text-align:center}
.ftr{background:linear-gradient(135deg,#6B4423,#A67C42);padding:14px 36px;display:flex;justify-content:space-between;color:rgba(255,255,255,.7);font-size:10px;line-height:1.9}
.noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
.printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
.rpt-hdr{display:none}
@page{margin:16mm 14mm 20mm 14mm;size:A4}
@media print{
.noprint{display:none}
body{background:#fff}
.page{box-shadow:none;margin:0;max-width:100%;border-radius:0}
.hdr{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.emp-bar{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.net-box{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.ftr{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #8B6914;padding-bottom:5px}
.rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999;padding:5px 36px}
.page{padding-top:36px}
}
</style></head><body>
<div class='rpt-hdr'>
  <span style='font-size:11px;font-weight:700;color:#3D2214'>Malakesa Transfers &amp; Tours &nbsp;—&nbsp; Payslip &nbsp;—&nbsp; ${emp.name} &nbsp;—&nbsp; ${mLabel}</span>
  <span style='font-size:10px;color:#888'>Page <span class='pgnum'></span></span>
</div>
<div class='noprint'><span>Payslip — ${emp.name} — ${mLabel}</span><button class='printbtn' onclick='window.print()'>Print / Save PDF</button></div>
<div class='page'>
  <div class='hdr'>
    <div>
      <img src='${MALAKESA_LOGO}' alt='Malakesa' style='width:200px;border-radius:6px;display:block'/>
      <div class='ps-date' style='margin-top:8px'>Port Vila, Shefa Province, Vanuatu | TIN: 445579</div>
    </div>
    <div class='hdr-r'>
      <div class='ps-title'>Pay Slip</div>
      <div class='ps-period'>${mLabel}</div>
      <div class='ps-date'>Issued: ${issued}</div>
      ${payRunsInfo}
    </div>
  </div>
  <div class='emp-bar'>
    <div>
      <div class='emp-name'>${emp.name}</div>
      <div class='emp-det'>${emp.job_title || 'Employee'} | VNPF: ${emp.vnpf_number || 'N/A'}</div>
    </div>
    <div class='emp-r'>
      <div>Pay Period: <strong style='color:#F5D98A'>${mLabel}</strong></div>
      <div>Pay Date: ${issued}</div>
    </div>
  </div>
  <div class='body'>
    <div class='sec'>Earnings</div>
    ${earningRows}
    <div class='row bold'><span>Total Earnings</span><span class='amt grn'>VT ${Number(totalGross + totalAllowances).toLocaleString()}</span></div>
    <div class='sec'>Deductions</div>
    ${deductionRows}
    <div class='row bold'><span>Total Deductions</span><span class='amt red'>VT ${Number(totalVnpf + totalOtherDed).toLocaleString()}</span></div>
    <div class='net-box'>
      <div class='net-lbl'>NET PAY — ${mLabel}</div>
      <div class='net-amt'>VT ${Number(totalNet).toLocaleString()}</div>
    </div>
    ${notesHtml}
    <div class='sigs'>
      <div class='sig'>Employee Signature &amp; Date</div>
      <div class='sig'>Prepared by &amp; Date</div>
      <div class='sig'>Authorised by &amp; Date</div>
    </div>
  </div>
  <div class='ftr'>
    <div><strong style='color:#F5D98A'>Malakesa Transfers &amp; Tours</strong><br>Port Vila, Shefa Province, Vanuatu<br>TIN: 445579 | PO Box 823</div>
    <div style='text-align:right'>Tel: +678 22712 | Mob: +678 7798712<br>Email: accounts@malakesa.vu<br><span style='opacity:.6'>Computer generated payslip</span></div>
  </div>
</div>
<script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const empSummary = (id) => {
    const recs = monthRecords.filter(r => r.employee_id === id)
    const totalGross = recs.reduce((s, r) => s + Number(r.gross || 0), 0)
    const totalAllowances = recs.reduce((s, r) => s + (r.allowances || []).reduce((a, x) => a + Number(x.amount || 0), 0), 0)
    const totalVnpf = recs.reduce((s, r) => s + Number(r.vnpf_employee || 0), 0)
    const totalNet = recs.reduce((s, r) => s + Number(r.net_pay || 0), 0)
    return { runs: recs.length, totalGross, totalAllowances, totalVnpf, totalNet, records: recs }
  }

  const totalNetAll = activeEmployees.reduce((s, e) => s + empSummary(e.id).totalNet, 0)
  const totalGrossAll = activeEmployees.reduce((s, e) => s + empSummary(e.id).totalGross, 0)
  const totalVnpfAll = activeEmployees.reduce((s, e) => s + empSummary(e.id).totalVnpf, 0)

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <MonthYearPicker value={salaryMonth} onChange={setSalaryMonth} accentColor="#8B6914" />
        <span style={{ fontSize: 13, color: '#666' }}>Pay period: <strong>{monthLabel}</strong></span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
        <StatCard label="Total Gross Paid" value={fmt(monthRecords.length > 0 ? totalGrossAll : activeEmployees.reduce((s,e)=>s+Number(e.salary||0),0))} sub={monthRecords.length > 0 ? `${monthRecords.length} pay run(s) this month` : `${activeEmployees.length} employees (not yet processed)`} />
        <StatCard label="Total VNPF (Employee 6%)" value={fmt(totalVnpfAll)} color="#8B6914" sub={monthRecords.length > 0 ? 'Accumulated from pay runs' : 'Process pay runs to calculate'} />
        <StatCard label="Total Net Pay" value={fmt(totalNetAll)} color="#2E7D2E" sub={monthRecords.length > 0 ? 'Confirmed net pay' : 'Process pay runs to calculate'} />
      </div>

      {activeEmployees.length === 0 ? (
        <Card><div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}><i className="ti ti-users" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i><p>No employees yet. Add employees in the VNPF Contributions tab.</p></div></Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activeEmployees.map(emp => {
            const sum = empSummary(emp.id)
            return (
              <Card key={emp.id} style={{ padding: 0, overflow: 'hidden' }}>
                {/* Employee header row */}
                <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: sum.runs > 0 ? '#f6fbf0' : '#fff', borderBottom: sum.runs > 0 ? '0.5px solid #C0DD97' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#8B5E34,#8B6914)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5D98A', fontWeight: 700, fontSize: 16 }}>{emp.name?.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{emp.name}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{emp.job_title || 'Employee'}{emp.vnpf_number ? ` | VNPF: ${emp.vnpf_number}` : ''}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>Base salary: {fmt(emp.salary)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {sum.runs > 0 ? (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, color: '#27500A', fontWeight: 600 }}>{sum.runs} pay run{sum.runs !== 1 ? 's' : ''} this month</div>
                        <div style={{ fontSize: 12, color: '#666' }}>Gross: {fmt(sum.totalGross)} | VNPF: {fmt(sum.totalVnpf)}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#2E7D2E' }}>Net: {fmt(sum.totalNet)}</div>
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: '#aaa', textAlign: 'right' }}>No pay runs<br/>for {monthLabel}</div>
                    )}
                    {sum.runs > 0 && (
                      <button className="btn btn-sm" style={{ background: '#3B6D11', borderColor: '#2A5009', color: '#fff', whiteSpace: 'nowrap' }} onClick={() => printPayslip(emp, null)}>
                        <i className="ti ti-printer"></i> Print Payslip
                      </button>
                    )}
                    <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }} onClick={() => setPayRunModal(emp)}>
                      <i className="ti ti-plus"></i> New Pay Run
                    </button>
                  </div>
                </div>

                {/* Pay run history for this month */}
                {sum.runs > 0 && (
                  <div style={{ padding: '0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ background: '#FBF3E4' }}>
                          <Th style={{ fontSize: 11 }}>Pay Date</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>Gross</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>Allowances</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>VNPF 6%</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>Other Deductions</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>Net Pay</Th>
                          <Th style={{ fontSize: 11 }}>Notes</Th>
                          <Th style={{ fontSize: 11 }}></Th>
                        </tr>
                      </thead>
                      <tbody>
                        {sum.records.map((rec, i) => {
                          const recAllowances = (rec.allowances || []).reduce((s, a) => s + Number(a.amount || 0), 0)
                          const recOtherDeductions = (rec.deductions || []).reduce((s, d) => s + Number(d.amount || 0), 0)
                          return (
                            <tr key={rec.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)', background: i % 2 === 0 ? '#fff' : '#fafaf8' }}>
                              <Td style={{ fontSize: 12 }}>{rec.pay_date ? fmtDate(rec.pay_date) : rec.month}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12 }}>{fmt(rec.gross)}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12, color: '#2E7D2E' }}>{recAllowances > 0 ? '+' + fmt(recAllowances) : '—'}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12, color: '#A32D2D' }}>{fmt(rec.vnpf_employee)}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12, color: '#A32D2D' }}>{recOtherDeductions > 0 ? fmt(recOtherDeductions) : '—'}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12, fontWeight: 600, color: '#2E7D2E' }}>{fmt(rec.net_pay)}</Td>
                              <Td style={{ fontSize: 11, color: '#888' }}>{rec.notes || '—'}</Td>
                              <Td>
                                <div style={{ display: 'flex', gap: 4 }}>
                                  <button className="btn btn-sm" style={{ background: '#3B6D11', borderColor: '#2A5009', color: '#fff', padding: '2px 8px', fontSize: 11 }} onClick={() => printPayslip(emp, rec)} title="Print this pay run"><i className="ti ti-printer"></i></button>
                                  <button className="btn btn-sm" style={{ color: '#A32D2D', borderColor: '#A32D2D', padding: '2px 8px', fontSize: 11 }} onClick={() => deletePayRun(rec.id)} title="Delete this pay run"><i className="ti ti-trash"></i></button>
                                </div>
                              </Td>
                            </tr>
                          )
                        })}
                        <tr style={{ background: '#FBF3E4', fontWeight: 700, fontSize: 12 }}>
                          <td style={{ padding: '7px 14px' }}>TOTAL ({sum.runs} run{sum.runs!==1?'s':''})</td>
                          <td style={{ padding: '7px 14px', textAlign: 'right' }}>{fmt(sum.totalGross)}</td>
                          <td style={{ padding: '7px 14px', textAlign: 'right', color: '#2E7D2E' }}>{fmt(sum.totalAllowances)}</td>
                          <td style={{ padding: '7px 14px', textAlign: 'right', color: '#A32D2D' }}>{fmt(sum.totalVnpf)}</td>
                          <td style={{ padding: '7px 14px', textAlign: 'right' }}></td>
                          <td style={{ padding: '7px 14px', textAlign: 'right', color: '#2E7D2E' }}>{fmt(sum.totalNet)}</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {payRunModal && (
        <PayRunModal
          emp={payRunModal}
          defaultMonth={salaryMonth}
          onClose={() => setPayRunModal(null)}
          onSave={() => { setPayRunModal(null); reload() }}
          fmt={fmt}
        />
      )}
    </div>
  )
}

function PayRunModal({ emp, defaultMonth, onClose, onSave, fmt }) {
  const nowD = new Date()
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1)
    return { value: localMonthStr(d), label: MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear() }
  })

  const [form, setForm] = useState({
    month: defaultMonth,
    pay_date: `${nowD.getFullYear()}-${String(nowD.getMonth() + 1).padStart(2, '0')}-${String(nowD.getDate()).padStart(2, '0')}`,
    days_worked: '',
    gross: emp.salary || '',
    allowances: [],
    deductions: [],
    notes: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const setF = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const gross = Number(form.gross || 0)
  const totalAllowances = form.allowances.reduce((s, a) => s + Number(a.amount || 0), 0)
  const vnpfDeduction = Math.round(gross * 0.06)
  const otherDeductions = form.deductions.reduce((s, d) => s + Number(d.amount || 0), 0)
  const totalDeductions = vnpfDeduction + otherDeductions
  const netPay = gross + totalAllowances - totalDeductions

  const handleSave = async () => {
    setError('')
    if (!form.gross || gross <= 0) { setError('Gross salary is required'); return }
    if (!form.pay_date) { setError('Pay date is required'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/salary-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: emp.id,
          month: form.month,
          pay_date: form.pay_date,
          days_worked: form.days_worked ? Number(form.days_worked) : null,
          gross,
          allowances: form.allowances,
          deductions: form.deductions,
          vnpf_employee: vnpfDeduction,
          net_pay: netPay,
          notes: form.notes || null
        })
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save'); setSaving(false); return }
      onSave()
    } catch(e) { setError('Network error: ' + e.message); setSaving(false) }
  }

  const addAllowance = () => setF('allowances', [...form.allowances, { label: '', amount: '' }])
  const addDeduction = () => setF('deductions', [...form.deductions, { label: '', amount: '' }])
  const updateAllowance = (i, key, val) => { const arr = [...form.allowances]; arr[i] = { ...arr[i], [key]: val }; setF('allowances', arr) }
  const updateDeduction = (i, key, val) => { const arr = [...form.deductions]; arr[i] = { ...arr[i], [key]: val }; setF('deductions', arr) }
  const removeAllowance = (i) => setF('allowances', form.allowances.filter((_,j) => j !== i))
  const removeDeduction = (i) => setF('deductions', form.deductions.filter((_,j) => j !== i))

  const monthLabel = monthOptions.find(m => m.value === form.month)?.label || form.month

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 660, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}>

        {/* Modal Header */}
        <div style={{ background: 'linear-gradient(135deg,#6B4423,#8B5E34,#A67C42)', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>New Pay Run</div>
            <div style={{ color: '#F5D98A', fontSize: 18, fontWeight: 700, marginTop: 2 }}>{emp.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>{emp.job_title || 'Employee'} | Base salary: {fmt(emp.salary)}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', opacity: 0.7 }}>&times;</button>
        </div>

        {/* Modal Body */}
        <div style={{ overflow: 'auto', padding: 24, flex: 1 }}>
          {error && <Alert type="danger">{error}</Alert>}

          {/* Pay Period & Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 18 }}>
            <Field label="Pay period (month)">
              <select value={form.month} onChange={e => setF('month', e.target.value)} style={inputStyle}>
                {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </Field>
            <Field label="Pay date *">
              <input type="date" value={form.pay_date} onChange={e => setF('pay_date', e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Days worked (optional)">
              <input type="number" value={form.days_worked} onChange={e => setF('days_worked', e.target.value)} placeholder="e.g. 22" min="0" max="31" style={inputStyle} />
            </Field>
          </div>

          {/* Gross Salary */}
          <div style={{ background: '#faf6ee', border: '1.5px solid #FBF3E4', borderRadius: 8, padding: '14px 16px', marginBottom: 18 }}>
            <Field label={`Gross salary for this pay run (VT) * — base: ${fmt(emp.salary)}`}>
              <input type="number" value={form.gross} onChange={e => setF('gross', e.target.value)} placeholder={String(emp.salary || 0)} style={{ ...inputStyle, fontSize: 16, fontWeight: 600 }} />
            </Field>
          </div>

          {/* Allowances & Deductions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 18 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#2E7D2E', marginBottom: 10 }}>+ Allowances / Extra Pay</div>
              {form.allowances.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <input type="text" placeholder="e.g. Overtime" value={a.label} onChange={e => updateAllowance(i, 'label', e.target.value)} style={{ ...inputStyle, flex: 2, fontSize: 12 }} />
                  <input type="number" placeholder="Amount" value={a.amount} onChange={e => updateAllowance(i, 'amount', e.target.value)} style={{ ...inputStyle, flex: 1, fontSize: 12 }} />
                  <button className="btn btn-sm" style={{ color: '#A32D2D', borderColor: '#A32D2D', padding: '2px 6px' }} onClick={() => removeAllowance(i)}><i className="ti ti-x"></i></button>
                </div>
              ))}
              <button className="btn btn-sm" onClick={addAllowance} style={{ fontSize: 11, marginTop: 2 }}><i className="ti ti-plus"></i> Add Allowance</button>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#A32D2D', marginBottom: 10 }}>— Deductions</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, borderBottom: '0.5px solid #FBF3E4', marginBottom: 6 }}>
                <span style={{ color: '#555' }}>VNPF Employee Contribution (6%)</span>
                <span style={{ fontWeight: 600, color: '#A32D2D' }}>{fmt(vnpfDeduction)}</span>
              </div>
              {form.deductions.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <input type="text" placeholder="e.g. Loan repayment" value={d.label} onChange={e => updateDeduction(i, 'label', e.target.value)} style={{ ...inputStyle, flex: 2, fontSize: 12 }} />
                  <input type="number" placeholder="Amount" value={d.amount} onChange={e => updateDeduction(i, 'amount', e.target.value)} style={{ ...inputStyle, flex: 1, fontSize: 12 }} />
                  <button className="btn btn-sm" style={{ color: '#A32D2D', borderColor: '#A32D2D', padding: '2px 6px' }} onClick={() => removeDeduction(i)}><i className="ti ti-x"></i></button>
                </div>
              ))}
              <button className="btn btn-sm" onClick={addDeduction} style={{ fontSize: 11, marginTop: 2 }}><i className="ti ti-plus"></i> Add Deduction</button>
            </div>
          </div>

          {/* Notes */}
          <Field label="Notes / Remarks">
            <input type="text" value={form.notes} onChange={e => setF('notes', e.target.value)} placeholder="e.g. Weekly pay run 1 of 4, includes overtime" style={inputStyle} />
          </Field>

          {/* Live Pay Summary */}
          <div style={{ background: 'linear-gradient(135deg,#6B4423,#8B5E34)', borderRadius: 10, padding: '16px 20px', marginTop: 18 }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Pay Summary — {monthLabel}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                ['Gross', fmt(gross), '#fff'],
                ['+ Allowances', fmt(totalAllowances), '#86d86a'],
                ['— Deductions', fmt(totalDeductions), '#ff8a8a'],
                ['Net Pay', fmt(netPay), '#F5D98A'],
              ].map(([label, value, color]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 4 }}>{label}</div>
                  <div style={{ color, fontWeight: 700, fontSize: label === 'Net Pay' ? 20 : 15 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 6, fontSize: 12, color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
              <span>VNPF Employee (6%): <strong style={{ color: '#ff8a8a' }}>{fmt(vnpfDeduction)}</strong></span>
              <span>VNPF Employer (6%): <strong style={{ color: '#ff8a8a' }}>{fmt(Math.round(gross * 0.06))}</strong></span>
              <span>Total VNPF contribution: <strong style={{ color: '#F5D98A' }}>{fmt(Math.round(gross * 0.12))}</strong></span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '14px 24px', borderTop: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'flex-end', gap: 10, background: '#fafaf8' }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            <i className="ti ti-check"></i> {saving ? 'Processing...' : 'Process Pay Run'}
          </button>
        </div>
      </div>
    </div>
  )
}


function ReminderPreviewModal({ inv, subject, body, bal, onSend, onClose, fmt, fmtDate }) {
  const [editSubject, setEditSubject] = useState(subject)
  const [editBody, setEditBody] = useState(body)
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 640, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}>
        <div style={{ background: 'linear-gradient(135deg,#6B4423,#8B5E34,#A67C42)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Payment Reminder Preview</div>
            <div style={{ color: '#F5D98A', fontSize: 16, fontWeight: 700, marginTop: 2 }}>{inv.client_name} — {inv.number}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', opacity: 0.7 }}>&times;</button>
        </div>
        <div style={{ overflow: 'auto', padding: 24, flex: 1 }}>
          <div style={{ background: '#FCEBEB', border: '0.5px solid #F7C1C1', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#791F1F', display: 'flex', gap: 10, alignItems: 'center' }}>
            <i className="ti ti-alert-circle"></i>
            <span>Balance due: <strong>{fmt(bal)}</strong> &nbsp;|&nbsp; Due date: <strong>{fmtDate(inv.due_date)}</strong> &nbsp;|&nbsp; To: <strong>{inv.client_email || 'No email on file'}</strong></span>
          </div>
          <Field label="Subject">
            <input type="text" value={editSubject} onChange={e => setEditSubject(e.target.value)} style={{ ...inputStyle, width: '100%' }} />
          </Field>
          <Field label="Message body (editable)">
            <textarea value={editBody} onChange={e => setEditBody(e.target.value)} rows={14} style={{ ...inputStyle, width: '100%', fontFamily: 'monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }} />
          </Field>
        </div>
        <div style={{ padding: '14px 24px', borderTop: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, background: '#fafaf8' }}>
          <span style={{ fontSize: 12, color: '#888' }}>{inv.client_email ? 'Will send via API or open in your email app' : '⚠ No email address on file for this client'}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={() => onSend(inv, editSubject, editBody)} disabled={!inv.client_email}>
              <i className="ti ti-mail"></i> Send Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewEmployeeModal({ employee, onClose, onSave }) {
  const isEdit = !!employee
  const [form, setForm] = useState({
    name: employee?.name || '',
    salary: employee?.salary || '',
    vnpf_number: employee?.vnpf_number || '',
    email: employee?.email || ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const salary = parseFloat(form.salary) || 0
  const employeeContrib = Math.round(salary * VNPF_EMPLOYEE_RATE)
  const employerContrib = Math.round(salary * VNPF_EMPLOYER_RATE)

  const handleSave = async () => {
    setError('')
    if (!form.name.trim()) { setError('Employee name is required'); return }
    if (!form.salary || salary <= 0) { setError('Salary is required'); return }
    setSaving(true)
    try {
      const url = isEdit ? '/api/employees/' + employee.id : '/api/employees'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, salary })
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save'); setSaving(false); return }
      onSave()
    } catch (e) { setError('Network error — please try again'); setSaving(false) }
  }

  return (
    <Modal title={isEdit ? 'Edit Employee' : 'Add Employee'} onClose={onClose}>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Employee name *">
          <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="e.g. John Tarileo" />
        </Field>
        <Field label="Job title">
          <input type="text" value={form.job_title} onChange={e => setForm(f => ({ ...f, job_title: e.target.value }))} style={inputStyle} placeholder="e.g. Driver" />
        </Field>
        <Field label="VNPF member number">
         <input type="text" value={form.vnpf_number} onChange={e => setForm(f => ({ ...f, vnpf_number: e.target.value }))} style={inputStyle} placeholder="e.g. VN-12345" />
        </Field>
        <Field label="Monthly gross salary (VT) *">
          <input type="number" value={form.salary} min="0" onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} style={inputStyle} placeholder="0" />
        </Field>
      </div>

      {salary > 0 && (
        <div style={{ background: '#f5f0e8', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 8, color: '#3D2214' }}>VNPF Contribution Preview</div>
          {[
            ['Employee contribution (6%)', fmt(employeeContrib)],
            ['Employer contribution (6%)', fmt(employerContrib)],
            ['Total monthly contribution', fmt(employeeContrib + employerContrib)],
          ].map(([l, v], i) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.09)' : 'none', fontSize: 13 }}>
              <span style={{ color: '#666' }}>{l}</span>
              <span style={{ fontWeight: i === 2 ? 600 : 400, color: i === 2 ? '#2E7D2E' : '#1a1a1a' }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Save Employee'}</button>
      </div>
    </Modal>
  )
}

// ── Clients ───────────────────────────────────────────────
function Clients({ clients, invoices, payments, reload, setModal }) {
  const [editingClient, setEditingClient] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const handleDelete = async (id) => {
    if (!confirm('Delete this client? Their invoices will remain.')) return
    await fetch('/api/clients/' + id, { method: 'DELETE' }); reload()
  }

  const startEdit = (client) => {
    setEditingClient(client.id)
    setEditForm({ name: client.name, email: client.email || '', email2: client.email2 || '', email3: client.email3 || '', phone: client.phone || '', address: client.address || '' })
  }

  const cancelEdit = () => { setEditingClient(null); setEditForm({}) }

  const printStatement = (client) => {
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups to print statements.'); return }

    const clientInvoices = invoices.filter(i => i.client_id === client.id).sort((a, b) => a.date > b.date ? 1 : -1)
    const invoiceIds = new Set(clientInvoices.map(i => i.id))
    const clientPayments = (payments || []).filter(p => invoiceIds.has(p.invoice_id)).sort((a, b) => a.date > b.date ? 1 : -1)
    const invById = Object.fromEntries(clientInvoices.map(i => [i.id, i]))

    const totalInvoiced = clientInvoices.reduce((s, i) => s + Number(i.total || 0), 0)
    const totalPaid = clientPayments.reduce((s, p) => s + Number(p.amount || 0), 0)
    const balance = totalInvoiced - totalPaid

    const rows = clientInvoices.map(i => {
      const paidForThis = clientPayments.filter(p => p.invoice_id === i.id).reduce((s, p) => s + Number(p.amount), 0)
      const bal = Number(i.total || 0) - paidForThis
      return `<tr>
        <td>${i.number}</td>
        <td>${fmtDate(i.date)}</td>
        <td>${fmtDate(i.due_date)}</td>
        <td class="text-right">VT ${Number(i.total || 0).toLocaleString()}</td>
        <td class="text-right">VT ${paidForThis.toLocaleString()}</td>
        <td class="text-right" style="color:${bal > 0 ? '#D85A30' : '#3B6D11'};font-weight:600">VT ${bal.toLocaleString()}</td>
      </tr>`
    }).join('')

    const paymentRows = clientPayments.map(p => `<tr>
        <td>${fmtDate(p.date)}</td>
        <td>${invById[p.invoice_id]?.number || '—'}</td>
        <td>${p.method || '—'}</td>
        <td class="text-right">VT ${Number(p.amount || 0).toLocaleString()}</td>
      </tr>`).join('')

    w.document.write(`<!DOCTYPE html><html><head><title>Statement — ${client.name}</title><style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; color: #222; font-size: 13px; }
    .page { max-width: 800px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #6B4423 0%, #8B5E34 50%, #A67C42 100%); padding: 14px 28px; display: flex; justify-content: space-between; align-items: center; }
    .logo-contact { font-size: 9px; color: rgba(255,255,255,0.7); margin-top: 3px; line-height: 1.4; }
    .meta { text-align: right; color: #fff; }
    .body { padding: 24px 32px; }
    .bill-label { font-size: 9px; font-weight: 800; color: #8B6914; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #8B6914; padding-bottom: 3px; margin-bottom: 8px; display: inline-block; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0 24px; }
    thead tr { background: linear-gradient(135deg, #3D2214, #8B6914); }
    th { padding: 8px 12px; text-align: left; font-size: 10px; font-weight: 700; color: #FFD700; letter-spacing: 1px; text-transform: uppercase; }
    td { padding: 9px 12px; border-bottom: 1px solid #f0ebe0; }
    .text-right { text-align: right; }
    .summary { margin-left: auto; width: 280px; }
    .srow { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #555; }
    .srow.grand { border-bottom: none; font-size: 17px; font-weight: 800; color: #3D2214; padding-top: 12px; }
    h2 { font-size: 14px; color: #3D2214; margin-bottom: 4px; }
    @media print { .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; } thead tr { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style></head><body>
    <div class="page">
      <div class="header">
        <div>
          <img src="${MALAKESA_LOGO}" alt="Malakesa Transfers and Tours" style="width:120px;border-radius:4px;display:block" />
          <div class="logo-contact">📍 Port Vila, Vanuatu &nbsp;|&nbsp; 📞 +678 22712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu</div>
        </div>
        <div class="meta">
          <div style="font-size:10px;color:rgba(255,255,255,0.75);letter-spacing:1px">STATEMENT OF ACCOUNT</div>
          <div style="font-size:19px;font-weight:700;color:#F5D98A">${client.name}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.8)">As at ${fmtDate(todayStr())}</div>
        </div>
      </div>
      <div class="body">
        <div class="bill-label">Client details</div>
        <div style="margin-bottom:20px;color:#555">
          <div><strong>${client.name}</strong></div>
          <div>${[client.email, client.email2, client.email3].filter(Boolean).join(', ') || ''}</div>
          <div>${client.phone || ''}</div>
          <div>${client.address || ''}</div>
        </div>

        <h2>Invoices</h2>
        <table>
          <thead><tr><th>Invoice #</th><th>Issue Date</th><th>Due Date</th><th class="text-right">Total</th><th class="text-right">Paid</th><th class="text-right">Balance</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="6" style="text-align:center;color:#999">No invoices</td></tr>'}</tbody>
        </table>

        ${paymentRows ? `<h2>Payments received</h2>
        <table>
          <thead><tr><th>Date</th><th>Invoice #</th><th>Method</th><th class="text-right">Amount</th></tr></thead>
          <tbody>${paymentRows}</tbody>
        </table>` : ''}

        <div class="summary">
          <div class="srow"><span>Total invoiced</span><span>VT ${totalInvoiced.toLocaleString()}</span></div>
          <div class="srow"><span>Total paid</span><span>VT ${totalPaid.toLocaleString()}</span></div>
          <div class="srow grand"><span>Balance due</span><span style="color:${balance > 0 ? '#D85A30' : '#3B6D11'}">VT ${balance.toLocaleString()}</span></div>
        </div>
      </div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const saveEdit = async (id) => {
    if (!editForm.name.trim()) return
    setSaving(true)
    await fetch('/api/clients/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, all_emails: [editForm.email, editForm.email2, editForm.email3].filter(Boolean).join(', ') })
    })
    setSaving(false)
    setEditingClient(null)
    reload()
  }

  const inputStyle2 = { padding: '5px 8px', borderRadius: 6, border: '0.5px solid rgba(0,0,0,0.2)', fontSize: 13, fontFamily: 'inherit', width: '100%', background: '#fffef8' }

  return (
    <>
      <Topbar title="Clients">
        <button className="btn btn-primary" onClick={() => setModal('newClient')}><i className="ti ti-plus"></i> Add Client</button>
      </Topbar>
      <div style={{ padding: 20 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {clients.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
              <i className="ti ti-users" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
              <p style={{ marginBottom: 14 }}>No clients yet</p>
              <button className="btn btn-primary" onClick={() => setModal('newClient')}>Add first client</button>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#FBF3E4' }}>
                  <Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>Address</Th><Th style={{ textAlign: 'center' }}>Invoices</Th><Th style={{ textAlign: 'center' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {clients.map(c => (
                  editingClient === c.id ? (
                    <tr key={c.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: '#fffef8' }}>
                      <td style={{ padding: '8px 10px' }}>
                        <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} style={{ ...inputStyle2, fontWeight: 600 }} placeholder="Client name *" />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} style={{ ...inputStyle2, marginBottom: 3 }} placeholder="Primary email" />
                        <input type="email" value={editForm.email2 || ''} onChange={e => setEditForm(f => ({ ...f, email2: e.target.value }))} style={{ ...inputStyle2, marginBottom: 3 }} placeholder="Email 2 (optional)" />
                        <input type="email" value={editForm.email3 || ''} onChange={e => setEditForm(f => ({ ...f, email3: e.target.value }))} style={inputStyle2} placeholder="Email 3 (optional)" />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="tel" value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle2} placeholder="+678 ..." />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="text" value={editForm.address} onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))} style={inputStyle2} placeholder="Address" />
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>{invoices.filter(i => i.client_id === c.id).length}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                          <button className="btn btn-sm btn-primary" onClick={() => saveEdit(c.id)} disabled={saving}><i className="ti ti-check"></i> {saving ? '...' : 'Save'}</button>
                          <button className="btn btn-sm" onClick={cancelEdit}><i className="ti ti-x"></i> Cancel</button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={c.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <td style={{ padding: '11px 14px' }}><strong>{c.name}</strong></td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{[c.email, c.email2, c.email3].filter(Boolean).join(', ') || '—'}</td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{c.phone || '—'}</td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{c.address || '—'}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'center' }}>{invoices.filter(i => i.client_id === c.id).length}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                          <button className="btn btn-sm" onClick={() => startEdit(c)}><i className="ti ti-pencil"></i> Edit</button>
                          <button className="btn btn-sm" style={{ borderColor: '#8B6914', color: '#8B6914' }} onClick={() => printStatement(c)}><i className="ti ti-file-text"></i> Statement</button>
                          <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(c.id)}><i className="ti ti-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}


function previewInvoice(inv) {
  const w = window.open('', '_blank')
  if (!w) { alert('Please allow popups for this site to preview invoices.'); return }
  w.document.write(`<!DOCTYPE html><html><head><title>Invoice Preview</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; color: #222; font-size: 13px; background: #FBF3E4; }
    .page { max-width: 800px; margin: 20px auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #6B4423 0%, #8B5E34 50%, #A67C42 100%); padding: 12px 28px; display: flex; justify-content: space-between; align-items: center; }
    .logo-contact { font-size: 9px; color: rgba(255,255,255,0.7); margin-top: 3px; line-height: 1.4; }
    .inv-meta { text-align: right; color: #fff; }
    .inv-num { font-size: 19px; font-weight: 700; color: #F5D98A; }
    .inv-date { font-size: 10px; color: rgba(255,255,255,0.8); margin-top: 2px; line-height: 1.4; }
    .draft-badge { display: inline-block; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: #F5D98A; padding: 2px 10px; border-radius: 99px; font-size: 9px; font-weight: 700; letter-spacing: 1px; margin-top: 4px; }
    .body { padding: 32px 40px; }
    .bill-row { display: flex; justify-content: space-between; margin-bottom: 28px; gap: 20px; }
    .bill-label { font-size: 9px; font-weight: 800; color: #8B6914; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #8B6914; padding-bottom: 3px; margin-bottom: 8px; display: inline-block; }
    .bill-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
    .bill-detail { font-size: 12px; color: #555; line-height: 1.7; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    thead tr { background: linear-gradient(135deg, #8B5E34, #8B6914); }
    th { padding: 10px 14px; text-align: left; font-size: 10px; font-weight: 700; color: #F5D98A; letter-spacing: 1px; text-transform: uppercase; }
    td { padding: 11px 14px; border-bottom: 1px solid #FBF3E4; font-size: 13px; }
    tr:nth-child(even) td { background: #faf6ee; }
    .text-right { text-align: right; }
    .totals { margin-left: auto; width: 280px; margin-top: 12px; }
    .trow { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #555; }
    .trow.grand { border-bottom: none; font-size: 17px; font-weight: 800; color: #3D2214; padding-top: 12px; }
    .notes { background: #faf6ee; border-left: 4px solid #8B6914; padding: 12px 16px; border-radius: 0 6px 6px 0; margin-top: 20px; font-size: 12px; color: #555; }
    .thankyou { text-align: center; font-size: 14px; font-weight: 600; color: #8B6914; margin: 24px 0 16px; font-style: italic; }
    .footer { background: linear-gradient(135deg, #6B4423, #A67C42); padding: 18px 40px; display: flex; justify-content: space-between; align-items: center; }
    .footer-l { color: rgba(255,255,255,0.85); font-size: 11px; line-height: 1.9; }
    .footer-r { text-align: right; color: #F5D98A; font-size: 11px; line-height: 1.9; }
    .noprint { background: #333; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
    .printbtn { background: #8B6914; color: #fff; border: none; padding: 7px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .rpt-hdr { display: none; }
    @page { margin: 18mm 15mm 22mm 15mm; size: A4; }
    @media print {
      .noprint { display: none; }
      body { background: #fff; }
      .page { box-shadow: none; margin: 0; border-radius: 0; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      thead { display: table-header-group; }
      .pgnum::after { content: counter(page); }
      body { counter-reset: page; }
      .rpt-hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #8B6914; padding-bottom: 6px; }
      .rpt-hdr { position: fixed; top: 0; left: 0; right: 0; background: #fff; z-index: 999; padding: 6px 40px; }
      .page { padding-top: 40px; }
    }
  </style></head><body>
  <div class="rpt-hdr">
    <span style="font-size:11px;font-weight:700;color:#3D2214">Malakesa Transfers &amp; Tours &nbsp;—&nbsp; DRAFT PREVIEW</span>
    <span style="font-size:10px;color:#888">Page <span class="pgnum"></span></span>
  </div>
  <div class="noprint">
    <span>⚠️ DRAFT PREVIEW — Invoice not saved yet</span>
    <button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button>
  </div>
  <div class="page">
    <div class="header">
      <div>
        <img src="${MALAKESA_LOGO}" alt="Malakesa Transfers and Tours" style="width:120px;border-radius:4px;display:block" />
        <div class="logo-contact">📍 Port Vila, Vanuatu &nbsp;|&nbsp; 📞 +678 22712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu</div>
      </div>
      <div class="inv-meta">
        <div style="font-size:10px;color:rgba(255,255,255,0.75);letter-spacing:1px">TAX INVOICE &nbsp;·&nbsp; TIN #445579</div>
        <div class="inv-num">${inv.number || 'DRAFT'}</div>
        <div class="inv-date">Issue: <strong>${inv.date || ''}</strong> &nbsp;·&nbsp; Due: <strong>${inv.due_date || ''}</strong></div>
        <div class="draft-badge">PREVIEW</div>
      </div>
    </div>
    <div class="body">
      <div class="bill-row">
        <div>
          <div class="bill-label">Bill to</div>
          <div class="bill-name">${inv.client_name || '—'}</div>
          <div class="bill-detail">${inv.client_email || ''}</div>
        </div>
        <div style="text-align:right">
          <div class="bill-label">Invoice details</div>
          <div class="bill-detail">Invoice #: <strong>${inv.number || 'DRAFT'}</strong></div>
          <div class="bill-detail">Issue: <strong>${inv.date || ''}</strong></div>
          <div class="bill-detail">Due: <strong>${inv.due_date || ''}</strong></div>
        </div>
      </div>
      ${inv.notes ? '<div class="notes"><strong>Notes:</strong> ' + inv.notes + '</div>' : ''}
      <table>
        <thead><tr><th>Date</th><th>Name</th><th>Description</th><th>Voucher #</th><th class="text-right">Qty</th><th class="text-right">Rate (VT)</th><th class="text-right">Amount (VT)</th></tr></thead>
        <tbody>${(inv.items || []).map(it => '<tr>' + (it.date ? '<td>' + it.date + '</td>' : '<td style="color:#ccc">-</td>') + (it.name ? '<td>' + it.name + '</td>' : '<td style="color:#ccc">-</td>') + '<td>' + (it.description || '') + '</td>' + (it.voucher ? '<td>' + it.voucher + '</td>' : '<td style="color:#ccc">-</td>') + '<td class="text-right">' + (it.qty || 0) + '</td><td class="text-right" style="white-space:nowrap">VT&nbsp;' + Number(it.rate || 0).toLocaleString() + '</td><td class="text-right" style="white-space:nowrap">VT&nbsp;' + Number(it.total || 0).toLocaleString() + '</td></tr>').join('')}</tbody>
      </table>
      <div class="totals">
        <div class="trow"><span>Subtotal</span><span>VT ${Number(inv.subtotal || 0).toLocaleString()}</span></div>
        <div class="trow"><span>${inv.tax > 0 ? 'VAT (15%)' : 'VAT'}</span><span>${inv.tax > 0 ? 'VT ' + Number(inv.tax).toLocaleString() : 'Not applicable'}</span></div>
        <div class="trow grand"><span>TOTAL DUE</span><span>VT ${Number(inv.total || 0).toLocaleString()}</span></div>
      </div>
      <div style="margin-top:20px;padding:14px 18px;border:1px solid #ddd;border-radius:6px;font-size:12px;line-height:1.9;color:#444">
        <div style="font-weight:700;color:#3D2214;margin-bottom:4px">Invoice Payment by Electronic Transfer to the following Account:</div>
        <div>ANZ Vanuatu Ltd, Port Vila, Vanuatu</div>
        <div><strong>ACCOUNT NAME:</strong> Malakesa Transfers &amp; Tours</div>
        <div><strong>BRANCH BSB NO:</strong> 010982</div>
        <div><strong>ACCOUNT NO:</strong> 1406817</div>
        <div><strong>SWIFT CODE:</strong> ANZBVUVX</div>
      </div>
      <div class="thankyou">Tankiu Tumas — Thank you for choosing Malakesa Transfers &amp; Tours!</div>
    </div>
    <div class="footer">
      <div class="footer-l">
        <div><strong style="color:#F5D98A">Malakesa Transfers &amp; Tours</strong></div>
        <div>Port Vila, Shefa Province, Vanuatu</div>
        <div>📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu</div>
      </div>
      <div class="footer-r">
        <div>Payment due: ${inv.due_date || ''}</div>
        <div style="font-size:10px;color:rgba(255,215,0,0.6);margin-top:4px">Computer generated invoice</div>
      </div>
    </div>
  </div>
  <script>window.document.close()<\/script>
  </body></html>`)
}


function NewInvoiceModal({ clients, invoice, onClose, onSave }) {
  const isEdit = !!invoice
  const [form, setForm] = useState(isEdit
    ? { client_id: invoice.client_id || '', client_name: invoice.client_name || '', client_email: invoice.client_email || '', date: invoice.date || todayStr(), due_date: invoice.due_date || addDays(todayStr(), 14), notes: invoice.notes || '' }
    : { client_id: '', client_name: '', client_email: '', date: todayStr(), due_date: addDays(todayStr(), 14), notes: '' })
  const [items, setItems] = useState(isEdit && invoice.items && invoice.items.length
    ? invoice.items.map(it => ({ id: uid(), date: it.date || '', description: it.description || '', name: it.name || '', voucher: it.voucher || '', qty: it.qty || 1, rate: it.rate || '', total: it.total || 0 }))
    : [{ id: uid(), date: '', description: '', name: '', voucher: '', qty: 1, rate: '', total: 0 }, { id: uid(), date: '', description: '', name: '', voucher: '', qty: 1, rate: '', total: 0 }])
  const [applyVat, setApplyVat] = useState(isEdit ? (typeof invoice.vat_applied === 'boolean' ? invoice.vat_applied : Number(invoice.tax) > 0) : true)
  const vatInclusive = true // Rates are always VAT-inclusive at Malakesa
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateItem = (id, field, value) => setItems(items => items.map(item => {
    if (item.id !== id) return item
    const u = { ...item, [field]: value }
    u.total = (parseFloat(u.qty) || 0) * (parseFloat(u.rate) || 0)
    return u
  }))
  const lineTotal = items.reduce((s, i) => s + (i.total || 0), 0)
  // VAT-inclusive: rate entered includes VAT, so we extract it
  // VAT-exclusive: rate is pre-VAT, we add VAT on top
  const subtotal = applyVat && vatInclusive ? Math.round(lineTotal / 1.15) : lineTotal
  const tax = applyVat ? Math.round(subtotal * 0.15) : 0
  const total = applyVat && vatInclusive ? lineTotal : subtotal + tax

  const handleSave = async () => {
    setError('')
    if (!form.client_id) { setError('Please select a client'); return }
    const validItems = items.filter(i => i.description.trim())
    if (!validItems.length) { setError('Add at least one line item'); return }
    setSaving(true)
    const url = isEdit ? `/api/invoices/${invoice.id}` : '/api/invoices'
    const method = isEdit ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, items: validItems.map(({ id, ...r }) => r), subtotal, tax, total, vat_applied: applyVat }) })
    if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save'); setSaving(false); return }
    onSave()
  }

  return (
    <Modal title={isEdit ? `Edit Invoice — ${invoice.number}` : 'New Invoice'} onClose={onClose} wide>
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
        <div style={{ gridColumn: '1/-1', background: '#faf6ee', borderRadius: 8, border: '0.5px solid #FBF3E4', padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: applyVat ? 10 : 0 }}>
            <input type="checkbox" id="vatcheck" checked={applyVat} onChange={e => setApplyVat(e.target.checked)} style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#8B6914' }} />
            <label htmlFor="vatcheck" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 600, color: applyVat ? '#27500A' : '#666', userSelect: 'none' }}>
              {applyVat ? '✓ Rates are VAT-inclusive — VAT is extracted for reporting' : 'No VAT — zero rated invoice'}
            </label>
          </div>
          {applyVat && (
            <div style={{ fontSize: 12, color: '#27500A', background: '#EAF3DE', borderRadius: 6, padding: '7px 12px', marginTop: 2 }}>
              <i className="ti ti-info-circle" style={{ marginRight: 5 }}></i>
              Rates are <strong>VAT-inclusive (15%)</strong>. VAT is automatically extracted from the total for reporting.
            </div>
          )}
        </div>
      </div>
      <div style={{ fontWeight: 500, marginBottom: 10 }}>Line items</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
        <thead><tr style={{ background: '#FBF3E4' }}><Th style={{ width: '10%' }}>Date</Th><Th style={{ width: '12%' }}>Name</Th><Th style={{ width: '20%' }}>Description</Th><Th style={{ width: '10%' }}>Voucher #</Th><Th style={{ width: '8%' }}>Qty</Th><Th style={{ width: '14%' }}>{applyVat ? 'Rate (VT incl. VAT)' : 'Rate (VT)'}</Th><Th style={{ width: '12%' }}>Total</Th><Th style={{ width: '6%' }}></Th></tr></thead>
        <tbody>{items.map(item => (
          <tr key={item.id}>
            <td style={{ padding: '4px 4px' }}><input type="text" value={item.date || ''} onChange={e => updateItem(item.id, 'date', e.target.value)} style={inputStyle} placeholder="e.g. 10JUL" /></td>
            <td style={{ padding: '4px 4px' }}><input type="text" value={item.name || ''} onChange={e => updateItem(item.id, 'name', e.target.value)} style={inputStyle} placeholder="Pax name" /></td>
            <td style={{ padding: '4px 4px' }}><input type="text" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} style={inputStyle} placeholder="e.g. Airport transfer..." /></td>
            <td style={{ padding: '4px 4px' }}><input type="text" value={item.voucher || ''} onChange={e => updateItem(item.id, 'voucher', e.target.value)} style={inputStyle} placeholder="Voucher #" /></td>
            <td style={{ padding: '4px 4px' }}><input type="number" value={item.qty} min="0" step="0.5" onChange={e => updateItem(item.id, 'qty', e.target.value)} style={inputStyle} /></td>
            <td style={{ padding: '4px 4px' }}><input type="number" value={item.rate} min="0" onChange={e => updateItem(item.id, 'rate', e.target.value)} style={inputStyle} placeholder="0" /></td>
            <td style={{ padding: '4px 10px', fontWeight: 500 }}>{fmt(item.total)}</td>
            <td style={{ padding: '4px 4px' }}><button className="btn btn-sm" onClick={() => setItems(i => i.filter(x => x.id !== item.id))}><i className="ti ti-x"></i></button></td>
          </tr>
        ))}</tbody>
      </table>
      <button className="btn btn-sm" onClick={() => setItems(i => [...i, { id: uid(), date: '', description: '', name: '', voucher: '', qty: 1, rate: '', total: 0 }])}><i className="ti ti-plus"></i> Add item</button>
      <div style={{ marginLeft: 'auto', width: 280, marginTop: 12 }}>
        {applyVat ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}><span style={{ color: '#666' }}>Subtotal (ex-VAT)</span><span>{fmt(subtotal)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}><span style={{ color: '#666' }}>VAT (15% extracted)</span><span style={{ color: '#8B6914' }}>{fmt(tax)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 15, fontWeight: 600 }}><span>Total (VAT inclusive)</span><span>{fmt(total)}</span></div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}><span style={{ color: '#666' }}>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}><span style={{ color: '#666' }}>VAT</span><span>Not applicable</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 15, fontWeight: 600 }}><span>Total</span><span>{fmt(total)}</span></div>
          </>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <button className="btn" onClick={() => previewInvoice({ ...form, items: items.filter(i => i.description.trim()), subtotal, tax, total })}>
          <i className="ti ti-eye"></i> Preview Invoice
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? (isEdit ? 'Updating...' : 'Saving...') : (isEdit ? 'Update Invoice' : 'Save Invoice')}</button>
        </div>
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
    if (!w) { alert('Please allow popups for this site to print invoices.'); return }
    const statusColors = { paid: '#27500A', unpaid: '#712B13', overdue: '#791F1F', partial: '#633806', draft: '#444441' }
    const statusBg = { paid: '#E3F2DE', unpaid: '#FAECE7', overdue: '#FCEBEB', partial: '#FAEEDA', draft: '#F1EFE8' }
    w.document.write(`<!DOCTYPE html><html><head><title>${invoice.number}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; color: #222; font-size: 13px; background: #FBF3E4; }
    .page { max-width: 800px; margin: 20px auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #6B4423 0%, #8B5E34 50%, #A67C42 100%); padding: 12px 28px; display: flex; justify-content: space-between; align-items: center; }
    .logo-contact { font-size: 9px; color: rgba(255,255,255,0.7); margin-top: 3px; line-height: 1.4; }
    .inv-meta { text-align: right; color: #fff; }
    .inv-num { font-size: 19px; font-weight: 700; color: #F5D98A; }
    .inv-date { font-size: 10px; color: rgba(255,255,255,0.8); margin-top: 2px; line-height: 1.4; }
    .status-badge { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 9px; font-weight: 700; letter-spacing: 1px; margin-top: 4px; text-transform: uppercase; }
    .body { padding: 32px 40px; }
    .bill-row { display: flex; justify-content: space-between; margin-bottom: 28px; gap: 20px; }
    .bill-label { font-size: 9px; font-weight: 800; color: #8B6914; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #8B6914; padding-bottom: 3px; margin-bottom: 8px; display: inline-block; }
    .bill-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
    .bill-detail { font-size: 12px; color: #555; line-height: 1.7; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    thead tr { background: linear-gradient(135deg, #8B5E34, #8B6914); }
    th { padding: 10px 14px; text-align: left; font-size: 10px; font-weight: 700; color: #F5D98A; letter-spacing: 1px; text-transform: uppercase; }
    td { padding: 11px 14px; border-bottom: 1px solid #FBF3E4; font-size: 13px; }
    tr:nth-child(even) td { background: #faf6ee; }
    .text-right { text-align: right; }
    .totals { margin-left: auto; width: 280px; margin-top: 12px; }
    .trow { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #555; }
    .trow.grand { border-bottom: none; font-size: 17px; font-weight: 800; color: #3D2214; padding-top: 12px; }
    .trow.balance { font-weight: 700; }
    .notes { background: #faf6ee; border-left: 4px solid #8B6914; padding: 12px 16px; border-radius: 0 6px 6px 0; margin-top: 20px; font-size: 12px; color: #555; }
    .payments { margin-top: 20px; }
    .payments-title { font-size: 12px; font-weight: 700; color: #3D2214; margin-bottom: 6px; }
    .payrow { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #FBF3E4; font-size: 12px; }
    .thankyou { text-align: center; font-size: 14px; font-weight: 600; color: #8B6914; margin: 24px 0 16px; font-style: italic; }
    .footer { background: linear-gradient(135deg, #6B4423, #A67C42); padding: 18px 40px; display: flex; justify-content: space-between; align-items: center; }
    .footer-l { color: rgba(255,255,255,0.85); font-size: 11px; line-height: 1.9; }
    .footer-r { text-align: right; color: #F5D98A; font-size: 11px; line-height: 1.9; }
    .noprint { background: #333; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
    .printbtn { background: #8B6914; color: #fff; border: none; padding: 7px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .rpt-hdr { display: none; }
    @page { margin: 18mm 15mm 22mm 15mm; size: A4; }
    @media print {
      .noprint { display: none; }
      body { background: #fff; }
      .page { box-shadow: none; margin: 0; border-radius: 0; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      thead { display: table-header-group; }
      .pgnum::after { content: counter(page); }
      body { counter-reset: page; }
      .rpt-hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #8B6914; padding-bottom: 6px; margin-bottom: 4px; }
      .rpt-hdr { position: fixed; top: 0; left: 0; right: 0; background: #fff; z-index: 999; padding: 6px 40px; }
      .page { padding-top: 40px; }
      .page .header { margin-top: 0; }
    }
  </style></head><body>
  <div class="rpt-hdr">
    <span style="font-size:11px;font-weight:700;color:#3D2214">Malakesa Transfers &amp; Tours &nbsp;—&nbsp; Invoice ${invoice.number} &nbsp;—&nbsp; ${invoice.client_name || ''}</span>
    <span style="font-size:10px;color:#888">Page <span class="pgnum"></span></span>
  </div>
  <div class="noprint">
    <span>Invoice ${invoice.number}</span>
    <button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button>
  </div>
  <div class="page">
    <div class="header">
      <div>
        <img src="${MALAKESA_LOGO}" alt="Malakesa Transfers and Tours" style="width:120px;border-radius:4px;display:block" />
        <div class="logo-contact">📍 Port Vila, Vanuatu &nbsp;|&nbsp; 📞 +678 22712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu</div>
      </div>
      <div class="inv-meta">
        <div style="font-size:10px;color:rgba(255,255,255,0.75);letter-spacing:1px">TAX INVOICE &nbsp;·&nbsp; TIN #445579</div>
        <div class="inv-num">${invoice.number}</div>
        <div class="inv-date">Issue: <strong>${fmtDate(invoice.date)}</strong> &nbsp;·&nbsp; Due: <strong>${fmtDate(invoice.due_date)}</strong></div>
        <div class="status-badge" style="background:${statusBg[status] || '#F1EFE8'};color:${statusColors[status] || '#444441'}">${status}</div>
      </div>
    </div>
    <div class="body">
      <div class="bill-row">
        <div>
          <div class="bill-label">Bill to</div>
          <div class="bill-name">${invoice.client_name || '—'}</div>
          <div class="bill-detail">${invoice.client_email || ''}</div>
        </div>
        <div style="text-align:right">
          <div class="bill-label">Invoice details</div>
          <div class="bill-detail">Invoice #: <strong>${invoice.number}</strong></div>
          <div class="bill-detail">Issue: <strong>${fmtDate(invoice.date)}</strong></div>
          <div class="bill-detail">Due: <strong>${fmtDate(invoice.due_date)}</strong></div>
        </div>
      </div>
      ${invoice.notes ? '<div class="notes"><strong>Notes:</strong> ' + invoice.notes + '</div>' : ''}
      <table>
        <thead><tr><th>Date</th><th>Name</th><th>Description</th><th>Voucher #</th><th class="text-right">Qty</th><th class="text-right">Rate (VT)</th><th class="text-right">Amount (VT)</th></tr></thead>
        <tbody>${(invoice.items || []).map(it => '<tr>' + (it.date ? '<td>' + it.date + '</td>' : '<td style="color:#ccc">-</td>') + (it.name ? '<td>' + it.name + '</td>' : '<td style="color:#ccc">-</td>') + '<td>' + (it.description || '') + '</td>' + (it.voucher ? '<td>' + it.voucher + '</td>' : '<td style="color:#ccc">-</td>') + '<td class="text-right">' + (it.qty || 0) + '</td><td class="text-right" style="white-space:nowrap">VT&nbsp;' + Number(it.rate || 0).toLocaleString() + '</td><td class="text-right" style="white-space:nowrap">VT&nbsp;' + Number(it.total || 0).toLocaleString() + '</td></tr>').join('')}</tbody>
      </table>
      <div class="totals">
        <div class="trow"><span>Subtotal</span><span>VT ${Number(invoice.subtotal || 0).toLocaleString()}</span></div>
        <div class="trow"><span>${invoice.tax > 0 ? 'VAT (15%)' : 'VAT'}</span><span>${invoice.tax > 0 ? 'VT ' + Number(invoice.tax).toLocaleString() : 'Not applicable'}</span></div>
        <div class="trow grand"><span>TOTAL DUE</span><span>VT ${Number(invoice.total || 0).toLocaleString()}</span></div>
        <div class="trow balance" style="color:${balance > 0 ? '#D85A30' : '#3B6D11'}"><span>Balance due</span><span>VT ${Number(balance).toLocaleString()}</span></div>
      </div>
      ${invPayments.length > 0 ? `<div class="payments"><div class="payments-title">Payments received</div>${invPayments.map(p => `<div class="payrow"><span>${fmtDate(p.date)} — ${p.method}</span><span style="color:#3B6D11;font-weight:bold">VT ${Number(p.amount).toLocaleString()}</span></div>`).join('')}</div>` : ''}
      ${balance > 0 ? `<div style="margin-top:20px;padding:14px 18px;border:1px solid #ddd;border-radius:6px;font-size:12px;line-height:1.9;color:#444">
        <div style="font-weight:700;color:#3D2214;margin-bottom:4px">Invoice Payment by Electronic Transfer to the following Account:</div>
        <div>ANZ Vanuatu Ltd, Port Vila, Vanuatu</div>
        <div><strong>ACCOUNT NAME:</strong> Malakesa Transfers &amp; Tours</div>
        <div><strong>BRANCH BSB NO:</strong> 010982</div>
        <div><strong>ACCOUNT NO:</strong> 1406817</div>
        <div><strong>SWIFT CODE:</strong> ANZBVUVX</div>
      </div>` : ''}
      <div class="thankyou">Tankiu Tumas — Thank you for choosing Malakesa Transfers &amp; Tours!</div>
    </div>
    <div class="footer">
      <div class="footer-l">
        <div><strong style="color:#F5D98A">Malakesa Transfers &amp; Tours</strong></div>
        <div>Port Vila, Shefa Province, Vanuatu</div>
        <div>📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu</div>
      </div>
      <div class="footer-r">
        <div>Payment due: ${fmtDate(invoice.due_date)}</div>
        <div style="opacity:0.7">Computer generated invoice</div>
      </div>
    </div>
  </div>
  <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const [downloading, setDownloading] = useState(false)
  const loadPdfLibs = () => {
    if (!window.__pdfLibsPromise) {
      const loadScript = (src) => new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
        const s = document.createElement('script')
        s.src = src
        s.onload = () => resolve()
        s.onerror = () => reject(new Error('Failed to load PDF library'))
        document.head.appendChild(s)
      })
      window.__pdfLibsPromise = Promise.all([
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
      ])
    }
    return window.__pdfLibsPromise
  }

  const buildInvoicePdf = async () => {
    await loadPdfLibs()
    const statusColors = { paid: '#27500A', unpaid: '#712B13', overdue: '#791F1F', partial: '#633806', draft: '#444441' }
    const statusBg = { paid: '#E3F2DE', unpaid: '#FAECE7', overdue: '#FCEBEB', partial: '#FAEEDA', draft: '#F1EFE8' }
    const html = `<!DOCTYPE html><html><head><style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; color: #222; font-size: 13px; background: #fff; }
    .page { width: 800px; background: #fff; }
    .header { background: linear-gradient(135deg, #6B4423 0%, #8B5E34 50%, #A67C42 100%); padding: 12px 28px; display: flex; justify-content: space-between; align-items: center; }
    .logo-contact { font-size: 9px; color: rgba(255,255,255,0.7); margin-top: 3px; line-height: 1.4; }
    .inv-meta { text-align: right; color: #fff; }
    .inv-num { font-size: 19px; font-weight: 700; color: #F5D98A; }
    .inv-date { font-size: 10px; color: rgba(255,255,255,0.8); margin-top: 2px; line-height: 1.4; }
    .status-badge { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 9px; font-weight: 700; letter-spacing: 1px; margin-top: 4px; text-transform: uppercase; }
    .body { padding: 32px 40px; }
    .bill-row { display: flex; justify-content: space-between; margin-bottom: 28px; gap: 20px; }
    .bill-label { font-size: 9px; font-weight: 800; color: #8B6914; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #8B6914; padding-bottom: 3px; margin-bottom: 8px; display: inline-block; }
    .bill-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
    .bill-detail { font-size: 12px; color: #555; line-height: 1.7; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    thead tr { background: linear-gradient(135deg, #8B5E34, #8B6914); }
    th { padding: 10px 14px; text-align: left; font-size: 10px; font-weight: 700; color: #F5D98A; letter-spacing: 1px; text-transform: uppercase; }
    td { padding: 11px 14px; border-bottom: 1px solid #FBF3E4; font-size: 13px; }
    tr:nth-child(even) td { background: #faf6ee; }
    .text-right { text-align: right; }
    .totals { margin-left: auto; width: 280px; margin-top: 12px; }
    .trow { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #555; }
    .trow.grand { border-bottom: none; font-size: 17px; font-weight: 800; color: #3D2214; padding-top: 12px; }
    .trow.balance { font-weight: 700; }
    .notes { background: #faf6ee; border-left: 4px solid #8B6914; padding: 12px 16px; border-radius: 0 6px 6px 0; margin-top: 20px; font-size: 12px; color: #555; }
    .payments { margin-top: 20px; }
    .payments-title { font-size: 12px; font-weight: 700; color: #3D2214; margin-bottom: 6px; }
    .payrow { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #FBF3E4; font-size: 12px; }
    .thankyou { text-align: center; font-size: 14px; font-weight: 600; color: #8B6914; margin: 24px 0 16px; font-style: italic; }
    .footer { background: linear-gradient(135deg, #6B4423, #A67C42); padding: 18px 40px; display: flex; justify-content: space-between; align-items: center; }
    .footer-l { color: rgba(255,255,255,0.85); font-size: 11px; line-height: 1.9; }
    .footer-r { text-align: right; color: #F5D98A; font-size: 11px; line-height: 1.9; }
  </style></head><body>
  <div class="page">
    <div class="header">
      <div>
        <img src="${MALAKESA_LOGO}" alt="Malakesa Transfers and Tours" style="width:120px;border-radius:4px;display:block" />
        <div class="logo-contact">📍 Port Vila, Vanuatu &nbsp;|&nbsp; 📞 +678 22712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu</div>
      </div>
      <div class="inv-meta">
        <div style="font-size:10px;color:rgba(255,255,255,0.75);letter-spacing:1px">TAX INVOICE &nbsp;·&nbsp; TIN #445579</div>
        <div class="inv-num">${invoice.number}</div>
        <div class="inv-date">Issue: <strong>${fmtDate(invoice.date)}</strong> &nbsp;·&nbsp; Due: <strong>${fmtDate(invoice.due_date)}</strong></div>
        <div class="status-badge" style="background:${statusBg[status] || '#F1EFE8'};color:${statusColors[status] || '#444441'}">${status}</div>
      </div>
    </div>
    <div class="body">
      <div class="bill-row">
        <div>
          <div class="bill-label">Bill to</div>
          <div class="bill-name">${invoice.client_name || '—'}</div>
          <div class="bill-detail">${invoice.client_email || ''}</div>
        </div>
        <div style="text-align:right">
          <div class="bill-label">Invoice details</div>
          <div class="bill-detail">Invoice #: <strong>${invoice.number}</strong></div>
          <div class="bill-detail">Issue: <strong>${fmtDate(invoice.date)}</strong></div>
          <div class="bill-detail">Due: <strong>${fmtDate(invoice.due_date)}</strong></div>
        </div>
      </div>
      ${invoice.notes ? '<div class="notes"><strong>Notes:</strong> ' + invoice.notes + '</div>' : ''}
      <table>
        <thead><tr><th>Date</th><th>Name</th><th>Description</th><th>Voucher #</th><th class="text-right">Qty</th><th class="text-right">Rate (VT)</th><th class="text-right">Amount (VT)</th></tr></thead>
        <tbody>${(invoice.items || []).map(it => '<tr>' + (it.date ? '<td>' + it.date + '</td>' : '<td style="color:#ccc">-</td>') + (it.name ? '<td>' + it.name + '</td>' : '<td style="color:#ccc">-</td>') + '<td>' + (it.description || '') + '</td>' + (it.voucher ? '<td>' + it.voucher + '</td>' : '<td style="color:#ccc">-</td>') + '<td class="text-right">' + (it.qty || 0) + '</td><td class="text-right" style="white-space:nowrap">VT&nbsp;' + Number(it.rate || 0).toLocaleString() + '</td><td class="text-right" style="white-space:nowrap">VT&nbsp;' + Number(it.total || 0).toLocaleString() + '</td></tr>').join('')}</tbody>
      </table>
      <div class="totals">
        <div class="trow"><span>Subtotal</span><span>VT ${Number(invoice.subtotal || 0).toLocaleString()}</span></div>
        <div class="trow"><span>${invoice.tax > 0 ? 'VAT (15%)' : 'VAT'}</span><span>${invoice.tax > 0 ? 'VT ' + Number(invoice.tax).toLocaleString() : 'Not applicable'}</span></div>
        <div class="trow grand"><span>TOTAL DUE</span><span>VT ${Number(invoice.total || 0).toLocaleString()}</span></div>
        <div class="trow balance" style="color:${balance > 0 ? '#D85A30' : '#3B6D11'}"><span>Balance due</span><span>VT ${Number(balance).toLocaleString()}</span></div>
      </div>
      ${invPayments.length > 0 ? `<div class="payments"><div class="payments-title">Payments received</div>${invPayments.map(p => `<div class="payrow"><span>${fmtDate(p.date)} — ${p.method}</span><span style="color:#3B6D11;font-weight:bold">VT ${Number(p.amount).toLocaleString()}</span></div>`).join('')}</div>` : ''}
      ${balance > 0 ? `<div style="margin-top:20px;padding:14px 18px;border:1px solid #ddd;border-radius:6px;font-size:12px;line-height:1.9;color:#444">
        <div style="font-weight:700;color:#3D2214;margin-bottom:4px">Invoice Payment by Electronic Transfer to the following Account:</div>
        <div>ANZ Vanuatu Ltd, Port Vila, Vanuatu</div>
        <div><strong>ACCOUNT NAME:</strong> Malakesa Transfers &amp; Tours</div>
        <div><strong>BRANCH BSB NO:</strong> 010982</div>
        <div><strong>ACCOUNT NO:</strong> 1406817</div>
        <div><strong>SWIFT CODE:</strong> ANZBVUVX</div>
      </div>` : ''}
      <div class="thankyou">Tankiu Tumas — Thank you for choosing Malakesa Transfers &amp; Tours!</div>
    </div>
    <div class="footer">
      <div class="footer-l">
        <div><strong style="color:#F5D98A">Malakesa Transfers &amp; Tours</strong></div>
        <div>Port Vila, Shefa Province, Vanuatu</div>
        <div>📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu</div>
      </div>
      <div class="footer-r">
        <div>Payment due: ${fmtDate(invoice.due_date)}</div>
        <div style="opacity:0.7">Computer generated invoice</div>
      </div>
    </div>
  </div></body></html>`

    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.left = '-99999px'
    iframe.style.top = '0'
    iframe.style.width = '820px'
    iframe.style.height = '1200px'
    iframe.style.border = 'none'
    document.body.appendChild(iframe)
    iframe.srcdoc = html
    await new Promise(resolve => { iframe.onload = resolve })
    await new Promise(r => setTimeout(r, 400))
    const pageEl = iframe.contentDocument.querySelector('.page')
    const canvas = await window.html2canvas(pageEl, { scale: 1.5, useCORS: true, backgroundColor: '#ffffff' })
    const imgData = canvas.toDataURL('image/jpeg', 0.82)
    const { jsPDF } = window.jspdf
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = 210, pageHeight = 297
    const imgWidth = pageWidth
    const imgHeight = canvas.height * imgWidth / canvas.width
    let heightLeft = imgHeight
    let position = 0
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    document.body.removeChild(iframe)
    return pdf
  }

  const downloadInvoicePDF = async () => {
    setDownloading(true)
    try {
      const pdf = await buildInvoicePdf()
      pdf.save(`${invoice.number}.pdf`)
    } catch (err) {
      alert('Could not generate PDF: ' + err.message)
    }
    setDownloading(false)
  }

  const printReceipt = (payment) => {
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups to print receipts.'); return }
    const receiptNum = payment.receipt_number || `RCT-${(payment.id||'').slice(-4).toUpperCase()}`
    w.document.write(`<!DOCTYPE html><html><head><title>${receiptNum}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #FBF3E4; }
    .page { max-width: 520px; margin: 20px auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #6B4423 0%, #8B5E34 50%, #A67C42 100%); padding: 24px 32px; text-align: center; }
    .rec-label { font-size: 10px; color: rgba(255,255,255,0.6); letter-spacing: 3px; margin-top: 10px; }
    .rec-num { font-size: 20px; font-weight: 700; color: #F5D98A; margin-top: 2px; }
    .body { padding: 24px 32px; }
    .paid-stamp { text-align: center; margin: 16px 0; }
    .paid-box { display: inline-block; border: 3px solid #3B6D11; color: #3B6D11; font-size: 22px; font-weight: 900; letter-spacing: 6px; padding: 6px 24px; border-radius: 4px; transform: rotate(-3deg); }
    .section { margin: 16px 0; padding: 14px 16px; background: #faf6ee; border-radius: 6px; }
    .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #FBF3E4; font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .label { color: #888; }
    .val { font-weight: 600; color: #222; }
    .amount-box { background: linear-gradient(135deg, #8B5E34, #8B6914); border-radius: 6px; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; margin: 16px 0; }
    .thankyou { text-align: center; font-size: 13px; font-style: italic; color: #8B6914; margin: 16px 0 8px; }
    .footer { background: linear-gradient(135deg, #6B4423, #A67C42); padding: 14px 32px; text-align: center; color: rgba(255,255,255,0.7); font-size: 10px; line-height: 1.9; }
    .noprint { background: #333; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
    .printbtn { background: #8B6914; color: #fff; border: none; padding: 7px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .rpt-hdr { display: none; }
    @page { margin: 12mm 10mm 16mm 10mm; size: A4; }
    @media print {
      .noprint { display: none; }
      body { background: #fff; }
      .page { box-shadow: none; margin: 0; max-width: 100%; border-radius: 0; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .rpt-hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #8B6914; padding-bottom: 5px; }
      .rpt-hdr { position: fixed; top: 0; left: 0; right: 0; background: #fff; z-index: 999; padding: 5px 32px; }
      .page { padding-top: 36px; }
    }
  </style></head><body>
  <div class="rpt-hdr">
    <span style="font-size:11px;font-weight:700;color:#3D2214">Malakesa Transfers &amp; Tours &nbsp;—&nbsp; Payment Receipt &nbsp;—&nbsp; ${receiptNum}</span>
    <span style="font-size:10px;color:#888">Page <span class="pgnum"></span></span>
  </div>
  <div class="noprint"><span>${receiptNum}</span><button class="printbtn" onclick="window.print()">Print / Save PDF</button></div>
  <div class="page">
    <div class="header">
      <img src="${MALAKESA_LOGO}" alt="Malakesa Transfers and Tours" style="width:200px;border-radius:6px;display:block;margin:0 auto" />
      <div class="rec-label">PAYMENT RECEIPT</div>
      <div class="rec-num">${receiptNum}</div>
    </div>
    <div class="body">
      <div class="paid-stamp"><div class="paid-box">PAID</div></div>
      <div class="section">
        <div class="row"><span class="label">Receipt No.</span><span class="val">${receiptNum}</span></div>
        <div class="row"><span class="label">Invoice No.</span><span class="val">${invoice.number}</span></div>
        <div class="row"><span class="label">Date paid</span><span class="val">${fmtDate(payment.date)}</span></div>
        <div class="row"><span class="label">Payment method</span><span class="val">${payment.method}</span></div>
        ${payment.notes ? '<div class="row"><span class="label">Notes</span><span class="val">' + payment.notes + '</span></div>' : ''}
      </div>
      <div class="section">
        <div class="row"><span class="label">Client</span><span class="val">${invoice.client_name}</span></div>
        <div class="row"><span class="label">Invoice total</span><span class="val">VT ${Number(invoice.total).toLocaleString()}</span></div>
      </div>
      <div class="amount-box">
        <span style="color:#fff;font-weight:700;font-size:15px">AMOUNT RECEIVED</span>
        <span style="color:#F5D98A;font-weight:700;font-size:22px">VT ${Number(payment.amount).toLocaleString()}</span>
      </div>
      <div class="thankyou">Tankiu Tumas — Thank you for your payment!</div>
    </div>
    <div class="footer">
      Malakesa Transfers and Tours | Port Vila, Shefa Province, Vanuatu<br>
      +678 22712 | +678 7798712 | accounts@malakesa.vu
    </div>
  </div>
  <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const [receiptStatus, setReceiptStatus] = useState({})

  const emailReceipt = async (payment) => {
    const pid = payment.id || 'x'
    setReceiptStatus(s => ({ ...s, [pid]: 'sending' }))
    try {
      const res = await fetch('/api/send-receipt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: invoice.id, paymentId: pid }) })
      const data = await res.json()
      if (res.ok) {
        setReceiptStatus(s => ({ ...s, [pid]: 'Sent to ' + (data.sentTo || []).join(', ') }))
        setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 5000)
      } else {
        setReceiptStatus(s => ({ ...s, [pid]: 'error: ' + (data.error || 'Failed') }))
        setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 6000)
      }
    } catch (e) {
      setReceiptStatus(s => ({ ...s, [pid]: 'error: ' + e.message }))
      setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 6000)
    }
  }

  const [emailStatus, setEmailStatus] = useState('')
  const [lastEmailedAt, setLastEmailedAt] = useState(invoice.last_emailed_at || null)

  const emailInvoice = async () => {
    setEmailStatus('sending')
    try {
      const pdf = await buildInvoicePdf()
      const dataUri = pdf.output('datauristring')
      const pdfBase64 = dataUri.split(',')[1]
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 60000)
      let res
      try {
        res = await fetch('/api/send-invoice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: invoice.id, pdfBase64 }), signal: controller.signal })
      } finally {
        clearTimeout(timeoutId)
      }
      const data = await res.json()
      if (res.ok) {
        setEmailStatus('Sent to ' + (data.sentTo || []).join(', '))
        setLastEmailedAt(data.lastEmailedAt || new Date().toISOString())
        setTimeout(() => setEmailStatus(''), 5000)
        return
      }
      setEmailStatus('error: ' + (data.error || 'Failed to send'))
      setTimeout(() => setEmailStatus(''), 6000)
    } catch (e) {
      const msg = e.name === 'AbortError' ? 'Sending took too long — check your connection and try again' : e.message
      setEmailStatus('error: ' + msg)
      setTimeout(() => setEmailStatus(''), 8000)
    }
  }

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.number} from Malakesa Transfers and Tours`)
    const body = encodeURIComponent(`Dear ${invoice.client_name},\n\nPlease find your invoice ${invoice.number} for ${fmt(invoice.total)}, due ${fmtDate(invoice.due_date)}.\n\nTotal: ${fmt(invoice.total)}\nBalance due: ${fmt(balance)}\n\nThank you,\nMalakesa Transfers and Tours`)
    window.open(`mailto:${invoice.client_email || ''}?subject=${subject}&body=${body}`, '_blank')
  }

  return (
    <Modal title={invoice.number} onClose={onClose} wide>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Badge status={status} />
          {lastEmailedAt && (
            <span style={{ fontSize: 12, color: '#3B6D11', display: 'flex', alignItems: 'center', gap: 4 }} title={`Last emailed ${new Date(lastEmailedAt).toLocaleString()}`}>
              <i className="ti ti-mail-check"></i> Emailed {new Date(lastEmailedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-sm" onClick={printInvoice}><i className="ti ti-printer"></i> Print</button>
          <button className="btn btn-sm" onClick={downloadInvoicePDF} disabled={downloading}><i className="ti ti-download"></i> {downloading ? 'Generating...' : 'Download PDF'}</button>
          <button className="btn btn-sm" onClick={emailInvoice} disabled={emailStatus === 'sending'}><i className="ti ti-mail"></i> {emailStatus === 'sending' ? 'Sending...' : 'Email'}</button>
          {emailStatus && emailStatus !== 'sending' && (
            <span style={{ fontSize: 12, color: emailStatus.startsWith('error') ? '#D85A30' : '#3B6D11', display: 'flex', alignItems: 'center', gap: 6 }}>
              {emailStatus.startsWith('error') ? emailStatus.replace('error: ', '') : emailStatus}
              {emailStatus.startsWith('error') && <button className="btn btn-sm" onClick={mailtoFallback} style={{ fontSize: 11 }}>Open in mail app</button>}
            </span>
          )}
          {balance > 0 && <button className="btn btn-sm" style={{ borderColor: '#3B6D11', color: '#3B6D11' }} onClick={onPay}><i className="ti ti-cash"></i> Record payment</button>}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div><div style={{ fontSize: 12, color: '#666' }}>Bill to</div><div style={{ fontWeight: 500 }}>{invoice.client_name}</div><div style={{ fontSize: 12, color: '#666' }}>{invoice.client_email}</div></div>
        <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, color: '#666' }}>Issue date</div><div>{fmtDate(invoice.date)}</div><div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Due date</div><div style={status === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(invoice.due_date)}</div></div>
      </div>
      {invoice.notes && <div style={{ marginTop: 4, marginBottom: 12, padding: '10px 14px', background: '#FBF3E4', borderRadius: 8, fontSize: 13, color: '#666' }}>{invoice.notes}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 12 }}>
        <thead><tr style={{ background: '#FBF3E4' }}><Th>Date</Th><Th>Name</Th><Th>Description</Th><Th>Voucher #</Th><Th style={{ textAlign: 'center' }}>Qty</Th><Th style={{ textAlign: 'right' }}>Rate</Th><Th style={{ textAlign: 'right' }}>Total</Th></tr></thead>
        <tbody>{(invoice.items || []).map((it, i) => <tr key={i} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}><Td>{it.date || ''}</Td><Td>{it.name || ''}</Td><Td>{it.description}</Td><Td style={{ color: '#555' }}>{it.voucher || ''}</Td><Td style={{ textAlign: 'center' }}>{it.qty}</Td><Td style={{ textAlign: 'right' }}>{fmt(it.rate)}</Td><Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(it.total)}</Td></tr>)}</tbody>
      </table>
      <div style={{ marginLeft: 'auto', width: 260 }}>
        {[['Subtotal', fmt(invoice.subtotal)], [Number(invoice.tax) > 0 ? 'VAT (15%)' : 'VAT', Number(invoice.tax) > 0 ? fmt(invoice.tax) : 'Not applicable'], ['Total', fmt(invoice.total)]].map(([l, v], i) => <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.09)' : 'none', fontWeight: i === 2 ? 500 : 400 }}><span style={{ color: i < 2 ? '#666' : 'inherit' }}>{l}</span><span>{v}</span></div>)}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontWeight: 500, color: balance > 0 ? '#D85A30' : '#3B6D11' }}><span>Balance due</span><span>{fmt(balance)}</span></div>
      </div>
      {invPayments.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>Payments received</div>
          {invPayments.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13, gap: 8 }}>
              <span><span style={{ color: '#8B6914', fontWeight: 600, marginRight: 6 }}>{p.receipt_number || '—'}</span>{fmtDate(p.date)} — <span style={{ background: '#FBF3E4', padding: '1px 8px', borderRadius: 99, fontSize: 11 }}>{p.method}</span>{p.note ? ` · ${p.note}` : ''}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#3B6D11', fontWeight: 500 }}>{fmt(p.amount)}</span>
                <button className="btn btn-sm" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => printReceipt(p)}><i className="ti ti-printer"></i> Receipt</button>
                <button className="btn btn-sm" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => emailReceipt(p)} disabled={receiptStatus[p.id] === 'sending'}><i className="ti ti-mail"></i> {receiptStatus[p.id] === 'sending' ? '...' : 'Receipt'}</button>
                {receiptStatus[p.id] && receiptStatus[p.id] !== 'sending' && <span style={{ fontSize: 11, color: receiptStatus[p.id].startsWith('error') ? '#D85A30' : '#3B6D11' }}>{receiptStatus[p.id].startsWith('error') ? 'Failed' : '✓ Sent'}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}

function NewClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [emails, setEmails] = useState([''])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const addEmail = () => setEmails(e => [...e, ''])
  const removeEmail = (idx) => setEmails(e => e.filter((_, i) => i !== idx))
  const updateEmail = (idx, val) => setEmails(e => e.map((em, i) => i === idx ? val : em))

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required'); return }
    const validEmails = emails.filter(e => e.trim())
    setSaving(true)
    try {
      const res = await fetch('/api/clients', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, email: validEmails[0] || '', email2: validEmails[1] || null, email3: validEmails[2] || null, all_emails: validEmails.join(', ') })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to save client'); setSaving(false); return }
      onSave()
    } catch(e) { setError('Network error — please try again'); setSaving(false) }
  }

  return (
    <Modal title="Add Client" onClose={onClose}>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Business / client name *">
          <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="e.g. Blue Lagoon Resorts" />
        </Field>
        <div>
          <label style={{ fontSize: 12, color: '#666', fontWeight: 500, marginBottom: 6, display: 'block' }}>
            Email address(es) <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 8 }}>— invoices & reminders sent to all</span>
          </label>
          {emails.map((em, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <input type="email" value={em} onChange={e => updateEmail(idx, e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder={idx === 0 ? 'primary@client.vu' : `additional${idx + 1}@client.vu`} />
              {idx === 0
                ? <button className="btn btn-sm" onClick={addEmail} style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff' }}><i className="ti ti-plus"></i></button>
                : <button className="btn btn-sm btn-danger" onClick={() => removeEmail(idx)}><i className="ti ti-x"></i></button>
              }
            </div>
          ))}
          {emails.length > 1 && <div style={{ fontSize: 11, color: '#8B6914', marginTop: 2 }}>✓ Emails & reminders will be sent to all {emails.filter(e=>e.trim()).length} addresses</div>}
        </div>
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
    <div style={{ background: '#FBF3E4', borderRadius: 8, padding: '14px 16px', ...style }}>
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
