import { TbCheck } from "react-icons/tb";
import { PRICING } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import EfeitoMagnetico from "@/componentes/ui/efeitos/EfeitoMagnetico";
import BotaoWhatsApp from "@/componentes/ui/botoes/BotaoWhatsApp";

/**
 * Seção de investimento. Funciona com ou sem preço definido:
 *  - PRICING.revealPrice = true  → mostra valor + âncora.
 *  - PRICING.revealPrice = false → mostra enquadramento de valor + manda pro WhatsApp.
 * Tira o medo do custo de cima da mesa antes do CTA final.
 */
export default function Investimento() {
  const { revealPrice } = PRICING;

  return (
    <section id="investimento" className="relative overflow-hidden bg-ink-900 py-14 sm:py-20 md:py-32">
      <div className="aurora-blob left-1/2 top-0 h-96 w-96 -translate-x-1/2 animate-aurora bg-blood/10" />
      <div className="container-x relative">
        <div className="flex flex-col items-center text-center">
          <CabecalhoSecao kicker={PRICING.kicker} title={PRICING.title} align="center" />
        </div>

        <Revelar from="up" delay={0.1} className="mt-12 flex justify-center">
          <div className="card w-full max-w-xl p-8 text-center md:p-12">
            {revealPrice ? (
              <>
                <div className="flex items-end justify-center gap-1">
                  <span className="font-display text-6xl text-cream md:text-7xl">
                    {PRICING.amount}
                  </span>
                  <span className="mb-2 text-lg text-cream/60">{PRICING.period}</span>
                </div>
                <p className="mt-4 text-cream/70">{PRICING.anchor}</p>
              </>
            ) : (
              <p className="text-lg text-cream/80">{PRICING.hiddenIntro}</p>
            )}

            <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
              {PRICING.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-cream/85">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blood/15 text-sm text-blood">
                    <TbCheck />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center">
              <EfeitoMagnetico>
                <BotaoWhatsApp
                  message={PRICING.ctaMessage}
                  origem="investimento"
                  className="!px-9 !py-4 !text-base"
                >
                  {PRICING.cta}
                </BotaoWhatsApp>
              </EfeitoMagnetico>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
