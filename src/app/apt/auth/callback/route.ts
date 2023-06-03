import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url) // pego a url
  const code = searchParams.get('code') // pedo o code da url

  const redirectTo = request.cookies.get('redirectTo')?.value

  // faço a requisição ao banco passando o code
  const registerResponse = await api.post('/register', {
    code,
  })
  const { token } = registerResponse.data // pego o token gerado
  const redirectURL = redirectTo ?? new URL('/', request.url) // URL para onde o usuario será redirecionado, url anterior ou raiz

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  // No retorno, redireciono usuario, e no headers digo pra salvar o token nos cookie
  // path é onde poderá utilizar ele, "/" no caso todas as url e max-age o tempo
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
