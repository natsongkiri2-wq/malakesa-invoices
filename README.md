# Malakesa Expenses — Integration Guide

## Files Included

```
malakesa-expenses/
├── lib/
│   └── expenses.ts              ← Types, utilities, seed data
├── components/expenses/
│   ├── expenses.css             ← Shared styles (import once in layout)
│   ├── BarChart.tsx             ← Reusable horizontal bar chart
│   └── ExpenseBadge.tsx         ← Status badge (paid / pending / overdue)
├── app/expenses/
│   ├── record/page.tsx          ← /expenses/record — Record new expense
│   ├── pay/page.tsx             ← /expenses/pay    — Pay outstanding bills
│   └── reports/page.tsx         ← /expenses/reports — Analytics & export
└── SIDEBAR_ADDITIONS.jsx        ← Paste into your Sidebar component
```

---

## Step 1 — Copy files into your project

Copy the above files into your existing Next.js project, preserving the directory structure.

---

## Step 2 — Import the CSS

In your root layout (`app/layout.tsx`) or an existing global CSS file, add:

```ts
import '@/components/expenses/expenses.css'
```

If you already have CSS variables defined for the dark navy theme,
check `expenses.css` for any conflicts with existing `:root` variables.

---

## Step 3 — Update your Sidebar

Open `SIDEBAR_ADDITIONS.jsx` and copy the relevant section into your existing
Sidebar/Nav component. Two patterns are provided:
- If you use a `<NavItem>` component
- If you use raw `<Link>` + `usePathname()`

Add the new items **after** the existing "Clients" nav item.

---

## Step 4 — Connect to your database

All three pages currently use **in-memory state** with `SEED_EXPENSES` from `lib/expenses.ts`.

Replace with real API calls:

### Record page (`/expenses/record/page.tsx`)
```ts
// Replace the useState(SEED_EXPENSES) call:
const [expenses, setExpenses] = useState<Expense[]>([])

useEffect(() => {
  fetch('/api/expenses').then(r => r.json()).then(setExpenses)
}, [])

// In handleSave(), after building newExpense:
await fetch('/api/expenses', {
  method: 'POST',
  body: JSON.stringify(newExpense),
})
```

### Pay page (`/expenses/pay/page.tsx`)
```ts
// Load unpaid only:
useEffect(() => {
  fetch('/api/expenses?status=unpaid').then(r => r.json()).then(setUnpaid)
}, [])

// In markPaid():
await fetch(`/api/expenses/${id}/pay`, { method: 'POST' })
```

### Reports page (`/expenses/reports/page.tsx`)
```ts
// Replace MONTHLY_DATA, CATEGORY_DATA, VENDOR_DATA with:
const [monthlyData, setMonthlyData] = useState([])
useEffect(() => {
  fetch('/api/expenses/summary?groupBy=month').then(r => r.json()).then(setMonthlyData)
}, [])
```

---

## Step 5 — Export functionality

In `reports/page.tsx`, the export button currently calls `console.log`.
Replace with:

```ts
function handleExport() {
  const url = `/api/expenses/export?from=${exportFrom}&to=${exportTo}&format=${exportFmt}`
  window.open(url, '_blank')
}
```

Your API route should generate and stream the PDF/CSV/Excel file.

---

## VUV Currency

All amounts are stored as integers (VUV — Vanuatu Vatu, no decimal places).
The `formatVUV(amount)` helper in `lib/expenses.ts` formats them as `VUV 12,500`.

---

## Theming

All colours use CSS custom properties (`--mal-gold`, `--mal-bg-deep`, etc.)
defined in `expenses.css`. If your existing app uses different variable names,
do a find-and-replace in `expenses.css` to align them.

---

## Routes Summary

| URL                  | Component                          |
|----------------------|------------------------------------|
| `/expenses/record`   | `app/expenses/record/page.tsx`     |
| `/expenses/pay`      | `app/expenses/pay/page.tsx`        |
| `/expenses/reports`  | `app/expenses/reports/page.tsx`    |
