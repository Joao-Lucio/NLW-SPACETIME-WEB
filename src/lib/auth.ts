import { cookies } from 'next/headers'
import decode from 'jwt-decode'

// campos e tipo que será retornado no User
interface User {
  sub: string
  name: string
  avatarUrl: string
}

// pegar usuario
export function getUser(): User {
  const token = cookies().get('token')?.value // pegar o token

  // Se token não existir é porque ele não está logado e retorna um error nesse caso
  if (!token) {
    throw new Error('Unauthenticated.')
  }

  // Passou, então do token vou pegar as informações do usuario
  const user: User = decode(token)

  return user // retorno usuario
}
