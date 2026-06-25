import { FaQuoteLeft, FaInstagram } from "react-icons/fa";
import { RESULTS, TESTIMONIALS, ABOUT } from "@/dados/conteudo";
import CabecalhoSecao from "@/componentes/ui/layout/CabecalhoSecao";
import Revelar from "@/componentes/ui/animacoes/Revelar";
import BotaoWhatsApp from "@/componentes/ui/botoes/BotaoWhatsApp";
import FeedInstagram from "@/componentes/ui/midia/FeedInstagram";
import GaleriaArrastar from "@/componentes/ui/midia/GaleriaArrastar";
import ComparadorAntesDepois from "@/componentes/ui/midia/ComparadorAntesDepois";

export default function Resultados() {
  return (
    <section id="resultados" className="relative overflow-hidden bg-ink-900 py-14 sm:py-20 md:py-32">
      <div className="aurora-blob left-1/2 top-[-8%] h-80 w-80 -translate-x-1/2 animate-aurora bg-blood/12" />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <CabecalhoSecao kicker={RESULTS.kicker} title={RESULTS.title} />
          <Revelar from="up" delay={0.1}>
            <p className="mt-6 text-lg text-cream/70">{RESULTS.intro}</p>
          </Revelar>
        </div>

        <Revelar stagger className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-5">
          {ABOUT.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="font-display text-3xl text-blood sm:text-4xl">{s.value}</span>
              <span className="max-w-[8rem] text-xs uppercase leading-tight tracking-wider text-cream/55">
                {s.label}
              </span>
            </div>
          ))}
        </Revelar>

        <div className="mt-14">
          <Revelar from="up">
            <span className="kicker mb-4">Direto do Instagram</span>
          </Revelar>
          <Revelar from="up">
            <FeedInstagram items={RESULTS.instaFeed} />
          </Revelar>
        </div>

        <div className="mt-16">
          <Revelar from="up">
            <span className="kicker mb-6">Casos com contexto</span>
          </Revelar>

          <Revelar stagger className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:grid-cols-2 md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            {RESULTS.caseStudies.map((item) => (
              <figure
                key={item.src}
                className="group relative min-h-[420px] overflow-hidden rounded-2xl border border-ink-500/60 bg-ink-800 max-md:w-[82%] max-md:shrink-0 max-md:snap-center"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full scale-[1.03] object-cover ${item.pos ?? "object-center"} transition-transform duration-700 group-hover:scale-[1.08]`}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink-900/80 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-blood">
                    <span className="h-px w-6 bg-blood/60" />
                    {item.tag}
                  </span>
                  <h3 className="mt-2 font-display text-2xl uppercase leading-none text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/72">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </Revelar>
        </div>

        <div className="mt-16">
          <Revelar from="up">
            <span className="kicker mb-2">Antes e depois real</span>
          </Revelar>
          <Revelar from="up">
            <p className="mb-6 max-w-xl text-sm text-cream/55">
              Mesma aluna acompanhada de perto. Veja a evolução lado a lado e arraste para comparar.
            </p>
          </Revelar>

          {/* Comparativos prontos (lado a lado) — leitura imediata */}
          <Revelar stagger className="no-scrollbar -mx-5 mb-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {RESULTS.comparativos.map((c) => (
              <figure
                key={c.src}
                className="group relative overflow-hidden rounded-2xl border border-ink-500/60 bg-ink-800 max-md:w-[82%] max-md:shrink-0 max-md:snap-center"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={c.src}
                    alt={`Antes e depois de aluna — ${c.tag}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-cream/25 bg-ink-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/90 backdrop-blur-sm">
                  Antes
                </span>
                <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-blood/50 bg-ink-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-blood backdrop-blur-sm">
                  Depois
                </span>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-blood">
                    <span className="h-px w-6 bg-blood/60" />
                    {c.tag}
                  </span>
                  <p className="mt-1.5 text-sm leading-snug text-cream/85">{c.caption}</p>
                </figcaption>
              </figure>
            ))}
          </Revelar>

          <Revelar stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESULTS.beforeAfter.map((item) => (
              <ComparadorAntesDepois key={`${item.before}-${item.after}`} {...item} />
            ))}

            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-blood/30 bg-gradient-to-br from-ink-800/80 to-ink-900 p-7 sm:col-span-2 lg:col-span-1">
              <div>
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-blood">
                  <span className="h-px w-6 bg-blood/60" />
                  Próxima da fila
                </span>
                <p className="mt-4 font-display text-2xl leading-tight text-cream">
                  Sua transformação pode ser a próxima a entrar aqui.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">
                  Resultado real nasce de método, ajuste e acompanhamento de perto.
                </p>
              </div>
              <BotaoWhatsApp
                className="w-full"
                message="Oi Vinicio! Vi os resultados na página e quero começar minha transformação. Como funciona?"
              >
                Quero esse resultado
              </BotaoWhatsApp>
            </div>
          </Revelar>
        </div>

        <div className="mt-12">
          <Revelar from="up">
            <span className="kicker mb-6">Mais transformações reais</span>
          </Revelar>
          <Revelar stagger className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
            {RESULTS.transformacoes.map((t) => (
              <figure
                key={t.src}
                className="group overflow-hidden rounded-2xl border border-ink-500/60 bg-ink-800 max-md:w-[85%] max-md:shrink-0 max-md:snap-center"
              >
                <header className="flex items-center gap-2.5 px-4 py-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blood to-blood/60 text-[11px] font-bold text-cream">
                    VC
                  </span>
                  <span className="text-sm font-semibold text-cream">@viniciotreinador</span>
                  <span className="ml-auto flex items-center gap-2.5">
                    {t.metric && (
                      <span className="rounded-full bg-blood/15 px-2.5 py-1 text-xs font-bold text-blood">
                        {t.metric}
                      </span>
                    )}
                    <FaInstagram className="text-lg text-cream/45" />
                  </span>
                </header>
                <div className="aspect-[2/3] overflow-hidden bg-ink-900">
                  <img
                    src={t.src}
                    alt={t.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="px-4 py-3.5 text-sm leading-snug text-cream/75">
                  <span className="font-semibold text-cream/90">@viniciotreinador</span> {t.caption}
                </figcaption>
              </figure>
            ))}
          </Revelar>
        </div>

        {TESTIMONIALS.enabled && TESTIMONIALS.items.length > 0 && (
          <div className="mt-16">
            <Revelar from="up">
              <span className="kicker mb-6">O que elas dizem</span>
            </Revelar>
            <div className="grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.items.map((t, i) => (
                <Revelar key={i} from="up" delay={i * 0.1}>
                  <figure className="card h-full p-7">
                    <FaQuoteLeft className="text-2xl text-blood" />
                    <blockquote className="mt-4 text-lg text-cream/85">{t.quote}</blockquote>
                    <figcaption className="mt-5 text-sm">
                      <span className="font-semibold text-cream">{t.name}</span>
                      <span className="text-cream/60"> · {t.context}</span>
                    </figcaption>
                  </figure>
                </Revelar>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <Revelar from="up">
            <span className="kicker mb-6">Método aplicado</span>
          </Revelar>
          <Revelar from="up">
            <GaleriaArrastar items={RESULTS.methodProof} label="Método" />
          </Revelar>
        </div>

        <p className="mt-10 text-xs text-cream/40">
          * Imagens e resultados divulgados com autorização. Resultados variam conforme adesão,
          rotina e individualidade.
        </p>
      </div>
    </section>
  );
}
