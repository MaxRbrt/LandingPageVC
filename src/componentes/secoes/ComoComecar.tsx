import { HOW_TO_START } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import EfeitoMagnetico from "@/componentes/ui/efeitos/EfeitoMagnetico";
import BotaoWhatsApp from "@/componentes/ui/botoes/BotaoWhatsApp";

/**
 * "Como começar" — on-ramp de conversão em 3 passos até o WhatsApp.
 * Diferente do Método (que é o processo do trabalho em si).
 */
export default function ComoComecar() {
  return (
    <section id="comecar" className="relative overflow-hidden bg-ink-800 py-14 sm:py-20 md:py-32">
      <div className="aurora-blob left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-aurora bg-blood/10" />
      <div className="container-x relative">
        <div className="flex flex-col items-center text-center">
          <CabecalhoSecao kicker={HOW_TO_START.kicker} title={HOW_TO_START.title} align="center" />
          <Revelar from="up" delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/70">{HOW_TO_START.intro}</p>
          </Revelar>
        </div>

        <Revelar stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {HOW_TO_START.steps.map((s, i) => (
            <div key={s.n} className="relative">
              {/* conector entre passos (desktop) */}
              {i < HOW_TO_START.steps.length - 1 && (
                <span className="pointer-events-none absolute right-[-12px] top-12 hidden h-px w-6 bg-gradient-to-r from-blood/60 to-transparent md:block" />
              )}
              <div className="card group h-full p-8 transition-colors duration-300 hover:border-blood/50">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blood/10 font-display text-xl text-blood transition-colors group-hover:bg-blood group-hover:text-white">
                    {s.n}
                  </span>
                  <h3 className="text-xl font-bold text-cream">{s.title}</h3>
                </div>
                <p className="mt-4 text-cream/70">{s.desc}</p>
              </div>
            </div>
          ))}
        </Revelar>

        <Revelar from="scale" delay={0.15} className="mt-12 flex justify-center">
          <EfeitoMagnetico>
            <BotaoWhatsApp
              message={HOW_TO_START.whatsappMessage}
              origem="como comecar"
              className="!px-9 !py-4 !text-base"
            >
              {HOW_TO_START.cta}
            </BotaoWhatsApp>
          </EfeitoMagnetico>
        </Revelar>
      </div>
    </section>
  );
}
