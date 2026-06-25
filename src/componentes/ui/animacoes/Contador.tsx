import { useEffect, useRef } from "react";
import { gsap } from "@/nucleo/gsap";

/**
 * Conta um número de 0 até o valor alvo quando entra na viewport.
 * Aceita prefixo/sufixo (ex.: "+500", "100%"). Se não houver número
 * (ex.: "1:1"), exibe o texto cru sem animar.
 */
export default function Contador({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) {
      el.textContent = value;
      return;
    }
    const [, prefix, num, suffix] = match;
    const target = parseInt(num, 10);
    const obj = { n: 0 };
    el.textContent = `${prefix}0${suffix}`;

    const tween = gsap.to(obj, {
      n: target,
      duration: 1.6,
      ease: "power2.out",
      snap: { n: 1 },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.n)}${suffix}`;
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);

  return <span ref={ref} className={className}>{value}</span>;
}
