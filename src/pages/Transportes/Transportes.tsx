import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarTransportes } from '../../services/transporteService'
import type {
  EstadoRequisicao,
  Transporte,
  TransporteComRota,
} from '../../types/Transporte'

async function carregarTransportes(): Promise<EstadoRequisicao<Transporte[]>> {
  try {
    return { status: 'sucesso', dados: await listarTransportes() }
  } catch (erro) {
    return {
      status: 'erro',
      mensagem:
        erro instanceof Error ? erro.message : 'Não foi possível carregar os transportes.',
    }
  }
}

export default function Transportes() {
  const [estado, setEstado] = useState<EstadoRequisicao<Transporte[]>>({
    status: 'carregando',
  })

  useEffect(() => {
    let ativo = true
    void carregarTransportes().then((resultado) => {
      if (ativo) setEstado(resultado)
    })

    return () => { ativo = false }
  }, [])

  async function tentarNovamente() {
    setEstado({ status: 'carregando' })
    setEstado(await carregarTransportes())
  }

  const transportes: TransporteComRota[] =
    estado.status === 'sucesso'
      ? estado.dados.map((transporte) => ({
          ...transporte,
          rotaDetalhe: `/transportes/${transporte.idTransporte}`,
        }))
      : []

  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 min-[768px]:px-8 min-[768px]:py-16">
        <header className="max-w-3xl">
          <p className="font-semibold text-[#155EEF]">Mobilidade Pass Up</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight min-[768px]:text-4xl">
            Opções de transporte
          </h1>
          <p className="mt-3 leading-7 text-[#475467]">
            Consulte os cartões cadastrados e atualize os dados de cada opção.
            As informações são carregadas da API do Pass Up.
          </p>
        </header>

        <section className="mt-9" aria-labelledby="titulo-lista-transportes">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="titulo-lista-transportes" className="text-xl font-bold">
                Cartões cadastrados
              </h2>
              {estado.status === 'sucesso' && (
                <p className="mt-1 text-sm text-[#667085]">
                  {estado.dados.length}{' '}
                  {estado.dados.length === 1 ? 'opção disponível' : 'opções disponíveis'}
                </p>
              )}
            </div>

            {estado.status === 'sucesso' && estado.dados.length > 0 && (
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F8F0] px-3 py-2 text-sm font-semibold text-[#087443]">
                <span className="h-2 w-2 rounded-full bg-[#12B76A]" aria-hidden="true"></span>
                API conectada
              </span>
            )}
          </div>

          {estado.status === 'carregando' && (
            <p className="mt-5 rounded-2xl bg-white p-6 text-[#475467]" role="status">
              Carregando opções de transporte…
            </p>
          )}

          {estado.status === 'erro' && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-white p-6" role="alert">
              <h3 className="font-semibold text-red-700">Não foi possível carregar os dados</h3>
              <p className="mt-2 text-sm leading-6 text-[#475467]">{estado.mensagem}</p>
              <button
                type="button"
                onClick={() => void tentarNovamente()}
                className="mt-4 min-h-11 rounded-lg bg-[#155EEF] px-5 py-2 font-semibold text-white hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {estado.status === 'sucesso' && transportes.length === 0 && (
            <p className="mt-5 rounded-2xl bg-white p-6 text-[#475467]" role="status">
              Ainda não há opções de transporte cadastradas.
            </p>
          )}

          {estado.status === 'sucesso' && transportes.length > 0 && (
            <ul className="mt-5 grid gap-4 min-[768px]:grid-cols-2 min-[992px]:grid-cols-3">
              {transportes.map((transporte) => (
                <li key={transporte.idTransporte}>
                  <Link
                    to={transporte.rotaDetalhe}
                    className="group block h-full rounded-2xl bg-white p-6 shadow-sm shadow-blue-950/5 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none"
                  >
                    <span className="inline-flex rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#155EEF]">
                      {transporte.tipoTransporte}
                    </span>
                    <h3 className="mt-5 text-xl font-bold group-hover:text-[#155EEF]">
                      {transporte.nomeCartao}
                    </h3>
                    <p className="mt-2 text-sm text-[#667085]">
                      Operadora: {transporte.operadora}
                    </p>
                    <span className="mt-6 inline-flex font-semibold text-[#155EEF]">
                      Ver detalhes e editar <span className="ml-2" aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
