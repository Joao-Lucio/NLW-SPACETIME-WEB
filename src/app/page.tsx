import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import days from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

days.locale(ptBr)

// Dados que espero no objeto Memory
interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createAt: string
}

// primeira pagina
export default async function Home() {
  const isAuthenticated = cookies().has('token') // verifico se no cookie tem um token

  // Se usuario não tiver logado exibo o componente
  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value // pego o token
  // Pego a memories do banco e guardo no response
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  // quando nas memories o retorno da requisição
  const memories: Memory[] = response.data

  // Se não tiver memorias cadastradas exibi para adicionar novas memorias
  if (memories.length === 0) {
    return <EmptyMemories />
  }

  // Se tiver ele vai listar as memorias
  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {days(memory.createAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image
              src={memory.coverUrl}
              alt=""
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-50"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
