// Para que seja carregado o javaScript na aplicação para o que tiver nesse arquivo
// Poderia colocar diretamente na new/page.tsx, mas não precisavamos carregar para todos os componentes
// Somente para o onChange do input
// Então encapsulamos o componentes
'use client' // para carregar o javaScript no navegador

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  // state do react é uma forma de saber que quando variavel mudar seu valor consiga exibir algo
  const [preview, setPrevew] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    // Pega o arquivo selecionado
    const { files } = event.target

    // Verifica se realmente exiti arquivo
    if (!files) {
      return
    }
    // É criado uma url para o arquivo
    const previewURL = URL.createObjectURL(files[0])
    setPrevew(previewURL) // para para a função a url, vai alterar o preview na função, disparando assim o state
  }

  return (
    // <></> => Para retirar a margemTop que fica quando muda para a <div></div>
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />
      {/* Toda vez que a variavel preview alterar o useState vai atualizar o componente */}
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>

    // <video src="" controls={false}/> para caso for colocar o video
  )
}
