import { useRef } from "react";
import { TbArrowsHorizontal } from "react-icons/tb";

interface Item {
  src: string;
  caption: string;
  /** classe object-position p/ reenquadrar e cortar overlay do print (ex.: "object-top") */
  pos?: string;
}

/**
 * Galeria horizontal com scroll-snap + arrastar para rolar (motif de
 * "coleção" do landonorris.com). Touch usa scroll nativo; no desktop o
 * mouse arrasta. Bordas com desvanecimento e dica de arraste.
 */
export default function GaleriaArrastar({
  items,
  label = "Resultado",
}: {
  items: Item[];
  label?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ down: false, startX: 0, scroll: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return; // touch = scroll nativo
    drag.current = { down: true, startX: e.clientX, scroll: el.scrollLeft };
    el.classList.add("is-dragging");
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.scroll - (e.clientX - drag.current.startX);
  };
  const end = () => {
    const el = ref.current;
    if (!el) return;
    drag.current.down = false;
    el.classList.remove("is-dragging");
  };

  return (
    <div className="relative">
      {/* desvanecimento nas bordas */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-900 to-transparent" />

      <div
        ref={ref}
        className="drag-strip no-scrollbar flex gap-5 overflow-x-auto pb-2"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerLeave={end}
      >
        {items.map((g, i) => (
          <figure
            key={i}
            className="group relative w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-ink-500/60 sm:w-[340px]"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={g.src}
                alt={g.caption}
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
                {String(i + 1).padStart(2, "0")}
                <span className="h-px w-6 bg-blood/60" />
                {label}
              </span>
              <p className="mt-1.5 text-sm text-cream/90">{g.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* dica de arraste */}
      <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/40">
        <TbArrowsHorizontal className="text-blood" /> Arraste para ver mais
      </p>
    </div>
  );
}
