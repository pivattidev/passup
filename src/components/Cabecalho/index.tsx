import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function definirClasseLink({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'font-semibold text-[#155EEF]'
    : 'text-[#475467] hover:text-[#155EEF]'
}

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)

  function alternarMenu() {
    setMenuAberto((estadoAtual) => !estadoAtual)
  }

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <header className="relative border-b border-[#D6E4FF] bg-white">
      <nav
        className="mx-auto flex min-h-18 max-w-[1600px] items-center justify-between px-6 min-[768px]:px-8 min-[992px]:px-12"
        aria-label="Navegação principal"
      >
        <Link
          to="/"
          className="flex shrink-0 rounded-lg focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none"
          onClick={fecharMenu}
          aria-label="Ir para a página inicial"
        >
          <img
            src="/images/logo-passup.png"
            alt="Pass Up"
            className="h-10 w-auto object-contain min-[480px]:h-12"
          />
        </Link>

        <button
          type="button"
          className="rounded-lg border border-[#D6E4FF] px-3 py-2 text-[#0B1F3A] min-[992px]:hidden"
          onClick={alternarMenu}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
        >
          {menuAberto ? 'Fechar' : 'Menu'}
        </button>

        <div
          id="menu-principal"
          className={`
            ${menuAberto ? 'flex' : 'hidden'}
            absolute top-full left-0 z-10 w-full flex-col gap-4
            border-b border-[#D6E4FF] bg-white p-4
            min-[992px]:static min-[992px]:flex min-[992px]:w-auto
            min-[992px]:flex-row min-[992px]:items-center
            min-[992px]:border-0 min-[992px]:p-0
          `}
        >
          <ul className="flex flex-col gap-4 min-[992px]:flex-row">
            <li>
              <NavLink
                to="/"
                end
                className={definirClasseLink}
                onClick={fecharMenu}
              >
                Início
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/sobre"
                className={definirClasseLink}
                onClick={fecharMenu}
              >
                Sobre
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/integrantes"
                className={definirClasseLink}
                onClick={fecharMenu}
              >
                Integrantes
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/faq"
                className={definirClasseLink}
                onClick={fecharMenu}
              >
                FAQ
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contato"
                className={definirClasseLink}
                onClick={fecharMenu}
              >
                Contato
              </NavLink>
            </li>
          </ul>

          <div className="flex flex-col gap-3 min-[992px]:flex-row">
            <Link
              to="/login"
              className="rounded-lg border border-[#155EEF] px-4 py-2 text-center font-medium text-[#155EEF]"
              onClick={fecharMenu}
            >
              Entrar
            </Link>

            <Link
              to="/cadastro"
              className="rounded-lg bg-[#155EEF] px-4 py-2 text-center font-medium text-white"
              onClick={fecharMenu}
            >
              Criar conta
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}