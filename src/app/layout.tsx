import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Corporate Ladder Game',
  description: 'Climb the corporate ladder from intern to CEO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-radial from-game-background-start to-game-background-end`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 