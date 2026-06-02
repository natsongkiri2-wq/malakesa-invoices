// ─── Malakesa Transfer & Tour — Expense Types & Utilities ───────────────────

export type ExpenseCategory =
  | 'Fuel'
  | 'Vehicle Maintenance'
  | 'Driver Wages'
  | 'Tour Supplies'
  | 'Insurance'
  | 'Office / Admin'
  | 'Marketing'
  | 'Permits & Licenses'
  | 'Accommodation'
  | 'Other'

export type PaymentMethod = 'Cash' | 'Bank Transfer' | 'Credit Card' | 'Cheque'

export type ExpenseStatus = 'paid' | 'pending' | 'overdue'

export interface Expense {
  id: string
  date: string            // ISO date string e.g. "2026-06-02"
  category: ExpenseCategory
  vendor: string
  amount: number          // in VUV
  method: PaymentMethod
  receipt?: string
  notes?: string
  status: ExpenseStatus
  paidDate?: string
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Fuel',
  'Vehicle Maintenance',
  'Driver Wages',
  'Tour Supplies',
  'Insurance',
  'Office / Admin',
  'Marketing',
  'Permits & Licenses',
  'Accommodation',
  'Other',
]

export const PAYMENT_METHODS: PaymentMethod[] = [
  'Cash',
  'Bank Transfer',
  'Credit Card',
  'Cheque',
]

// Format VUV currency
export function formatVUV(amount: number): string {
  return `VUV ${amount.toLocaleString('en-AU')}`
}

// Format date for display
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// Generate a simple unique ID
export function genId(): string {
  return `exp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

// Sample seed data — replace with your DB/API calls
export const SEED_EXPENSES: Expense[] = [
  {
    id: 'exp_001',
    date: '2026-06-02',
    category: 'Fuel',
    vendor: 'Total Petrol Station',
    amount: 12500,
    method: 'Cash',
    receipt: 'REC-2026-001',
    status: 'paid',
    paidDate: '2026-06-02',
  },
  {
    id: 'exp_002',
    date: '2026-06-01',
    category: 'Driver Wages',
    vendor: 'Staff Payroll',
    amount: 85000,
    method: 'Bank Transfer',
    receipt: 'PAY-2026-06',
    status: 'paid',
    paidDate: '2026-06-01',
  },
  {
    id: 'exp_003',
    date: '2026-05-31',
    category: 'Vehicle Maintenance',
    vendor: 'Pacific Auto Services',
    amount: 24000,
    method: 'Cash',
    receipt: 'REC-2026-002',
    status: 'overdue',
  },
  {
    id: 'exp_004',
    date: '2026-05-30',
    category: 'Insurance',
    vendor: 'Vanuatu Insurance Co.',
    amount: 38000,
    method: 'Bank Transfer',
    status: 'paid',
    paidDate: '2026-05-30',
  },
  {
    id: 'exp_005',
    date: '2026-05-29',
    category: 'Tour Supplies',
    vendor: 'Vila Wholesale',
    amount: 38000,
    method: 'Cash',
    status: 'overdue',
  },
  {
    id: 'exp_006',
    date: '2026-06-04',
    category: 'Permits & Licenses',
    vendor: 'Vanuatu Tourism Dept',
    amount: 15000,
    method: 'Bank Transfer',
    status: 'pending',
  },
  {
    id: 'exp_007',
    date: '2026-06-05',
    category: 'Marketing',
    vendor: 'Social Media Ads',
    amount: 12500,
    method: 'Credit Card',
    status: 'pending',
  },
  {
    id: 'exp_008',
    date: '2026-06-10',
    category: 'Office / Admin',
    vendor: 'Digicel Vanuatu',
    amount: 11000,
    method: 'Cash',
    status: 'pending',
  },
]

// Monthly totals for chart (Jan–Jun 2026)
export const MONTHLY_DATA = [
  { month: 'Jan 2026', total: 285000 },
  { month: 'Feb 2026', total: 310000 },
  { month: 'Mar 2026', total: 295000 },
  { month: 'Apr 2026', total: 320000 },
  { month: 'May 2026', total: 312500 },
  { month: 'Jun 2026', total: 48200 },
]

// Category breakdown for May 2026
export const CATEGORY_DATA = [
  { category: 'Driver Wages',       thisMonth: 120000, lastMonth: 120000 },
  { category: 'Fuel',               thisMonth: 52000,  lastMonth: 61000  },
  { category: 'Vehicle Maintenance',thisMonth: 38000,  lastMonth: 24000  },
  { category: 'Insurance',          thisMonth: 38000,  lastMonth: 38000  },
  { category: 'Tour Supplies',      thisMonth: 28000,  lastMonth: 35000  },
  { category: 'Office / Admin',     thisMonth: 18500,  lastMonth: 21000  },
  { category: 'Marketing',          thisMonth: 12500,  lastMonth: 10000  },
  { category: 'Permits & Licenses', thisMonth: 5500,   lastMonth: 9500   },
]

// Top vendors for May 2026
export const VENDOR_DATA = [
  { vendor: 'Staff Payroll',       amount: 120000 },
  { vendor: 'Total Petrol Station',amount: 52000  },
  { vendor: 'Vanuatu Insurance Co.',amount: 38000 },
  { vendor: 'Pacific Auto Services',amount: 38000 },
  { vendor: 'Vila Wholesale',      amount: 28000  },
  { vendor: 'Digicel Vanuatu',     amount: 18500  },
]
