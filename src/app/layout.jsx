import './globals.css'

export const metadata = {
  title: 'Malakesa Transfer & Tour — Invoice Manager',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.10.0/dist/tabler-icons.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
