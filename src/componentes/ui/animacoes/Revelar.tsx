import { ElementType, ReactNode, useEffect, useRef } from "react";
import { gsap } from "@/nucleo/gsap";

interface Props {
  children: ReactNode;
  className?: string;
  /** direção de entrada */
  from?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
  /** anima filhos diretos em sequência (stagger) */
  stagger?: boolean;
  as?: ElementType;
}

const offsets: Record<NonNullable<Props["from"]>, gsap.TweenVars> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 48 },
  right: { x: -48 },
  scale: { scale: 0.9 },
};

/**
 * Wrapper genérico de revelação no scroll (fade + slide/scale).
 * Usado para entradas suaves de blocos e listas. O atributo
 * data-reveal mantém opacity:0 via CSS até o GSAP assumir (sem flash);
 * em prefers-reduced-motion o CSS força a visibilidade.
 */
export default function Revelar({
  children,
  className = "",
  from = "up",
  delay = 0,
  stagger = false,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : [el];
      if (stagger) gsap.set(el, { opacity: 1 });
      gsap.set(targets, { opacity: 0, x: 0, y: 0, scale: 1, ...offsets[from] });
      gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    }, el);
    return () => ctx.revert();
  }, [from, delay, stagger]);

  return (
    <Tag ref={ref as never} data-reveal className={className}>
      {children}
    </Tag>
  );
}
