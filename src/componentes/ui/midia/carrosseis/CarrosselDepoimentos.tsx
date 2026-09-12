import { FaQuoteLeft } from "react-icons/fa";
import CarrosselAuto from "@/componentes/ui/midia/carrosseis/CarrosselAuto";

export interface Depoimento {
  /** primeiro nome real do aluno. Sem nome, o card mostra só o contexto. */
  name?: string;
  /** de onde vem a fala, ex.: "Treino no pós-parto" */
  context: string;
  /** pergunta do formulário de feedback, quando houver — mostra que é
   *  resposta de pesquisa, não frase escolhida a dedo */
  pergunta?: string;
  /** número ou nota que salta aos olhos, ex.: "57kg → 50kg" */
  destaque?: string;
  quote: string;
}

/**
 * Faixa de depoimentos em LOOP INFINITO, andando sozinha e arrastável.
 * Usa o mesmo motor dos outros carrosséis (usarLoopArrasto, via CarrosselAuto):
 * conteúdo triplicado, emenda invisível nos dois sentidos, pausa no
 * hover/toque e auto desligado em prefers-reduced-motion.
 *
 * `speed` é bem mais alto aqui (90s por volta, contra 28s do padrão) porque
 * isto é TEXTO: o card precisa ficar tempo suficiente na tela para a pessoa
 * terminar de ler antes de sair. Se ficar rápido demais, é aqui que se mexe.
 *
 * `min(85vw, 360px)`: no celular o card ocupa 85% da tela e deixa espiar o
 * próximo; no desktop trava em 360px.
 */
export default function CarrosselDepoimentos({ items }: { items: Depoimento[] }) {
  return (
    <CarrosselAuto cardWidth="min(85vw, 360px)" speed={90}>
      {items.map((t, i) => (
        <figure key={i} className="card flex w-full flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <FaQuoteLeft className="text-xl text-blood" />
            {t.destaque && (
              <span className="shrink-0 rounded-full bg-blood/15 px-3 py-1 text-xs font-bold text-blood">
                {t.destaque}
              </span>
            )}
          </div>

          {t.pergunta && (
            <p className="mt-4 text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-cream/45">
              {t.pergunta}
            </p>
          )}

          <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-cream/85">
            {t.quote}
          </blockquote>

          <figcaption className="mt-5 border-t border-ink-500/60 pt-4 text-sm">
            {t.name && <span className="font-semibold text-cream">{t.name}</span>}
            <span className="text-cream/60">
              {t.name ? " · " : ""}
              {t.context}
            </span>
          </figcaption>
        </figure>
      ))}
    </CarrosselAuto>
  );
}
