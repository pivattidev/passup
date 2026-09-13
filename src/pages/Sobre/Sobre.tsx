import { Link } from 'react-router-dom'
import CardValor from '../../components/CardValor'

export default function Sobre() {
  return (
    <main className="bg-[#F2F8FD] text-[#0B1F3A]">
      <section className="mx-auto grid max-w-[1600px] gap-10 px-6 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[992px]:grid-cols-2 min-[992px]:items-center min-[992px]:px-12">
        <div>
          <p className="font-semibold text-[#155EEF]">
            Sobre o projeto
          </p>

          <h1 className="mt-3 text-4xl leading-tight font-bold min-[768px]:text-5xl">
            Sobre o Pass Up
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-[#475467]">
            O Pass Up é uma solução criada para transformar a participação dos
            usuários em benefícios para o transporte público.
          </p>
        </div>

        <div className="max-w-2xl space-y-4 leading-7 text-[#475467] min-[992px]:justify-self-end">
          <p>
            As ações realizadas dentro da plataforma geram pontos que podem ser
            utilizados em benefícios de mobilidade urbana.
          </p>

          <p>
            O projeto une tecnologia, mobilidade e impacto social para oferecer
            uma experiência simples e acessível.
          </p>
        </div>
      </section>

      <section className="bg-[#155EEF] text-white">
        <div className="mx-auto max-w-[1600px] px-6 py-12 min-[768px]:px-8 min-[768px]:py-14 min-[992px]:px-12">
          <p className="font-semibold text-blue-100">
            Nossa missão
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl leading-tight font-bold min-[768px]:text-4xl">
            Facilitar o acesso à mobilidade por meio da participação.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
            Transformar o dia a dia de quem utiliza o transporte público com
            uma plataforma simples, acessível e voltada à geração de benefícios.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[992px]:px-12">
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

        <div className="mt-10 flex flex-col gap-5 border-t border-[#D6E4FF] pt-8 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              A equipe por trás do projeto
            </h2>

            <p className="mt-2 text-[#475467]">
              Veja quem participa do desenvolvimento do Pass Up.
            </p>
          </div>

          <Link
            to="/integrantes"
            className="rounded-lg border border-[#155EEF] px-5 py-3 text-center font-semibold text-[#155EEF] transition-colors hover:bg-[#EAF2FF] focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Ver integrantes
          </Link>
        </div>
      </section>
    </main>
  )
}