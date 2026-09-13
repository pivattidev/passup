import type { Movimentacao, ResgateRealizado } from './Resgate'

export interface Usuario {
  nome: string
  email: string
  telefone: string
  senha: string
  pontos: number
}

export interface ContextoAplicacao {
  usuarioCadastrado: Usuario | null
  usuarioLogado: Usuario | null
  movimentacoes: Movimentacao[]
  resgates: ResgateRealizado[]
  cadastrarUsuario: (usuario: Usuario) => void
  entrar: (usuario: Usuario) => void
  realizarResgate: (pontos: number, cartao: string) => ResgateRealizado | null
}