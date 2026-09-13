import { useRef, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { ContextoAplicacao } from '../../types/Usuario'

interface DadosResgate {
  pontos: number
  cartao: string
}

function converterPontosEmReais(pontos: number) {
  return (pontos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default function Resgate() {
  const [dadosConfirmacao, setDadosConfirmacao] = useState<DadosResgate | null>(null)
  const confirmacaoEmAndamento = useRef(false)
  const navigate = useNavigate()
  const { usuarioLogado, realizarResgate } = useOutletContext<ContextoAplicacao>()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<DadosResgate>()

  function revisarResgate(dados: DadosResgate) {
    setDadosConfirmacao({
      pontos: dados.pontos,
      cartao: dados.cartao.trim(),
    })
  }

  function confirmarResgate() {
    if (!dadosConfirmacao || confirmacaoEmAndamento.current) return

    confirmacaoEmAndamento.current = true

    const novoResgate = realizarResgate(
      dadosConfirmacao.pontos,
      dadosConfirmacao.cartao,
    )

    if (!novoResgate) {
      confirmacaoEmAndamento.current = false
      setDadosConfirmacao(null)

      setError('root', {
        type: 'manual',
        message: 'Não foi possível concluir o resgate.',
      })

      return
    }

    navigate(`/resgate/${novoResgate.id}`)
  }

  if (!usuarioLogado) {
    return (
      <main className="bg-[#F2F8FD] px-6 py-20 text-[#0B1F3A] min-[768px]:px-8">
        <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl shadow-blue-950/5 min-[768px]:p-12">
          <p className="font-semibold text-[#155EEF]">Acesso necessário</p>

          <h1 className="mt-3 text-3xl font-bold min-[768px]:text-4xl">
            Entre antes de resgatar seus pontos
          </h1>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#475467]">
            O resgate utiliza o saldo da sua carteira e precisa de uma conta conectada.
          </p>

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

  const semSaldoParaResgate = usuarioLogado.pontos < 100

  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <div className="mx-auto max-w-[1600px] px-6 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[992px]:px-12">
        <header className="max-w-3xl">
          <p className="font-semibold text-[#155EEF]">Resgate de créditos</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight min-[768px]:text-4xl">
            Transforme pontos em mobilidade
          </h1>

          <p className="mt-3 leading-7 text-[#475467]">
            Escolha a quantidade, confira os dados e gere seu token temporário.
          </p>
        </header>

        <nav className="mt-9 max-w-2xl" aria-label="Etapas do resgate">
          <div className="flex items-center" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#155EEF]"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#155EEF]"></span>
            <span className="h-1 flex-1 bg-[#D6E4FF]"></span>
            <span className="h-3 w-3 rounded-full border-2 border-[#AFC7EE] bg-[#F2F8FD]"></span>
          </div>

          <ol className="mt-2 grid grid-cols-3 text-sm font-semibold">
            <li className="text-[#155EEF]">Saldo</li>
            <li className="text-center text-[#155EEF]">Resgate</li>
            <li className="text-right text-[#667085]">Comprovante</li>
          </ol>
        </nav>

        <div className="mt-10 grid items-start gap-8 min-[992px]:grid-cols-5">
          <section
            className="rounded-2xl bg-white p-6 shadow-xl shadow-blue-950/5 min-[768px]:p-9 min-[992px]:col-span-3"
            aria-labelledby="titulo-formulario-resgate"
          >
            {dadosConfirmacao ? (
              <div>
                <p className="font-semibold text-[#155EEF]">Última conferência</p>

                <h2
                  id="titulo-formulario-resgate"
                  className="mt-2 text-2xl font-bold min-[768px]:text-3xl"
                >
                  Confirme seu resgate
                </h2>

                <p className="mt-3 leading-7 text-[#475467]">
                  Confira os dados antes de descontar os pontos da sua carteira.
                </p>

                <dl className="mt-8 divide-y divide-[#D6E4FF] rounded-xl bg-[#F7FAFF] px-5">
                  <div className="flex flex-wrap justify-between gap-3 py-4">
                    <dt className="text-[#475467]">Pontos utilizados</dt>
                    <dd className="font-semibold tabular-nums">
                      {dadosConfirmacao.pontos} pontos
                    </dd>
                  </div>

                  <div className="flex flex-wrap justify-between gap-3 py-4">
                    <dt className="text-[#475467]">Crédito gerado</dt>
                    <dd className="font-semibold tabular-nums">
                      {converterPontosEmReais(dadosConfirmacao.pontos)}
                    </dd>
                  </div>

                  <div className="flex flex-wrap justify-between gap-3 py-4">
                    <dt className="text-[#475467]">Cartão de transporte</dt>
                    <dd className="font-semibold">
                      Final {dadosConfirmacao.cartao.slice(-4)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                  Depois da confirmação, o token ficará disponível por 24 horas.
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 min-[480px]:flex-row min-[480px]:justify-end">
                  <button
                    type="button"
                    className="min-h-11 rounded-lg border border-[#155EEF] px-6 py-3 font-semibold text-[#155EEF] transition-colors hover:bg-[#EAF2FF] focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none active:scale-[0.97]"
                    onClick={() => setDadosConfirmacao(null)}
                  >
                    Voltar e editar
                  </button>

                  <button
                    type="button"
                    className="min-h-11 rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none active:scale-[0.97]"
                    onClick={confirmarResgate}
                  >
                    Confirmar resgate
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2
                  id="titulo-formulario-resgate"
                  className="text-2xl font-bold min-[768px]:text-3xl"
                >
                  Prepare seu resgate
                </h2>

                <p className="mt-2 text-[#475467]">
                  Informe os pontos e o cartão que receberá o crédito.
                </p>

                {semSaldoParaResgate && (
                  <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    Você precisa ter pelo menos 100 pontos para realizar um resgate.
                  </p>
                )}

                <form
                  className="mt-8 space-y-6"
                  onSubmit={handleSubmit(revisarResgate)}
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="pontos-resgate"
                      className="text-sm font-semibold"
                    >
                      Quantidade de pontos
                    </label>

                    <input
                      id="pontos-resgate"
                      type="number"
                      min="100"
                      step="100"
                      placeholder="Exemplo: 100"
                      aria-invalid={errors.pontos ? 'true' : 'false'}
                      aria-describedby={
                        errors.pontos
                          ? 'erro-pontos-resgate'
                          : 'ajuda-pontos-resgate'
                      }
                      className={`mt-2 w-full rounded-lg border bg-[#F8FAFD] px-4 py-3 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100 ${
                        errors.pontos
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#C7D7F3] focus:border-[#155EEF]'
                      }`}
                      {...register('pontos', {
                        required: 'Informe quantos pontos deseja resgatar.',
                        valueAsNumber: true,
                        min: {
                          value: 100,
                          message: 'O resgate mínimo é de 100 pontos.',
                        },
                        validate: {
                          multiploDeCem: (valor) =>
                            valor % 100 === 0 ||
                            'Utilize valores múltiplos de 100.',
                          saldoSuficiente: (valor) =>
                            valor <= usuarioLogado.pontos ||
                            'Seu saldo é insuficiente para esse resgate.',
                        },
                      })}
                    />

                    <p
                      id="ajuda-pontos-resgate"
                      className="mt-2 text-sm text-[#667085]"
                    >
                      Resgate mínimo de 100 pontos, sempre em múltiplos de 100.
                    </p>

                    {errors.pontos && (
                      <p
                        id="erro-pontos-resgate"
                        className="mt-2 text-sm text-red-600"
                        role="alert"
                      >
                        {errors.pontos.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cartao-resgate"
                      className="text-sm font-semibold"
                    >
                      Número do cartão de transporte
                    </label>

                    <input
                      id="cartao-resgate"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="Digite somente números"
                      aria-invalid={errors.cartao ? 'true' : 'false'}
                      aria-describedby={
                        errors.cartao
                          ? 'erro-cartao-resgate'
                          : 'ajuda-cartao-resgate'
                      }
                      className={`mt-2 w-full rounded-lg border bg-[#F8FAFD] px-4 py-3 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100 ${
                        errors.cartao
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#C7D7F3] focus:border-[#155EEF]'
                      }`}
                      {...register('cartao', {
                        required: 'Informe o número do cartão.',
                        pattern: {
                          value: /^\d{8,20}$/,
                          message: 'Digite entre 8 e 20 números.',
                        },
                      })}
                    />

                    <p
                      id="ajuda-cartao-resgate"
                      className="mt-2 text-sm text-[#667085]"
                    >
                      Usaremos apenas os quatro últimos números no comprovante.
                    </p>

                    {errors.cartao && (
                      <p
                        id="erro-cartao-resgate"
                        className="mt-2 text-sm text-red-600"
                        role="alert"
                      >
                        {errors.cartao.message}
                      </p>
                    )}
                  </div>

                  {errors.root && (
                    <p
                      className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                      role="alert"
                    >
                      {errors.root.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={semSaldoParaResgate}
                    className="min-h-11 w-full rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
                  >
                    Revisar resgate
                  </button>
                </form>
              </div>
            )}
          </section>

          <aside className="overflow-hidden rounded-3xl bg-[#155EEF] p-6 text-white shadow-xl shadow-blue-950/10 min-[768px]:p-8 min-[992px]:col-span-2">
            <p className="text-sm font-medium text-blue-100">
              Saldo da carteira
            </p>

            <p className="mt-3 text-5xl font-bold tracking-tight tabular-nums">
              {usuarioLogado.pontos.toLocaleString('pt-BR')}
            </p>

            <p className="mt-1 text-blue-100">pontos disponíveis</p>

            <div className="mt-8 flex items-center" aria-hidden="true">
              <span className="h-3 w-3 rounded-full border-2 border-white bg-[#155EEF]"></span>
              <span className="h-1 flex-1 bg-white"></span>
              <span className="h-3 w-3 rounded-full bg-white"></span>
              <span className="h-1 flex-1 bg-white/40"></span>
              <span className="h-3 w-3 rounded-full border-2 border-white/70 bg-[#155EEF]"></span>
            </div>

            <div className="mt-8 rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-blue-100">Conversão do Pass Up</p>
              <p className="mt-2 text-xl font-semibold">
                100 pontos = R$ 1,00
              </p>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                O valor será convertido em crédito para o cartão informado.
              </p>
            </div>

            <Link
              to="/saldo"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-white hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#155EEF] focus-visible:outline-none"
            >
              Voltar para minha carteira
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}