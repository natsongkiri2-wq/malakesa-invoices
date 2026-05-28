'use client'
import { useEffect, useState, Suspense } from 'react'

function ClientsContent() {
  const [clients, setClients] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [error, setError] = useState('')

  const load = () => {
    Promise.all([
      fetch('/api/clients').then(r => r.json()),
      fetch('/api/invoices').then(r => r.json()),
    ]).then(([cls, invs]) => { setClients(cls); setInvoices(invs); setLoading(false) }).catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const saveClient = async () => {
    setError('')
    if (!form.name.trim()) { setError('Name is required'); return }
    setSaving(true)
    await fetch('/api/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false); setShowModal(false); setForm({ name: '', email: '', phone: '', address: '' }); load()
  }

  const deleteClient = async (id) => {
    if (!confirm('Delete this client?')) return
    await fetch(`/api/clients/${id}`, { method: 'DELETE' }); load()
  }

  return (
    <>
      <div className="topbar"><h1>Clients</h1><button className="btn btn-primary" onClick={() => setShowModal(true)}><i className="ti ti-plus"></i> Add Client</button></div>
      <div className="content">
        {loading ? <div className="loading">Loading...</div> : (
          <div className="card card-flush">
            {clients.length === 0 ? (
              <div className="empty"><i className="ti ti-users"></i><p>No clients yet</p><button className="btn btn-primary" onClick={() => setShowModal(true)}>Add first client</button></div>
            ) : (
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th style={{ textAlign: 'center' }}>Invoices</th><th></th></tr></thead>
                <tbody>
                  {clients.map(c => (
                    <tr key={c.id}>
                      <td><strong>{c.name}</strong></td>
                      <td style={{ color: 'var(--muted)' }}>{c.email || '—'}</td>
                      <td style={{ color: 'var(--muted)' }}>{c.phone || '—'}</td>
                      <td style={{ color: 'var(--muted)' }}>{c.address || '—'}</td>
                      <td style={{ textAlign: 'center' }}>{invoices.filter(i => i.client_id === c.id).length}</td>
                      <td><button className="btn btn-sm btn-danger" onClick={() => deleteClient(c.id)}><i className="ti ti-trash"></i></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}>
          <div className="modal">
            <div className="modal-header"><span className="modal-title">Add Client</span><button className="btn btn-sm" onClick={() => setShowModal(false)}><i className="ti ti-x"></i></button></div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="form-group"><label>Business / client name *</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Blue Lagoon Resorts" /></div>
              <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="contact@client.vu" /></div>
              <div className="form-group"><label>Phone</label><input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+678 ..." /></div>
              <div className="form-group"><label>Address</label><input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Port Vila, Vanuatu" /></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
              <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveClient} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Save Client'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function ClientsPage() {
  return <Suspense fallback={<div className="loading">Loading...</div>}><ClientsContent /></Suspense>
}
