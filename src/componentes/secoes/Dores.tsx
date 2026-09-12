import {
  TbArrowsShuffle,
  TbVolume,
  TbRun,
  TbRefresh,
  TbClock,
  TbMoodSad,
} from "react-icons/tb";
import { PAINS } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import FundoImagem from "@/componentes/ui/midia/FundoImagem";
import { IconType } from "react-icons";

const ICONS: Record<string, IconType> = {
  shuffle: TbArrowsShuffle,
  noise: TbVolume,
  cardio: TbRun,
  swap: TbRefresh,
  clock: TbClock,
  guilt: TbMoodSad,
};

export default function Dores() {
  return (
    <section id="dores" className="relative overflow-hidden bg-ink-900 py-14 sm:py-20 md:py-32">
      <FundoImagem src="/img/fundos/bg-barbell.webp" position="object-[50%_25%]" fade="l" opacity={0.16} />
      <div className="aurora-blob left-[-8%] top-[-6%] h-72 w-72 animate-aurora bg-blood/10" />
      <div className="container-x relative z-10">
        <CabecalhoSecao kicker={PAINS.kicker} title={PAINS.title} />
        <Revelar from="up" delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-cream/70">{PAINS.intro}</p>
        </Revelar>

        <Revelar stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? TbMoodSad;
            return (
              <div
                key={i}
                className="card group flex items-start gap-4 p-6 transition-colors duration-300 hover:border-blood/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blood/10 text-xl text-blood transition-colors group-hover:bg-blood group-hover:text-white">
                  <Icon />
                </span>
                <p className="text-cream/85">{item.text}</p>
              </div>
            );
          })}
        </Revelar>

        <Revelar from="up" delay={0.1}>
          <div className="mt-16 border-l-2 border-blood pl-6 md:pl-8">
            <p className="max-w-4xl font-display text-3xl uppercase leading-[1.05] text-cream sm:text-4xl lg:text-5xl">
              {PAINS.punch}
            </p>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
