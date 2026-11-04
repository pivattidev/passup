export interface Transporte {
  idTransporte: number
  tipoTransporte: string
  nomeCartao: string
  operadora: string
}

export type EstadoRequisicao<T> =
  | { status: 'carregando' }
  | { status: 'sucesso'; dados: T }
  | { status: 'erro'; mensagem: string }

export type TransporteComRota = Transporte & { rotaDetalhe: string }

export type DadosEdicaoTransporte = Pick<
  Transporte,
  'tipoTransporte' | 'nomeCartao' | 'operadora'
>
