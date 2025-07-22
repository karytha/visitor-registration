import './globals.css'
import { Inter } from 'next/font/google'
import { TitleGlobalStyle } from '../components/login/login-styles';
import Providers from '../components/providers/Providers';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TitleGlobalStyle />
      <html lang="pt-BR">
        <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </>
  )
}
