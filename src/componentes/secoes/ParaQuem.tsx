import { TbCheck, TbX } from "react-icons/tb";
import { FOR_WHOM } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";

/**
 * "Pra quem é / pra quem não é": qualifica o lead.
 * O aluno certo se reconhece; o curioso se filtra antes de mandar mensagem.
 */
export default function ParaQuem() {
  return (
    <section id="para-quem" className="relative overflow-hidden bg-ink-800 py-14 sm:py-20 md:py-32">
      <div className="aurora-blob left-[-8%] top-[-10%] h-80 w-80 animate-aurora bg-blood/10" />
      <div className="container-x relative">
        <div className="max-w-2xl">
          <CabecalhoSecao kicker={FOR_WHOM.kicker} title={FOR_WHOM.title} />
          <Revelar from="up" delay={0.1}>
            <p className="mt-6 text-lg text-cream/70">{FOR_WHOM.intro}</p>
          </Revelar>
        </div>

        <Revelar from="up" delay={0.1} className="mt-14">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-ink-500/60 bg-ink-500/60 lg:grid-cols-2">
            {/* É pra você */}
            <div className="relative bg-ink-700 p-8 ring-1 ring-inset ring-blood/40 md:p-10">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood to-transparent" />
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-blood">
                {FOR_WHOM.forLabel}
              </p>
              <ul className="space-y-4">
                {FOR_WHOM.for.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-cream">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blood text-sm text-white">
                      <TbCheck />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Não é pra você */}
            <div className="bg-ink-800 p-8 md:p-10">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-ash">
                {FOR_WHOM.notForLabel}
              </p>
              <ul className="space-y-4">
                {FOR_WHOM.notFor.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-cream/55">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-600 text-sm text-ash">
                      <TbX />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
