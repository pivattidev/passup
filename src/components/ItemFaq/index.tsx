import { useState } from 'react'

interface ItemFaqProps {
  id: string
  pergunta: string
  resposta: string
}

export default function ItemFaq({ id, pergunta, resposta }: ItemFaqProps) {
  const [aberto, setAberto] = useState(false)
  const idResposta = `resposta-${id}`

  function alternarResposta() {
    setAberto((estadoAtual) => !estadoAtual)
  }

  return (
    <article className="border-b border-[#D6E4FF] last:border-b-0">
      <h2>
        <button
          type="button"
          className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left text-base font-semibold text-[#0B1F3A] transition-colors hover:text-[#155EEF] focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 focus-visible:outline-none min-[768px]:text-lg"
          onClick={alternarResposta}
          aria-expanded={aberto}
          aria-controls={idResposta}
        >
          <span>{pergunta}</span>

          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl ${
              aberto
                ? 'bg-[#155EEF] text-white'
                : 'bg-[#EAF2FF] text-[#155EEF]'
            }`}
            aria-hidden="true"
          >
            {aberto ? '−' : '+'}
          </span>
        </button>
      </h2>

      <div id={idResposta} hidden={!aberto}>
        <p className="max-w-3xl pb-6 pr-12 leading-7 text-[#475467]">
          {resposta}
        </p>
      </div>
    </article>
  )
}
