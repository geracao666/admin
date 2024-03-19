import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { APP_TITLE, APP_DESCRIPTION } from './config'
import AppNavbar from './components/AppNavbar'
import AppMenu from './components/AppMenu'

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
        <div className="flex h-screen">
          <AppMenu />

          <div className="flex-grow">
            <AppNavbar />

            <div className="container px-16 py-8">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
