import { Link } from 'react-router-dom'

export default function PaginaNaoEncontrada() {
  return (
    <main>
      <section>
        <p>Erro 404</p>
        <h1>Página não encontrada</h1>

        <p>
          O endereço que você tentou acessar não existe.
        </p>

        <Link to="/">Voltar para a página inicial</Link>
      </section>
    </main>
  )
}