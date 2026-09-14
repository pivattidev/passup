import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { ContextoAplicacao } from '../../types/Usuario'

interface DadosCadastro {
  nome: string
  email: string
  telefone: string
  senha: string
  confirmarSenha: string
  aceitarTermos: boolean
}

export default function Cadastro() {
  const [cadastroConcluido, setCadastroConcluido] = useState(false)
  const navigate = useNavigate()

  const { usuarioCadastrado, cadastrarUsuario } =
    useOutletContext<ContextoAplicacao>()

  const { register, handleSubmit, reset, setError, formState } =
    useForm<DadosCadastro>({
      defaultValues: {
        aceitarTermos: false,
      },
    })

  const { errors } = formState

  function enviarCadastro(dados: DadosCadastro) {
    const emailInformado = dados.email.trim().toLowerCase()

    if (usuarioCadastrado?.email.toLowerCase() === emailInformado) {
      setError('email', {
        type: 'manual',
        message: 'Este e-mail já está cadastrado.',
      })

      return
    }

    cadastrarUsuario({
      nome: dados.nome.trim(),
      email: emailInformado,
      telefone: dados.telefone.trim(),
      senha: dados.senha,
      pontos: 100,
    })

    reset()
    setCadastroConcluido(true)
  }

  if (cadastroConcluido) {
    return (
      <main className="bg-[#F2F8FD] px-6 py-20 text-[#0B1F3A] min-[768px]:px-8 min-[992px]:px-12">
        <section
          className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-xl shadow-blue-950/5 min-[768px]:p-12"
          aria-labelledby="titulo-sucesso"
        >
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F0] text-3xl font-bold text-[#12B76A]"
            aria-hidden="true"
          >
            ✓
          </div>

          <p className="mt-6 font-semibold text-[#155EEF]">
            Cadastro concluído
          </p>

          <h1
            id="titulo-sucesso"
            className="mt-2 text-3xl font-bold min-[768px]:text-4xl"
          >
            Bem-vindo ao Pass Up!
          </h1>

          <p className="mt-4 leading-7 text-[#475467]">
            Sua conta foi criada e seus 100 pontos de boas-vindas já foram
            adicionados.
          </p>

          <button
            type="button"
            className="mt-8 w-full rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 focus:outline-none active:scale-[0.98]"
            onClick={() => navigate('/login')}
          >
            Ir para o login
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[992px]:grid-cols-2 min-[992px]:px-12">
        <div className="max-w-xl">
          <p className="font-semibold text-[#155EEF]">
            Cadastro Pass Up
          </p>

          <h1 className="mt-3 text-4xl leading-tight font-bold min-[768px]:text-5xl">
            Comece seu caminho no Pass Up.
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#475467]">
            Crie sua conta para participar das ações, acumular pontos e
            transformar sua participação em benefícios para sua mobilidade.
          </p>

          <div
            className="mt-9 flex max-w-sm items-center"
            aria-hidden="true"
          >
            <span className="h-3 w-3 rounded-full border-2 border-[#155EEF] bg-[#F2F8FD]"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#12B76A]"></span>
          </div>

          <div className="mt-7 max-w-md">
            <p className="text-sm font-semibold text-[#155EEF]">
              Benefício inicial
            </p>

            <p className="mt-1 text-lg font-semibold">
              Você começa com 100 pontos
            </p>

            <p className="mt-1 leading-7 text-[#475467]">
              O equivalente a R$ 1,00 em benefícios dentro do Pass Up.
            </p>
          </div>
        </div>

        <section
          className="w-full rounded-2xl bg-white p-6 shadow-xl shadow-blue-950/5 min-[768px]:p-10 min-[992px]:max-w-3xl min-[992px]:justify-self-end"
          aria-labelledby="titulo-cadastro"
        >
          <div>
            <h2
              id="titulo-cadastro"
              className="text-2xl font-bold min-[768px]:text-3xl"
            >
              Crie sua conta
            </h2>

            <p className="mt-2 text-[#475467]">
              Preencha seus dados para entrar no Pass Up.
            </p>
          </div>

          <form
            className="mt-8 grid gap-5 min-[768px]:grid-cols-2"
            onSubmit={handleSubmit(enviarCadastro)}
            noValidate
          >
            <div>
              <label htmlFor="nome" className="text-sm font-semibold">
                Nome completo
              </label>

              <input
                id="nome"
                type="text"
                autoComplete="name"
                placeholder="Digite seu nome"
                aria-invalid={errors.nome ? 'true' : 'false'}
                aria-describedby={errors.nome ? 'erro-nome' : undefined}
                className={`mt-2 w-full rounded-lg border bg-[#F8FAFD] px-4 py-3 text-[#0B1F3A] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100 ${
                  errors.nome
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#C7D7F3] focus:border-[#155EEF]'
                }`}
                {...register('nome', {
                  required: 'Informe seu nome.',
                  validate: (valor) =>
                    valor.trim().length >= 3 ||
                    'O nome precisa ter pelo menos 3 caracteres.',
                })}
              />

              {errors.nome && (
                <p
                  id="erro-nome"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="telefone" className="text-sm font-semibold">
                Telefone
              </label>

              <input
                id="telefone"
                type="tel"
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                aria-invalid={errors.telefone ? 'true' : 'false'}
                aria-describedby={
                  errors.telefone ? 'erro-telefone' : undefined
                }
                className={`mt-2 w-full rounded-lg border bg-[#F8FAFD] px-4 py-3 text-[#0B1F3A] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100 ${
                  errors.telefone
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#C7D7F3] focus:border-[#155EEF]'
                }`}
                {...register('telefone', {
                  required: 'Informe seu telefone.',
                  pattern: {
                    value: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                    message: 'Digite um telefone válido.',
                  },
                })}
              />

              {errors.telefone && (
                <p
                  id="erro-telefone"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.telefone.message}
                </p>
              )}
            </div>

            <div className="min-[768px]:col-span-2">
              <label htmlFor="email" className="text-sm font-semibold">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="nome@exemplo.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'erro-email' : undefined}
                className={`mt-2 w-full rounded-lg border bg-[#F8FAFD] px-4 py-3 text-[#0B1F3A] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100 ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#C7D7F3] focus:border-[#155EEF]'
                }`}
                {...register('email', {
                  required: 'Informe seu e-mail.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Digite um e-mail válido.',
                  },
                })}
              />

              {errors.email && (
                <p
                  id="erro-email"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="senha" className="text-sm font-semibold">
                Senha
              </label>

              <input
                id="senha"
                type="password"
                autoComplete="new-password"
                placeholder="Mínimo de 6 caracteres"
                aria-invalid={errors.senha ? 'true' : 'false'}
                aria-describedby={errors.senha ? 'erro-senha' : undefined}
                className={`mt-2 w-full rounded-lg border bg-[#F8FAFD] px-4 py-3 text-[#0B1F3A] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100 ${
                  errors.senha
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#C7D7F3] focus:border-[#155EEF]'
                }`}
                {...register('senha', {
                  required: 'Crie uma senha.',
                  minLength: {
                    value: 6,
                    message: 'A senha precisa ter pelo menos 6 caracteres.',
                  },
                })}
              />

              {errors.senha && (
                <p
                  id="erro-senha"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.senha.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmarSenha"
                className="text-sm font-semibold"
              >
                Confirmar senha
              </label>

              <input
                id="confirmarSenha"
                type="password"
                autoComplete="new-password"
                placeholder="Digite a senha novamente"
                aria-invalid={errors.confirmarSenha ? 'true' : 'false'}
                aria-describedby={
                  errors.confirmarSenha
                    ? 'erro-confirmar-senha'
                    : undefined
                }
                className={`mt-2 w-full rounded-lg border bg-[#F8FAFD] px-4 py-3 text-[#0B1F3A] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100 ${
                  errors.confirmarSenha
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#C7D7F3] focus:border-[#155EEF]'
                }`}
                {...register('confirmarSenha', {
                  required: 'Confirme sua senha.',
                  validate: (valor, dadosFormulario) =>
                    valor === dadosFormulario.senha ||
                    'As senhas precisam ser iguais.',
                })}
              />

              {errors.confirmarSenha && (
                <p
                  id="erro-confirmar-senha"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>

            <div className="min-[768px]:col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#155EEF]"
                  {...register('aceitarTermos', {
                    required:
                      'Você precisa aceitar os termos para continuar.',
                  })}
                />

                <span className="text-sm leading-6 text-[#475467]">
                  Li e concordo com os termos de uso do Pass Up.
                </span>
              </label>

              {errors.aceitarTermos && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.aceitarTermos.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 focus:outline-none active:scale-[0.98] min-[768px]:col-span-2"
            >
              Criar minha conta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#475467]">
            Já possui uma conta?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#155EEF] hover:underline"
            >
              Entre no Pass Up
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}