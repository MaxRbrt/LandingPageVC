import { useState } from "react";
import { TbArrowUpRight, TbPhoto } from "react-icons/tb";
import { SERVICES } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import FundoImagem from "@/componentes/ui/midia/FundoImagem";
import MiniaturaCursor from "@/componentes/ui/midia/MiniaturaCursor";
import CarrosselMobile from "@/componentes/ui/midia/carrosseis/CarrosselMobile";

type Servico = (typeof SERVICES.items)[number];

/**
 * Card de serviço no MOBILE: como não há hover, a miniatura aparece ao TOCAR
 * o card (expande suave) e há uma dica visual "toque para ver" deixando claro
 * que é clicável. No desktop a interação continua via MiniaturaCursor (hover).
 */
function ServicoMobile({ s }: { s: Servico }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="group relative flex h-full w-full flex-col bg-ink-700 p-8 text-left transition-colors duration-300 active:bg-ink-600"
    >
      <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full border border-blood/40 bg-blood/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blood">
        <TbPhoto className="text-xs" /> {open ? "fechar" : "ver"}
      </span>

      <h3 className="font-display text-2xl uppercase text-cream">{s.tag}</h3>
      <p className="mt-3 text-cream/70">{s.desc}</p>

      {/* Miniatura revelada no toque (animação de altura via grid-rows). */}
      <div className={`grid transition-all duration-500 ease-out ${open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <img
            src={s.thumb}
            alt={s.tag}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-xl border border-ink-500/60 object-cover saturate-0"
          />
        </div>
      </div>

      {!open && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-cream/45">
          <TbArrowUpRight className="text-blood" /> toque para ver
        </span>
      )}
    </button>
  );
}

export default function Servicos() {
  // Desktop: cards com data-thumb (miniatura segue o cursor no hover).
  const desktopCards = SERVICES.items.map((s, i) => (
    <div
      key={i}
      data-thumb={s.thumb}
      className="group relative h-full w-full bg-ink-700 p-8 transition-colors duration-300 hover:bg-ink-600"
    >
      <TbArrowUpRight className="absolute right-6 top-6 text-xl text-cream/30 transition-all duration-300 group-hover:text-blood group-hover:-translate-y-1 group-hover:translate-x-1" />
      <h3 className="font-display text-2xl uppercase text-cream">{s.tag}</h3>
      <p className="mt-3 text-cream/70">{s.desc}</p>
    </div>
  ));

  return (
    <section id="servicos" className="relative overflow-hidden bg-ink-800 py-14 sm:py-20 md:py-32">
      <FundoImagem src="/img/fundos/bg-strength.jpg" position="object-center" fade="l" opacity={0.13} tint="bg-blood/10" />
      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <CabecalhoSecao kicker={SERVICES.kicker} title={SERVICES.title} />
          <Revelar from="up" delay={0.1}>
            <p className="mt-6 text-lg text-cream/70">{SERVICES.intro}</p>
          </Revelar>
        </div>

        {/* Mobile: card emoldurado com toque p/ revelar a miniatura. */}
        <CarrosselMobile
          className="mt-10"
          cardWidth="82%"
          cardClassName="overflow-hidden rounded-2xl border border-ink-500/60"
          hint={false}
        >
          {SERVICES.items.map((s, i) => (
            <ServicoMobile key={i} s={s} />
          ))}
        </CarrosselMobile>
        {/* Dica de arraste + toque (só mobile). */}
        <p className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/40 md:hidden">
          <TbArrowUpRight className="text-blood" /> arraste e toque nos cards
        </p>

        {/* Desktop: grid hairline + miniatura no cursor. */}
        <MiniaturaCursor>
          <Revelar
            stagger
            className="mt-14 hidden gap-px overflow-hidden rounded-2xl border border-ink-500/60 bg-ink-500/60 sm:grid-cols-2 md:grid lg:grid-cols-3"
          >
            {desktopCards}
          </Revelar>
        </MiniaturaCursor>
      </div>
    </section>
  );
}
