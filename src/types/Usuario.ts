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
  cadastrarUsuario: (usuario: Usuario) => void
  entrar: (usuario: Usuario) => void
}