import './globals.css'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '../lib/StyledComponentsRegistry'
import { AuthProvider } from '../contexts/AuthContext'
import { TitleGlobalStyle } from '../components/login/login-styles';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Controle de Visitantes',
  description: 'Sistema de controle de visitantes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TitleGlobalStyle />
      <html lang="pt-BR">
        <body className={inter.className}>
          <StyledComponentsRegistry>
            <AuthProvider>
              {children}
            </AuthProvider>
          </StyledComponentsRegistry>
        </body>
      </html>
    </>
  )
}
