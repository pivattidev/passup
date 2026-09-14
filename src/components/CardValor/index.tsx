interface CardValorProps {
  titulo: string
  descricao: string
}

export default function CardValor({ titulo, descricao }: CardValorProps) {
  return (
    <article className="rounded-2xl border border-[#D6E4FF] bg-white p-6 shadow-xl shadow-blue-950/5 min-[768px]:p-8">
      <span
        className="block h-2 w-10 rounded-full bg-[#155EEF]"
        aria-hidden="true"
      ></span>

      <h2 className="mt-5 text-xl font-bold text-[#0B1F3A] min-[768px]:text-2xl">
        {titulo}
      </h2>

      <p className="mt-3 leading-7 text-[#475467]">
        {descricao}
      </p>
    </article>
  )
}