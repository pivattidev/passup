import ItemFaq from '../../components/ItemFaq'
import { perguntasFrequentes } from '../../data/perguntasFrequentes'

export default function Faq() {
  return (
    <main className="bg-[#F2F8FD] px-6 py-12 text-[#0B1F3A]">
      <div className="mx-auto max-w-[1600px]">
        <p className="font-semibold text-[#155EEF]">
          Central de ajuda
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Perguntas frequentes
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-[#475467]">
          Encontre respostas sobre pontos, saldo e resgates no Pass Up.
        </p>

        <section className="mt-8 rounded-2xl bg-white px-6">
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