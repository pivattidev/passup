import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="text-[#0B1F3A]">
      <section className="bg-[#F2F8FD]">
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 py-14 min-[768px]:px-8 min-[768px]:py-16 min-[992px]:grid-cols-2 min-[992px]:px-12">
          <div>
            <h1 className="max-w-2xl text-4xl leading-tight font-bold min-[768px]:text-5xl min-[992px]:text-6xl">
              Sua participação pode levar você mais longe.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#475467]">
              No Pass Up, suas ações geram pontos que podem ser transformados
              em benefícios para o transporte público.
            </p>

            <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
              <Link
                to="/login"
                className="rounded-lg bg-[#155EEF] px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
              >
                Entrar no Pass Up
              </Link>

              <Link
                to="/cadastro"
                className="rounded-lg border border-[#155EEF] px-6 py-3 text-center font-semibold text-[#155EEF] hover:bg-[#EAF2FF]"
              >
                Criar conta
              </Link>
            </div>
          </div>

          <div>
            <img
              src="/images/home-passup.png"
              alt="Celular, cartão e ônibus representando a mobilidade do Pass Up"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="relative bg-[#EAF2FF] px-6 pt-10 pb-14 min-[768px]:px-8 min-[992px]:px-12">
        <div
          className="absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
          aria-hidden="true"
        >
          <span className="h-3 w-3 rounded-full border-2 border-[#155EEF] bg-[#F2F8FD]"></span>

          <span className="h-1 w-20 bg-[#155EEF] min-[768px]:w-28"></span>

          <span className="h-3 w-3 rounded-full bg-[#12B76A]"></span>
        </div>

        <div className="mx-auto max-w-[1600px]">
          <h2 className="text-3xl font-bold">
            Um caminho simples
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#475467]">
            Participe das ações, acompanhe seus pontos e utilize seus benefícios
            na mobilidade urbana.
          </p>

          <div className="mt-8 grid gap-8 min-[768px]:grid-cols-3">
            <article>
              <h3 className="text-xl font-semibold text-[#155EEF]">
                Participe
              </h3>

              <p className="mt-2 leading-7 text-[#475467]">
                Realize ações dentro da plataforma.
              </p>
            </article>

            <article className="min-[768px]:border-l min-[768px]:border-[#B8D0FF] min-[768px]:pl-8">
              <h3 className="text-xl font-semibold text-[#155EEF]">
                Acumule
              </h3>

              <p className="mt-2 leading-7 text-[#475467]">
                Acompanhe seus pontos e movimentações.
              </p>
            </article>

            <article className="min-[768px]:border-l min-[768px]:border-[#B8D0FF] min-[768px]:pl-8">
              <h3 className="text-xl font-semibold text-[#155EEF]">
                Resgate
              </h3>

              <p className="mt-2 leading-7 text-[#475467]">
                Use seus pontos em benefícios de mobilidade.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}