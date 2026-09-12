import { useEffect, useRef } from "react";
import { TbArrowRight } from "react-icons/tb";
import { METHOD, RESULTS } from "@/dados/conteudo";
import { gsap } from "@/lib/gsap";
import FundoImagem from "@/componentes/ui/midia/FundoImagem";
import GaleriaArrastar from "@/componentes/ui/midia/carrosseis/GaleriaArrastar";
import CarrosselAuto from "@/componentes/ui/midia/carrosseis/CarrosselAuto";

/**
 * Método em 4 etapas.
 *  • Desktop (≥1024 + movimento ok): a seção PRENDE e as etapas correm na
 *    HORIZONTAL conforme rola na vertical (pin + scrub, motif landonorris).
 *  • Mobile/tablet: carrossel que anda sozinho (loop) e também aceita arraste
 *    — os cards aparecem completos sem o usuário precisar arrastar.
 */
export default function Metodo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + dist(),
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.from(".method-step", {
        autoAlpha: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 65%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="metodo"
        className="relative overflow-hidden bg-ink-900 py-14 sm:py-20 md:py-32 lg:h-screen lg:py-0"
      >
        <FundoImagem src="/img/fundos/exec-squat.webp" position="object-[50%_25%]" fade="y" opacity={0.1} />

        {/* MOBILE/tablet: título + carrossel das etapas que anda sozinho */}
        <div className="container-x relative z-10 lg:hidden">
          <span className="kicker mb-4">{METHOD.kicker}</span>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: METHOD.title }} />
          <CarrosselAuto className="mt-8" cardWidth="80%" speed={22}>
            {METHOD.steps.map((s) => (
              <article key={s.n} className="card relative w-full p-8">
                <span className="font-display text-7xl text-outline">{s.n}</span>
                <h3 className="mt-6 text-xl font-bold text-cream">{s.title}</h3>
                <p className="mt-3 text-cream/70">{s.desc}</p>
              </article>
            ))}
          </CarrosselAuto>
        </div>

        {/* DESKTOP: faixa horizontal pinada (pin + scrub) */}
        <div className="relative z-10 hidden lg:block lg:h-full">
          <div ref={trackRef} className="flex h-full flex-row items-center gap-10 px-[7vw]">
            {/* Painel de título */}
            <div className="w-[34vw] max-w-lg shrink-0 pr-6">
              <span className="kicker mb-4">{METHOD.kicker}</span>
              <h2 className="section-title" dangerouslySetInnerHTML={{ __html: METHOD.title }} />
              <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/40">
                <TbArrowRight className="text-blood" /> Role para ver as etapas
              </p>
            </div>

            {/* Etapas */}
            {METHOD.steps.map((s) => (
              <article
                key={s.n}
                className="method-step card relative flex h-[58vh] w-[360px] shrink-0 flex-col justify-center p-10"
              >
                <span className="font-display text-8xl text-outline">{s.n}</span>
                <h3 className="mt-6 text-2xl font-bold text-cream">{s.title}</h3>
                <p className="mt-3 text-cream/70">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Método na prática: conteúdo técnico/educativo do próprio Vinicio (prova de autoridade). */}
      <section className="relative overflow-hidden bg-ink-900 py-14 sm:py-20 md:py-28">
        <div className="container-x relative">
          <span className="kicker mb-6 block">Método aplicado</span>
          <GaleriaArrastar items={RESULTS.methodProof} label="Método" />
        </div>
      </section>
    </>
  );
}
