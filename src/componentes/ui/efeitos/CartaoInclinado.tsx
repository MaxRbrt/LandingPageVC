import { ReactNode, useRef, useState } from "react";
import { prefersReducedMotion } from "@/nucleo/gsap";

/**
 * Card com tilt 3D acompanhando o mouse (microinteração de hover).
 * Adaptado do BentoTilt do projeto de referência. Desativa o efeito
 * em prefers-reduced-motion.
 */
export default function CartaoInclinado({
  children,
  className = "",
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState("");

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion()) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const rx = ((e.clientY - top) / height - 0.5) * -intensity;
    const ry = ((e.clientX - left) / width - 0.5) * intensity;
    setTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTransform("")}
      style={{ transform, transition: "transform .25s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}
