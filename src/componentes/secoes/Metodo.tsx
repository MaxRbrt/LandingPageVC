import { useEffect, useRef } from "react";
import { TbArrowRight } from "react-icons/tb";
import { METHOD } from "@/dados/conteudo";
import { gsap } from "@/nucleo/gsap";
import FundoImagem from "@/componentes/ui/midia/FundoImagem";

/**
 * Método em 4 etapas. No desktop (com movimento permitido) a seção PRENDE
 * na tela e as etapas correm na HORIZONTAL conforme o usuário rola na
 * vertical (pin + scrub, motif do landonorris.com). No mobile ou em
 * prefers-reduced-motion vira uma faixa rolável manualmente / empilhada.
 */
export default function Metodo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
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
    <section
      ref={sectionRef}
      id="metodo"
      className="relative overflow-hidden bg-ink-900 py-14 sm:py-20 md:py-32 lg:h-screen lg:py-0"
    >
      <FundoImagem src="/img/exec-squat.jpg" position="object-[50%_25%]" fade="y" opacity={0.1} />

      <div ref={wrapRef} className="no-scrollbar relative z-10 overflow-x-auto snap-x snap-mandatory lg:h-full lg:snap-none lg:overflow-x-auto">
        <div
          ref={trackRef}
          className="flex gap-5 px-5 pb-2 sm:px-8 lg:h-full lg:flex-row lg:items-center lg:gap-10 lg:px-[7vw] lg:pb-0"
        >
          {/* Painel de título */}
          <div className="w-[82%] shrink-0 snap-center lg:w-[34vw] lg:max-w-lg lg:pr-6">
            <span className="kicker mb-4">{METHOD.kicker}</span>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: METHOD.title }} />
            <p className="mt-6 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/40 lg:flex">
              <TbArrowRight className="text-blood" /> Role para ver as etapas
            </p>
          </div>

          {/* Etapas */}
          {METHOD.steps.map((s) => (
            <article
              key={s.n}
              className="method-step card relative w-[78%] shrink-0 snap-center p-8 lg:flex lg:h-[58vh] lg:w-[360px] lg:flex-col lg:justify-center lg:p-10"
            >
              <span className="font-display text-7xl text-outline lg:text-8xl">{s.n}</span>
              <h3 className="mt-6 text-xl font-bold text-cream lg:text-2xl">{s.title}</h3>
              <p className="mt-3 text-cream/70">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
