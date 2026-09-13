import { Link } from 'react-router-dom'
import ItemFaq from '../../components/ItemFaq'
import { perguntasFrequentes } from '../../data/perguntasFrequentes'

export default function Faq() {
  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[992px]:grid-cols-2 min-[992px]:gap-16 min-[992px]:px-12">
        <div className="max-w-xl">
          <p className="font-semibold text-[#155EEF]">
            Central de ajuda
          </p>

          <h1 className="mt-3 text-4xl leading-tight font-bold min-[768px]:text-5xl">
            Dúvidas sobre o Pass Up?
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#475467]">
            Confira as respostas para as principais dúvidas sobre pontos,
            saldo e resgates.
          </p>

          <div className="mt-8 flex max-w-xs items-center" aria-hidden="true">
            <span className="h-3 w-3 rounded-full border-2 border-[#155EEF] bg-[#F2F8FD]"></span>
            <span className="h-1 flex-1 bg-[#155EEF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#12B76A]"></span>
          </div>

          <div className="mt-8">
            <p className="font-semibold">
              Ainda precisa de ajuda?
            </p>

            <p className="mt-2 leading-7 text-[#475467]">
              Entre em contato com a equipe para enviar sua dúvida.
            </p>

            <Link
              to="/contato"
              className="mt-5 inline-block rounded-lg border border-[#155EEF] px-5 py-3 font-semibold text-[#155EEF] transition-colors hover:bg-[#EAF2FF] focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Falar com a equipe
            </Link>
          </div>
        </div>

        <section
          className="rounded-2xl bg-white px-6 shadow-xl shadow-blue-950/5 min-[768px]:px-8"
          aria-label="Lista de perguntas frequentes"
        >
          {perguntasFrequentes.map((item) => (
            <ItemFaq
              key={item.id}
              id={item.id}
              pergunta={item.pergunta}
              resposta={item.resposta}
            />
          ))}
        </section>
      </div>
    </main>
  )
}