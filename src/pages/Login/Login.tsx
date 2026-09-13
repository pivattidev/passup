import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { ContextoAplicacao } from '../../types/Usuario'

interface DadosLogin {
  email: string
  senha: string
}

function definirClasseCampo(temErro: boolean) {
  const classeBase =
    'w-full rounded-lg border bg-[#F8FAFD] px-4 py-3 text-[#0B1F3A] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100'

  return temErro
    ? `${classeBase} border-red-500 focus:border-red-500`
    : `${classeBase} border-[#C7D7F3] focus:border-[#155EEF]`
}

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const navigate = useNavigate()
  const { usuarioCadastrado, entrar } = useOutletContext<ContextoAplicacao>()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<DadosLogin>()

  function enviarLogin(dados: DadosLogin) {
    if (!usuarioCadastrado) {
      setError('root', {
        type: 'manual',
        message: 'Nenhuma conta foi cadastrada. Crie sua conta antes de entrar.',
      })

      return
    }

    const emailCorreto = usuarioCadastrado.email.toLowerCase() === dados.email.trim().toLowerCase()
    const senhaCorreta = usuarioCadastrado.senha === dados.senha

    if (!emailCorreto || !senhaCorreta) {
      setError('root', {
        type: 'manual',
        message: 'E-mail ou senha incorretos.',
      })

      return
    }

    entrar(usuarioCadastrado)
    navigate('/saldo')
  }

  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 py-16 min-[768px]:px-8 min-[768px]:py-20 min-[992px]:grid-cols-2 min-[992px]:px-12">
        <section className="max-w-xl" aria-labelledby="titulo-login">
          <p className="font-semibold text-[#155EEF]">
            Sua conta no Pass Up
          </p>

          <h1
            id="titulo-login"
            className="mt-3 text-4xl leading-tight font-bold min-[768px]:text-5xl"
          >
            Entre e continue seu caminho.
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-[#475467]">
            Consulte seus pontos e acompanhe os benefícios conquistados com sua
            participação.
          </p>

          <div className="mt-9 flex max-w-sm items-center" aria-hidden="true">
            <span className="h-3 w-3 rounded-full border-2 border-[#155EEF] bg-[#F2F8FD]"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#155EEF]"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#12B76A]"></span>
          </div>

          <p className="mt-7 max-w-md leading-7 text-[#475467]">
            Ainda não possui cadastro? Crie sua conta gratuitamente para começar
            a utilizar o Pass Up.
          </p>
        </section>

        <section
          className="w-full rounded-2xl bg-white p-6 shadow-xl shadow-blue-950/5 min-[768px]:p-10 min-[992px]:max-w-xl min-[992px]:justify-self-end"
          aria-labelledby="titulo-formulario-login"
        >
          <h2
            id="titulo-formulario-login"
            className="text-2xl font-bold min-[768px]:text-3xl"
          >
            Acesse sua conta
          </h2>

          <p className="mt-2 text-[#475467]">
            Informe o e-mail e a senha utilizados no cadastro.
          </p>

          {usuarioCadastrado && (
            <p
              className="mt-6 rounded-lg border border-green-200 bg-[#E8F8F0] px-4 py-3 text-sm text-green-800"
              role="status"
            >
              Cadastro concluído. Sua conta já pode ser acessada.
            </p>
          )}

          <form className="mt-7 space-y-5" onSubmit={handleSubmit(enviarLogin)} noValidate>
            <div>
              <label htmlFor="email-login" className="text-sm font-semibold">
                E-mail
              </label>

              <input
                id="email-login"
                type="email"
                autoComplete="email"
                placeholder="nome@exemplo.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'erro-email-login' : undefined}
                className={`mt-2 ${definirClasseCampo(Boolean(errors.email))}`}
                {...register('email', {
                  required: 'Informe seu e-mail.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Digite um e-mail válido.',
                  },
                })}
              />

              {errors.email && (
                <p id="erro-email-login" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="senha-login" className="text-sm font-semibold">
                Senha
              </label>

              <div className="relative mt-2">
                <input
                  id="senha-login"
                  type={mostrarSenha ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  aria-invalid={errors.senha ? 'true' : 'false'}
                  aria-describedby={errors.senha ? 'erro-senha-login' : undefined}
                  className={`${definirClasseCampo(Boolean(errors.senha))} pr-24`}
                  {...register('senha', {
                    required: 'Informe sua senha.',
                    minLength: {
                      value: 6,
                      message: 'A senha precisa ter pelo menos 6 caracteres.',
                    },
                  })}
                />

                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded px-2 py-1 text-sm font-semibold text-[#155EEF] hover:bg-[#EAF2FF] focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:outline-none"
                  onClick={() => setMostrarSenha((estadoAtual) => !estadoAtual)}
                  aria-pressed={mostrarSenha}
                >
                  {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              {errors.senha && (
                <p id="erro-senha-login" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.senha.message}
                </p>
              )}
            </div>

            {errors.root && (
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {errors.root.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:outline-none active:scale-[0.98]"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#475467]">
            Ainda não possui uma conta?{' '}
            <Link to="/cadastro" className="font-semibold text-[#155EEF] hover:underline">
              Crie sua conta
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}