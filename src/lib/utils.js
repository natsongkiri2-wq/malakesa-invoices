export const fmt = (n) => 'VT ' + Number(n || 0).toLocaleString()

export const fmtDate = (d) => {
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

export const today = () => new Date().toISOString().split('T')[0]

export const addDays = (d, n) => {
  const dt = new Date(d)
  dt.setDate(dt.getDate() + n)
  return dt.toISOString().split('T')[0]
}

export const getBalance = (inv) => {
  const paid = (inv.payments || []).reduce((s, p) => s + Number(p.amount), 0)
  return Math.max(0, Number(inv.total) - paid)
}

export const getStatus = (inv) => {
  const paid = (inv.payments || []).reduce((s, p) => s + Number(p.amount), 0)
  if (paid >= Number(inv.total)) return 'paid'
  if (paid > 0) return 'partial'
  if (inv.due_date && inv.due_date < today()) return 'overdue'
  return 'unpaid'
}
