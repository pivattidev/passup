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
    <article className="border-b border-[#D6E4FF]">
    <h2>
        <button
        type="button"
        className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-[#0B1F3A] focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 focus-visible:outline-none"
        onClick={alternarResposta}
        aria-expanded={aberto}
        aria-controls={idResposta}
        >
        <span>{pergunta}</span>

        <span className="text-2xl text-[#155EEF]" aria-hidden="true">
            {aberto ? '−' : '+'}
        </span>
        </button>
    </h2>

    <div id={idResposta} hidden={!aberto}>
        <p className="pb-5 leading-7 text-[#475467]">
        {resposta}
        </p>
    </div>
    </article>
)
}