import { TbCheck, TbShieldCheck } from "react-icons/tb";
import { FINAL_CTA } from "@/dados/conteudo";
import TituloAnimado from "@/componentes/ui/animacoes/TituloAnimado";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import EfeitoMagnetico from "@/componentes/ui/efeitos/EfeitoMagnetico";
import BotaoWhatsApp from "@/componentes/ui/botoes/BotaoWhatsApp";

export default function ChamadaFinal() {
  return (
    <section
      id="cta"
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink-900 py-28 md:py-36"
    >
      {/* Fundo cinematográfico: imagem em duotone, bem escura para virar textura/energia
          (esconde o texto/overlay queimado do print do Instagram). */}
      <div className="absolute inset-0">
        <img
          src={FINAL_CTA.image}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover object-[50%_72%] opacity-40 saturate-0"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-blood/20 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/85 to-ink-900" />
      <div className="aurora-blob left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-aurora bg-blood/25" />

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <TituloAnimado
          lines={FINAL_CTA.title.split("<br/>")}
          className="max-w-5xl !text-center lg:!text-8xl"
        />
        <Revelar from="up" delay={0.1}>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-cream/75">{FINAL_CTA.desc}</p>
        </Revelar>
        {/* Garantia / risco-zero — tira o medo de errar antes do clique */}
        <Revelar from="up" delay={0.15} className="mt-9 w-full">
          <div className="mx-auto flex max-w-xl items-start gap-4 rounded-2xl border border-blood/30 bg-ink-800/70 p-5 text-left backdrop-blur md:p-6">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blood/15 text-xl text-blood">
              <TbShieldCheck />
            </span>
            <div>
              <p className="font-semibold text-cream">{FINAL_CTA.guarantee.title}</p>
              <p className="mt-1 text-sm text-cream/70">{FINAL_CTA.guarantee.text}</p>
            </div>
          </div>
        </Revelar>

        <Revelar from="scale" delay={0.2} className="mt-8">
          <EfeitoMagnetico>
            <BotaoWhatsApp
              message={FINAL_CTA.whatsappMessage}
              origem="cta final"
              className="!px-9 !py-4 !text-base"
            >
              {FINAL_CTA.cta}
            </BotaoWhatsApp>
          </EfeitoMagnetico>
        </Revelar>

        {/* Reforço de confiança */}
        <Revelar stagger className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {FINAL_CTA.trust.map((t) => (
            <span key={t} className="flex items-center gap-2 text-sm text-cream/65">
              <TbCheck className="text-blood" /> {t}
            </span>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
