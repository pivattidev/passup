import { Link } from 'react-router-dom'

export default function PaginaNaoEncontrada() {
  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 py-16 min-[768px]:px-8 min-[768px]:py-20 min-[992px]:grid-cols-2 min-[992px]:px-12">
        <section className="max-w-xl">
          <p className="font-semibold text-[#155EEF]">
            Erro 404
          </p>

          <h1 className="mt-3 text-4xl leading-tight font-bold min-[768px]:text-5xl">
            Essa página não faz parte da nossa rota.
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#475467]">
            O endereço pode ter mudado ou não existe. Volte ao início para
            continuar navegando pelo Pass Up.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#155EEF] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:outline-none active:scale-[0.98]"
          >
            Voltar para o início
          </Link>
        </section>

        <div
          className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-3xl border border-[#D6E4FF] bg-[#EAF2FF] min-[768px]:min-h-80"
          aria-hidden="true"
        >
          <span className="text-8xl font-bold tracking-tight text-white min-[480px]:text-9xl min-[768px]:text-[10rem]">
            404
          </span>

          <div className="absolute right-[8%] left-[8%] flex items-center">
            <span className="h-4 w-4 shrink-0 rounded-full border-4 border-[#155EEF] bg-white"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-4 w-4 shrink-0 rounded-full bg-[#155EEF]"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-4 w-4 shrink-0 rounded-full bg-[#12B76A]"></span>
          </div>

          <p className="absolute bottom-7 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#155EEF] shadow-sm">
            Ponto não encontrado
          </p>
        </div>
      </div>
    </main>
  )
}