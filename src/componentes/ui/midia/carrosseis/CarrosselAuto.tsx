import { Children, ReactNode, useRef } from "react";
import { TbArrowsHorizontal } from "react-icons/tb";
import { usarLoopArrasto } from "@/ganchos/usarLoopArrasto";

/**
 * Carrossel de CARDS em loop infinito que anda sozinho e aceita arraste.
 *
 * A esteira se move por `transform`, dentro de um pai com `overflow: hidden`.
 * Não existe contêiner rolável aqui — é o que garante que um swipe pra baixo
 * em cima do carrossel role a PÁGINA em vez de ficar preso na faixa.
 * `touch-action: pan-y` formaliza isso: vertical é do navegador, horizontal é
 * nosso. Conteúdo duplicado (×2) basta, porque a emenda é por módulo.
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
  const loop = [...items, ...items];
  const ref = useRef<HTMLUListElement | null>(null);
  usarLoopArrasto(ref, { speed, reverse, itens: items.length });

  return (
    <div className={`relative ${className}`}>
      {/* desvanecimento nas bordas (dica de "tem mais") */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-ink-900 to-transparent" />

      <div className="overflow-hidden py-1 [touch-action:pan-y]">
        <ul
          ref={ref}
          /* SEM w-max de propósito: a <ul> precisa ter a largura do contêiner
             visível para que `cardWidth` em % (ex.: "82%") resolva contra a
             TELA e não contra a própria esteira. Os <li> são shrink-0 e
             transbordam; quem corta é o overflow-hidden do pai. */
          className="flex cursor-grab items-stretch gap-4 will-change-transform [&.is-grabbing]:cursor-grabbing [&.is-grabbing]:select-none"
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
      </div>

      {hint && (
        <p className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/40">
          <TbArrowsHorizontal className="text-blood" /> passa sozinho · arraste se quiser
        </p>
      )}
    </div>
  );
}
