import { Link } from 'react-router-dom'

export default function Rodape() {
  return (
    <footer className="bg-[#0B1F3A] text-blue-100">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 px-6 py-8 min-[768px]:grid-cols-3 min-[768px]:px-8 min-[992px]:px-12">
        <div className="col-span-2 min-[768px]:col-span-1">
          <Link to="/" className="text-xl font-bold text-white">
            Pass Up
          </Link>

          <p className="mt-2 max-w-sm text-sm leading-6">
            Transformando engajamento em novas possibilidades de mobilidade
            urbana.
          </p>
        </div>

        <nav aria-label="Links institucionais">
          <h2 className="mb-3 font-semibold text-white">Institucional</h2>

          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Início
              </Link>
            </li>

            <li>
              <Link to="/sobre" className="hover:text-white">
                Sobre
              </Link>
            </li>

            <li>
              <Link to="/integrantes" className="hover:text-white">
                Integrantes
              </Link>
            </li>

            <li>
              <Link to="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>

            <li>
              <Link to="/contato" className="hover:text-white">
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Links da conta">
          <h2 className="mb-3 font-semibold text-white">Sua conta</h2>

          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/login" className="hover:text-white">
                Entrar
              </Link>
            </li>

            <li>
              <Link to="/cadastro" className="hover:text-white">
                Criar conta
              </Link>
            </li>

            <li>
              <Link to="/saldo" className="hover:text-white">
                Consultar saldo
              </Link>
            </li>

            <li>
              <Link to="/resgate" className="hover:text-white">
                Resgatar pontos
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-blue-900">
        <p className="mx-auto max-w-[1600px] px-6 py-4 text-center text-sm min-[768px]:px-8 min-[992px]:px-12">
          &copy; 2026 Pass Up. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}