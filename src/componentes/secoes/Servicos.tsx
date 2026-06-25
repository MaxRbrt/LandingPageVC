import { TbArrowUpRight } from "react-icons/tb";
import { SERVICES } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import FundoImagem from "@/componentes/ui/midia/FundoImagem";
import MiniaturaCursor from "@/componentes/ui/midia/MiniaturaCursor";
import CarrosselMobile from "@/componentes/mobile/CarrosselMobile";

export default function Servicos() {
  const cards = SERVICES.items.map((s, i) => (
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
      <FundoImagem src="/img/bg-strength.jpg" position="object-center" fade="l" opacity={0.13} tint="bg-blood/10" />
      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <CabecalhoSecao kicker={SERVICES.kicker} title={SERVICES.title} />
          <Revelar from="up" delay={0.1}>
            <p className="mt-6 text-lg text-cream/70">{SERVICES.intro}</p>
          </Revelar>
        </div>

        {/* Mobile: carrossel com card emoldurado. Desktop: grid hairline + miniatura no cursor. */}
        <CarrosselMobile
          className="mt-10"
          cardWidth="82%"
          cardClassName="overflow-hidden rounded-2xl border border-ink-500/60"
        >
          {cards}
        </CarrosselMobile>
        <MiniaturaCursor>
          <Revelar
            stagger
            className="mt-14 hidden gap-px overflow-hidden rounded-2xl border border-ink-500/60 bg-ink-500/60 sm:grid-cols-2 md:grid lg:grid-cols-3"
          >
            {cards}
          </Revelar>
        </MiniaturaCursor>
      </div>
    </section>
  );
}
