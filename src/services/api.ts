const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:8080' : '')
).replace(/\/$/, '')

export async function requisitarApi<T>(
  caminho: string,
  opcoes: Pick<RequestInit, 'method' | 'body'> = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error('A URL da API ainda não foi configurada para este ambiente.')
  }

  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...opcoes,
    headers: opcoes.body ? { 'Content-Type': 'application/json' } : undefined,
  })

  const conteudo = await resposta.text()

  if (!resposta.ok) {
    throw new Error(conteudo || `A API respondeu com erro ${resposta.status}.`)
  }

  if (!conteudo) return undefined as T

  if (resposta.headers.get('content-type')?.includes('application/json')) {
    return JSON.parse(conteudo) as T
  }

  return conteudo as T
}
