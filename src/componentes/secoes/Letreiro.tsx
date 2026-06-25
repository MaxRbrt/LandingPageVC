import { MARQUEE_ITEMS } from "@/dados/conteudo";

/** Faixa em movimento contínuo (CSS) com as especialidades. */
export default function Letreiro() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-ink-500/60 bg-blood py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {items.map((item, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6 text-sm font-bold uppercase tracking-wider text-white">
            {item}
            <span className="text-white/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
