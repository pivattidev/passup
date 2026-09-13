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

<div className="mt-5 flex flex-wrap gap-3">
        <a
          href={integrante.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-[#D6E4FF] px-4 py-2 text-sm font-semibold text-[#155EEF] transition-colors hover:bg-[#EAF2FF] focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label={`Abrir GitHub de ${integrante.nome}`}
        >
          GitHub
        </a>

        <a
          href={integrante.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-[#D6E4FF] px-4 py-2 text-sm font-semibold text-[#155EEF] transition-colors hover:bg-[#EAF2FF] focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label={`Abrir LinkedIn de ${integrante.nome}`}
        >
          LinkedIn
        </a>
      </div>
    </article>
  )
}