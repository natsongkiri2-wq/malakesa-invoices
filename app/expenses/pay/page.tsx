'use client'

// ─── /app/expenses/pay/page.tsx ───────────────────────────────────────────────
// View unpaid/overdue expenses and mark them as paid.

import { useState } from 'react'
import {
  type Expense,
  type PaymentMethod,
  PAYMENT_METHODS,
  SEED_EXPENSES,
  formatVUV,
  formatDate,
  genId,
} from '@/lib/expenses'
import ExpenseBadge from '@/components/expenses/ExpenseBadge'
import '@/components/expenses/expenses.css'

const TODAY = new Date().toISOString().slice(0, 10)

// Pre-filter to unpaid only for this page
const UNPAID_SEED = SEED_EXPENSES.filter((e) => e.status !== 'paid')

export default function PayExpensesPage() {
  const [unpaid, setUnpaid] = useState<Expense[]>(UNPAID_SEED)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<string | null>(null)

  // Quick-pay form
  const [payForm, setPayForm] = useState({
    expenseId: '',
    amount: '',
    date: TODAY,
    method: 'Cash' as PaymentMethod,
    reference: '',
  })

  // ── Stats ─────────────────────────────────────────────────────────────────
  const overdue   = unpaid.filter((e) => e.status === 'overdue')
  const dueSoon   = unpaid.filter((e) => e.status === 'pending')
  const overdueAmt = overdue.reduce((s, e) => s + e.amount, 0)
  const pendingAmt = dueSoon.reduce((s, e) => s + e.amount, 0)
  const paidThisMonth = 245000 // static for demo — replace with real data

  // ── Toggle row selection ──────────────────────────────────────────────────
  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === unpaid.length
        ? new Set()
        : new Set(unpaid.map((e) => e.id))
    )
  }

  // ── Mark single expense paid ──────────────────────────────────────────────
  function markPaid(id: string) {
    setUnpaid((prev) => prev.filter((e) => e.id !== id))
    showToast('Payment recorded — expense marked as paid.')
  }

  // ── Mark selected paid ────────────────────────────────────────────────────
  function markSelectedPaid() {
    if (selected.size === 0) return
    setUnpaid((prev) => prev.filter((e) => !selected.has(e.id)))
    showToast(`${selected.size} expense(s) marked as paid.`)
    setSelected(new Set())
  }

  // ── Record payment via form ───────────────────────────────────────────────
  function handleRecordPayment() {
    if (!payForm.expenseId || !payForm.amount) {
      showToast('Please select an expense and enter the amount paid.')
      return
    }
    markPaid(payForm.expenseId)
    setPayForm({ expenseId: '', amount: '', date: TODAY, method: 'Cash', reference: '' })
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="exp-page-wrap">
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--mal-text)', marginBottom: 4 }}>
            Pay Expenses
          </h1>
          <p style={{ fontSize: 12, color: 'var(--mal-text-dim)' }}>
            Review outstanding bills and record payments
          </p>
        </div>
        {selected.size > 0 && (
          <button className="exp-btn-primary" onClick={markSelectedPaid}>
            ✓ Pay {selected.size} Selected
          </button>
        )}
      </div>

      {toast && <div className="exp-toast">✓ {toast}</div>}

      {/* ── Summary stats ─────────────────────────────────────────────────── */}
      <div className="exp-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="exp-stat">
          <div className="exp-stat-label">Overdue</div>
          <div className="exp-stat-value red">{formatVUV(overdueAmt)}</div>
          <div className="exp-stat-sub">{overdue.length} unpaid bill{overdue.length !== 1 ? 's' : ''}</div>
        </div>
        <div className="exp-stat">
          <div className="exp-stat-label">Due This Week</div>
          <div className="exp-stat-value gold">{formatVUV(pendingAmt)}</div>
          <div className="exp-stat-sub">{dueSoon.length} pending</div>
        </div>
        <div className="exp-stat">
          <div className="exp-stat-label">Paid This Month</div>
          <div className="exp-stat-value green">{formatVUV(paidThisMonth)}</div>
          <div className="exp-stat-sub">14 transactions</div>
        </div>
      </div>

      {/* ── Unpaid expenses table ─────────────────────────────────────────── */}
      <div className="exp-card">
        <div className="exp-card-header">
          <span className="exp-card-title">Unpaid Expenses</span>
          <span style={{ fontSize: 11, color: 'var(--mal-text-dim)' }}>
            {unpaid.length} outstanding
          </span>
        </div>

        {unpaid.length === 0 ? (
          <div className="exp-card-body" style={{ textAlign: 'center', color: 'var(--mal-text-dim)', padding: '32px 18px' }}>
            🎉 All expenses are paid!
          </div>
        ) : (
          <div className="exp-table-wrap">
            <table className="exp-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selected.size === unpaid.length && unpaid.length > 0}
                      onChange={toggleAll}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th>Due Date</th>
                  <th>Category</th>
                  <th>Vendor</th>
                  <th>Amount (VUV)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {unpaid.map((exp) => (
                  <tr key={exp.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.has(exp.id)}
                        onChange={() => toggleSelect(exp.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td className={exp.status === 'overdue' ? 'exp-text-danger' : ''}>
                      {formatDate(exp.date)}
                    </td>
                    <td>{exp.category}</td>
                    <td>{exp.vendor}</td>
                    <td className={`exp-amount${exp.status === 'overdue' ? ' red' : ''}`}>
                      {exp.amount.toLocaleString()}
                    </td>
                    <td><ExpenseBadge status={exp.status} /></td>
                    <td>
                      <button
                        className="exp-btn-primary exp-btn-sm"
                        onClick={() => markPaid(exp.id)}
                      >
                        Pay Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Record payment form ───────────────────────────────────────────── */}
      <div className="exp-card">
        <div className="exp-card-header">
          <span className="exp-card-title">Record a Payment</span>
          <span style={{ fontSize: 11, color: 'var(--mal-text-dim)' }}>
            Select expense and confirm details
          </span>
        </div>
        <div className="exp-card-body">
          <div className="exp-form-grid">

            {/* Expense selector */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="expenseId">Expense / Bill</label>
              <select
                id="expenseId"
                className="exp-select"
                value={payForm.expenseId}
                onChange={(e) => {
                  const exp = unpaid.find((x) => x.id === e.target.value)
                  setPayForm((prev) => ({
                    ...prev,
                    expenseId: e.target.value,
                    amount: exp ? String(exp.amount) : prev.amount,
                  }))
                }}
              >
                <option value="">— Select expense —</option>
                {unpaid.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.vendor} — {formatVUV(exp.amount)} ({exp.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="payAmount">Amount Paid (VUV)</label>
              <input
                id="payAmount" type="number" min="0"
                className="exp-input"
                placeholder="0"
                value={payForm.amount}
                onChange={(e) => setPayForm((prev) => ({ ...prev, amount: e.target.value }))}
              />
            </div>

            {/* Date */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="payDate">Payment Date</label>
              <input
                id="payDate" type="date"
                className="exp-input"
                value={payForm.date}
                onChange={(e) => setPayForm((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>

            {/* Method */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="payMethod">Payment Method</label>
              <select
                id="payMethod"
                className="exp-select"
                value={payForm.method}
                onChange={(e) =>
                  setPayForm((prev) => ({ ...prev, method: e.target.value as PaymentMethod }))
                }
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Reference */}
            <div className="exp-form-group full">
              <label className="exp-label" htmlFor="payRef">Payment Reference / Notes</label>
              <textarea
                id="payRef"
                className="exp-textarea"
                placeholder="Bank transfer ref, cheque number, notes..."
                value={payForm.reference}
                onChange={(e) => setPayForm((prev) => ({ ...prev, reference: e.target.value }))}
              />
            </div>
          </div>

          <div className="exp-form-actions">
            <button className="exp-btn-primary" onClick={handleRecordPayment}>
              ✓ Confirm Payment
            </button>
            <button
              className="exp-btn-ghost"
              onClick={() =>
                setPayForm({ expenseId: '', amount: '', date: TODAY, method: 'Cash', reference: '' })
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
