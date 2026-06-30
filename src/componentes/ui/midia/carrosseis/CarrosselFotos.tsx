import { useRef } from "react";
import { TbArrowsHorizontal } from "react-icons/tb";
import { usarLoopArrasto } from "@/ganchos/usarLoopArrasto";

interface Item {
  src: string;
  caption: string;
  /** classe object-position p/ reenquadrar e cortar overlay do print (ex.: "object-top") */
  pos?: string;
}

interface Props {
  items: Item[];
  label?: string;
  /** segundos por volta de UM conjunto (maior = mais devagar). Default 55. */
  speed?: number;
  /** inverte o sentido do auto-scroll. Default false. */
  reverse?: boolean;
}

/**
 * Faixa de fotos em LOOP INFINITO (conteúdo ×3 + wrap invisível): arrasta no
 * toque e no mouse, anda sozinha devagar e pausa no hover/arraste. Engine em
 * `usarLoopArrasto`. Em prefers-reduced-motion o auto desliga (segue arrastável).
 */
export default function CarrosselFotos({ items, label = "Resultado", speed = 55, reverse = false }: Props) {
  const loop = [...items, ...items, ...items];
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  usarLoopArrasto(scrollerRef, { speed, reverse });

  return (
    <div className="group/track relative">
      {/* desvanecimento nas bordas */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-ink-900 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-ink-900 to-transparent sm:w-32" />

      <div
        ref={scrollerRef}
        className="no-scrollbar flex w-full cursor-grab touch-pan-x items-center gap-6 overflow-x-auto overflow-y-hidden py-8 [&.is-grabbing]:cursor-grabbing [&.is-grabbing]:select-none"
      >
        {loop.map((g, i) => {
          const idx = i % items.length;
          const n = idx + 1;
          const featured = idx % 3 === 0; // cada 3º card é maior (ritmo editorial)
          const shift = idx % 2 === 0 ? "sm:-translate-y-4" : "sm:translate-y-5";
          return (
            <figure
              key={i}
              aria-hidden={i >= items.length}
              className={[
                "group/card relative h-[66vw] shrink-0 overflow-hidden rounded-2xl border border-ink-500/60",
                "transition-[transform,opacity,filter] duration-500 ease-out saturate-[0.7]",
                "group-hover/track:opacity-40 hover:z-20 hover:!opacity-100 hover:!saturate-100 hover:scale-[1.04]",
                featured ? "w-[78vw] sm:h-[480px] sm:w-[380px]" : "w-[66vw] sm:h-[420px] sm:w-[300px]",
                shift,
              ].join(" ")}
            >
              <img
                src={g.src}
                alt={i < items.length ? g.caption : ""}
                loading="lazy"
                draggable={false}
                className={`h-full w-full scale-[1.06] object-cover ${g.pos ?? "object-center"} transition-transform duration-700 group-hover/card:scale-[1.12]`}
              />

              {/* Número fantasma (editorial) */}
              <span className="pointer-events-none absolute left-4 top-2 font-display text-6xl leading-none text-outline opacity-50 transition-opacity duration-500 group-hover/card:opacity-90">
                {String(n).padStart(2, "0")}
              </span>

              {/* Fades p/ legibilidade + esconder restos de overlay do print */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-ink-900/70 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent" />

              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-blood">
                  <span className="h-px w-6 bg-blood/60" />
                  {label}
                </span>
                <p className="mt-1.5 max-w-[90%] text-sm leading-snug text-cream/90">{g.caption}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* dica de interação */}
      <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/40">
        <TbArrowsHorizontal className="text-blood" /> Arraste para explorar
      </p>
    </div>
  );
}
