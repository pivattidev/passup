import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'
import type { ContextoAplicacao, Usuario } from './types/Usuario'

export default function App() {
  const [usuarioCadastrado, setUsuarioCadastrado] = useState<Usuario | null>(null)

  function cadastrarUsuario(usuario: Usuario) {
    setUsuarioCadastrado(usuario)
  }

  const contextoAplicacao: ContextoAplicacao = {
    usuarioCadastrado,
    cadastrarUsuario,
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