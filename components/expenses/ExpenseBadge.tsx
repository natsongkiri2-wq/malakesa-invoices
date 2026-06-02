// ─── ExpenseBadge — status pill for expense rows ─────────────────────────────

import type { ExpenseStatus } from '@/lib/expenses'

const LABELS: Record<ExpenseStatus, string> = {
  paid: 'Paid',
  pending: 'Pending',
  overdue: 'Overdue',
}

export default function ExpenseBadge({ status }: { status: ExpenseStatus }) {
  return (
    <span className={`exp-badge ${status}`}>
      {LABELS[status]}
    </span>
  )
}
