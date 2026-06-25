import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/nucleo/gsap";

/**
 * Assinatura "manuscrita" do treinador (motif do landonorris.com, lime→blood).
 * O nome em fonte cursiva é revelado da esquerda para a direita (clip-path),
 * como se estivesse sendo escrito, e um floreio em SVG é "desenhado"
 * (stroke-dashoffset). Em prefers-reduced-motion aparece pronto, sem animação.
 */
export default function Assinatura({
  name = "Vinicio Campos",
  className = "",
  size = "text-5xl md:text-6xl",
}: {
  name?: string;
  className?: string;
  size?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);
  // Lido uma vez no mount: evita "flash" de assinatura invisível em reduced-motion
  const [reduce] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const word = el.querySelector<HTMLElement>(".sig-word");
    const stroke = el.querySelector<SVGPathElement>(".sig-stroke");

    if (reduce) {
      if (word) word.style.clipPath = "none";
      if (stroke) stroke.style.strokeDashoffset = "0";
      return;
    }

    const ctx = gsap.context(() => {
      const len = stroke?.getTotalLength() ?? 400;
      if (stroke) {
        stroke.style.strokeDasharray = String(len);
        stroke.style.strokeDashoffset = String(len);
      }
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 82%", once: true } })
        .to(word, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.out" })
        .to(stroke, { strokeDashoffset: 0, duration: 0.7, ease: "power1.out" }, "-=0.35");
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={root} className={`select-none ${className}`} aria-label={name}>
      <span
        className={`sig-word block font-signature leading-none text-blood ${size}`}
        style={{ clipPath: reduce ? "none" : "inset(0 100% 0 0)" }}
      >
        {name}
      </span>
      <svg
        className="mt-1 h-4 w-44 max-w-full text-blood"
        viewBox="0 0 360 24"
        fill="none"
        aria-hidden
      >
        <path
          className="sig-stroke"
          d="M3 16 C 70 4, 150 4, 210 12 S 320 24, 357 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
