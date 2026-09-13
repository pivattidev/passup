import { useState } from 'react'

interface ItemFaqProps {
pergunta: string
resposta: string
}

export default function ItemFaq({ pergunta, resposta }: ItemFaqProps) {
const [aberto, setAberto] = useState(false)

function alternarResposta() {
    setAberto((estadoAtual) => !estadoAtual)
}

return (
    <article className="border-b border-[#D6E4FF]">
    <h2>
        <button
        type="button"
        className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-[#0B1F3A]"
        onClick={alternarResposta}
        >
        <span>{pergunta}</span>
        <span className="text-2xl text-[#155EEF]">
            {aberto ? '−' : '+'}
        </span>
        </button>
    </h2>

    {aberto && (
        <p className="pb-5 leading-7 text-[#475467]">
        {resposta}
        </p>
    )}
    </article>
)
}