import { Providers } from './providers'
import './globals.css'

export const metadata = {
  title: 'QuoteLab',
  description: 'A platform for sharing quotes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
