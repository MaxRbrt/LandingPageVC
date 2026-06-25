import { ABOUT } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import Contador from "@/componentes/ui/animacoes/Contador";
import Assinatura from "@/componentes/ui/animacoes/Assinatura";

export default function Sobre() {
  return (
    <section id="sobre" className="relative bg-ink-800 bg-grid py-14 sm:py-20 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Imagem */}
        <Revelar from="left">
          <div className="relative overflow-hidden rounded-3xl border border-ink-500/60">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={ABOUT.image}
                alt="Antes e depois do treinador Vinicio Campos"
                loading="lazy"
                className={`h-full w-full scale-[1.03] object-cover ${ABOUT.imagePosition ?? "object-center"}`}
              />
            </div>
          </div>
        </Revelar>

        {/* Texto */}
        <div>
          <CabecalhoSecao kicker={ABOUT.kicker} title={ABOUT.title} />
          <Revelar stagger className="mt-6 space-y-4">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-cream/75">
                {p}
              </p>
            ))}
          </Revelar>

          <Assinatura className="mt-8" />

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink-500/60 pt-8">
            {ABOUT.stats.map((s, i) => (
              <div key={i}>
                <Contador value={s.value} className="font-display text-4xl text-blood md:text-5xl" />
                <p className="mt-1 text-xs uppercase tracking-wide text-cream/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
