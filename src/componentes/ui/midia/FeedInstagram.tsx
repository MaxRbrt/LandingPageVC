import { useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import { TbArrowsHorizontal } from "react-icons/tb";

interface Item {
  src: string;
  /** legenda estilo post (opcional) */
  caption?: string;
}

/**
 * "Feed do Instagram" — cards 4:5 INTEIROS, sem crop, como posts reais.
 * As fotos do acervo são cards/prints 1080x1350 (4:5); aspect-[4/5] + object-cover
 * mostra o card completo, com texto e marca visíveis — honesto: é post do Insta.
 * Strip horizontal com scroll-snap: touch e trackpad rolam nativo; mouse arrasta.
 * Em prefers-reduced-motion não há auto-movimento (rolagem é só do usuário).
 */
export default function FeedInstagram({
  items,
  handle = "@viniciotreinador",
}: {
  items: Item[];
  handle?: string;
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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink-900 to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink-900 to-transparent sm:w-16" />

      <div
        ref={ref}
        className="drag-strip no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerLeave={end}
      >
        {items.map((g, i) => (
          <figure
            key={i}
            className="group w-[80vw] max-w-[330px] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink-500/60 bg-ink-800 sm:w-[318px]"
          >
            {/* cabeçalho estilo post */}
            <header className="flex items-center gap-2.5 px-4 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blood to-blood/60 text-[11px] font-bold text-cream">
                VC
              </span>
              <span className="text-sm font-semibold text-cream">{handle}</span>
              <FaInstagram className="ml-auto text-lg text-cream/45" />
            </header>

            {/* card inteiro 4:5 — sem crop, texto do post permanece visível */}
            <div className="aspect-[4/5] overflow-hidden bg-ink-900">
              <img
                src={g.src}
                alt={g.caption ?? "Post de aluna acompanhada na consultoria"}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            {g.caption && (
              <figcaption className="px-4 py-3.5 text-sm leading-snug text-cream/75">
                <span className="font-semibold text-cream/90">{handle}</span> {g.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* dica de interação */}
      <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/40">
        <TbArrowsHorizontal className="text-blood" /> Arraste para ver mais · posts reais do Instagram
      </p>
    </div>
  );
}
