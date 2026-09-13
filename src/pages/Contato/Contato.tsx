import { useForm } from 'react-hook-form'
import type { DadosContato } from '../../types/Contato'

export default function Contato() {
  const { register, handleSubmit, reset, formState } = useForm<DadosContato>()
  const { errors } = formState

  function enviarMensagem() {
    reset()
  }

  return (
    <main className="px-6 py-12">
      <h1 className="text-4xl font-bold text-[#0B1F3A]">
        Entre em contato
      </h1>

      <form
        className="mt-8 flex max-w-2xl flex-col gap-5"
        onSubmit={handleSubmit(enviarMensagem)}
        noValidate
      >
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            {...register('nome', {
              required: 'Informe seu nome.',
              validate: (valor) =>
                valor.trim().length >= 3 ||
                'O nome precisa ter pelo menos 3 caracteres.',
            })}
          />
          {errors.nome && <p>{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Informe seu e-mail.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Digite um e-mail válido.',
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="assunto">Assunto</label>
          <input
            id="assunto"
            type="text"
            {...register('assunto', {
              required: 'Informe o assunto.',
              minLength: {
                value: 4,
                message: 'O assunto precisa ter pelo menos 4 caracteres.',
              },
            })}
          />
          {errors.assunto && <p>{errors.assunto.message}</p>}
        </div>

        <div>
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            rows={5}
            {...register('mensagem', {
              required: 'Escreva sua mensagem.',
              validate: (valor) =>
                valor.trim().length >= 20 ||
                'A mensagem precisa ter pelo menos 20 caracteres.',
            })}
          ></textarea>
          {errors.mensagem && <p>{errors.mensagem.message}</p>}
        </div>

        <button type="submit">Enviar mensagem</button>
      </form>
    </main>
  )
}