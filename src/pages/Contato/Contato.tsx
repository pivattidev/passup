import { useForm } from 'react-hook-form'
import type { DadosContato } from '../../types/Contato'

export default function Contato() {
  const { register, handleSubmit, reset } = useForm<DadosContato>()

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
          <input id="nome" type="text" {...register('nome')} />
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" {...register('email')} />
        </div>

        <div>
          <label htmlFor="assunto">Assunto</label>
          <input id="assunto" type="text" {...register('assunto')} />
        </div>

        <div>
          <label htmlFor="mensagem">Mensagem</label>
          <textarea id="mensagem" rows={5} {...register('mensagem')}></textarea>
        </div>

        <button type="submit">Enviar mensagem</button>
      </form>
    </main>
  )
}