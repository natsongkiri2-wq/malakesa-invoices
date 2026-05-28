'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { today, addDays, fmt } from '@/lib/utils'

const emptyItem = () => ({ id: Date.now()+Math.random(), description: '', qty: 1, rate: '', total: 0 })

function NewInvoiceContent() {
  const router = useRouter()
  const [clients, setClients] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ client_id:'', client_name:'', client_email:'', date:today(), due_date:addDays(today(),14), notes:'' })
  const [items, setItems] = useState([emptyItem(), emptyItem()])

  useEffect(() => { fetch('/api/clients').then(r => r.json()).then(setClients).catch(()=>{}) }, [])

  const handleClientChange = (e) => {
    const id = e.target.value
    const client = clients.find(c => c.id === id)
    if (client) setForm(f => ({ ...f, client_id: id, client_name: client.name, client_email: client.email||'' }))
    else setForm(f => ({ ...f, client_id:'', client_name:'', client_email:'' }))
  }

  const updateItem = (id, field, value) => setItems(items => items.map(item => {
    if (item.id !== id) return item
    const updated = { ...item, [field]: value }
    updated.total = (parseFloat(updated.qty)||0)*(parseFloat(updated.rate)||0)
    return updated
  }))

  const subtotal = items.reduce((s,i) => s+(i.total||0), 0)

  const handleSubmit = async () => {
    setError('')
    if (!form.client_id) { setError('Please select a client'); return }
    const validItems = items.filter(i => i.description.trim())
    if (validItems.length === 0) { setError('Add at least one line item'); return }
    setSaving(true)
    const res = await fetch('/api/invoices', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, items: validItems.map(({id,...rest})=>rest), subtotal, tax:0, total:subtotal }) })
    const data = await res.json()
    if (!res.ok) { setError(data.error||'Failed to save'); setSaving(false); return }
    router.push(`/invoices/${data.id}`)
  }

  return (
    <>
      <div className="topbar">
        <h1>New Invoice</h1>
        <div className="action-row">
          <button className="btn" onClick={() => router.back()}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}><i className="ti ti-check"></i>{saving?'Saving...':'Save Invoice'}</button>
        </div>
      </div>
      <div className="content">
        {error && <div className="alert alert-danger"><i className="ti ti-alert-circle"></i>{error}</div>}
        <div className="card">
          <div className="section-title">Client details</div>
          <div className="form-grid">
            <div className="form-group"><label>Client *</label>
              <select value={form.client_id} onChange={handleClientChange}>
                <option value="">— Select a client —</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Client email</label><input type="email" value={form.client_email} onChange={e => setForm(f=>({...f,client_email:e.target.value}))} placeholder="client@email.com" /></div>
            <div className="form-group"><label>Invoice date</label><input type="date" value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))} /></div>
            <div className="form-group"><label>Due date</label><input type="date" value={form.due_date} onChange={e => setForm(f=>({...f,due_date:e.target.value}))} /></div>
            <div className="form-group full"><label>Notes / trip details</label><textarea value={form.notes} onChange={e => setForm(f=>({...f,notes:e.target.value}))} placeholder="Route, pickup time, special instructions..." /></div>
          </div>
        </div>
        <div className="card">
          <div className="section-title">Line items</div>
          <table className="items-table">
            <thead><tr><th style={{width:'42%'}}>Description</th><th style={{width:'13%'}}>Qty</th><th style={{width:'20%'}}>Rate (VT)</th><th style={{width:'18%'}}>Total</th><th style={{width:'7%'}}></th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td><input type="text" value={item.description} onChange={e => updateItem(item.id,'description',e.target.value)} placeholder="e.g. Airport transfer, Island tour..." /></td>
                  <td><input type="number" value={item.qty} min="0" step="0.5" onChange={e => updateItem(item.id,'qty',e.target.value)} /></td>
                  <td><input type="number" value={item.rate} min="0" onChange={e => updateItem(item.id,'rate',e.target.value)} placeholder="0" /></td>
                  <td style={{padding:'5px 10px',fontWeight:500}}>{fmt(item.total)}</td>
                  <td><button className="btn btn-sm" onClick={() => setItems(i=>i.filter(x=>x.id!==item.id))}><i className="ti ti-x"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-sm" onClick={() => setItems(i=>[...i,emptyItem()])}><i className="ti ti-plus"></i> Add item</button>
          <div className="totals-box">
            <div className="totals-row"><span style={{color:'var(--muted)'}}>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="totals-row"><span style={{color:'var(--muted)'}}>Tax (0%)</span><span>VT 0</span></div>
            <div className="totals-row"><span>Total</span><span>{fmt(subtotal)}</span></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function NewInvoicePage() {
  return <Suspense fallback={<div className="loading">Loading...</div>}><NewInvoiceContent /></Suspense>
}
