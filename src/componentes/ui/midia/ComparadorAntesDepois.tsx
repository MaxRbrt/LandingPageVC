import { useCallback, useRef, useState } from "react";
import { TbArrowsHorizontal } from "react-icons/tb";

interface Props {
  /** imagem "antes" (revelada à esquerda da divisória) */
  before: string;
  /** imagem "depois" (base, revelada à direita) */
  after: string;
  caption: string;
  /** rótulo curto do card (ex.: "Frontal", "Perfil") */
  tag?: string;
}

/**
 * Slider antes/depois interativo (referência de motion: landonorris.com).
 * O "depois" fica como base e o "antes" é recortado por clip-path à esquerda
 * de uma divisória arrastável. Funciona com mouse, toque (touch-action: pan-y
 * preserva o scroll vertical) e teclado (setas na alça). Base dessaturada que
 * ganha cor e leve zoom no hover; a divisória anima suave quando não se arrasta.
 */
export default function ComparadorAntesDepois({ before, after, caption, tag }: Props) {
  const [pos, setPos] = useState(55); // % do "antes" visível a partir da esquerda
  const [active, setActive] = useState(false); // arrastando → desliga transição p/ seguir o dedo 1:1
  const ref = useRef<HTMLDivElement | null>(null);
  const down = useRef(false);

  const apply = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onDown = (e: React.PointerEvent) => {
    down.current = true;
    setActive(true);
    apply(e.clientX);
  };
  const onMove = (e: React.PointerEvent) => {
    if (down.current) apply(e.clientX);
  };
  const onUp = () => {
    down.current = false;
    setActive(false);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  // transição só quando NÃO está arrastando (snap suave); durante o arraste, 1:1
  const ease = active ? "" : "transition-[clip-path,left] duration-300 ease-out";
  const imgCls =
    "absolute inset-0 h-full w-full scale-[1.02] object-cover object-top saturate-[0.9] transition-transform duration-700 group-hover:scale-[1.06] group-hover:saturate-100";

  return (
    <figure className="group relative">
      <div
        ref={ref}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        style={{ touchAction: "pan-y" }}
        className="relative aspect-[4/5] cursor-ew-resize select-none overflow-hidden rounded-2xl border border-ink-500/60"
      >
        {/* DEPOIS — base */}
        <img src={after} alt={`Depois — ${caption}`} draggable={false} className={imgCls} />

        {/* ANTES — recortado à esquerda da divisória */}
        <img
          src={before}
          alt={`Antes — ${caption}`}
          draggable={false}
          className={`${imgCls} ${ease}`}
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        {/* selos */}
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-cream/25 bg-ink-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/90 backdrop-blur-sm">
          Antes
        </span>
        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-blood/50 bg-ink-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-blood backdrop-blur-sm">
          Depois
        </span>

        {/* divisória + alça */}
        <div
          className={`pointer-events-none absolute inset-y-0 z-20 w-px bg-cream/85 shadow-[0_0_18px_rgba(0,0,0,0.65)] ${ease}`}
          style={{ left: `${pos}%` }}
        >
          <button
            type="button"
            role="slider"
            aria-label="Arraste para comparar antes e depois"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={onKey}
            className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-ink-900/85 text-cream backdrop-blur-sm transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blood"
          >
            <TbArrowsHorizontal className="text-blood" />
          </button>
        </div>

        {/* fade base p/ legibilidade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/80 to-transparent" />
      </div>

      <figcaption className="mt-3 flex items-start gap-2">
        <span className="mt-[7px] h-px w-6 shrink-0 bg-blood/60" />
        <p className="text-sm leading-snug text-cream/80">
          {tag && <span className="font-semibold text-cream">{tag} · </span>}
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}
