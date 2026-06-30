import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { KINETIC } from "@/dados/conteudo";

/**
 * Divisor de tipografia kinética (motif do landonorris.com): duas linhas
 * gigantes em contorno que derivam horizontalmente em sentidos opostos
 * conforme o scroll (parallax com scrub). A linha 2 ganha preenchimento
 * vermelho para criar contraste. Estático em prefers-reduced-motion.
 */
export default function DivisorCinetico() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".kin-1",
        { xPercent: -12 },
        {
          xPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.fromTo(
        ".kin-2",
        { xPercent: 12 },
        {
          xPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-hidden
      className="relative overflow-hidden border-y border-ink-500/40 bg-ink-900 py-10 sm:py-14 md:py-24"
    >
      <div className="flex flex-col gap-2 whitespace-nowrap">
        <span className="kin-1 self-start pl-[6vw] font-display text-4xl uppercase leading-[0.9] text-outline sm:text-7xl lg:text-[9rem]">
          {KINETIC.line1}
        </span>
        <span className="kin-2 self-end pr-[6vw] font-display text-4xl uppercase leading-[0.9] text-blood sm:text-7xl lg:text-[9rem]">
          {KINETIC.line2}
        </span>
      </div>

      {/* kicker editorial centralizado */}
      <span className="kicker absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink-900 px-3">
        {KINETIC.kicker}
      </span>
    </section>
  );
}
