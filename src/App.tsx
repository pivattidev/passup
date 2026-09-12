import { Outlet } from 'react-router-dom'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Cabecalho />

      <div className="flex-1">
        <Outlet />
      </div>

      <Rodape />
    </div>
  )
}
