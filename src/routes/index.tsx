import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Cadastro from '../pages/Cadastro/Cadastro'
import Contato from '../pages/Contato/Contato'
import Faq from '../pages/Faq/Faq'
import Home from '../pages/Home/Home'
import Integrantes from '../pages/Integrantes/Integrantes'
import Login from '../pages/Login/Login'
import PaginaNaoEncontrada from '../pages/PaginaNaoEncontrada/PaginaNaoEncontrada'
import Resgate from '../pages/Resgate/Resgate'
import Saldo from '../pages/Saldo/Saldo'
import Sobre from '../pages/Sobre/Sobre'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'sobre',
        element: <Sobre />,
      },
      {
        path: 'integrantes',
        element: <Integrantes />,
      },
      {
        path: 'faq',
        element: <Faq />,
      },
      {
        path: 'contato',
        element: <Contato />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'cadastro',
        element: <Cadastro />,
      },
      {
        path: 'saldo',
        element: <Saldo />,
      },
      {
        path: 'resgate',
        element: <Resgate />,
      },
      {
        path: '*',
        element: <PaginaNaoEncontrada />,
      },
    ],
  },
])