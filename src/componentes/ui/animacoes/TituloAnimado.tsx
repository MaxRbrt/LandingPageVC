import { useEffect, useRef } from "react";
import { gsap } from "@/nucleo/gsap";

interface Props {
  /** linhas do título; use <b>...</b> para destaque vermelho */
  lines: string[];
  className?: string;
  as?: "h1" | "h2";
}

/**
 * Título com revelação por palavra: cada palavra entra com stagger
 * + leve rotação 3D no scroll. Adaptado do AnimatedTitle do projeto
 * de referência (Zentry), com saída acessível para reduced-motion
 * (a regra CSS força opacity:1 nesse caso).
 */
export default function TituloAnimado({ lines, className = "", as = "h2" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el.querySelectorAll(".reveal-word"), {
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: "power3.out",
        stagger: 0.05,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <Tag className={`${as === "h1" ? "hero-title" : "section-title"} ${className}`}>
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi) => (
              <span
                key={wi}
                className="reveal-word mr-[0.25em]"
                style={{ transform: "translateY(40px) rotateX(-60deg)", transformOrigin: "bottom" }}
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
          </span>
        ))}
      </Tag>
    </div>
  );
}
