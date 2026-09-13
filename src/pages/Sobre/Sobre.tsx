import CardValor from '../../components/CardValor'

export default function Sobre() {
  return (
    <main className="bg-[#F2F8FD] px-6 py-12 text-[#0B1F3A]">
      <section className="mx-auto max-w-[1600px]">
        <p className="font-semibold text-[#155EEF]">
          Sobre o projeto
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Sobre o Pass Up
        </h1>

        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#475467]">
          <p>
            O Pass Up é uma solução criada para transformar a participação dos
            usuários em benefícios para o transporte público.
          </p>

          <p>
            As ações realizadas dentro da plataforma geram pontos que podem ser
            utilizados em benefícios de mobilidade urbana.
          </p>
        </div>
      </section>
      <section className="mx-auto mt-10 max-w-[1600px] rounded-2xl bg-[#155EEF] p-8 text-white">
        <p className="font-semibold text-blue-100">
          Nossa missão
        </p>

        <h2 className="mt-3 max-w-3xl text-3xl leading-tight font-bold">
          Facilitar o acesso à mobilidade por meio da participação.
        </h2>

        <p className="mt-4 max-w-3xl leading-7 text-blue-50">
          Transformar o dia a dia de quem utiliza o transporte público com uma
          plataforma simples, acessível e voltada à geração de benefícios.
        </p>
      </section>
      <section className="mx-auto mt-10 max-w-[1600px]">
        <div className="grid gap-6 min-[768px]:grid-cols-2">
          <CardValor
            titulo="Nossa visão"
            descricao="Ser uma referência em soluções que aproximem tecnologia, transporte público e inclusão social."
          />

          <CardValor
            titulo="Nossos valores"
            descricao="Inovação, sustentabilidade, inclusão, transparência e compromisso com as pessoas que utilizam a plataforma."
          />
        </div>
      </section>
    </main>
  )
}