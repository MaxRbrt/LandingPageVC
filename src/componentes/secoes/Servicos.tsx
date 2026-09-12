import { TbArrowUpRight, TbArrowsHorizontal } from "react-icons/tb";
import { SERVICES } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import FundoImagem from "@/componentes/ui/midia/FundoImagem";
import MiniaturaCursor from "@/componentes/ui/midia/MiniaturaCursor";
import CarrosselAuto from "@/componentes/ui/midia/carrosseis/CarrosselAuto";

type Servico = (typeof SERVICES.items)[number];

/**
 * Card de serviço no MOBILE — foto SEMPRE visível, sem toque.
 *
 * A versão anterior escondia a foto atrás de um botão "ver / fechar". Isso
 * quebrou quando a faixa virou loop infinito, e por um motivo estrutural, não
 * por um detalhe de CSS: o loop TRIPLICA o conteúdo, então existem 3 cópias de
 * cada serviço e cada uma guarda o próprio estado de aberto/fechado. Tocar numa
 * cópia deixava as outras duas fechadas, e o mesmo serviço aparecia com "VER" e
 * "FECHAR" ao mesmo tempo na tela. Abrir também esticava a faixa em ~120px
 * (empurrando a página) e a foto deslizava pra fora enquanto o usuário olhava.
 *
 * Estado por instância e carrossel em loop automático não convivem. Como a foto
 * é conteúdo de apoio e não segredo, mostrar direto resolve os três problemas de
 * uma vez — e ainda é melhor de conversão: numa landing de anúncio, o que exige
 * toque é o que quase ninguém vê.
 *
 * No desktop nada muda: a miniatura continua seguindo o cursor (MiniaturaCursor).
 */
function ServicoMobile({ s }: { s: Servico }) {
  return (
    <div className="flex h-full w-full flex-col bg-ink-700 p-7">
      <h3 className="font-display text-2xl uppercase text-cream">{s.tag}</h3>
      <p className="mt-3 text-cream/70">{s.desc}</p>
      {/* aria-hidden: a foto ilustra o texto que já está acima, e o loop a
          repete 3x. Sem isso o leitor de tela anunciaria imagem repetida. */}
      <img
        src={s.thumb}
        alt=""
        aria-hidden
        loading="lazy"
        draggable={false}
        className="mt-5 aspect-[4/3] w-full rounded-xl border border-ink-500/60 object-cover saturate-0"
      />
    </div>
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
      <FundoImagem src="/img/fundos/bg-strength.webp" position="object-center" fade="l" opacity={0.13} tint="bg-blood/10" />
      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <CabecalhoSecao kicker={SERVICES.kicker} title={SERVICES.title} />
          <Revelar from="up" delay={0.1}>
            <p className="mt-6 text-lg text-cream/70">{SERVICES.intro}</p>
          </Revelar>
        </div>

        {/* Mobile: loop infinito que anda sozinho e pausa enquanto o dedo está na tela. */}
        <CarrosselAuto
          className="mt-10 md:hidden"
          cardWidth="82%"
          cardClassName="overflow-hidden rounded-2xl border border-ink-500/60"
          speed={40}
          hint={false}
        >
          {SERVICES.items.map((s, i) => (
            <ServicoMobile key={i} s={s} />
          ))}
        </CarrosselAuto>
        {/* Dica de arraste (só mobile). */}
        <p className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/40 md:hidden">
          <TbArrowsHorizontal className="text-blood" /> passa sozinho · arraste se quiser
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
