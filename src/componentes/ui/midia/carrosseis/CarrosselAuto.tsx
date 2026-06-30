import { Children, ReactNode, useRef } from "react";
import { TbArrowsHorizontal } from "react-icons/tb";
import { usarLoopArrasto } from "@/ganchos/usarLoopArrasto";

/**
 * Carrossel de CARDS em loop infinito que ANDA SOZINHO (lateral) e também
 * aceita arraste — pensado p/ mobile das seções numeradas (Benefícios/Método):
 * o usuário não precisa arrastar pra ver os cards, eles passam automático, mas
 * pode interagir. Conteúdo triplicado p/ wrap invisível; engine compartilhada
 * em `usarLoopArrasto`. Em prefers-reduced-motion o auto desliga.
 */
export default function CarrosselAuto({
  children,
  cardWidth = "80%",
  speed = 28,
  reverse = false,
  hint = true,
  className = "",
  cardClassName = "",
}: {
  children: ReactNode;
  /** largura de cada card (deixa espiar o próximo). Default "80%". */
  cardWidth?: string;
  /** segundos por volta de um conjunto (maior = mais devagar). Default 28. */
  speed?: number;
  reverse?: boolean;
  hint?: boolean;
  className?: string;
  /** classes extras no wrapper de cada card (ex.: moldura). */
  cardClassName?: string;
}) {
  const items = Children.toArray(children);
  const loop = [...items, ...items, ...items];
  const ref = useRef<HTMLUListElement | null>(null);
  usarLoopArrasto(ref, { speed, reverse });

  return (
    <div className={`relative ${className}`}>
      {/* desvanecimento nas bordas (dica de "tem mais") */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-ink-900 to-transparent" />

      <ul
        ref={ref}
        className="no-scrollbar flex cursor-grab touch-pan-x items-stretch gap-4 overflow-x-auto py-1 [&.is-grabbing]:cursor-grabbing [&.is-grabbing]:select-none"
      >
        {loop.map((child, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className={`flex shrink-0 ${cardClassName}`}
            style={{ width: cardWidth }}
          >
            <div className="flex w-full">{child}</div>
          </li>
        ))}
      </ul>

      {hint && (
        <p className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/40">
          <TbArrowsHorizontal className="text-blood" /> passa sozinho · arraste se quiser
        </p>
      )}
    </div>
  );
}
