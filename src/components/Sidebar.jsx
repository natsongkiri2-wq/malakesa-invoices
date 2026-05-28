'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'ti-layout-dashboard' },
  { href: '/invoices', label: 'Invoices', icon: 'ti-file-invoice' },
  { href: '/payments', label: 'Payments', icon: 'ti-cash' },
  { href: '/unpaid', label: 'Unpaid', icon: 'ti-alert-circle' },
  { href: '/reports', label: 'Reports', icon: 'ti-chart-bar' },
  { href: '/clients', label: 'Clients', icon: 'ti-users' },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-title">Malakesa Transfer<br />&amp; Tour</div>
        <div className="logo-sub">Invoice Manager</div>
      </div>
      <nav className="nav">
        {navItems.map(item => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <i className={`ti ${item.icon}`} aria-hidden="true"></i>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div style={{ padding: '12px 16px', borderTop: '0.5px solid var(--border)', fontSize: 11, color: 'var(--hint)' }}>
        Port Vila, Vanuatu
      </div>
    </div>
  )
}
