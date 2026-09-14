import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'
import type { Movimentacao, ResgateRealizado } from './types/Resgate'
import type { ContextoAplicacao, Usuario } from './types/Usuario'

function gerarToken() {
  const trechoData = Date.now().toString(36).slice(-4)
  const trechoAleatorio = Math.random().toString(36).slice(2, 6)

  return `PASS-${trechoData}-${trechoAleatorio}`.toUpperCase()
}

function formatarData(data: number) {
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function App() {
  const [usuarioCadastrado, setUsuarioCadastrado] = useState<Usuario | null>(null)
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null)
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([])
  const [resgates, setResgates] = useState<ResgateRealizado[]>([])
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  function cadastrarUsuario(usuario: Usuario) {
    const agora = Date.now()

    setUsuarioCadastrado(usuario)
    setUsuarioLogado(null)
    setResgates([])
    setMovimentacoes([
      {
        id: `cadastro-${agora}`,
        titulo: 'Conta criada',
        descricao: 'Bônus inicial de boas-vindas',
        data: formatarData(agora),
        pontos: 100,
      },
    ])
  }

  function entrar(usuario: Usuario) {
    setUsuarioLogado(usuario)
  }

  function realizarResgate(pontos: number, cartao: string) {
    if (!usuarioLogado || pontos < 100 || pontos % 100 !== 0 || pontos > usuarioLogado.pontos) {
      return null
    }

    const agora = Date.now()
    const usuarioAtualizado = {
      ...usuarioLogado,
      pontos: usuarioLogado.pontos - pontos,
    }

    const numeroCartao = cartao.replace(/\D/g, '')

    const novoResgate: ResgateRealizado = {
      id: agora.toString(),
      pontos,
      valor: pontos / 100,
      finalCartao: numeroCartao.slice(-4),
      token: gerarToken(),
      criadoEm: agora,
      expiraEm: agora + 24 * 60 * 60 * 1000,
    }

    setUsuarioLogado(usuarioAtualizado)

    setUsuarioCadastrado((usuarioAtual) =>
      usuarioAtual?.email === usuarioLogado.email
        ? usuarioAtualizado
        : usuarioAtual,
    )

    setResgates((resgatesAtuais) => [
      novoResgate,
      ...resgatesAtuais,
    ])

    setMovimentacoes((movimentacoesAtuais) => [
      {
        id: `resgate-${agora}`,
        titulo: 'Resgate realizado',
        descricao: `Cartão com final ${novoResgate.finalCartao}`,
        data: formatarData(agora),
        pontos: -pontos,
      },
      ...movimentacoesAtuais,
    ])

    return novoResgate
  }

  const contextoAplicacao: ContextoAplicacao = {
    usuarioCadastrado,
    usuarioLogado,
    movimentacoes,
    resgates,
    cadastrarUsuario,
    entrar,
    realizarResgate,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Cabecalho />

      <div className="flex-1">
        <Outlet context={contextoAplicacao} />
      </div>

      <Rodape />
    </div>
  )
}