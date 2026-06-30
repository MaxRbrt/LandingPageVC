import { lazy, Suspense, useEffect, useRef } from "react";
import { FaArrowDown } from "react-icons/fa";
import { TbUsers, TbArrowRight, TbStarFilled } from "react-icons/tb";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { HERO, INSTAGRAM } from "@/dados/conteudo";
import TituloAnimado from "@/componentes/ui/animacoes/TituloAnimado";
import Contador from "@/componentes/ui/animacoes/Contador";

// Three.js sai do bundle principal (carrega sob demanda após o 1º paint).
const FundoParticulas = lazy(() => import("@/componentes/ui/efeitos/FundoParticulas"));
import BotaoWhatsApp from "@/componentes/ui/botoes/BotaoWhatsApp";
import EfeitoMagnetico from "@/componentes/ui/efeitos/EfeitoMagnetico";

export default function Destaque() {
  const root = useRef<HTMLDivElement | null>(null);

  // Entrada coreografada dos elementos de apoio (timeline GSAP)
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
        .from(".hero-rating", { y: 16, opacity: 0, delay: 0.1 })
        .from(".hero-eyebrow", { y: 20, opacity: 0 }, "-=0.55")
        .from(".hero-portrait", { x: 40, opacity: 0, duration: 1.1 }, "-=0.6")
        .from(".hero-sub", { y: 24, opacity: 0 }, "-=0.7")
        .from(".hero-cta", { y: 24, opacity: 0, stagger: 0.12 }, "-=0.5")
        .from(".hero-proof", { y: 20, opacity: 0 }, "-=0.4")
        .from(".hero-badge", { scale: 0.6, opacity: 0, stagger: 0.12 }, "-=0.4")
        .from(".hero-hint", { opacity: 0 }, "-=0.2");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="topo" ref={root} className="relative min-h-[100svh] overflow-hidden bg-ink-900">
      {/* Foto do Vinicio no mobile: fundo full-bleed esmaecido (no desktop o
          retrato vai na coluna ao lado — md:hidden evita duplicar a imagem). */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={HERO.image}
          alt="Vinicio Campos treinando em ambiente de academia"
          className={`h-full w-full object-cover ${HERO.imagePosition ?? "object-center"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/45" />
      </div>

      {/* Backdrop 3D + auroras + vinheta */}
      <Suspense fallback={null}>
        <FundoParticulas />
      </Suspense>
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="container-x relative z-10 grid min-h-[100svh] items-center gap-12 pt-24 pb-20 md:grid-cols-[1.15fr_0.85fr]">
        {/* Coluna de texto */}
        <div className="flex flex-col justify-center">
          {/* Selo de prova social no topo (verificável → Instagram) */}
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-rating group mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-ink-500/60 bg-ink-800/70 px-4 py-2 backdrop-blur transition-colors hover:border-blood/50"
          >
            <span className="flex items-center gap-0.5 text-blood">
              {Array.from({ length: HERO.ratingStrip.stars }).map((_, i) => (
                <TbStarFilled key={i} className="text-sm" />
              ))}
            </span>
            <span className="text-xs font-medium text-cream/80">
              {HERO.ratingStrip.text}
              <span className="ml-1.5 text-cream/45 group-hover:text-blood">
                · {HERO.ratingStrip.sub}
              </span>
            </span>
          </a>

          <span className="hero-eyebrow kicker mb-6 max-w-full flex-wrap leading-relaxed">{HERO.eyebrow}</span>

          <TituloAnimado as="h1" lines={HERO.titleLines} className="max-w-2xl" />

          <p className="hero-sub mt-7 max-w-[21rem] text-base leading-relaxed text-cream/75 sm:max-w-xl sm:text-lg">
            {HERO.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="hero-cta">
              <EfeitoMagnetico>
                <BotaoWhatsApp message={HERO.whatsappMessage}>{HERO.ctaPrimary}</BotaoWhatsApp>
              </EfeitoMagnetico>
            </div>
            <a
              href="#metodo"
              className="hero-cta group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cream"
            >
              <span className="relative">
                {HERO.ctaSecondary}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-blood transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <TbArrowRight className="text-blood transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Prova social honesta (sem rostos fictícios) */}
          <div className="hero-proof mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blood/15 text-lg text-blood">
                <TbUsers />
              </span>
              <p className="text-sm font-medium text-cream/85">
                <Contador value={HERO.proof.split(" ")[0]} className="font-display text-blood" />{" "}
                {HERO.proof.split(" ").slice(1).join(" ")}
              </p>
            </div>
            <span className="hidden h-5 w-px bg-ink-500 sm:block" />
            <p className="text-sm text-cream/55">{HERO.proofSub}</p>
          </div>
        </div>

        {/* Coluna do retrato (tablet + desktop) */}
        <div className="hero-portrait relative hidden md:block">
          <div className="relative isolate mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[2rem] border border-blood/30" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-ink-500/60 glow-red">
              <img
                src={HERO.image}
                alt="Vinicio Campos treinando em ambiente de academia"
                className={`h-full w-full scale-[1.04] object-cover ${HERO.imagePosition ?? "object-center"}`}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/70 to-transparent" />
            </div>

            {/* Chips flutuantes de prova */}
            {HERO.badges.map((b, i) => (
              <div
                key={b.label}
                className={`hero-badge card absolute flex items-center gap-2 px-4 py-2.5 ${
                  i === 0 ? "-left-6 top-10 animate-float" : "-right-5 bottom-12 animate-float-slow"
                }`}
              >
                <span className="font-display text-2xl text-blood">{b.value}</span>
                <span className="text-xs uppercase tracking-wide text-cream/70">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#dores"
        className="hero-hint absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <FaArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}
