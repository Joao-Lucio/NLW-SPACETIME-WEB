'use client'

import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // pega o evento do submit do formulario

    const formData = new FormData(event.currentTarget) // a variavel vai receber os dados que foram passados no event

    const fileToUpload = formData.get('coverUrl') // pego a imagem enviada

    let coverUrl = '' // variavel para guardar o coverUrl da imagem

    // Se houver imagem
    if (fileToUpload) {
      const uploadFormData = new FormData() // crio uma variavel multipart para receber a imagem
      uploadFormData.set('file', fileToUpload) // seto a imagem na variavel

      const uploadResponse = await api.post('/upload', uploadFormData) // envio a imagem para ser salva e retorno o url da requisição

      coverUrl = uploadResponse.data.fileUrl // quardo o coverUrl
    }

    // Salvo a memoria, passando o coverUrl, content, isPublic e o token do usuario
    const token = Cookie.get('token')
    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/') // redireciono usuario para a pagina raiz
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        {/* Anexar midia - Label que vai conter o nome e o icone */}
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        {/* Checkbox isPublic */}
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, videos e relatos sobre essa experiência que você quer lembrar para sempre."
      />
      <button
        type="submit"
        className="font-alt inline-block self-end rounded-full bg-green-500 px-5 py-3 text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
