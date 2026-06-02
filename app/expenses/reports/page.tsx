'use client'

// ─── /app/expenses/reports/page.tsx ──────────────────────────────────────────
// Expense analytics: monthly summary, by category, by vendor. Export options.

import { useState } from 'react'
import {
  formatVUV,
  MONTHLY_DATA,
  CATEGORY_DATA,
  VENDOR_DATA,
} from '@/lib/expenses'
import BarChart from '@/components/expenses/BarChart'
import '@/components/expenses/expenses.css'

type TabId = 'monthly' | 'category' | 'vendor'

const TABS: { id: TabId; label: string }[] = [
  { id: 'monthly',  label: 'Monthly Summary' },
  { id: 'category', label: 'By Category' },
  { id: 'vendor',   label: 'By Vendor' },
]

export default function ExpenseReportsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('monthly')

  // Export form state
  const [exportFrom, setExportFrom] = useState('2026-05-01')
  const [exportTo,   setExportTo]   = useState('2026-05-31')
  const [exportFmt,  setExportFmt]  = useState('PDF')
  const [exportToast, setExportToast] = useState(false)

  function handleExport() {
    setExportToast(true)
    setTimeout(() => setExportToast(false), 3000)
    // ── Replace this with your real export/API call ──────────────────────
    console.log('Export', { from: exportFrom, to: exportTo, format: exportFmt })
  }

  // Derived stats
  const juneTotal   = MONTHLY_DATA.find((d) => d.month === 'Jun 2026')?.total ?? 0
  const mayTotal    = MONTHLY_DATA.find((d) => d.month === 'May 2026')?.total ?? 0
  const changePct   = Math.round(((juneTotal - mayTotal) / mayTotal) * 100)
  const annualTotal = MONTHLY_DATA.reduce((s, d) => s + d.total, 0)

  const maxMonthly  = Math.max(...MONTHLY_DATA.map((d) => d.total))
  const maxCategory = Math.max(...CATEGORY_DATA.map((d) => d.thisMonth))
  const maxVendor   = Math.max(...VENDOR_DATA.map((d) => d.amount))

  return (
    <main className="exp-page-wrap">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--mal-text)', marginBottom: 4 }}>
          Expense Reports
        </h1>
        <p style={{ fontSize: 12, color: 'var(--mal-text-dim)' }}>
          Analyse and export business expenses for Malakesa Transfer &amp; Tour
        </p>
      </div>

      {exportToast && (
        <div className="exp-toast">✓ Report export started — check your downloads.</div>
      )}

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="exp-tabs">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            className={`exp-tab${activeTab === id ? ' active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Monthly Summary ───────────────────────────────────────────────── */}
      {activeTab === 'monthly' && (
        <>
          <div className="exp-stats-grid">
            <div className="exp-stat">
              <div className="exp-stat-label">Total June (MTD)</div>
              <div className="exp-stat-value gold">{formatVUV(juneTotal)}</div>
              <div className="exp-stat-sub">Month to date</div>
            </div>
            <div className="exp-stat">
              <div className="exp-stat-label">Total May</div>
              <div className="exp-stat-value gold">{formatVUV(mayTotal)}</div>
              <div className="exp-stat-sub">Full month</div>
            </div>
            <div className="exp-stat">
              <div className="exp-stat-label">vs Last Month</div>
              <div className={`exp-stat-value${changePct < 0 ? ' green' : ' red'}`}>
                {changePct > 0 ? '+' : ''}{changePct}%
              </div>
              <div className="exp-stat-sub">
                {changePct < 0 ? 'Expenses down ↓' : 'Expenses up ↑'}
              </div>
            </div>
            <div className="exp-stat">
              <div className="exp-stat-label">Annual Total</div>
              <div className="exp-stat-value">{formatVUV(annualTotal)}</div>
              <div className="exp-stat-sub">Jan – Jun 2026</div>
            </div>
          </div>

          <div className="exp-card">
            <div className="exp-card-header">
              <span className="exp-card-title">Monthly Expenses — 2026</span>
            </div>
            <div className="exp-card-body">
              <BarChart
                data={MONTHLY_DATA.map((d) => ({ label: d.month, value: d.total }))}
                maxValue={maxMonthly}
              />
            </div>
          </div>
        </>
      )}

      {/* ── By Category ──────────────────────────────────────────────────── */}
      {activeTab === 'category' && (
        <>
          <div className="exp-card">
            <div className="exp-card-header">
              <span className="exp-card-title">Expenses by Category — May 2026</span>
            </div>
            <div className="exp-card-body">
              <BarChart
                data={CATEGORY_DATA.map((d) => ({ label: d.category, value: d.thisMonth }))}
                maxValue={maxCategory}
              />
            </div>
          </div>

          <div className="exp-card">
            <div className="exp-card-header">
              <span className="exp-card-title">Category Breakdown — Month on Month</span>
            </div>
            <div className="exp-table-wrap">
              <table className="exp-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>This Month (VUV)</th>
                    <th>Last Month (VUV)</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {CATEGORY_DATA.map(({ category, thisMonth, lastMonth }) => {
                    const diff = lastMonth > 0
                      ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100)
                      : 0
                    return (
                      <tr key={category}>
                        <td>{category}</td>
                        <td className="exp-amount">{thisMonth.toLocaleString()}</td>
                        <td style={{ color: 'var(--mal-text-dim)' }}>{lastMonth.toLocaleString()}</td>
                        <td className={diff < 0 ? 'exp-text-success' : diff > 0 ? 'exp-text-danger' : ''}>
                          {diff > 0 ? '+' : ''}{diff}%
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ── By Vendor ────────────────────────────────────────────────────── */}
      {activeTab === 'vendor' && (
        <div className="exp-card">
          <div className="exp-card-header">
            <span className="exp-card-title">Top Vendors — May 2026</span>
          </div>
          <div className="exp-card-body">
            <BarChart
              data={VENDOR_DATA.map((d) => ({ label: d.vendor, value: d.amount }))}
              maxValue={maxVendor}
            />
          </div>
        </div>
      )}

      {/* ── Export ───────────────────────────────────────────────────────── */}
      <div className="exp-card" style={{ marginTop: 8 }}>
        <div className="exp-card-header">
          <span className="exp-card-title">Export Report</span>
        </div>
        <div className="exp-card-body">
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>

            <div className="exp-form-group">
              <label className="exp-label" htmlFor="expFrom">From</label>
              <input
                id="expFrom" type="date"
                className="exp-input" style={{ width: 160 }}
                value={exportFrom}
                onChange={(e) => setExportFrom(e.target.value)}
              />
            </div>

            <div className="exp-form-group">
              <label className="exp-label" htmlFor="expTo">To</label>
              <input
                id="expTo" type="date"
                className="exp-input" style={{ width: 160 }}
                value={exportTo}
                onChange={(e) => setExportTo(e.target.value)}
              />
            </div>

            <div className="exp-form-group">
              <label className="exp-label" htmlFor="expFmt">Format</label>
              <select
                id="expFmt"
                className="exp-select" style={{ width: 120 }}
                value={exportFmt}
                onChange={(e) => setExportFmt(e.target.value)}
              >
                <option>PDF</option>
                <option>CSV</option>
                <option>Excel</option>
              </select>
            </div>

            <button className="exp-btn-primary" onClick={handleExport}>
              ↓ Download Report
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
