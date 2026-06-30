import { ReactNode, useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Faz uma mini-foto seguir o cursor ao passar o mouse sobre filhos que
 * tenham `data-thumb="/img/..."` (motif de listas do landonorris.com).
 * Só no mouse (touch ignorado) e suavizado via gsap.quickTo. Decorativo.
 */
export default function MiniaturaCursor({ children, className = "" }: { children: ReactNode; className?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const thumb = thumbRef.current;
    if (!wrap || !thumb || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(thumb, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(thumb, "y", { duration: 0.5, ease: "power3" });
    let visible = false;
    const show = (v: boolean) => {
      if (v === visible) return;
      visible = v;
      gsap.to(thumb, { autoAlpha: v ? 1 : 0, scale: v ? 1 : 0.85, duration: 0.35, ease: "power3.out" });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-thumb]");
      if (target) {
        const src = target.dataset.thumb!;
        if (imgRef.current && imgRef.current.getAttribute("src") !== src) imgRef.current.src = src;
        xTo(e.clientX);
        yTo(e.clientY);
        show(true);
      } else {
        show(false);
      }
    };
    const onLeave = () => show(false);

    gsap.set(thumb, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.85 });
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      {children}
      <div
        ref={thumbRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-44 w-36 scale-[0.85] overflow-hidden rounded-xl border border-blood/40 opacity-0 shadow-2xl md:block"
      >
        <img ref={imgRef} alt="" className="h-full w-full object-cover saturate-0" />
        <div className="pointer-events-none absolute inset-0 bg-blood/20 mix-blend-multiply" />
      </div>
    </div>
  );
}
