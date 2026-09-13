import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { canaisContato } from '../../data/CanaisContato'
import type { DadosContato } from '../../types/Contato'

function definirClasseCampo(temErro: boolean) {
  const classeBase =
    'mt-2 w-full rounded-lg border bg-[#F8FAFD] px-4 py-3 text-[#0B1F3A] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100'

  return temErro
    ? `${classeBase} border-red-500 focus:border-red-500`
    : `${classeBase} border-[#C7D7F3] focus:border-[#155EEF]`
}

export default function Contato() {
  const [nomeEnviado, setNomeEnviado] = useState('')
  const [mensagemEnviada, setMensagemEnviada] = useState(false)

  const { register, handleSubmit, reset, formState } = useForm<DadosContato>()
  const { errors } = formState

  function enviarMensagem(dados: DadosContato) {
    setNomeEnviado(dados.nome.trim())
    setMensagemEnviada(true)
    reset()
  }

  function enviarOutraMensagem() {
    setNomeEnviado('')
    setMensagemEnviada(false)
  }

  if (mensagemEnviada) {
    return (
      <main className="bg-[#F2F8FD] px-6 py-20 text-[#0B1F3A] min-[768px]:px-8 min-[992px]:px-12">
        <section
          className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-xl shadow-blue-950/5 min-[768px]:p-12"
          aria-labelledby="titulo-mensagem-enviada"
        >
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F0] text-3xl font-bold text-[#12B76A]"
            aria-hidden="true"
          >
            ✓
          </div>

          <h1
            id="titulo-mensagem-enviada"
            className="mt-6 text-3xl font-bold min-[768px]:text-4xl"
          >
            Mensagem enviada!
          </h1>

          <p className="mt-4 leading-7 text-[#475467]">
            Obrigado, {nomeEnviado}. Sua mensagem foi recebida pela equipe do
            Pass Up.
          </p>

          <button
            type="button"
            className="mt-8 w-full rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:outline-none active:scale-[0.98]"
            onClick={enviarOutraMensagem}
          >
            Enviar outra mensagem
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[992px]:grid-cols-2 min-[992px]:px-12">
        <section aria-labelledby="titulo-contato">
          <p className="font-semibold text-[#155EEF]">
            Contato
          </p>

          <h1
            id="titulo-contato"
            className="mt-3 max-w-xl text-4xl leading-tight font-bold min-[768px]:text-5xl"
          >
            Fale com a equipe do Pass Up
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-[#475467]">
            Envie sua dúvida, sugestão ou comentário. Utilize o formulário ou
            escolha um dos nossos canais.
          </p>

          <ul className="mt-8 grid max-w-xl gap-4 min-[480px]:grid-cols-2">
            {canaisContato.map((canal) => (
              <li key={canal.nome}>
                <a
                  href={canal.link}
                  target={canal.externo ? '_blank' : undefined}
                  rel={canal.externo ? 'noreferrer' : undefined}
                  className="block h-full rounded-xl border border-[#D6E4FF] bg-white p-4 transition-colors hover:bg-[#EAF2FF] focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 focus-visible:outline-none"
                  aria-label={`Abrir canal de contato: ${canal.nome}`}
                >
                  <span className="block font-semibold text-[#155EEF]">
                    {canal.nome}
                  </span>

                  <span className="mt-1 block text-sm text-[#475467]">
                    {canal.descricao}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="w-full rounded-2xl bg-white p-6 shadow-xl shadow-blue-950/5 min-[768px]:p-10 min-[992px]:max-w-3xl min-[992px]:justify-self-end"
          aria-labelledby="titulo-formulario-contato"
        >
          <h2
            id="titulo-formulario-contato"
            className="text-2xl font-bold min-[768px]:text-3xl"
          >
            Envie uma mensagem
          </h2>

          <p className="mt-2 text-[#475467]">
            Preencha os campos para registrar seu contato.
          </p>

          <form
            className="mt-8 grid gap-5 min-[768px]:grid-cols-2"
            onSubmit={handleSubmit(enviarMensagem)}
            noValidate
          >
            <div>
              <label htmlFor="nome" className="text-sm font-semibold">
                Nome
              </label>

              <input
                id="nome"
                type="text"
                autoComplete="name"
                placeholder="Digite seu nome"
                aria-invalid={errors.nome ? 'true' : 'false'}
                aria-describedby={errors.nome ? 'erro-nome-contato' : undefined}
                className={definirClasseCampo(Boolean(errors.nome))}
                {...register('nome', {
                  required: 'Informe seu nome.',
                  validate: (valor) =>
                    valor.trim().length >= 3 ||
                    'O nome precisa ter pelo menos 3 caracteres.',
                })}
              />

              {errors.nome && (
                <p id="erro-nome-contato" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email-contato" className="text-sm font-semibold">
                E-mail
              </label>

              <input
                id="email-contato"
                type="email"
                autoComplete="email"
                placeholder="nome@exemplo.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'erro-email-contato' : undefined}
                className={definirClasseCampo(Boolean(errors.email))}
                {...register('email', {
                  required: 'Informe seu e-mail.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Digite um e-mail válido.',
                  },
                })}
              />

              {errors.email && (
                <p id="erro-email-contato" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="min-[768px]:col-span-2">
              <label htmlFor="assunto" className="text-sm font-semibold">
                Assunto
              </label>

              <input
                id="assunto"
                type="text"
                placeholder="Sobre o que deseja falar?"
                aria-invalid={errors.assunto ? 'true' : 'false'}
                aria-describedby={errors.assunto ? 'erro-assunto' : undefined}
                className={definirClasseCampo(Boolean(errors.assunto))}
                {...register('assunto', {
                  required: 'Informe o assunto.',
                  minLength: {
                    value: 4,
                    message: 'O assunto precisa ter pelo menos 4 caracteres.',
                  },
                })}
              />

              {errors.assunto && (
                <p id="erro-assunto" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.assunto.message}
                </p>
              )}
            </div>

            <div className="min-[768px]:col-span-2">
              <label htmlFor="mensagem" className="text-sm font-semibold">
                Mensagem
              </label>

              <textarea
                id="mensagem"
                rows={5}
                placeholder="Escreva sua mensagem"
                aria-invalid={errors.mensagem ? 'true' : 'false'}
                aria-describedby={errors.mensagem ? 'erro-mensagem' : undefined}
                className={`${definirClasseCampo(Boolean(errors.mensagem))} resize-y`}
                {...register('mensagem', {
                  required: 'Escreva sua mensagem.',
                  validate: (valor) =>
                    valor.trim().length >= 20 ||
                    'A mensagem precisa ter pelo menos 20 caracteres.',
                })}
              ></textarea>

              {errors.mensagem && (
                <p id="erro-mensagem" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.mensagem.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:outline-none active:scale-[0.98] min-[768px]:col-span-2"
            >
              Enviar mensagem
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}