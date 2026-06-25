import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/nucleo/gsap";

type Fade = "b" | "t" | "l" | "r" | "y" | "x";

interface Props {
  /** caminho da imagem (em /public) */
  src: string;
  /** object-position p/ reenquadrar, ex.: "object-center", "object-[50%_30%]" */
  position?: string;
  /** opacidade da imagem (0–1). Default 0.14 — textura, não foto. */
  opacity?: number;
  /** classe do tom vermelho em multiply. Default "bg-blood/15". "" desliga. */
  tint?: string;
  /** direção do escurecimento p/ legibilidade do texto. Default "l". */
  fade?: Fade;
  /** parallax sutil no scroll (desligado em reduced-motion). Default true. */
  parallax?: boolean;
  /** sobrepõe a grade pontilhada por cima da imagem. Default true. */
  grid?: boolean;
}

const FADE: Record<Fade, string> = {
  b: "bg-gradient-to-b from-transparent via-ink-900/70 to-ink-900",
  t: "bg-gradient-to-t from-transparent via-ink-900/70 to-ink-900",
  l: "bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40",
  r: "bg-gradient-to-l from-ink-900 via-ink-900/85 to-ink-900/40",
  y: "bg-gradient-to-b from-ink-900 via-ink-900/55 to-ink-900",
  x: "bg-gradient-to-r from-ink-900 via-ink-900/55 to-ink-900",
};

/**
 * Fundo de seção a partir de uma foto, tratada como textura cinematográfica:
 * imagem dessaturada bem escura + tom vermelho (multiply) + gradiente p/
 * legibilidade + grade pontilhada por cima. A opacidade baixa esconde
 * qualquer texto "cozido" no print do Instagram. Parallax respeita
 * prefers-reduced-motion. Decorativo: aria-hidden + pointer-events-none.
 */
export default function FundoImagem({
  src,
  position = "object-center",
  opacity = 0.14,
  tint = "bg-blood/15",
  fade = "l",
  parallax = true,
  grid = true,
}: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el || !parallax || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, [parallax]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        ref={imgRef}
        src={src}
        alt=""
        loading="lazy"
        style={{ opacity }}
        className={`h-[120%] w-full object-cover saturate-0 ${position}`}
      />
      {tint && <div className={`absolute inset-0 ${tint} mix-blend-multiply`} />}
      <div className={`absolute inset-0 ${FADE[fade]}`} />
      {grid && <div className="bg-grid bg-grid-fade absolute inset-0 opacity-70" />}
    </div>
  );
}
