import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import PublicLayout from '@/components/public-layout'
import AnalyticsTracker from '@/components/analytics-tracker'
import './globals.css'

export const metadata: Metadata = {
  title: "Johnnie Boy's Foundation | Guiding Boys to Greatness",
  description: 'Empowering boys and young men through education, mentorship, skills training, and well-being support in northern Nigeria.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <PublicLayout>{children}</PublicLayout>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
