import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'Malakesa Transfer & Tour — Invoice Manager',
  description: 'Invoice management for Malakesa Transfer and Tour',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Sidebar />
          <main className="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
