import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Matcha Rater - Rate Your Favorite Matcha',
  description: 'A cute and stylish app to rate and review your favorite matcha experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}