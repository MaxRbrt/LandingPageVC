import { RefObject, useEffect } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Motor de carrossel em LOOP INFINITO + arraste + auto-scroll.
 *
 * O elemento referenciado deve ser o contêiner rolável (overflow-x-auto) e
 * conter o conteúdo TRIPLICADO (3 cópias iguais), para o "wrap" entre cópias
 * ser invisível nos dois sentidos. O hook cuida de:
 *   • iniciar no meio e saltar de cópia sem emenda (wrap);
 *   • andar sozinho devagar (rAF, com acumulador float — scrollLeft é
 *     arredondado e perderia incrementos sub-pixel);
 *   • arraste com mouse (ponteiro) e toque (scroll nativo);
 *   • pausar no hover/arraste e retomar pouco depois;
 *   • desativar o auto em prefers-reduced-motion (continua arrastável).
 */
export function usarLoopArrasto(
  ref: RefObject<HTMLElement>,
  { speed = 55, reverse = false }: { speed?: number; reverse?: boolean } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let setW = 0;
    let pos = 0;
    const measure = (recenter = false) => {
      setW = el.scrollWidth / 3;
      if (setW > 0 && (recenter || el.scrollLeft < 1)) {
        el.scrollLeft = setW;
        pos = setW;
      }
    };
    measure(true);

    const imgs = Array.from(el.querySelectorAll("img"));
    let pending = imgs.length;
    const onImg = () => {
      if (--pending <= 0) measure(true);
    };
    imgs.forEach((img) => {
      if (img.complete) onImg();
      else {
        img.addEventListener("load", onImg);
        img.addEventListener("error", onImg);
      }
    });

    const wrap = () => {
      if (setW <= 0) return;
      if (el.scrollLeft < setW * 0.5) {
        el.scrollLeft += setW;
        pos += setW;
      } else if (el.scrollLeft > setW * 1.5) {
        el.scrollLeft -= setW;
        pos -= setW;
      }
    };
    el.addEventListener("scroll", wrap, { passive: true });

    const onResize = () => measure(false);
    window.addEventListener("resize", onResize);

    let paused = false;
    let resumeTimer = 0;
    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const resume = (delay = 0) => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        pos = el.scrollLeft;
        paused = false;
      }, delay);
    };

    const reduce = prefersReducedMotion();
    const dir = reverse ? -1 : 1;
    const drag = { down: false, startX: 0, scroll: 0, moved: false };
    let raf = 0;
    let last = 0;
    const step = (t: number) => {
      if (!last) last = t;
      const dt = t - last;
      last = t;
      if (!paused && !drag.down && setW > 0) {
        pos += dir * (setW / (speed * 1000)) * dt;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(step);
    };
    if (!reduce) raf = requestAnimationFrame(step);

    const onEnter = () => pause();
    const onLeave = () => {
      endDrag();
      resume(250);
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    const onDown = (e: PointerEvent) => {
      pause();
      if (e.pointerType !== "mouse") return;
      drag.down = true;
      drag.startX = e.clientX;
      drag.scroll = el.scrollLeft;
      drag.moved = false;
      el.classList.add("is-grabbing");
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.down) return;
      const dx = e.clientX - drag.startX;
      if (Math.abs(dx) > 3) drag.moved = true;
      el.scrollLeft = drag.scroll - dx;
    };
    const endDrag = () => {
      if (drag.down) {
        drag.down = false;
        el.classList.remove("is-grabbing");
      }
    };
    const onUp = () => {
      endDrag();
      resume(1200);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    const onClick = (e: MouseEvent) => {
      if (drag.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.moved = false;
      }
    };
    el.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("scroll", wrap);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
      imgs.forEach((img) => {
        img.removeEventListener("load", onImg);
        img.removeEventListener("error", onImg);
      });
    };
  }, [ref, speed, reverse]);
}
