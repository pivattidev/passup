interface CardValorProps {
  titulo: string
  descricao: string
}

export default function CardValor({ titulo, descricao }: CardValorProps) {
  return (
    <article className="rounded-2xl border border-[#D6E4FF] bg-white p-6">
      <h2 className="text-xl font-bold text-[#0B1F3A]">
        {titulo}
      </h2>

      <p className="mt-3 leading-7 text-[#475467]">
        {descricao}
      </p>
    </article>
  )
}