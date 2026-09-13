interface ItemHistoricoProps {
  titulo: string
  descricao: string
  data: string
  pontos: number
  ultimo?: boolean
}

export default function ItemHistorico({ titulo, descricao, data, pontos, ultimo = false }: ItemHistoricoProps) {
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center" aria-hidden="true">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2FF] font-bold text-[#155EEF]">
          +
        </span>

        {!ultimo && <span className="my-2 h-full w-px bg-[#D6E4FF]"></span>}
      </div>

      <div className={`flex min-w-0 flex-1 flex-wrap justify-between gap-3 ${ultimo ? '' : 'pb-7'}`}>
        <div>
          <p className="font-semibold text-[#0B1F3A]">{titulo}</p>
          <p className="mt-1 text-sm text-[#475467]">{descricao}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">{data}</p>
        </div>

        <p className="font-semibold text-[#12B76A] tabular-nums">
          +{pontos} pontos
        </p>
      </div>
    </li>
  )
}