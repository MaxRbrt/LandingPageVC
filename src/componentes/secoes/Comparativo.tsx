import { TbX, TbCheck } from "react-icons/tb";
import { COMPARISON } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";

/**
 * Comparação "Sozinha vs. com método": dois painéis lado a lado,
 * o da direita destacado (o caminho certo). Alta conversão.
 */
export default function Comparativo() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-14 sm:py-20 md:py-32">
      <div className="aurora-blob right-[-10%] top-[-10%] h-80 w-80 animate-aurora bg-blood/10" />
      <div className="container-x relative">
        <div className="max-w-2xl">
          <CabecalhoSecao kicker={COMPARISON.kicker} title={COMPARISON.title} />
          <Revelar from="up" delay={0.1}>
            <p className="mt-6 text-lg text-cream/70">{COMPARISON.intro}</p>
          </Revelar>
        </div>

        <Revelar from="up" delay={0.1} className="mt-14">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-ink-500/60 bg-ink-500/60 lg:grid-cols-2">
            {/* Tentando sozinha */}
            <div className="bg-ink-800 p-8 md:p-10">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-ash">
                {COMPARISON.leftLabel}
              </p>
              <ul className="space-y-4">
                {COMPARISON.rows.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-cream/55">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-600 text-sm text-ash">
                      <TbX />
                    </span>
                    <span className="line-through decoration-ink-500/80">{r.left}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Com a consultoria (destaque) */}
            <div className="relative bg-ink-700 p-8 ring-1 ring-inset ring-blood/40 md:p-10">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood to-transparent" />
              <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blood">
                {COMPARISON.rightLabel}
                <span className="rounded-full bg-blood/15 px-2 py-0.5 text-[10px] text-blood">
                  o jeito certo
                </span>
              </p>
              <ul className="space-y-4">
                {COMPARISON.rows.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-cream">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blood text-sm text-white">
                      <TbCheck />
                    </span>
                    <span>{r.right}</span>
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
