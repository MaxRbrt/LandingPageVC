import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { FAQ } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="text-lg font-semibold text-cream">{q}</span>
        <TbPlus
          className={`shrink-0 text-2xl text-blood transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-cream/70">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function PerguntasFrequentes() {
  return (
    <section id="faq" className="relative overflow-hidden bg-ink-900 bg-grid py-14 sm:py-20 md:py-32">
      <div className="aurora-blob left-1/2 top-[-10%] h-72 w-72 -translate-x-1/2 animate-aurora bg-blood/10" />
      <div className="container-x relative max-w-3xl">
        <CabecalhoSecao kicker={FAQ.kicker} title={FAQ.title} align="center" />
        <Revelar stagger className="mt-12 space-y-4">
          {FAQ.items.map((item, i) => (
            <Item key={i} q={item.q} a={item.a} />
          ))}
        </Revelar>
      </div>
    </section>
  );
}
