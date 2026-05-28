import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'Malakesa Transfer & Tour — Invoice Manager',
  description: 'Invoice management for Malakesa Transfer and Tour',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.10.0/dist/tabler-icons.min.css" />
      </head>
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
