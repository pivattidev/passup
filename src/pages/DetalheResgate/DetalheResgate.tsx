import { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import type { ContextoAplicacao } from '../../types/Usuario'

function formatarTempoRestante(expiraEm: number, agora: number) {
  const totalSegundos = Math.max(
    0,
    Math.floor((expiraEm - agora) / 1000),
  )

  const horas = Math.floor(totalSegundos / 3600)
  const minutos = Math.floor((totalSegundos % 3600) / 60)
  const segundos = totalSegundos % 60

  return [horas, minutos, segundos]
    .map((valor) => valor.toString().padStart(2, '0'))
    .join(':')
}

export default function DetalheResgate() {
  const [agora, setAgora] = useState(() => Date.now())
  const { id } = useParams<{ id: string }>()
  const { resgates } = useOutletContext<ContextoAplicacao>()
  const resgate = resgates.find((item) => item.id === id)

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setAgora(Date.now())
    }, 1000)

    return () => window.clearInterval(intervalo)
  }, [])

  if (!resgate) {
    return (
      <main className="bg-[#F2F8FD] px-6 py-20 text-[#0B1F3A] min-[768px]:px-8">
        <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl shadow-blue-950/5 min-[768px]:p-12">
          <p className="font-semibold text-[#F79009]">
            Resgate não encontrado
          </p>

          <h1 className="mt-3 text-3xl font-bold min-[768px]:text-4xl">
            Este comprovante não está disponível
          </h1>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#475467]">
            Verifique o endereço ou faça um novo resgate usando sua carteira.
          </p>

          <Link
            to="/saldo"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none active:scale-[0.97]"
          >
            Voltar para o saldo
          </Link>
        </section>
      </main>
    )
  }

  const expirado = agora >= resgate.expiraEm
  const tempoRestante = formatarTempoRestante(resgate.expiraEm, agora)

  const valorFormatado = resgate.valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <div className="mx-auto max-w-5xl px-6 py-12 min-[768px]:px-8 min-[768px]:py-16">
        <header className="text-center">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F0] text-3xl font-bold text-[#12B76A]"
            aria-hidden="true"
          >
            ✓
          </div>

          <p className="mt-5 font-semibold text-[#12B76A]">
            Resgate concluído
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight min-[768px]:text-4xl">
            Seu comprovante está pronto
          </h1>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#475467]">
            Guarde o token temporário para utilizar o crédito do transporte.
          </p>
        </header>

        <nav
          className="mx-auto mt-9 max-w-2xl"
          aria-label="Etapas do resgate"
        >
          <div className="flex items-center" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#155EEF]"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#155EEF]"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#12B76A]"></span>
          </div>

          <ol className="mt-2 grid grid-cols-3 text-sm font-semibold text-[#155EEF]">
            <li>Saldo</li>
            <li className="text-center">Resgate</li>
            <li className="text-right">Comprovante</li>
          </ol>
        </nav>

        <section
          className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-950/5"
          aria-labelledby="titulo-token"
        >
          <div className="grid min-[768px]:grid-cols-5">
            <div className="bg-[#155EEF] p-6 text-white min-[768px]:col-span-3 min-[768px]:p-9">
              <p className="text-sm font-medium text-blue-100">
                Token temporário
              </p>

              <h2
                id="titulo-token"
                className="mt-3 break-all font-mono text-3xl font-bold tracking-wider min-[480px]:text-4xl"
              >
                {resgate.token}
              </h2>

              <div className="mt-10 flex items-center" aria-hidden="true">
                <span className="h-3 w-3 rounded-full border-2 border-white bg-[#155EEF]"></span>
                <span className="h-1 flex-1 bg-white"></span>
                <span className="h-3 w-3 rounded-full bg-white"></span>
                <span className="h-1 flex-1 bg-white"></span>
                <span
                  className={`h-3 w-3 rounded-full ${
                    expirado ? 'bg-[#F79009]' : 'bg-[#44E39B]'
                  }`}
                ></span>
              </div>

              <div className="mt-8 rounded-2xl bg-white/10 p-5">
                <p className="text-sm text-blue-100">Tempo restante</p>

                <p className="mt-1 text-3xl font-semibold tabular-nums">
                  {tempoRestante}
                </p>

                <p className="mt-2 text-sm text-blue-100">
                  {expirado
                    ? 'Este token expirou.'
                    : 'O token é válido por 24 horas após a confirmação.'}
                </p>
              </div>
            </div>

            <div className="p-6 min-[768px]:col-span-2 min-[768px]:p-9">
              <p className="text-sm font-semibold text-[#155EEF]">
                Detalhes do resgate
              </p>

              <dl className="mt-5 divide-y divide-[#D6E4FF]">
                <div className="py-4">
                  <dt className="text-sm text-[#667085]">
                    Pontos utilizados
                  </dt>
                  <dd className="mt-1 font-semibold tabular-nums">
                    {resgate.pontos} pontos
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-sm text-[#667085]">
                    Crédito gerado
                  </dt>
                  <dd className="mt-1 font-semibold tabular-nums">
                    {valorFormatado}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-sm text-[#667085]">
                    Cartão de transporte
                  </dt>
                  <dd className="mt-1 font-semibold">
                    Final {resgate.finalCartao}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-sm text-[#667085]">Situação</dt>
                  <dd
                    className={`mt-1 font-semibold ${
                      expirado
                        ? 'text-[#F79009]'
                        : 'text-[#12B76A]'
                    }`}
                  >
                    {expirado ? 'Expirado' : 'Disponível'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/saldo"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none active:scale-[0.97]"
          >
            Ver saldo atualizado
          </Link>

          <Link
            to="/resgate"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#155EEF] px-6 py-3 font-semibold text-[#155EEF] hover:bg-[#EAF2FF] focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none active:scale-[0.97]"
          >
            Fazer outro resgate
          </Link>
        </div>
      </div>
    </main>
  )
}