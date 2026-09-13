export interface Usuario {
  nome: string
  email: string
  telefone: string
  senha: string
  pontos: number
}

export interface ContextoAplicacao {
  usuarioCadastrado: Usuario | null
  cadastrarUsuario: (usuario: Usuario) => void
}