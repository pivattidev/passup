import type { Integrante } from '../../types/Integrante'

interface CardIntegranteProps {
  integrante: Integrante
}

export default function CardIntegrante({ integrante }: CardIntegranteProps) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-xl shadow-blue-950/5">
      <img
        src={integrante.foto}
        alt={`Foto de ${integrante.nome}`}
        className="aspect-square w-full rounded-xl object-cover"
      />

      <h2 className="mt-5 text-xl font-bold text-[#0B1F3A]">
        {integrante.nome}
      </h2>

      <p className="mt-2 font-semibold text-[#155EEF]">
        {integrante.rm}
      </p>
    </article>
  )
}