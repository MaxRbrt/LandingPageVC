import { MOTIVATION } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import CarrosselFotos from "@/componentes/ui/midia/CarrosselFotos";

export default function Motivacao() {
  return (
    <section id="motivacao" className="relative overflow-hidden bg-ink-900 bg-grid py-14 sm:py-20 md:py-32">
      <div className="aurora-blob right-[-8%] top-[20%] h-72 w-72 animate-aurora bg-blood/10" />
      <div className="container-x relative">
        <div className="max-w-2xl">
          <CabecalhoSecao kicker={MOTIVATION.kicker} title={MOTIVATION.title} />
          <Revelar from="up" delay={0.1}>
            <p className="mt-6 text-lg text-cream/70">{MOTIVATION.intro}</p>
          </Revelar>
        </div>

        <Revelar from="up" className="mt-14">
          <CarrosselFotos items={MOTIVATION.items} label="Treino real" speed={68} reverse />
        </Revelar>
      </div>
    </section>
  );
}
