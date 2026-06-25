import { Children, ReactNode } from "react";
import { TbArrowsHorizontal } from "react-icons/tb";

/**
 * Carrossel SÓ-MOBILE (< md). Recebe os mesmos cards usados no grid do desktop
 * e os exibe numa faixa horizontal com swipe + scroll-snap, cortando rolagem
 * vertical no celular. No desktop esta versão some (md:hidden) e a seção mostra
 * o grid original intacto — fonte única, sem duplicar componentes.
 *
 * Uso típico na seção:
 *   <CarrosselMobile cardWidth="82%">{cards}</CarrosselMobile>      // mobile
 *   <div className="hidden md:grid ...">{cards}</div>               // desktop
 */
export default function CarrosselMobile({
  children,
  cardWidth = "80%",
  hint = true,
  cardClassName = "",
  className = "",
}: {
  children: ReactNode;
  /** largura de cada card na faixa (deixa espiar o próximo). Default "80%". */
  cardWidth?: string;
  /** mostra a dica "arraste". Default true. */
  hint?: boolean;
  /** classes extras no wrapper de cada card (ex.: moldura no mobile). */
  cardClassName?: string;
  /** classes extras no contêiner externo (ex.: margem). */
  className?: string;
}) {
  const items = Children.toArray(children);
  return (
    <div className={`md:hidden ${className}`}>
      <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1">
        {items.map((child, i) => (
          <li
            key={i}
            className={`flex shrink-0 snap-center ${cardClassName}`}
            style={{ width: cardWidth }}
          >
            <div className="flex w-full">{child}</div>
          </li>
        ))}
      </ul>
      {hint && items.length > 1 && (
        <p className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/40">
          <TbArrowsHorizontal className="text-blood" /> arraste para ver mais
        </p>
      )}
    </div>
  );
}
