import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/nucleo/gsap";
import { BRAND } from "@/dados/conteudo";

/**
 * Loader de entrada: cobre a tela com a marca + barra que enche e então
 * revela a página com um fade/slide. Roda uma vez, trava o scroll enquanto
 * ativo. Em prefers-reduced-motion some na hora (sem animação).
 */
export default function Precarregador() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
        ScrollTrigger.refresh();
      },
    });
    tl.to(barRef.current, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
      .to(
        counter,
        {
          v: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (numRef.current) numRef.current.textContent = String(Math.round(counter.v));
          },
        },
        0,
      )
      .to(rootRef.current, { yPercent: -100, duration: 0.7, ease: "power3.inOut" }, "+=0.15");
    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-900"
      aria-hidden
    >
      <span className="font-display text-3xl uppercase tracking-tight text-cream sm:text-5xl">
        {BRAND.name}
      </span>
      <span className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-blood">
        {BRAND.tagline}
      </span>

      <div className="mt-9 h-px w-56 overflow-hidden bg-ink-500 sm:w-72">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-blood" />
      </div>
      <span className="mt-4 font-display text-sm text-cream/50">
        <span ref={numRef}>0</span>%
      </span>
    </div>
  );
}
