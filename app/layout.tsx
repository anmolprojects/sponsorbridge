import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SponsorBridge | The Smartest Bridge Between Creators and Companies',
  description: 'AI-powered sponsorship marketplace connecting YouTube creators with companies. Google OAuth verified stats, escrow-protected payments, and the lowest commission rates in the market.',
  keywords: ['sponsorship', 'influencer marketing', 'YouTube', 'creator economy', 'brand deals'],
  openGraph: {
    title: 'SponsorBridge | The Smartest Bridge Between Creators and Companies',
    description: 'AI-powered sponsorship marketplace with Google OAuth verified stats and escrow-protected payments.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
