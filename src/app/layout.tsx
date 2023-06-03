import { ReactNode } from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { Signin } from '@/components/Signin'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'

// === Layout - componentes que será utilizado em toda pagina ===

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' }) // roboto e flex então ele consegue se adaptar entre negrito e normal
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'], // importando somente uma parte da fonte
  weight: '700', // definindo um peso pra ela
  variable: '--font-bai-jamjuree', // uma variavel para quando querer utilizar ela
})

// Informação do site
export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula d tempo construida com React, Next.js, TailwindCSS e TypeScript.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token') // vai retornar se tiver token
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* Div da Left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            {/* Div do background que pega o lado esquerdo -- Blur  */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"></div>
            {/* Stripes - Regua */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />
            {isAuthenticated ? <Profile /> : <Signin />}
            {/* COmponente para logar */}
            <Hero /> {/* Criar Memory */}
            <Copyright /> {/* Descrição em bottom */}
          </div>
          {/* Div da Right */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children} {/* aqui é onde serão exibidos as pages page.tsx */}
          </div>
        </main>
      </body>
    </html>
  )
}
