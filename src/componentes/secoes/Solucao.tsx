import { TbCheck } from "react-icons/tb";
import { SOLUTION } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import BotaoWhatsApp from "@/componentes/ui/botoes/BotaoWhatsApp";

export default function Solucao() {
  return (
    <section id="solucao" className="relative overflow-hidden bg-ink-800 py-14 sm:py-20 md:py-32">
      {/* brilho de fundo */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-blood/20 blur-[120px]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <CabecalhoSecao kicker={SOLUTION.kicker} title={SOLUTION.title} />
          <Revelar from="up" delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-cream/70">{SOLUTION.intro}</p>
          </Revelar>
          <Revelar from="up" delay={0.2} className="mt-9">
            <BotaoWhatsApp>Quero começar agora</BotaoWhatsApp>
          </Revelar>
        </div>

        <Revelar stagger className="space-y-4">
          {SOLUTION.steps.map((step, i) => (
            <div key={i} className="card flex items-center gap-4 p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blood text-white">
                <TbCheck />
              </span>
              <p className="text-cream/85">{step}</p>
            </div>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
