import { RefObject, useEffect } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Motor de carrossel em LOOP INFINITO + arraste + auto-scroll.
 *
 * ============================================================
 *  POR QUE TRANSFORM E NÃO scrollLeft
 * ============================================================
 * A versão anterior rolava um contêiner nativo (`overflow-x: auto`) mexendo em
 * `scrollLeft`. Isso gerou dois bugs sérios no celular:
 *
 *  1. SCROLL VERTICAL TRAVADO. A faixa usava `touch-action: pan-x`, que diz ao
 *     navegador "aqui só existe gesto horizontal". Um swipe pra baixo começando
 *     em cima do carrossel era engolido e a página não rolava — o visitante
 *     ficava presto na seção. (Medido: swipe de 240px, scrollY não mudou.)
 *
 *  2. TELA PRETA AO ARRASTAR ATÉ A BORDA. Quando o dedo saía do elemento,
 *     disparava `pointerleave` e o auto-scroll voltava a escrever `scrollLeft`
 *     com o dedo ainda na tela, brigando com o momentum nativo — enquanto o
 *     "wrap" saltava a posição em ±1 conjunto. A faixa descarrilava e sobrava
 *     área vazia.
 *
 * Movendo por `transform: translate3d(...)` os dois somem por construção:
 *  • não existe contêiner rolável, então nada intercepta o scroll vertical;
 *  • não existe scroll nativo pro rAF brigar;
 *  • `touch-action: pan-y` devolve o gesto vertical pro navegador e deixa o
 *    horizontal com a gente;
 *  • `setPointerCapture` mantém o arraste vivo mesmo com o dedo fora da borda;
 *  • a emenda vira aritmética (módulo), sem salto de posição.
 *
 * O elemento referenciado é a ESTEIRA (o flex que se move). Ele deve conter o
 * conteúdo DUPLICADO (2 cópias) e viver dentro de um pai com `overflow: hidden`.
 */
export function usarLoopArrasto(
  ref: RefObject<HTMLElement>,
  {
    speed = 55,
    reverse = false,
    itens,
  }: {
    /** segundos para percorrer UM conjunto (maior = mais devagar) */
    speed?: number;
    reverse?: boolean;
    /** quantos itens tem UM conjunto (a esteira tem o dobro) */
    itens: number;
  },
) {
  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    let setW = 0;
    let offset = 0;
    let paused = false;
    let arrastando = false;
    let startX = 0;
    let startOffset = 0;
    let moveu = false;
    let raf = 0;
    let last = 0;
    let resumeTimer = 0;

    const dir = reverse ? -1 : 1;
    const reduce = prefersReducedMotion();

    /** Largura exata de um conjunto, gap incluso: distância entre o 1º item do
     *  1º conjunto e o 1º item do 2º. Medir por scrollWidth/2 erraria pelo gap. */
    const medir = () => {
      const filhos = track.children;
      if (filhos.length > itens) {
        const a = (filhos[0] as HTMLElement).offsetLeft;
        const b = (filhos[itens] as HTMLElement).offsetLeft;
        setW = b - a;
      } else {
        setW = track.scrollWidth / 2;
      }
      aplicar();
    };

    const aplicar = () => {
      if (setW <= 0) return;
      // módulo sempre positivo: a esteira nunca sai do intervalo [0, setW)
      const o = ((offset % setW) + setW) % setW;
      track.style.transform = `translate3d(${-o}px, 0, 0)`;
    };

    medir();

    // imagens mudam a largura ao carregar -> remedir
    const imgs = Array.from(track.querySelectorAll("img"));
    let pendentes = imgs.length;
    const aoCarregarImg = () => {
      if (--pendentes <= 0) medir();
    };
    imgs.forEach((img) => {
      if (img.complete) aoCarregarImg();
      else {
        img.addEventListener("load", aoCarregarImg);
        img.addEventListener("error", aoCarregarImg);
      }
    });

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => medir()) : null;
    ro?.observe(track);
    window.addEventListener("resize", medir);

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const resume = (delay = 0) => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, delay);
    };

    const step = (t: number) => {
      if (!last) last = t;
      const dt = t - last;
      last = t;
      if (!paused && !arrastando && setW > 0) {
        offset += dir * (setW / (speed * 1000)) * dt;
        aplicar();
      }
      raf = requestAnimationFrame(step);
    };
    if (!reduce) raf = requestAnimationFrame(step);

    /* ---------- arraste (mouse E toque, via pointer capture) ---------- */
    const onDown = (e: PointerEvent) => {
      arrastando = true;
      moveu = false;
      startX = e.clientX;
      startOffset = offset;
      pause();
      try {
        track.setPointerCapture(e.pointerId);
      } catch {
        /* navegador sem suporte: segue sem captura */
      }
      track.classList.add("is-grabbing");
    };

    const onMove = (e: PointerEvent) => {
      if (!arrastando) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moveu = true;
      offset = startOffset - dx;
      aplicar();
    };

    const encerrarArraste = (e: PointerEvent) => {
      if (!arrastando) return;
      arrastando = false;
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        /* ignora */
      }
      track.classList.remove("is-grabbing");
      resume(800);
    };

    // pointercancel: o navegador decidiu que o gesto é vertical e assumiu o
    // scroll da página. Encerra o arraste sem lutar por ele.
    const onCancel = (e: PointerEvent) => encerrarArraste(e);

    // hover só com mouse — no toque, "enter" e "leave" disparam junto com o
    // gesto e religavam o auto-scroll no meio dele (era a causa da tela preta).
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") pause();
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && !arrastando) resume(250);
    };

    // depois de arrastar, o clique que fecha o gesto não deve ativar links
    const onClick = (e: MouseEvent) => {
      if (moveu) {
        e.preventDefault();
        e.stopPropagation();
        moveu = false;
      }
    };

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", encerrarArraste);
    track.addEventListener("pointercancel", onCancel);
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    track.addEventListener("click", onClick, true);

    const onVisibility = () => {
      if (document.hidden) pause();
      else resume(0);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      window.removeEventListener("resize", medir);
      ro?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", encerrarArraste);
      track.removeEventListener("pointercancel", onCancel);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      track.removeEventListener("click", onClick, true);
      imgs.forEach((img) => {
        img.removeEventListener("load", aoCarregarImg);
        img.removeEventListener("error", aoCarregarImg);
      });
    };
  }, [ref, speed, reverse, itens]);
}
