import CardIntegrante from '../../components/CardIntegrante'
import { integrantes } from '../../data/integrantes'

export default function Integrantes() {
  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <section className="mx-auto max-w-[1600px] px-6 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[992px]:px-12">
        <p className="font-semibold text-[#155EEF]">
          Equipe Pass Up
        </p>

        <div className="mt-3 flex flex-col gap-5 min-[992px]:flex-row min-[992px]:items-end min-[992px]:justify-between">
          <h1 className="max-w-2xl text-4xl leading-tight font-bold min-[768px]:text-5xl">
            Conheça nossa equipe
          </h1>

          <p className="max-w-xl text-lg leading-8 text-[#475467]">
            A equipe responsável pelo desenvolvimento do Pass Up.
          </p>
        </div>

        <div className="mt-10 grid gap-6 min-[768px]:grid-cols-2 min-[992px]:grid-cols-3 min-[1280px]:grid-cols-5">
          {integrantes.map((integrante) => (
            <CardIntegrante key={integrante.rm} integrante={integrante} />
          ))}
        </div>
      </section>
    </main>
  )
}