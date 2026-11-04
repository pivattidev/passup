import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  atualizarTransporte,
  buscarTransporte,
} from '../../services/transporteService'
import type {
  DadosEdicaoTransporte,
  EstadoRequisicao,
  Transporte,
} from '../../types/Transporte'

export default function DetalheTransporte() {
  const { id } = useParams<{ id: string }>()
  const [estado, setEstado] = useState<EstadoRequisicao<Transporte>>({
    status: 'carregando',
  })
  const [dados, setDados] = useState<DadosEdicaoTransporte | null>(null)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erroSalvar, setErroSalvar] = useState(false)
  const idTransporte = Number(id)
  const idValido = Number.isInteger(idTransporte) && idTransporte > 0
  const [idCarregado, setIdCarregado] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true

    async function carregarDetalhe() {
      if (!idValido) return

      try {
        const transporte = await buscarTransporte(idTransporte)
        if (!ativo) return

        setEstado({ status: 'sucesso', dados: transporte })
        setDados({
          tipoTransporte: transporte.tipoTransporte,
          nomeCartao: transporte.nomeCartao,
          operadora: transporte.operadora,
        })
      } catch (erro) {
        if (!ativo) return
        setEstado({
          status: 'erro',
          mensagem:
            erro instanceof Error ? erro.message : 'Não foi possível buscar este transporte.',
        })
      } finally {
        if (ativo) setIdCarregado(id ?? '')
      }
    }

    void carregarDetalhe()
    return () => { ativo = false }
  }, [id, idTransporte, idValido])

  function alterarCampo(campo: keyof DadosEdicaoTransporte, valor: string) {
    setDados((atuais) => atuais ? { ...atuais, [campo]: valor } : atuais)
    setMensagem('')
  }

  async function salvarAlteracoes(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (estado.status !== 'sucesso' || !dados) return

    setSalvando(true)
    setMensagem('')
    setErroSalvar(false)

    try {
      await atualizarTransporte({ ...dados, idTransporte: estado.dados.idTransporte })
      const atualizado = await buscarTransporte(estado.dados.idTransporte)
      setEstado({ status: 'sucesso', dados: atualizado })
      setDados({
        tipoTransporte: atualizado.tipoTransporte,
        nomeCartao: atualizado.nomeCartao,
        operadora: atualizado.operadora,
      })
      setMensagem('Dados atualizados na API.')
    } catch (erro) {
      setErroSalvar(true)
      setMensagem(
        erro instanceof Error ? erro.message : 'Não foi possível atualizar o transporte.',
      )
    } finally {
      setSalvando(false)
    }
  }

  return (
    <main className="bg-[#F2F8FD] px-6 py-12 text-[#0B1F3A] min-[768px]:px-8 min-[768px]:py-16">
      <div className="mx-auto max-w-3xl">
        <Link to="/transportes" className="font-semibold text-[#155EEF] hover:underline">
          ← Voltar para transportes
        </Link>

        {!idValido && (
          <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm" role="alert">
            <p className="font-semibold text-[#F79009]">Código inválido</p>
            <h1 className="mt-2 text-2xl font-bold">Não encontramos esse transporte</h1>
            <p className="mt-3 leading-7 text-[#475467]">O código informado não é válido.</p>
          </section>
        )}

        {idValido && (idCarregado !== id || estado.status === 'carregando') && (
          <p className="mt-6 rounded-2xl bg-white p-6 text-[#475467]" role="status">
            Consultando transporte na API…
          </p>
        )}

        {idValido && idCarregado === id && estado.status === 'erro' && (
          <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm" role="alert">
            <p className="font-semibold text-[#F79009]">Detalhe indisponível</p>
            <h1 className="mt-2 text-2xl font-bold">Não encontramos esse transporte</h1>
            <p className="mt-3 leading-7 text-[#475467]">{estado.mensagem}</p>
          </section>
        )}

        {idValido && idCarregado === id && estado.status === 'sucesso' && dados && (
          <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm shadow-blue-950/5 min-[768px]:p-9">
            <p className="font-semibold text-[#155EEF]">Registro #{estado.dados.idTransporte}</p>
            <h1 className="mt-2 text-3xl font-bold">Detalhes do transporte</h1>
            <p className="mt-3 leading-7 text-[#475467]">
              Os campos abaixo vêm do Java. Salvar envia uma atualização para o banco Oracle.
            </p>

            <form className="mt-8 grid gap-5" onSubmit={salvarAlteracoes}>
              <label className="grid gap-2 text-sm font-semibold" htmlFor="tipo-transporte">
                Tipo de transporte
                <input
                  id="tipo-transporte"
                  value={dados.tipoTransporte}
                  onChange={(evento) => alterarCampo('tipoTransporte', evento.target.value)}
                  maxLength={15}
                  required
                  className="rounded-lg border border-[#C7D7F3] bg-[#F8FAFD] px-4 py-3 font-normal outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold" htmlFor="nome-cartao">
                Nome do cartão
                <input
                  id="nome-cartao"
                  value={dados.nomeCartao}
                  onChange={(evento) => alterarCampo('nomeCartao', evento.target.value)}
                  maxLength={20}
                  required
                  className="rounded-lg border border-[#C7D7F3] bg-[#F8FAFD] px-4 py-3 font-normal outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold" htmlFor="operadora">
                Operadora
                <input
                  id="operadora"
                  value={dados.operadora}
                  onChange={(evento) => alterarCampo('operadora', evento.target.value)}
                  maxLength={20}
                  required
                  className="rounded-lg border border-[#C7D7F3] bg-[#F8FAFD] px-4 py-3 font-normal outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-blue-100"
                />
              </label>

              {mensagem && (
                <p
                  className={`rounded-xl p-4 text-sm ${erroSalvar ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-800'}`}
                  role={erroSalvar ? 'alert' : 'status'}
                >
                  {mensagem}
                </p>
              )}

              <button
                type="submit"
                disabled={salvando}
                className="min-h-11 rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60"
              >
                {salvando ? 'Salvando…' : 'Salvar alterações'}
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  )
}
