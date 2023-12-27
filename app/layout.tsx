import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { APP_TITLE, APP_DESCRIPTION } from './config'
import AppNavbar from './components/AppNavbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <AppNavbar />

        <div className="container mx-auto px-32 py-4">
          {children}
        </div>
      </body>
    </html>
  )
}
