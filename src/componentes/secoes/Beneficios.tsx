import { BENEFITS } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import FundoImagem from "@/componentes/ui/midia/FundoImagem";
import CartaoInclinado from "@/componentes/ui/efeitos/CartaoInclinado";
import CarrosselMobile from "@/componentes/mobile/CarrosselMobile";

export default function Beneficios() {
  // Mesmos cards no mobile (carrossel) e no desktop (grid) — fonte única.
  const cards = BENEFITS.items.map((b, i) => (
    <CartaoInclinado
      key={i}
      className="card h-full w-full p-7 transition-colors duration-300 hover:border-blood/50"
    >
      <span className="font-display text-5xl text-outline">{String(i + 1).padStart(2, "0")}</span>
      <h3 className="mt-4 text-xl font-bold text-cream">{b.title}</h3>
      <p className="mt-3 text-cream/70">{b.desc}</p>
    </CartaoInclinado>
  ));

  return (
    <section id="beneficios" className="relative overflow-hidden bg-ink-900 py-14 sm:py-20 md:py-32">
      <FundoImagem src="/img/bg-coach.jpg" position="object-top" fade="y" opacity={0.12} />
      <div className="aurora-blob bottom-[-10%] right-[-8%] h-80 w-80 animate-aurora bg-blood/10" />
      <div className="container-x relative z-10">
        <CabecalhoSecao kicker={BENEFITS.kicker} title={BENEFITS.title} />

        {/* Mobile: carrossel (corta rolagem). Desktop: grid original. */}
        <CarrosselMobile className="mt-10" cardWidth="80%">
          {cards}
        </CarrosselMobile>
        <Revelar stagger className="mt-14 hidden gap-6 sm:grid-cols-2 md:grid lg:grid-cols-3">
          {cards}
        </Revelar>
      </div>
    </section>
  );
}
