import { TbBolt } from "react-icons/tb";
import { SCARCITY } from "@/dados/conteudo";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import BotaoWhatsApp from "@/componentes/ui/botoes/BotaoWhatsApp";

/**
 * Faixa de escassez REAL (atendimento 1:1 tem teto de vagas/mês).
 * Empurra a decisão pro agora, sem prazo falso. Desliga via SCARCITY.enabled.
 */
export default function Escassez() {
  if (!SCARCITY.enabled) return null;

  return (
    <section className="relative overflow-hidden bg-ink-900 py-12 md:py-16">
      <div className="aurora-blob right-[-6%] top-1/2 h-72 w-72 -translate-y-1/2 animate-aurora bg-blood/15" />
      <div className="container-x relative">
        <Revelar from="up">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-blood/30 bg-ink-800 p-8 ring-1 ring-inset ring-blood/10 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-blood/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blood">
                <TbBolt /> {SCARCITY.highlight}
              </span>
              <p className="mt-4 text-lg text-cream/80">{SCARCITY.text}</p>
            </div>
            <BotaoWhatsApp message={SCARCITY.ctaMessage} className="shrink-0 !px-8 !py-4">
              Garantir minha vaga
            </BotaoWhatsApp>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
