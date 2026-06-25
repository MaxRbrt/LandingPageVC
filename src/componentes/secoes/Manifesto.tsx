import { MANIFESTO } from "@/dados/conteudo";
import TituloAnimado from "@/componentes/ui/animacoes/TituloAnimado";
import Revelar from "@/componentes/ui/animacoes/Revelar";

/**
 * Banda "manifesto": statement grande, type-driven, com lighting (auroras)
 * e barra vermelha. Cinematográfico sem depender de foto limpa.
 */
export default function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-28 md:py-40">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="aurora-blob left-[-10%] top-1/4 h-96 w-96 animate-aurora bg-blood/15" />
      <div className="aurora-blob bottom-[-12%] right-[-8%] h-96 w-96 animate-aurora bg-blood/10 [animation-delay:-7s]" />

      <div className="container-x relative">
        <div className="max-w-4xl border-l-2 border-blood pl-6 md:pl-10">
          <span className="kicker mb-6">{MANIFESTO.kicker}</span>
          <TituloAnimado lines={MANIFESTO.lines} />
        </div>
        <Revelar from="up" delay={0.1}>
          <p className="mt-10 max-w-2xl text-lg text-cream/70 md:pl-10">{MANIFESTO.footer}</p>
        </Revelar>
      </div>

      <div className="hairline absolute inset-x-0 bottom-0" />
    </section>
  );
}
