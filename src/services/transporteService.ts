import { requisitarApi } from './api'
import type { DadosEdicaoTransporte, Transporte } from '../types/Transporte'

export function listarTransportes() {
  return requisitarApi<Transporte[]>('/transportes')
}

export function buscarTransporte(id: number) {
  return requisitarApi<Transporte>(`/transportes/${id}`)
}

export function atualizarTransporte(
  transporte: Transporte & DadosEdicaoTransporte,
) {
  return requisitarApi<string>('/transportes', {
    method: 'PUT',
    body: JSON.stringify(transporte),
  })
}
