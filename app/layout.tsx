import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Super Arte - Tienda de Artículos de Arte',
  description: 'Tu tienda especializada en materiales y productos artísticos. Desarrollado por Omar Domínguez.',
  keywords: ['arte', 'tienda', 'materiales artísticos', 'pintura', 'dibujo', 'manualidades'],
  authors: [{ name: 'Omar Dominguez', email: 'omidrumer@gmail.com' }],
  creator: 'Omar Domínguez',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
