import { Link, useOutletContext } from 'react-router-dom'
import ItemHistorico from '../../components/ItemHistorico'
import type { ContextoAplicacao } from '../../types/Usuario'

function converterPontosEmReais(pontos: number) {
  return (pontos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default function Saldo() {
  const { usuarioLogado, movimentacoes } = useOutletContext<ContextoAplicacao>()

  if (!usuarioLogado) {
    return (
      <main className="bg-[#F2F8FD] px-6 py-20 text-[#0B1F3A] min-[768px]:px-8">
        <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl shadow-blue-950/5 min-[768px]:p-12">
          <p className="font-semibold text-[#155EEF]">Acesso necessário</p>

          <h1 className="mt-3 text-3xl font-bold min-[768px]:text-4xl">
            Entre para consultar seu saldo
          </h1>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#475467]">
            Seus pontos e movimentações ficam disponíveis depois que você acessa sua conta.
          </p>

          <div className="mx-auto mt-8 flex max-w-xs items-center" aria-hidden="true">
            <span className="h-3 w-3 rounded-full border-2 border-[#155EEF] bg-white"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#12B76A]"></span>
          </div>

          <Link
            to="/login"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none active:scale-[0.97]"
          >
            Ir para o login
          </Link>
        </section>
      </main>
    )
  }

  const primeiroNome = usuarioLogado.nome.trim().split(' ')[0]
  const valorEmReais = converterPontosEmReais(usuarioLogado.pontos)

  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <div className="mx-auto max-w-[1600px] px-6 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[992px]:px-12">
        <header>
          <p className="font-semibold text-[#155EEF]">Minha carteira</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight min-[768px]:text-4xl">
            Olá, {primeiroNome}
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-[#475467]">
            Acompanhe os pontos conquistados e o valor disponível para usar em mobilidade.
          </p>
        </header>

        <div className="mt-10 grid gap-8 min-[992px]:grid-cols-5">
          <section
            className="overflow-hidden rounded-3xl bg-[#155EEF] p-6 text-white shadow-xl shadow-blue-950/10 min-[768px]:p-9 min-[992px]:col-span-3"
            aria-labelledby="titulo-saldo"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-100">Pass Up</p>
                <h2 id="titulo-saldo" className="mt-1 text-xl font-semibold">Saldo disponível</h2>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-[#44E39B]"></span>
                Carteira ativa
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-5xl font-bold tracking-tight tabular-nums min-[768px]:text-6xl">
                  {usuarioLogado.pontos.toLocaleString('pt-BR')}
                </p>
                <p className="mt-2 text-blue-100">pontos disponíveis</p>
              </div>

              <div className="rounded-2xl bg-white/10 px-5 py-4">
                <p className="text-sm text-blue-100">Equivalente aproximado</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{valorEmReais}</p>
                <p className="mt-1 text-xs text-blue-100">em créditos de transporte</p>
              </div>
            </div>

            <div className="mt-10 flex items-center" aria-hidden="true">
              <span className="h-3 w-3 rounded-full border-2 border-white bg-[#155EEF]"></span>
              <span className="h-1 flex-1 bg-white"></span>
              <span className="h-3 w-3 rounded-full bg-white"></span>
              <span className="h-1 flex-1 bg-white"></span>
              <span className="h-3 w-3 rounded-full bg-[#44E39B]"></span>
            </div>

            <div className="mt-3 flex justify-between text-xs font-medium text-blue-100">
              <span>Seu saldo</span>
              <span>Próximo destino</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/20 pt-6">
              <p className="text-sm text-blue-100">
                100 pontos correspondem a R$ 1,00 em créditos.
              </p>

              <Link
                to="/resgate"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-[#155EEF] transition-colors hover:bg-blue-50 focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none active:scale-[0.97]"
              >
                Resgatar pontos
              </Link>
            </div>
          </section>

          <section
            className="rounded-2xl bg-white p-6 shadow-xl shadow-blue-950/5 min-[768px]:p-8 min-[992px]:col-span-2"
            aria-labelledby="titulo-historico"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#155EEF]">Movimentações</p>
                <h2 id="titulo-historico" className="mt-1 text-2xl font-bold">
                  Histórico de pontos
                </h2>
              </div>

              <span className="rounded-full bg-[#EAF2FF] px-3 py-1.5 text-xs font-semibold text-[#155EEF]">
                Mais recente
              </span>
            </div>

            <p className="mt-3 leading-7 text-[#475467]">
              Veja como seus pontos chegaram até aqui.
            </p>

            {movimentacoes.length > 0 ? (
              <ol className="mt-8">
                {movimentacoes.map((movimentacao, indice) => (
                  <ItemHistorico
                    key={movimentacao.id}
                    titulo={movimentacao.titulo}
                    descricao={movimentacao.descricao}
                    data={movimentacao.data}
                    pontos={movimentacao.pontos}
                    ultimo={indice === movimentacoes.length - 1}
                  />
                ))}
              </ol>
            ) : (
              <p className="mt-8 rounded-xl bg-[#F7FAFF] p-5 text-sm text-[#475467]">
                Nenhuma movimentação registrada.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}