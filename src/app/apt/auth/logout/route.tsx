import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url) // URL para onde o usuario será redirecionado, pagina raiz

  // No retorno, redireciono usuario, e no headers digo pra salvar o token nos cookie
  // path é onde poderá utilizar ele, "/" no caso todas as url e max-age o tempo
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`, // apagando o cookie
    },
  })
}
