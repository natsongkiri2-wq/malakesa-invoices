'use client'

// ─── /app/expenses/record/page.tsx ───────────────────────────────────────────
// Record a new expense and view recent expense history.

import { useState } from 'react'
import Link from 'next/link'
import {
  type Expense,
  type ExpenseCategory,
  type PaymentMethod,
  EXPENSE_CATEGORIES,
  PAYMENT_METHODS,
  SEED_EXPENSES,
  formatVUV,
  formatDate,
  genId,
} from '@/lib/expenses'
import ExpenseBadge from '@/components/expenses/ExpenseBadge'
import '@/components/expenses/expenses.css'

const TODAY = new Date().toISOString().slice(0, 10)

function emptyForm() {
  return {
    date: TODAY,
    category: 'Fuel' as ExpenseCategory,
    vendor: '',
    amount: '',
    method: 'Cash' as PaymentMethod,
    receipt: '',
    notes: '',
  }
}

export default function RecordExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(SEED_EXPENSES)
  const [form, setForm] = useState(emptyForm())
  const [toast, setToast] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // ── Field change ──────────────────────────────────────────────────────────
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // ── Validate ──────────────────────────────────────────────────────────────
  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!form.amount || Number(form.amount) <= 0) next.amount = 'Enter a valid amount'
    if (!form.vendor.trim()) next.vendor = 'Vendor name is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  function handleSave() {
    if (!validate()) return

    const newExpense: Expense = {
      id: genId(),
      date: form.date,
      category: form.category,
      vendor: form.vendor.trim(),
      amount: Number(form.amount),
      method: form.method,
      receipt: form.receipt.trim() || undefined,
      notes: form.notes.trim() || undefined,
      status: 'paid',
      paidDate: form.date,
    }

    setExpenses((prev) => [newExpense, ...prev])
    setForm(emptyForm())
    showToast(`Expense of ${formatVUV(newExpense.amount)} recorded successfully!`)
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="exp-page-wrap">
      {/* Page header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--mal-text)', marginBottom: 4 }}>
            Record Expense
          </h1>
          <p style={{ fontSize: 12, color: 'var(--mal-text-dim)' }}>
            Log a new business expense for Malakesa Transfer &amp; Tour
          </p>
        </div>
        <button className="exp-btn-primary" onClick={handleSave}>
          + Save Expense
        </button>
      </div>

      {/* Success toast */}
      {toast && <div className="exp-toast">✓ {toast}</div>}

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <div className="exp-card">
        <div className="exp-card-header">
          <span className="exp-card-title">New Expense Entry</span>
          <span style={{ fontSize: 11, color: 'var(--mal-text-dim)' }}>All amounts in VUV</span>
        </div>
        <div className="exp-card-body">
          <div className="exp-form-grid">

            {/* Date */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="date">Date</label>
              <input
                id="date" name="date" type="date"
                className="exp-input" value={form.date}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="category">Category</label>
              <select
                id="category" name="category"
                className="exp-select" value={form.category}
                onChange={handleChange}
              >
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="amount">Amount (VUV)</label>
              <input
                id="amount" name="amount" type="number" min="0"
                className={`exp-input${errors.amount ? ' error' : ''}`}
                placeholder="0"
                value={form.amount}
                onChange={handleChange}
              />
              {errors.amount && (
                <span style={{ fontSize: 11, color: 'var(--mal-danger)' }}>{errors.amount}</span>
              )}
            </div>

            {/* Vendor */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="vendor">Supplier / Vendor</label>
              <input
                id="vendor" name="vendor" type="text"
                className={`exp-input${errors.vendor ? ' error' : ''}`}
                placeholder="e.g. Total Petrol Station"
                value={form.vendor}
                onChange={handleChange}
              />
              {errors.vendor && (
                <span style={{ fontSize: 11, color: 'var(--mal-danger)' }}>{errors.vendor}</span>
              )}
            </div>

            {/* Payment method */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="method">Payment Method</label>
              <select
                id="method" name="method"
                className="exp-select" value={form.method}
                onChange={handleChange}
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Receipt */}
            <div className="exp-form-group">
              <label className="exp-label" htmlFor="receipt">Receipt # (optional)</label>
              <input
                id="receipt" name="receipt" type="text"
                className="exp-input" placeholder="e.g. REC-001"
                value={form.receipt}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div className="exp-form-group full">
              <label className="exp-label" htmlFor="notes">Description / Notes</label>
              <textarea
                id="notes" name="notes"
                className="exp-textarea"
                placeholder="Add any notes about this expense..."
                value={form.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="exp-form-actions">
            <button className="exp-btn-primary" onClick={handleSave}>
              + Save Expense
            </button>
            <button className="exp-btn-ghost" onClick={() => setForm(emptyForm())}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ── Recent expenses table ─────────────────────────────────────────── */}
      <div className="exp-card">
        <div className="exp-card-header">
          <span className="exp-card-title">Recent Expenses</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--mal-text-dim)', alignSelf: 'center' }}>
              {expenses.length} records
            </span>
            <Link href="/expenses/reports">
              <button className="exp-btn-ghost exp-btn-sm">View Reports →</button>
            </Link>
          </div>
        </div>

        <div className="exp-table-wrap">
          <table className="exp-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Vendor</th>
                <th>Method</th>
                <th>Amount (VUV)</th>
                <th>Receipt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{formatDate(exp.date)}</td>
                  <td>{exp.category}</td>
                  <td>{exp.vendor}</td>
                  <td>{exp.method}</td>
                  <td className={`exp-amount${exp.status === 'overdue' ? ' red' : ''}`}>
                    {exp.amount.toLocaleString()}
                  </td>
                  <td style={{ color: 'var(--mal-text-dim)' }}>{exp.receipt ?? '—'}</td>
                  <td><ExpenseBadge status={exp.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
