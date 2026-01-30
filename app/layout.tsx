import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Bricolage_Grotesque } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from './components/ui/sonner';
// ${bricolageGrotesque.variable}

const _geist = Geist({ subsets: ["latin"], variable: '--font-geist' })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' })
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-bricolage',
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: 'Rally - Turn group chats into real plans',
  description: 'Collaborative planning made simple',
  icons: {
    icon: [
      {
        url: '/Logo.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/Logo.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/Logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolageGrotesque.variable} ${_geist.variable} ${_geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster position='top-center'/>
      </body>
    </html>
  )
}
