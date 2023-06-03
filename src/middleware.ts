import { NextRequest, NextResponse } from 'next/server'

// url do github para logar usuario
const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

// função que irá guardar a ultima url do usuario caso ele não esteja logado
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value // vai pegar o token nos cookies
  // se token não existir
  if (!token) {
    // redirecono usuario para a tela de login do github, e guardo a url que ele estava tentando acessar
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
      },
    })
  }
}

// informando que essa configuração vale para toda url da pasta memories, ou url
export const config = {
  matcher: '/memories/:path*',
}
