interface ItemFaqProps {
pergunta: string
resposta: string
}

export default function ItemFaq({ pergunta, resposta }: ItemFaqProps) {
return (
    <article className="border-b border-[#D6E4FF] py-5">
    <h2 className="text-lg font-semibold text-[#0B1F3A]">
        {pergunta}
    </h2>

    <p className="mt-3 leading-7 text-[#475467]">
        {resposta}
    </p>
    </article>
)
}