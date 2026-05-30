'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: '⊞' },
  { href: '/invoices', label: 'Invoices', icon: '📄' },
  { href: '/payments', label: 'Payments', icon: '💰' },
  { href: '/unpaid', label: 'Unpaid', icon: '⚠️' },
  { href: '/reports', label: 'Reports', icon: '📊' },
  { href: '/clients', label: 'Clients', icon: '👥' },
]

function SidebarNav() {
  const pathname = usePathname()
  return (
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
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-title">Malakesa Transfer<br />&amp; Tour</div>
        <div className="logo-sub">Invoice Manager</div>
      </div>
      <Suspense fallback={<nav className="nav"></nav>}>
        <SidebarNav />
      </Suspense>
      <div style={{ padding: '12px 16px', borderTop: '0.5px solid var(--border)', fontSize: 11, color: 'var(--hint)' }}>
        Port Vila, Vanuatu
      </div>
    </div>
  )
}
