import { useRef } from "react";
import { TbArrowsHorizontal } from "react-icons/tb";
import { usarLoopArrasto } from "@/ganchos/usarLoopArrasto";

interface Item {
  src: string;
  caption: string;
  /** classe object-position p/ reenquadrar e cortar overlay do print (ex.: "object-top") */
  pos?: string;
}

/**
 * Galeria horizontal em LOOP INFINITO: anda sozinha devagar, aceita arraste
 * (mouse e toque) e pausa enquanto o usuário interage.
 *
 * Conteúdo triplicado (×3) para a emenda entre cópias ser invisível nos dois
 * sentidos — é o que o motor `usarLoopArrasto` espera. As cópias 2 e 3 são
 * marcadas com aria-hidden e ficam sem `alt`, para o leitor de tela anunciar
 * cada foto uma vez só.
 */
export default function GaleriaArrastar({
  items,
  label = "Resultado",
  speed = 60,
}: {
  items: Item[];
  label?: string;
  /** segundos por volta de UM conjunto (maior = mais devagar). */
  speed?: number;
}) {
  const loop = [...items, ...items, ...items];
  const ref = useRef<HTMLDivElement | null>(null);
  usarLoopArrasto(ref, { speed });

  return (
    <div className="relative">
      {/* desvanecimento nas bordas */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-900 to-transparent" />

      <div
        ref={ref}
        className="no-scrollbar flex cursor-grab touch-pan-x gap-5 overflow-x-auto pb-2 [&.is-grabbing]:cursor-grabbing [&.is-grabbing]:select-none"
      >
        {loop.map((g, i) => {
          const original = i < items.length;
          const n = (i % items.length) + 1;
          return (
            <figure
              key={i}
              aria-hidden={!original}
              className="group relative w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-ink-500/60 sm:w-[340px]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={g.src}
                  alt={original ? g.caption : ""}
                  loading="lazy"
                  draggable={false}
                  className={`h-full w-full scale-[1.06] object-cover ${g.pos ?? "object-center"} transition-transform duration-500 group-hover:scale-[1.12]`}
                />
              </div>
              {/* Fade no topo: esconde banner/nome-tag do print */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink-900 via-ink-900/40 to-transparent" />
              {/* Fade na base: esconde bolinhas/legenda do print + legibilidade da caption */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/35 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-blood">
                  {String(n).padStart(2, "0")}
                  <span className="h-px w-6 bg-blood/60" />
                  {label}
                </span>
                <p className="mt-1.5 text-sm text-cream/90">{g.caption}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* dica de interação */}
      <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/40">
        <TbArrowsHorizontal className="text-blood" /> passa sozinho · arraste se quiser
      </p>
    </div>
  );
}
