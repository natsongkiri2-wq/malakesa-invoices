{/* ─────────────────────────────────────────────────────────────────────────────
  SIDEBAR ADDITIONS — Malakesa Expense Nav Items
  ─────────────────────────────────────────────────────────────────────────────
  Copy these blocks into your existing Sidebar/Nav component,
  AFTER the existing "Clients" nav item.

  Your existing nav items likely look something like:
    <NavItem href="/dashboard"     icon={...} label="Dashboard" />
    <NavItem href="/invoices"      icon={...} label="Invoices" />
    <NavItem href="/payments"      icon={...} label="Payments Received" />
    <NavItem href="/unpaid"        icon={...} label="Unpaid Invoices" />
    <NavItem href="/reports"       icon={...} label="Reports" />
    <NavItem href="/clients"       icon={...} label="Clients" />

  ADD BELOW (paste into your Sidebar JSX):
───────────────────────────────────────────────────────────────────────────── */}

{/* ── Divider ── */}
<div style={{
  height: 1,
  background: '#1e2d3d',
  margin: '8px 16px',
}} />

{/* ── Section heading ── */}
<div style={{
  padding: '12px 16px 4px',
  fontSize: 9,
  letterSpacing: 2,
  color: '#4a6070',
  fontWeight: 600,
  textTransform: 'uppercase',
}}>
  Expenses
</div>

{/* ── Record Expenses ── */}
<NavItem
  href="/expenses/record"
  label="Record Expenses"
  icon={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  }
/>

{/* ── Pay Expenses ── */}
<NavItem
  href="/expenses/pay"
  label="Pay Expenses"
  icon={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  }
/>

{/* ── Expense Reports ── */}
<NavItem
  href="/expenses/reports"
  label="Expense Reports"
  icon={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6"  y1="20" x2="6"  y2="14" />
    </svg>
  }
/>

{/* ─────────────────────────────────────────────────────────────────────────────
  IF YOUR SIDEBAR USES NEXT.JS <Link> DIRECTLY instead of a NavItem component,
  use this pattern instead:
───────────────────────────────────────────────────────────────────────────── */}

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Inside your Sidebar component:
const pathname = usePathname()

const expenseLinks = [
  { href: '/expenses/record',  label: 'Record Expenses',  icon: '✏️' },
  { href: '/expenses/pay',     label: 'Pay Expenses',     icon: '💰' },
  { href: '/expenses/reports', label: 'Expense Reports',  icon: '📈' },
]

// Then render:
{expenseLinks.map(({ href, label, icon }) => (
  <Link
    key={href}
    href={href}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '9px 16px',
      fontSize: 12,
      color: pathname === href ? '#c8a96e' : '#7a9ab4',
      borderLeft: `3px solid ${pathname === href ? '#c8a96e' : 'transparent'}`,
      background: pathname === href ? '#0f1923' : 'transparent',
      textDecoration: 'none',
      transition: 'all 0.15s',
    }}
  >
    <span style={{ fontSize: 15, width: 16, textAlign: 'center' }}>{icon}</span>
    {label}
  </Link>
))}
