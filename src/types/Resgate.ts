export interface Movimentacao {
  id: string
  titulo: string
  descricao: string
  data: string
  pontos: number
}

export interface ResgateRealizado {
  id: string
  pontos: number
  valor: number
  finalCartao: string
  token: string
  criadoEm: number
  expiraEm: number
}