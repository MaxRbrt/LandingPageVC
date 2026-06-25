import { useEffect, useRef } from "react";
import { TRANSFORMATION } from "@/dados/conteudo";
import { gsap } from "@/nucleo/gsap";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import Assinatura from "@/componentes/ui/animacoes/Assinatura";

/**
 * Banda cinematográfica full-bleed (referência: landonorris.com).
 * Foto em duotone vermelho com parallax + frase gigante sobreposta +
 * legenda editorial e assinatura. Substitui o layout 2-col anterior.
 */
export default function Transformacao() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-ink-900">
      {/* Imagem de fundo (duotone) com parallax */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={TRANSFORMATION.image}
          alt="Transformação e vivência do treinador Vinicio Campos"
          loading="lazy"
          className="h-[120%] w-full object-cover object-center saturate-0"
        />
      </div>
      {/* Duotone vermelho + escurecimento para legibilidade */}
      <div className="pointer-events-none absolute inset-0 bg-blood/25 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/80 to-ink-900/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/50" />

      <div className="container-x relative z-10 max-w-3xl py-28">
        <span className="kicker mb-5">{TRANSFORMATION.kicker}</span>

        <Revelar from="up">
          <blockquote className="font-display text-3xl uppercase leading-[1.04] text-cream sm:text-5xl lg:text-6xl">
            “{TRANSFORMATION.quote}”
          </blockquote>
        </Revelar>

        <Revelar from="up" delay={0.1}>
          <p className="mt-7 max-w-xl text-lg text-cream/75">{TRANSFORMATION.desc}</p>
        </Revelar>

        <Assinatura className="mt-8" />
      </div>

      {/* Legenda editorial (estilo "local, ano") */}
      <span className="absolute inset-x-0 bottom-6 z-10">
        <span className="container-x flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/60">
          <span className="h-px w-8 bg-blood" />
          {TRANSFORMATION.caption}
        </span>
      </span>
    </section>
  );
}
